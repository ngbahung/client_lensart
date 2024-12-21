import api from '../../src/utils/api';

export const createReview = async (review) => {
  try {
    const response = await api.post('/reviews/create', review);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

