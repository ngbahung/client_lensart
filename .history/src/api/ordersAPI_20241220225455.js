import api from '../utils/api';
import { getBranchById } from './branchesAPI';

export const fetchOrders = async () => {
    try {
        const response = await api.get('/customer/orders');
        return response.data.data;
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const cancelOrder = async (orderId) => {
    try {
        const response = await api.post(`/orders/cancel/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error canceling order:', error);
        throw error;
    }
};

export const fetchOrderById = async (orderId) => {
    try {
        const response = await api.get(`/orders/${orderId}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching order details:', error);
        throw error;
    }
};