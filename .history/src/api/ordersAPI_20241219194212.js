import api from '../utils/api';

export const fetchOrders = async () => {
    try {
        const { data } = await api.get('/customer/orders');
        return Response.data;
    } catch (error) {
        throw new Error('Failed to fetch orders');
    }
};