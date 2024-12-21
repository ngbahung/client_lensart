import api from '../utils/api';

export const createReview = async (review) => {
  try {
    const response = await api.post('/reviews/create', review);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create review'
    };
  }
};

