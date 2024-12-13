import api from './axiosInstance';

export const getProducts = async () => {
    try {
      const response = await api.get('/products');
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

// Transform API data to match component requirements
export const transformProduct = (product) => ({
  id: product.id,
  name: product.name,
  description: product.description,
  currentPrice: Number(product.price),
  originalPrice: product.offer_price ? Number(product.offer_price) : Number(product.price),
  image: `https://picsum.photos/400/400?random=${product.id}`, // Placeholder image
  discount: product.offer_price ? 
    `-${Math.round((1 - product.offer_price/product.price) * 100)}%` : null,
  gender: product.gender,
  category_id: product.category_id,
  material_id: product.material_id,
  shape_id: product.shape_id
});

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