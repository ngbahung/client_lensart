import api from "../utils/api";

// Tạo một instance của axios
const axiosInstance = axios.create({
  baseURL: 'https://example.com/api', // Thay bằng URL API của bạn
});

// Thiết lập interceptor để tự động thêm token vào header
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Lấy token từ localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;

