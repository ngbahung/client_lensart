import api from "../utils/api";

export const getShapes = async () => {
    try {
      const response = await api.get('/active/shapes');
      console.log('Shapes API response:', response); // Add this line
      return response.data.data; // Ensure correct path to data
    } catch (error) {
      console.error('Error fetching shapes:', error);
      throw error;
    }
};

export const getShapeById = async (id) => {
  try {
    const response = await api.get(`/active/shapes/getById/${id}`);
    console.log('Shape by ID API response:', response); // Add this line
    return response.data.data; // Ensure correct path to data
  } catch (error) {
    console.error('Error fetching shape:', error);
    throw error;
  }
};