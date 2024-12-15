import api from '../utils/api';

// get all features
export const getFeatures = async () => {
    try {
      const response = await api.get('/active/features');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching features:', error);
      throw error;
    }
  };

// get feature by id
export const getFeatureById = async (featureId) => {
    try {
      const response = await axios.get(`/active/features/getById/${featureId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching feature:', error);
      throw error;
    }
};
