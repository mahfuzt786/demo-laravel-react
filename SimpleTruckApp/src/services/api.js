import axios from 'axios';

const API = axios.create({
  baseURL: 'http://your-backend-url/api', // Update with your backend URL
  timeout: 5000,
});

export const registerUser = async (userData) => API.post('/register', userData);
export const loginUser = async (credentials) => API.post('/login', credentials);
export const createTruckRequest = async (requestData, token) =>
  API.post('/truck-requests', requestData, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getTruckRequests = async (token) =>
  API.get('/truck-requests', {
    headers: { Authorization: `Bearer ${token}` },
  });

export default API;
