import api from './axiosInstance';

export const getProducts = async () => {
    try {
      const response = await api.get('/products');
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };