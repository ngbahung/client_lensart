import api from "../utils/api";

export const getShapes = async () => {
    try {
      const response = await api.get('/active/shapes');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching shapes:', error);
      throw error;
    }
  };

export const getShapeById = async (id) => {
  try {
    const response = await api.get(`/active/shapes/getById/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching shape:', error);
    throw error;
  }
}