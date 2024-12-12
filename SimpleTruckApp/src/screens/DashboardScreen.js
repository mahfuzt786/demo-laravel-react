import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getTruckRequests } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const navigation = useNavigation();

  const [requests, setRequests] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const userId = await AsyncStorage.getItem('user_id');

    if (!userToken || !userId) {
      console.error('User  token or user ID is null');
      return;
    }
    try {
      const response = await getTruckRequests(userToken, userId);
      console.log(response);
      setRequests(response.data);
    } catch (err) {
      console.error('Failed to fetch requests', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchRequests();
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('user_id');
      navigation.replace('Login');
    } catch (err) {
      console.error('Failed to logout', err);
    }
  };

  const handleTrack = () => {
    navigation.navigate('TruckRequest');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Truck Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Location: {item.location}</Text>
            <Text>Size: {item.size}</Text>
            <Text>Weight: {item.weight}</Text>
            <Text>Pickup Time: {item.pickupTime}</Text>
            <Text>Delivery Time: {item.deliveryTime}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
      <View style={styles.tabMenu}>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabButtonText}>Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabButton} onPress={handleTrack}>
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
  container: { padding: 20, flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: '1.1em',
    border: '1px solid #aaa154',
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

export default DashboardScreen;