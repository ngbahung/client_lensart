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

export const createFeature = async (featureData) => {
    try {
      const response = await axios.post(`${BASE_URL}/features`, featureData);
      return response.data.feature;
    } catch (error) {
      console.error('Error creating feature:', error);
      throw error;
    }
};

export const updateFeature = async (featureId, featureData) => {
    try {
      const response = await axios.put(`${BASE_URL}/features/${featureId}`, featureData);
      return response.data.feature;
    } catch (error) {
      console.error('Error updating feature:', error);
      