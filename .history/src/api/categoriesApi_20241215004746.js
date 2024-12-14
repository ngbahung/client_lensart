import api

export const getCategories = async () => {
    try {
      const response = await api.get('/categories');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };