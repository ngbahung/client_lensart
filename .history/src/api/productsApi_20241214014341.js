import api from './axiosInstance';

export const getProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

    export const getProduct = async (productId) => {
        try {
        const response = await axios.get(`${BASE_URL}/products/${productId}`);
        return response.data.product;
        } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
        }
    };