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
api.interceptors.request.use(function (config) {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];
    
  if (token) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
  }
  
  return config;
});

api.interceptors.response.use(
  response => {
    if (response.config.url === '/auth/login' && response.status === 200) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response;
  },
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;