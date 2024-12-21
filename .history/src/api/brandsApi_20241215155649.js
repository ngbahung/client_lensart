import api from '../utils/api';

export const getBrands = async () => {
    try {
      const response = await api.get('active/brands');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  };

// get brand by id
export const getBrandById = async (id) => {
  try {
    const response = await api.get(`/active/brands/getById/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching brand:', error);
    throw error;
  }
}