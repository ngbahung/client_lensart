import api from '../utils/api';

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