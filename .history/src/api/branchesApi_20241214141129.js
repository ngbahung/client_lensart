import api from './axiosInstance';

export const getBranches = async () => {
    try {
      const response = await api.get('/branches');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };