import axios from 'axios';
import { API_URL } from '../config';

export const getUserOrders = async () => {
  const response = await axios.get(`${API_URL}/orders/user`, {
    withCredentials: true
  });
  return response.data;
};
