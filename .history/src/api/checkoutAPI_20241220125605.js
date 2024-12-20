import api from "../utils/api";

export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders/create', orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createPayOSCheckout = async (orderId) => {
  try {
    const response = await api.post(`/transactions/orders/${orderId}/create`, {
      returnUrl: "http://127.0.0.1:8000/",
      cancelUrl: "http://localhost:3000/gio-hang"
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getPaymentInfo = async (transactionId) => {
  try {
    const response = await api.get(`/${transactionId}/info`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}