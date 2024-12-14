import api from "../utils/api";

// Thiết lập interceptor để tự động thêm token vào header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Lấy token từ localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data.token;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const register = async (credentials) => {
  try {
    const response = await api.post('/auth/register', credentials);
    return response.data.token;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};




