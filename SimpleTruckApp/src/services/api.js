import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({
  baseURL: 'http://localhost:8000/api', // Update with your backend URL
  timeout: 50000,
});

export const registerUser = async (userData) => API.post('/register', userData);

export const loginUser = async (credentials) => API.post('/login', credentials);

// export const createTruckRequest = async (requestData, token) =>
//   API.post('/orders', requestData, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

export const getTruckRequests = async (token, userId) =>
  API.get('/orders', {
    headers: { Authorization: `Bearer ${token}` },
    params: { user_id: userId },
  });

export const createTruckRequest = async (data) => {
    try {
      const response = API.post('/orders', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await AsyncStorage.getItem('userToken')}`, // Add token if required
        },
      });
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error; // Rethrow to handle in handleSubmit
    }
  };

export default API;
