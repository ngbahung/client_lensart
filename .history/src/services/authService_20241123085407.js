import api from '../utils/api';

export const login = async (credentials) => {
  await api.get('/sanctum/csrf-cookie');
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const logout = async () => {
  const response = await api.post('api/auth/logout');
  return response.data;
};

export const getUser = async () => {
  const response = await api.get('api/users/profile');
  return response.data;
};