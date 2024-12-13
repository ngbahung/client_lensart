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

export const getFeature = async (featureId) => {
    try {
      const response = await axios.get(`${BASE_URL}/features/${featureId}`);
      return response.data.feature;
    } catch (error) {
      console.error('Error fetching feature:', error);
      throw error;
    }
};

