import api from '../utils/api';
import { getBranches } from './branchesAPI';
import { getShapes } from './shapesAPI';
import { getMaterials } from './materialsAPI';
import { getBrands } from './brandsAPI';
import { getFeatures } from './featuresAPI';

// get all products
export const getProducts = async () => {
    try {
      const response = await api.get('/active/products');
      console.log('Products:', response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

// get product by product id
export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/products/getById/${productId}`);
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
    const response = await api.get(`/product-images/getByProductId/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product images by product id:', error);
    throw error;
  }
};

// get product details by product id
export const getProductDetailsByProductId = async (id) => {
  try {
    const response = await api.get(`/product-details/getByProductId/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product details by product id:', error);
    throw error;
  }
};

// get product images by id
export const getProductImagesById = async (id) => {
  try {
    const response = await api.get(`/product-images/getById/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product images by id:', error);
    throw error;
  }
};

// get product details by branch id
export const getProductDetailsByBranchId = async (id) => {
  try {
    const response = await api.get(`/product-details/getByBranchId/${id}`);
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
    const response = await api.get(`/product-features/getByProductId/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product features by product id:', error);
    throw error;
  }
};


// get product features by id
export const getProductFeaturesById = async (id) => {
  try {
    const response = await api.get(`/product-features/getById/${id}`);
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
        if (!searchTerm?.trim()) return [];
        const response = await api.get(`/products/search/?keyword=${encodeURIComponent(searchTerm.trim())}`);
        return response.data.data.map(product => transformProduct(product));
    } catch (error) {
        console.error('Error searching products:', error);
        return [];
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
  currentPrice: product.offer_price ? Number(product.offer_price) : Number(product.price),
  originalPrice: product.offer_price && product.offer_price < product.price ? Number(product.price) : null,
  image: Array.isArray(product.images) && product.images.length > 0 ? product.images[0].image_url : null,
  discount: product.offer_price && product.offer_price < product.price ? 
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
  currentPrice: product.offer_price ? Number(product.offer_price) : Number(product.price),
  originalPrice: Number(product.price),
  category: product.category,
  brand: product.brand,
  material: product.material,
  shape: product.shape,
  gender: product.gender === 'female' ? 'Nữ' : 
          product.gender === 'male' ? 'Nam' : 'Unisex',
  product_details: product.product_details,
  variants: {
    colors: [...new Set(product.product_details.map(detail => detail.color))]
      .map(color => {
        const totalQuantity = product.product_details
          .filter(detail => detail.color === color && detail.status === 'active')
          .reduce((sum, detail) => sum + detail.quantity, 0);
        
        return {
          id: color,
          name: color,
          totalQuantity
        };
      })
      .filter(color => color.totalQuantity > 0) // Only show colors with available stock
  },
  specifications: {
    style: product.shape?.name || '',
    material: product.material?.name || '',
    gender: product.gender === 'female' ? 'Nữ' : 
            product.gender === 'male' ? 'Nam' : 'Unisex',
    warranty: '12 tháng'
  },
  branchPrices: product.product_details.reduce((acc, branch) => {
    const branchPrice = {
      branchId: branch.branch_id,
      branchName: branch.branch_name,
      address: branch.address,
      location: branch.branch_name === 'Hồ Chí Minh' ? 'hcm' :
               branch.branch_name === 'Hà Nội' ? 'hanoi' :
               branch.branch_name === 'Đà Nẵng' ? 'danang' : '',
      color: branch.color,
      currentPrice: Math.round((product.offer_price || product.price) * branch.index), // Changed to use offer_price
      originalPrice: Math.round(product.price),      // Original price gets the index
      inStock: branch.quantity > 0,
      stockQuantity: branch.quantity,
      priceIndex: branch.index
    };

    // Only add if we haven't already added this branch
    if (!acc.find(b => b.branchId === branch.branch_id)) {
      return [...acc, branchPrice];
    }
    return acc;
  }, []),

  variants: {
    colors: [...new Set(product.product_details.map(detail => detail.color))]
      .map(color => ({
        name: color,
        quantities: product.product_details
          .filter(detail => detail.color === color && detail.status === 'active')
          .reduce((acc, detail) => ({
            ...acc,
            [detail.branch_id]: {
              quantity: detail.quantity,
              priceIndex: detail.index
            }
          }), {})
      }))
  },
  features: product.features || [],
  images: product.images?.map(image => image.image_url) || [], // Ensure proper mapping of image URLs
  reviews: Array.isArray(product.reviews) ? product.reviews
    .filter(review => review.status === 'active')
    .map(review => ({
      id: review.id,
      userName: `${review.firstname} ${review.lastname}`,
      rating: Number(review.rating),
      comment: review.review,
      date: review.created_time || new Date().toISOString(),
      productId: review.product_id,
      userId: review.user_id,
      status: review.status
    })) : [],
  averageRating: product.reviews?.length > 0 
    ? (product.reviews
        .filter(review => review.status === 'active')
        .reduce((sum, review) => sum + Number(review.rating), 0) / 
        product.reviews.filter(review => review.status === 'active').length
      ).toFixed(1) 
    : '0.0',
  totalActiveReviews: product.reviews?.filter(review => review.status === 'active').length || 0,
  totalInactiveReviews: product.reviews?.filter(review => review.status === 'inactive').length || 0,
  totalReviews: product.reviews?.length || 0,
  soldQuantity: 0,
  remainingQuantity: product.product_details.reduce((sum, detail) => sum + detail.quantity, 0),
  isWishlisted: false
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
  currentPrice: product.offer_price ? Number(product.offer_price) : Number(product.price),
  originalPrice: Number(product.price),
  category_id: product.category_id,
  brand_id: product.brand_id,
  brand: brands.find(b => b.id === product.brand_id)?.name,
  
  images: images.map(img => img.image_url), // Map the image URLs correctly

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
    currentPrice: Math.round((product.offer_price || product.price) * branch.index),  // Changed to use offer_price
    originalPrice: Math.round(product.price * branch.index),       // Original price gets the index
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