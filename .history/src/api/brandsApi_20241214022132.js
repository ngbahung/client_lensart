import api from './axiosInstance';

export const getBrands = async () => {
    try {
      const response = await api.get('/brands');
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };