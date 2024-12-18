import api from "../utils/api";

export const getCoupons = async () => {
    try {
      const response = await api.get('/active-coupons');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  };