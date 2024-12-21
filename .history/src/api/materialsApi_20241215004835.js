import api from "../utils/api";

export const getMaterials = async () => {
    try {
      const response = await api.get('/materials');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching materials:', error);
      throw error;
    }
  };