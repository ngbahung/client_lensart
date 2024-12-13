import api from '../utils/api';

export const login = async (credentials) => {
  await api.get('/sanctum/csrf-cookie');
  const response = await api.post('/api/auth/login', credentials);
  localStorage.setItem('user', JSON.stringify(response.data.user));
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/api/auth/logout');
  localStorage.removeItem('user');
  return response.data;
};

export const getUser = async () => {
  const response = await api.get('/api/users/profile');
  return response.data;
};