import axios from 'axios';

// Tạo một instance của axios với baseURL từ biến môi trường
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
});

export default api;