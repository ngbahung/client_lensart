import api from '../utils/api';
import { getBranchById } from './branchesAPI';

export const fetchOrders = async () => {
    try {
        const response = await api.get('/customer/orders');
        return response.data;

export const cancelOrder = async (orderId) => {
    try {
        const response = await api.post(`/orders/cancel/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error canceling order:', error);
        throw error;
    }
};