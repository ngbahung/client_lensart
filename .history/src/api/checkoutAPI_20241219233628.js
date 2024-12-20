import api from "../utils/api";

export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders/create', orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createPayOSCheckout = async (orderId, amount) => {
  try {
    const response = await api.post(`/transactions/orders/${orderId}/create`, {
      return_url: "http://127.0.0.1:8000/",
      ca
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};