import api from '../utils/api';

export const login = async (credentials) => {
  await api.get('/sanctum/csrf-cookie');
  const response = await api.post('/auth/login', credentials);
  localStorage.setItem('user', JSON.stringify(response.data.user));
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  localStorage.removeItem('user');
  return response.data;
};

export const getUser = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};