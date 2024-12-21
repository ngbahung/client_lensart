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
    console.log('Login response:', response);
    return response.data.token;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', {
      firstname: userData.firstname,
      lastname: userData.lastname,
      username: userData.username,
      phone: userData.phone,
      email: userData.email,
      password: userData.password,
      address: userData.address
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const verifyOTP = async (otp) => {
  try {
    const response = await api.post('/auth/verify-otp', { otp });
    return response.data.token;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export const resendOTP = async () => {
  try {
    const response = await api.post('/auth/resend-otp');
    return response.data.data;
  } catch (error) {
    console.error('Error resending OTP:', error);
    throw error;
  }
};

export default { login, register };







