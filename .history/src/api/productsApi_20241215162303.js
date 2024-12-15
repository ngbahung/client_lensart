import api from '../utils/api';
im
// get all products
export const getProducts = async () => {
    try {
      const response = await api.get('/active/products');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

// get product by product id
export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/active/products/getById/${productId}`);
    return transformProductDetail(response.data.data);
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

//get product by category id
export const getProductByCategoryId = async (id) => {
  try {
    const response = await api.get(`/active/products/getByCategoryId/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

// get product images by product id
export const getProductImagesByProductId = async (id) => {
  try {
    const response = await api.get(`/active/product-images/getByProductId/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product images by product id:', error);
    throw error;
  }
};

// get product details by product id
export const getProductDetailsByProductId = async (id) => {
  try {
    const response = await api.get(`/active/product-details/getByProductId/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product details by product id:', error);
    throw error;
  }
};

// get product images by id
export const getProductImagesById = async (id) => {
  try {
    const response = await api.get(`/active/product-images/getById/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product images by id:', error);
    throw error;
  }
};

// get product details by branch id
export const getProductDetailsByBranchId = async (id) => {
  try {
    const response = await api.get(`active/product-details/getByBranchId/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product details by branch id:', error);
    throw error;
  }
}

// get product details by product id and branch id
export const getProductDetailsByProductIdAndBranchId = async (productId, branchId) => {
  try {
    const response = await api.get(`/active/product-details/getByProductAndBranchId/${productId}/${branchId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product details by product id and branch id:', error);
    throw error;
  }
};

// get product features by product id
export const getProductFeaturesByProductId = async (id) => {
  try {
    const response = await api.get(`/active/product-features/getByProductId/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product features by product id:', error);
    throw error;
  }
};


// get product features by id
export const getProductFeaturesById = async (id) => {
  try {
    const response = await api.get(`/active/product-features/getById/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product features by id:', error);
    throw error;
  }
};


// Get best selling products
export const getBestSellingProducts = async () => {
  try {
    const response = await api.get('/best-selling-products');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching best selling products:', error);
    throw error;
  }
}

// Get newest products
export const getNewestProducts = async () => {
  try {
    const response = await api.get('/newest-products');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching newest products:', error);
    throw error;
  }
}
 
// search products by keyword
export const searchProducts = async (searchTerm) => {
    try {
        const response = await api.get(`/products/search/?keyword=${searchTerm}`);
        return response.data.data;
    } catch (error) {
        console.error('Error searching products:', error);
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

export const getFullProductDetails = async (productId) => {
  try {
    const [
      productData,
      productImages,
      productDetails,
      productFeatures,
      branches,
      shapes,
      materials,
      brands
    ] = await Promise.all([
      getProductById(productId),
      getProductImagesByProductId(productId),
      getProductDetailsByProductId(productId),
      getProductFeaturesByProductId(productId),
      getBranches(),
      getShapes(),
      getMaterials(),
      getBrands()
    ]);

    return transformFullProductDetail(
      productData, 
      productImages, 
      productDetails, 
      productFeatures,
      branches,
      shapes,
      materials,
      brands
    );
  } catch (error) {
    console.error('Error fetching full product details:', error);
    throw error;
  }
};

const transformFullProductDetail = (
  product, 
  images, 
  details, 
  features,
  branches,
  shapes,
  materials,
  brands
) => ({
  id: product.id,
  name: product.name,
  description: product.description,
  currentPrice: Number(product.price),
  originalPrice: product.offer_price ? Number(product.offer_price) : Number(product.price),
  category_id: product.category_id,
  brand_id: product.brand_id,
  brand: brands.find(b => b.id === product.brand_id)?.name,
  
  images: images.map(img => img.image_url) || [
    `https://picsum.photos/800/800?random=${product.id}`,
    `https://picsum.photos/800/800?random=${product.id + 1}`
  ],

  specifications: {
    style: shapes.find(s => s.id === product.shape_id)?.name || '',
    material: materials.find(m => m.id === product.material_id)?.name || '',
    gender: product.gender === 'female' ? 'Nữ' :
            product.gender === 'male' ? 'Nam' : 'Unisex',
    warranty: '12 tháng'
  },

  features: features.map(f => ({
    id: f.feature_id,
    name: f.name,
    description: f.description
  })),

  branchPrices: branches.map(branch => ({
    branchId: branch.id,
    branchName: branch.name,
    address: branch.address,
    location: branch.name === 'Hồ Chí Minh' ? 'hcm' :
             branch.name === 'Hà Nội' ? 'hanoi' :
             branch.name === 'Đà Nẵng' ? 'danang' : '',
    inStock: details.some(d => 
      d.branch_id === branch.id && d.stock_quantity > 0
    ),
    currentPrice: Math.round(product.price * branch.index),
    originalPrice: product.offer_price ? 
      Math.round(product.offer_price * branch.index) : 
      Math.round(product.price * branch.index),
    stockQuantity: details.find(d => d.branch_id === branch.id)?.stock_quantity || 0
  })),

  variants: {
    colors: product.colors || [],
    selectedColor: null
  },

  soldQuantity: details.reduce((sum, d) => sum + (d.sold_quantity || 0), 0),
  remainingQuantity: details.reduce((sum, d) => sum + (d.stock_quantity || 0), 0),
  isWishlisted: false,
  reviews: product.reviews || []
});