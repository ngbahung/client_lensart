import api from "../utils/api";

// get all carts
export const getCartDetails = async () => {
    try {
        const response = await api.get('/cart_details');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching cart details:', error);
        throw error;
    }
};

// add product to cart
export const createCartDetail = async (product_id, branch_id, color, quantity) => {
    try {
        const response = await api.post('/cart_details/create', {
            product_id,
            branch_id,
            color,
            quantity
        });
        return response.data;
    } catch (error) {
        console.error('Error creating cart detail:', error);
        throw error;
    }
};

// clear cart
export const clearCart = async (cartId) => {
    try {
        const response = await api.post(`/cart_details/clear/${cartId}`);
        return response.data;
    } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
    }
};

// calculate total
export const calculateTotalWithCoupon = async (cartId) => {
    try {
        const response = await api.post('/cart/calculate-total', { cartId });
        return response.data;
    } catch (error) {
        console.error('Error calculating total with coupon:', error);
        throw error;
    }
};

// quick buy from product detail page
export const quickBuy = async (cartId) => {
    try {
        const response = await api.post('/cart/quick-buy', { cartId });
        return response.data;
    } catch (error) {
        console.error('Error quick buying:', error);
        throw error;
    }
};

// update cart item quantity
export const updateCartItemQuantity = async (cartDetailId, quantity) => {
    try {
        const response = await api.put(`/cart_details/${cartDetailId}`, { quantity });
        return response.data;
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        throw error;
    }
};

// delete cart item
export const deleteCartItem = async (cartDetailId) => {
    try {
        const response = await api.delete(`/cart_details/delete/${cartDetailId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting cart item:', error);
        throw error;
    }
};

//update cart item in cart
export const updateCartItem = async (cartDetailId, quantity) => {
    try {
        const response = await api.put(`/cart_details/${cartDetailId}`, { quantity });
        return response.data;
    } catch (error) {
        console.error('Error updating cart item:', error);
        throw error;
    }
};