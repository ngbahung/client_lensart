import api from './axiosInstance';

export const getBrands = async () => {
    try {
      const response = await api.get('/brands');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  };

exp