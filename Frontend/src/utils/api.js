import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // This is important for sending cookies with requests
});

export default api;