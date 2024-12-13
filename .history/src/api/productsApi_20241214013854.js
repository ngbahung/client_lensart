import api from './axiosInstance';

export const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      return response.data.products;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      return [];
    }
  };

  