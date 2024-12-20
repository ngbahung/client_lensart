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
      phone: userData.phone,
      email: userData.email,
      password: userData.password,
      address: userData.address
    });
    
    // Store both userId and email for OTP verification
    localStorage.setItem('tempUserId', response.data.userId);
    localStorage.setItem('tempEmail', userData.email);
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const verifyOTP = async (otp) => {
  try {
    const userId = parseInt(localStorage.getItem('tempUserId'));
    if (!userId || isNaN(userId)) {
      throw new Error('Invalid user ID');
    }

    const otpNumber = parseInt(otp);
    if (isNaN(otpNumber)) {
      throw new Error('Invalid OTP format');
    }

    const response = await api.post('/auth/verify-otp', { 
      user_id: userId,
      otp: otpNumber
    });

    localStorage.removeItem('tempUserId');
    return response.data.token;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export const resendOTP = async () => {
  try {
    const userId = parseInt(localStorage.getItem('tempUserId'));
    const email = localStorage.getItem('tempEmail');
    
    if (!userId || isNaN(userId) || !email) {
      throw new Error('Invalid user information');
    }

    const response = await api.post('/auth/resend-otp', {
      userId: userId,
      email: email
    });

    return response.data;
  } catch (error) {
    console.error('Error resending OTP:', error);
    throw error;
  }
};

export default { login, register };

// Admin authentication endpoints
export const adminLogin = async (credentials) => {
  try {
    const response = await api.post('/auth/admin/login', credentials);
    return response.data.token;
  } catch (error) {
    console.error('Admin login error:', error);
    throw error;
  }
};

export const adminLogout = async () => {
  try {
    await api.post('/auth/admin/logout');
    localStorage.removeItem('adminToken');
    delete api.defaults.headers.common['Authorization'];
  } catch (error) {
    console.error('Admin logout error:', error);
    throw error;
  }
};

// User authentication endpoints remain unchanged
