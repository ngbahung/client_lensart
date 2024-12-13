import api from './axiosInstance';

export const getFeatures = async () => {
    try {
      const response = await api.get('/brands');
      return response.data.brands;
    } catch (error) {
      console.error('Error fetching features:', error);
      throw error;
    }
  };