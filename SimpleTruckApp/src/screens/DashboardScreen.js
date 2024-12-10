import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardScreen = () => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
    } catch (err) {
      console.error('Failed to retrieve user token:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserToken();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      {userToken ? (
        <Text style={styles.token}>User Token: {userToken}</Text>
      ) : (
        <Text style={styles.error}>No token found. Please login again.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  token: {
    fontSize: 16,
    color: 'green',
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
});

export default DashboardScreen;
