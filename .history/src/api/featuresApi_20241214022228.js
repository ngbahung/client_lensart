import api from './axiosInstance';

export const getFeatures = async () => {
    try {
      const response = await api.get('/features');
      return response.data.features;
    } catch (error) {
      console.error('Error fetching features:', error);
      throw error;
    }
  };