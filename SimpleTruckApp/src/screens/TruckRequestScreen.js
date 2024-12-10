import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const TruckRequestScreen = () => {
  const navigation = useNavigation();

  const [location, setLocation] = useState('');
  const [size, setSize] = useState('');
  const [sizeUnit, setSizeUnit] = useState('m³');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [pickupTime, setPickupTime] = useState(null);
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [showPickupPicker, setShowPickupPicker] = useState(false);
  const [showDeliveryPicker, setShowDeliveryPicker] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Unauthorized', 'Please log in to access this page.');
        navigation.replace('Login');
      }
    };

    checkLogin();
  }, []);

  const validateInput = () => {
    if (!location || !size || !weight || !pickupTime || !deliveryTime) {
      Alert.alert('Error', 'All fields are required.');
      return false;
    }

    if (isNaN(parseFloat(size)) || isNaN(parseFloat(weight))) {
      Alert.alert('Error', 'Size and weight must be numbers.');
      return false;
    }

    if (new Date(pickupTime) >= new Date(deliveryTime)) {
      Alert.alert(
        'Error',
        'Delivery time must be later than the pickup time.'
      );
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateInput()) return;

    const requestData = {
      location,
      size: `${size} ${sizeUnit}`,
      weight: `${weight} ${weightUnit}`,
      pickupTime,
      deliveryTime,
    };

    Alert.alert('Success', 'Truck request submitted!', JSON.stringify(requestData));
    // Submit to API or handle further
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Truck Request</Text>
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />

      <View style={styles.row}>
        <TextInput
          placeholder="Size"
          value={size}
          onChangeText={(text) => setSize(text.replace(/[^0-9.]/g, ''))}
          keyboardType="numeric"
          style={[styles.input, styles.rowInput]}
        />
        <Picker
          selectedValue={sizeUnit}
          onValueChange={(value) => setSizeUnit(value)}
          style={styles.picker}
        >
          <Picker.Item label="m³" value="m³" />
          <Picker.Item label="ft³" value="ft³" />
        </Picker>
      </View>

      <View style={styles.row}>
        <TextInput
          placeholder="Weight"
          value={weight}
          onChangeText={(text) => setWeight(text.replace(/[^0-9.]/g, ''))}
          keyboardType="numeric"
          style={[styles.input, styles.rowInput]}
        />
        <Picker
          selectedValue={weightUnit}
          onValueChange={(value) => setWeightUnit(value)}
          style={styles.picker}
        >
          <Picker.Item label="kg" value="kg" />
          <Picker.Item label="lb" value="lb" />
        </Picker>
      </View>

      <Button
        title="Select Pickup Time"
        onPress={() => setShowPickupPicker(true)}
      />
      {showPickupPicker && (
        <DateTimePicker
          value={pickupTime ? new Date(pickupTime) : new Date()}
          mode="datetime"
          display="default"
          onChange={(event, date) => {
            setShowPickupPicker(false);
            if (date) setPickupTime(date.toISOString());
          }}
        />
      )}
      {pickupTime && (
        <Text style={styles.dateText}>
          Pickup Time: {new Date(pickupTime).toLocaleString()}
        </Text>
      )}

      <Button
        title="Select Delivery Time"
        onPress={() => setShowDeliveryPicker(true)}
      />
      {showDeliveryPicker && (
        <DateTimePicker
          value={deliveryTime ? new Date(deliveryTime) : new Date()}
          mode="datetime"
          display="default"
          onChange={(event, date) => {
            setShowDeliveryPicker(false);
            if (date) setDeliveryTime(date.toISOString());
          }}
        />
      )}
      {deliveryTime && (
        <Text style={styles.dateText}>
          Delivery Time: {new Date(deliveryTime).toLocaleString()}
        </Text>
      )}

      <Button title="Submit Request" onPress={handleSubmit} />
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
  dateText: { marginVertical: 10, fontSize: 16 },
});

export default TruckRequestScreen;
