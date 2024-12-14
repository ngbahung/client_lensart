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

export const getBrandById = async (brandId) => {
  try {
    const response = await api.get(`/brands/${brandId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching brand:', error);
    throw error;
  }
}