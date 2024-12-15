import api from '../utils/api';

export const getProducts = async () => {
    try {
      const response = await api.get('/active/products');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

// Transform API data to match component requirements
export const transformProduct = (product) => ({
  ...product,
  gender: product.gender === 'female' ? 'Nữ' : 
          product.gender === 'male' ? 'Nam' : 
          product.gender === 'unisex' ? 'Unisex' : '',
  id: product.id,
  name: product.name,
  description: product.description,
  currentPrice: Number(product.price),
  originalPrice: product.offer_price ? Number(product.offer_price) : Number(product.price),
  image: `https://picsum.photos/400/400?random=${product.id}`, // Placeholder image
  discount: product.offer_price ? 
    `-${Math.round((1 - product.offer_price/product.price) * 100)}%` : null,
  category_id: product.category_id,
  material: product.material_id === 1 ? 'Kim loại' : 
           product.material_id === 2 ? 'Nhựa' : 
           product.material_id === 3 ? 'Titanium' : '',
  style: product.shape_id === 1 ? 'Phi công' :
         product.shape_id === 2 ? 'Vuông' :
         product.shape_id === 3 ? 'Oval' :
         product.shape_id === 4 ? 'Browline' :
         product.shape_id === 5 ? 'Đa giác' : ''
});

export const getProduct = async (productId) => {
    try {
    const response = await axios.get(`/active/products/${productId}`);
    return response.data.product;
    } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
    }
};

export const createProduct = async (productData) => {
    try {
    const response = await axios.post(`/products`, productData);
    return response.data.product;
    } catch (error) {
    console.error('Error creating product:', error);
    throw error;
    }
};

export const updateProduct = async (productId, productData) => {
    try {
    const response = await axios.put(`/products/${productId}`, productData);
    return response.data.product;
    } catch (error) {
    console.error('Error updating product:', error);
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
    const response = await api.get(`/active/products/getByCategoryId/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export const getProductImagesByProductId = async (id) => {
  try {
    const response = await api.get(`/active/product-images/getByProductId/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product images by product id:', error);
    throw error;
  }
};

export const getProductDetailsByProductId = async (id) => {
  try {
    const response = await api.get(`/active/product-details/getByProductId/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product details by product id:', error);
    throw error;
  }
};

export const getProductImagesById = async (id) => {
  try {
    const response = await api.get(`/active/product-images/getById/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product images by id:', error);
    throw error;
  }
};

export const getProductDetailsByBranchId = async (id) => {
  try {
    const response = await api.get(`active/product-details/getByBranchId/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product details by branch id:', error);
    throw error;
  }
}

export const getProductDetailsByProductIdAndBranchId = async (productId, branchId) => {
  try {
    const response = await api.get(`/active/product-details/getByProductAndBranchId/${productId}/${branchId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product details by product id and branch id:', error);
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

export const getProductFeaturesByProductId = async (id) => {
  try {
    const response = await api.get(`/active/product-features/getByProductId/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product features by product id:', error);
    throw error;
  }
};

export const getProductFeaturesById = async (id) => {
  try {
    const response = await api.get(`/active/product-features/getById/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product features by id:', error);
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
    try {
        const response = await api.get(`/products/search/?keyword=${searchTerm}`);
        return response.data.data;
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
};

export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/products/getById/${productId}`);
    return transformProductDetail(response.data.data);
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

export const transformProductDetail = (product) => ({
  id: product.id,
  name: product.name,
  description: product.description,
  currentPrice: Number(product.price),
  originalPrice: product.offer_price ? Number(product.offer_price) : Number(product.price),
  discount: product.offer_price ? 
    `-${Math.round((1 - product.offer_price/product.price) * 100)}%` : null,
  images: [
    `https://picsum.photos/800/800?random=${product.id}`,
    `https://picsum.photos/800/800?random=${product.id + 1}`,
    `https://picsum.photos/800/800?random=${product.id + 2}`,
    `https://picsum.photos/800/800?random=${product.id + 3}`
  ],
  specifications: {
    style: product.shape_id === 1 ? 'Phi công' :
           product.shape_id === 2 ? 'Vuông' :
           product.shape_id === 3 ? 'Oval' :
           product.shape_id === 4 ? 'Browline' :
           product.shape_id === 5 ? 'Đa giác' : '',
    material: product.material_id === 1 ? 'Kim loại' :
              product.material_id === 2 ? 'Nhựa' :
              product.material_id === 3 ? 'Titanium' : '',
    gender: product.gender === 'female' ? 'Nữ' :
            product.gender === 'male' ? 'Nam' :
            product.gender === 'unisex' ? 'Unisex' : '',
    warranty: '12 tháng'
  },
  variants: {
    colors: product.colors || [],
    selectedColor: null
  },
  soldQuantity: product.sold_quantity || 0,
  remainingQuantity: product.stock_quantity || 0,
  isWishlisted: false,
  reviews: product.reviews || [],
  category_id: product.category_id
});