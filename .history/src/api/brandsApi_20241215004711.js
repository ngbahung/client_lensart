import api from './axiosInstance';

export const getBrands = async () => {
    try {
      const response = await api.get('/brands');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  };

export const getBrandById = async (id) => {
  try {
    const response = await api.get(`/brands/getById/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching brand:', error);
    throw error;
  }
}