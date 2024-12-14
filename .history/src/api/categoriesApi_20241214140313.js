import api from './axiosInstance';

export const getCategories = async () => {
    try {
      const response = await api.get('/features');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching features:', error);
      throw error;
    }
  };