import axios from 'axios';

// Tạo một instance của axios với baseURL từ biến môi trường
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thiết lập interceptor để tự động thêm token vào header cho tất cả các request
api.interceptors.request.use((config) => {
  // Đảm bảo headers object tồn tại
  config.headers = config.headers || {};
  
  // Lấy token từ localStorage - chọn token dựa trên context
  try {
    let token = null;
    
    // Kiểm tra nếu đang ở trang admin (dựa trên URL hiện tại)
    const isAdminContext = window.location.pathname.startsWith('/admin');
    
    if (isAdminContext) {
      // Trong admin context: ưu tiên adminToken, fallback về token nếu không có
      token = localStorage.getItem('adminToken') || localStorage.getItem('token');
    } else {
      // Trong user context: ưu tiên token, fallback về adminToken nếu không có
      token = localStorage.getItem('token') || localStorage.getItem('adminToken');
    }
    
    if (token && token.trim() !== '') {
      // Set Authorization header với Bearer token - sử dụng cả hai cách để đảm bảo
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers.Authorization = `Bearer ${token}`;
      
      console.log('✅ Token added to request:', config.method?.toUpperCase(), config.url);
      console.log('   Context:', isAdminContext ? 'Admin' : 'User');
      console.log('   Token type:', isAdminContext && localStorage.getItem('adminToken') ? 'adminToken' : 'token');
      console.log('   Full URL:', config.baseURL + config.url);
      console.log('   Token preview:', token.substring(0, 20) + '...');
    } else {
      console.warn('⚠️ No token found in localStorage for request:', config.method?.toUpperCase(), config.url);
      console.warn('   Context:', isAdminContext ? 'Admin' : 'User');
      console.warn('   localStorage.getItem("token"):', localStorage.getItem('token'));
      console.warn('   localStorage.getItem("adminToken"):', localStorage.getItem('adminToken'));
    }
  } catch (error) {
    console.error('❌ Error accessing localStorage:', error);
  }
  
  return config;
}, (error) => {
  console.error('❌ Request interceptor error:', error);
  return Promise.reject(error);
});

export default api;