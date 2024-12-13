import api from './axiosInstance';

export const getBrands = async () => {
    try {
      const response = await api.get('/brands');
      return response.data.brands;
    } catch (error) {
      console.error('Error fetching branbds:', error);
      throw error;
    }
  };