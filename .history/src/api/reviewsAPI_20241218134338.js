import api from '../utils/api';

export const createReview = async (review) => {
  try {
    // Ensure the authorization header is set
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await api.post('/reviews/create', review, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
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

