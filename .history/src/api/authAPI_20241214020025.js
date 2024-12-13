import api from './axiosInstance';

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
  async response => {
    if (response.config.url === '/auth/login' && response.status === 200) {
      const userResponse = await api.get('/users/profile');
      localStorage.setItem('user', JSON.stringify(userResponse.data));
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

export default aut;