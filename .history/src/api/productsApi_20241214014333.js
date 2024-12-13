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

export const fetchProduct = async (id) => {
    try {
    const response = await api.get(`/products/${id}`);
    return response.data;
    } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
    }
};

export const createProduct = async (product) => {
    try {
    const response = await api.post('/products', product);
    return response.data;
    } catch (error) {
    console.error('Failed to create product:', error);
    return null;
    }
};

export const updateProduct = async (id, product) => {
    try {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
    } catch (error) {
    console.error('Failed to update product:', error);
    return null;
    }
};
