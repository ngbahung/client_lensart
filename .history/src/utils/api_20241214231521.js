import axios from 'axios';

// Tạo một instance của axios
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Thay bằng URL API của bạn
});

export default axiosInstance;
