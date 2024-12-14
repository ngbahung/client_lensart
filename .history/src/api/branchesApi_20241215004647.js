import api from '../utils/api';

export const getBranches = async () => {
    try {
      const response = await api.get('/branches');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching branches:', error);
      throw error;
    }
  };