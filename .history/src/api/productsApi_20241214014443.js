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

export const createProduct = async (productData) => {
    try {
    const response = await axios.post(`${BASE_URL}/products`, productData);
    return response.data.product;
    } catch (error) {
    console.error('Error creating product:', error);
    throw error;
    }
};

export const updateProduct = async (productId, productData) => {
    try {
    const response = await axios.put(`${BASE_URL}/products/${productId}`, productData);
    return response.data.product;
    } catch (error) {
    console.error('Error updating product:', error);
    throw error;
    }
};                  