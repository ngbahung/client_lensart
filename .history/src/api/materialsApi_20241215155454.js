import api from "../utils/api";

// get all materials
export const getMaterials = async () => {
    try {
      const response = await api.get('active/materials');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching materials:', error);
      throw error;
    }
  };

export const getMaterialById = async (id) => {
  try {
    const response = await api.get(`/active/materials/getById/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching material:', error);
    throw error;
  }
}