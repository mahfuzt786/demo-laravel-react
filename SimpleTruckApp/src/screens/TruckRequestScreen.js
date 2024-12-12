import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Platform,
  ActivityIndicator, TouchableOpacity 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorMessage from '../components/ErrorMessage';
import { useNavigation } from '@react-navigation/native';
import Input from '../components/Input';
import { createTruckRequest } from '../services/api';


import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TruckRequestScreen = () => {
  const navigation = useNavigation();

  const [location, setLocation] = useState('');
  const [size, setSize] = useState('');
  const [sizeUnit, setSizeUnit] = useState('m³');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [pickupTime, setPickupTime] = useState(null);
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [error, setError] = useState(null); // Added for error handling

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        setError('Unauthorized. Please log in to access this page.');
        navigation.replace('Login');
      }
    };
    checkLogin();
  }, []);

  const validateInput = () => {
    if (!location || !size || !weight || !pickupTime || !deliveryTime) {
      setError('All fields are required.');
      return false;
    }

    if (isNaN(parseFloat(size)) || isNaN(parseFloat(weight))) {
      setError('Size and weight must be numbers.');
      return false;
    }

    if (new Date(pickupTime) >= new Date(deliveryTime)) {
      setError('Delivery time must be later than pickup time.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateInput()) return;

    const requestData = {
      location: location,
      size: `${size} ${sizeUnit}`,
      weight: `${weight} ${weightUnit}`,
      pickup_time: new Date(pickupTime).toISOString(),
      delivery_time: new Date(deliveryTime).toISOString(),
    };

    try {
      console.log(requestData);

      const response = await createTruckRequest(requestData);
      if (response.status === 201) {
        alert('Truck request created successfully!');
        setError(null); // Clear any errors
        navigation.replace('Dashboard');

      } else {
        setError('Failed to create truck request. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while submitting the request. '+ err.response.data.message);
      console.error(err); // Log error for debugging
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('user_id');
      navigation.replace('Login');
    } catch (err) {
      console.error('Failed to logout', err);
    }
  };

  const handleDashboard = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Truck Request</Text>
      <ErrorMessage error={error} />
      <Input
        placeholder="Location"
        value={location}
        onChangeText={(text) => setLocation(text)}
        iconName="map"
      />

      <View style={styles.row}>
        <Input
          placeholder="Size"
          value={size}
          onChangeText={(text) => setSize(text.replace(/[^0-9.]/g, ''))}
          keyboardType="numeric"
          iconName='straighten'
        />
        <Picker
          selectedValue={sizeUnit}
          onValueChange={(value) => setSizeUnit(value)}
          style={[styles.picker, styles.dropdown]}
        >
          <Picker.Item label="m³" value="m³" />
          <Picker.Item label="ft³" value="ft³" />
        </Picker>
      </View>

      <View style={styles.row}>
        <Input
          placeholder="Weight"
          value={weight}
          onChangeText={(text) => setWeight(text.replace(/[^0-9.]/g, ''))}
          keyboardType="numeric"
          iconName="scale"
        />
        <Picker
          selectedValue={weightUnit}
          onValueChange={(value) => setWeightUnit(value)}
          style={[styles.picker, styles.dropdown]}
        >
          <Picker.Item label="kg" value="kg" />
          <Picker.Item label="lb" value="lb" />
        </Picker>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Pickup Time:</Text>
        <DatePicker
          style={styles.dateTimePick}
          selected={pickupTime}
          onChange={(date) => setPickupTime(date)}
          showTimeSelect
          dateFormat="Pp"
          popperPlacement="top-end"
          portalId="pickup-portal"
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Delivery Time:</Text>
        <DatePicker
          style={styles.dateTimePick}
          selected={deliveryTime}
          onChange={(date) => setDeliveryTime(date)}
          showTimeSelect
          dateFormat="Pp"
          popperPlacement="top-end"
          portalId="delivery-portal"
        />
      </View>

      <Button title="Submit Request" onPress={handleSubmit} />

      <View style={styles.tabMenu}>
        <TouchableOpacity style={styles.tabButton} onPress={handleDashboard}>
          <Text style={styles.tabButtonText}>Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabButtonText}>Truck Request</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={handleLogout}>
          <Text style={styles.tabButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  rowInput: { flex: 1 },
  picker: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  label: { fontSize: 16, marginRight: 10 },
  dateTimePick: {
    zIndex: 9999, // Ensure the picker displays over other elements
    position: 'absolute', // Ensure it overlaps other elements
  },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  tabMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: 15,
  },
  tabButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default TruckRequestScreen;
