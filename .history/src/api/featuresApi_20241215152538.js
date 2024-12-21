import api from '../utils/api';

export const getFeatures = async () => {
    try {
      const response = await api.get('/features');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching features:', error);
      throw error;
    }
  };

export const getFeature = async (featureId) => {
    try {
      const response = await axios.get(`${BASE_URL}/features/${featureId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching feature:', error);
      throw error;
    }
};

export const createFeature = async (featureData) => {
    try {
      const response = await axios.post(`${BASE_URL}/features`, featureData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating feature:', error);
      throw error;
    }
};

export const updateFeature = async (featureId, featureData) => {
    try {
      const response = await axios.put(`${BASE_URL}/features/${featureId}`, featureData);
      return response.data.data;
    } catch (error) {
      console.error('Error updating feature:', error);
        throw error;
    }
}

export const getProductFeatures = async () => {
  try {
    const response = await api.get('/product-features');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product features:', error);
    throw error;
  }
};

export const getProductFeaturesByProductId = async (id) => {
  try {
    const response = await api.get(`/active/product-features/getByProductId/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product features by product id:', error);
    throw error;
  }
};

export const getProductFeaturesById = async (id) => {
  try {
    const response = await api.get(`/active/product-features/getById/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product features by id:', error);
    throw error;
  }
};