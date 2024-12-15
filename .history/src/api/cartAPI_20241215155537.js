import api from "../utils/api";

//
export const getCartDetails = async () => {
    try {
        const response = await api.get('/cart_details');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching cart details:', error);
        throw error;
    }
};

export const createCartDetail = async (cartDetail) => {
    try {
        const response = await api.post('/cart_details/create', cartDetail);
        return response.data;
    } catch (error) {
        console.error('Error creating cart detail:', error);
        throw error;
    }
};

export const updateCartDetail = async (cartDetail) => {
    try {
        const response = await api.post(`/cart_details/update/${cartDetail.id}`, cartDetail);
        return response.data;
    } catch (error) {
        console.error('Error updating cart detail:', error);
        throw error;
    }
};

export const deleteCartDetail = async (cartDetailId) => {
    try {
        const response = await api.post(`/cart_details/delete/${cartDetailId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting cart detail:', error);
        throw error;
    }
};

export const clearCart = async (cartId) => {
    try {
        const response = await api.post(`/cart_details/clear/${cartId}`);
        return response.data;
    } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
    }
};

export const calculateTotalWithCoupon = async (cartId) => {
    try {
        const response = await api.post('/cart/calculate-total', { cartId });
        return response.data;
    } catch (error) {
        console.error('Error calculating total with coupon:', error);
        throw error;
    }
};

export const quickBuy = async (cartId) => {
    try {
        const response = await api.post('/cart/quick-buy', { cartId });
        return response.data;
    } catch (error) {
        console.error('Error quick buying:', error);
        throw error;
    }
};