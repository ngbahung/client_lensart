import api from './axiosInstance';

export const getShapes = async () => {
    try {
      const response = await api.get('/shapes');
      return response.data.shapes;
    } catch (error) {
      console.error('Error fetching shapes:', error);
      throw error;
    }
  };

export const getShape = async (shapeId) => {
  

