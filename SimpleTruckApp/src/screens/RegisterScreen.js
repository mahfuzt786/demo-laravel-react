import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from '../components/Input';
import InputWithToggle from '../components/InputWithToggle';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import { registerUser } from '../services/api';
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api', // Update with your backend URL
  timeout: 5000,
});

const RegisterScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    const { name, email, password, confirmPassword } = userData;

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await registerUser({ name, email, password });
      console.log(response);
      Alert.alert('Success', 'Registration successful!');
      navigation.navigate('Login');
    } catch (error) {
      if (error.response) {
        // Log the error response from the server
        console.error('Registration error:', error.response.data);
        setError(error.response.data.message || 'Registration failed');
      } else {
        setError('Registration failed :', error.message);
        // throw new Error('Registration failed');
      }
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Input
        placeholder="Name"
        value={userData.name}
        onChangeText={(text) => setUserData({ ...userData, name: text })}
        iconName="person"
      />
      <Input
        placeholder="Email"
        value={userData.email}
        onChangeText={(text) => setUserData({ ...userData, email: text })}
        iconName="email"
      />
      <InputWithToggle
        placeholder="Password"
        value={userData.password}
        onChangeText={(text) => setUserData({ ...userData, password: text })}
        iconName="lock"
      />
      <InputWithToggle
        placeholder="Confirm Password"
        value={userData.confirmPassword}
        onChangeText={(text) =>
          setUserData({ ...userData, confirmPassword: text })
        }
        iconName="lock"
      />
      <ErrorMessage error={error} />
      <Button title="Register" onPress={handleRegister} />
      <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
        Already have an account? Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  link: { color: '#007BFF', marginTop: 20, textAlign: 'center' },
});

export default RegisterScreen;
