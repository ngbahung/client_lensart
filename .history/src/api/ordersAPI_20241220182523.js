import api from '../utils/api';
import { getBranchById } from './branchesAPI';

export const fetchOrders = async () => {
    try {
        const response = await api.get('/customer/orders');
        const orders = response.data.data;
        
        // Fetch branch information for each order
        const ordersWithBranch = await Promise.all(
            orders.map(async (order) => {
                try {
                    const branchInfo = await getBranchById(order.branch_id);
                    return {
                        ...order,
                        branchName: branchInfo.name
                    };
                } catch (error) {
                    return {
                        ...order,
                        branchName: 'N/A'
                    };
                }
            })
        );
        
        return ordersWithBranch;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const cancelOrder = async (orderId) => {
    try {
        const response = await api.post(`/orders/cancel/{id?}`);
        return response.data;
    } catch (error) {
        console.error('Error canceling order:', error);
        throw error;
    }
};