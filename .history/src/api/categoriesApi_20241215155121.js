import api from "../utils/api";

export const getCategories = async () => {
    try {
      const response = await api.get('/active/categories');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };

export const getCategoryById = async (id) => {
