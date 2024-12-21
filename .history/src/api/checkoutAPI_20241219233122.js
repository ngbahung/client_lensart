import api from "../utils/api";

export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createPayOSCheckout = async (orderId, amount) => {
  try {
    const response = await api.post('/payments/create-payment-link', {
      orderId,
      amount
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
