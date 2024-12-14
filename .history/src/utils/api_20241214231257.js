import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',  
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
});

// Add request interceptor to handle XSRF-TOKEN
