import api from './axiosInstance';

export const getMaterials = async () => {
    try {
      const response = await api.get('/import api from './axiosInstance';

export const getFeatures = async () => {
    try {
      const response = await api.get('/features');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching features:', error);
      throw error;
    }
  };
');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching features:', error);
      throw error;
    }
  };
