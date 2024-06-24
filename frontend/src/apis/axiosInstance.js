// src/apis/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/', // replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
