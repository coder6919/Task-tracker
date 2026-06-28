import axios from 'axios';

const API = axios.create({
  // Update this URL when you deploy to Render
  baseURL: 'http://localhost:5000/api',
});

// Automatically add the token to headers for every request
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;