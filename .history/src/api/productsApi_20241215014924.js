import api from '../utils/api';

export const getProducts = async () => {
    try {
      const response = await api.get('/products');
      return response.data.data;
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

export const getProductFeatures = async () => {
  try {
    const response = await api.get('/product-features');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product features:', error);
    throw error;
  }
};

export const getProductImages = async () => {
  try {
    const response = await api.get('/product-images');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product product images:', error);
    throw error;
  }
};

export const getProductDetails = async () => {
  try {
    const response = await api.get('/product-details');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product product details:', error);
    throw error;
  }
};

export const getProductByCategoryId = async (id) => {
  try {
    const response = await api.get(`/products/getByCategoryId/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export const getProductImagesByProductId = async (id) => {
  try {
    const response = await api.get(`/product-images/getByProductId/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product images by product id:', error);
    throw error;
  }
};

export const getProductFeaturesByProductId = async (id) => {
  try {
    const response = await api.get(`/product-features/getByProductId/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product features by product id:', error);
    throw error;
  }
};

export const getProductDetailsByProductId = async (id) => {
  try {
    const response = await api.get(`/product-details/getByProductId/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product details by product id:', error);
    throw error;
  }
};

export const getProductImagesById = async (id) => {
  try {
    const response = await api.get(`/product-images/getById/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product images by id:', error);
    throw error;
  }
};

export const getProductFeaturesById = async (id) => {
  try {
    const response = await api.get(`/product-features/getById/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product features by id:', error);
    throw error;
  }
};

export const getProductDetailsByBrandId = async (id) => {
  try {
    const response = await api.get(`/product-details/getByBrandId/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product details by brand id:', error);
    throw error;
  }
}

export const getProductDetailsByProductIdAndBrandId = async (productId, brandId) => {
  try {
    const response = await api.get(`/product-details/getByProductAndBrandId/${productId}/${brandId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product details by product id and brand id:', error);
    throw error;
  }
};

export const getBestSellingProducts = async () => {
  try {
    const response = await api.get('/best-selling-products');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching best selling products:', error);
    throw error;
  }
}

export const getNewestProducts = async () => {
  try {
    const response = await api.get('/newest-products');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching newest products:', error);
    throw error;
  }
}

export const searchProducts = async (searchTerm) => {
    