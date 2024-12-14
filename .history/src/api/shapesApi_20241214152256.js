import api from './axiosInstance';

export const getShapes = async () => {
    try {
      const response = await api.get('/shapes');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching shapes:', error);
      throw error;
    }
  };

export const getShape = async (shapeId) => {
    try {
      const response = await axios.get(`${BASE_URL}/shapes/${shapeId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching shape:', error);
      throw error;
    }
};

export const getShapeById = async (brandId) => {
  try {
    const response = await api.get(`/brands/getById/${brandId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching brand:', error);
    throw error;
  }
}

