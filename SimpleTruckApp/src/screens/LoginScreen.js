import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';
import InputWithToggle from '../components/InputWithToggle';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import { loginUser } from '../services/api';

const LoginScreen = ({ navigation }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    const { email, password } = credentials;

    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await loginUser(credentials);
      const { token } = response.data;

      // Save token to AsyncStorage
      await AsyncStorage.setItem('userToken', token);

      Alert.alert('Success', 'Login successful!');
      navigation.replace('Dashboard');
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Input
        placeholder="Enter your Email"
        value={credentials.email}
        onChangeText={(text) => setCredentials({ ...credentials, email: text })}
        iconName="email"
      />
      <InputWithToggle
        placeholder="Password"
        value={credentials.password}
        onChangeText={(text) =>
          setCredentials({ ...credentials, password: text })
        }
        iconName="lock"
      />
      <ErrorMessage error={error} />
      <Button title="Login" onPress={handleLogin} 
        iconName="check"
      />
      <Text
        onPress={() => navigation.navigate('Register')}
        style={styles.link}
      >
        Don't have an account? Register
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  link: { color: '#007BFF', marginTop: 20, textAlign: 'center' },
});

export default LoginScreen;
