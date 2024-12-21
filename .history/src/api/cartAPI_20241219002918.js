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
        
        // Log complete response for debugging
        console.log('Complete API Response:', {
            status: response.status,
            data: response.data
        });

        // Check if response has the required structure
        if (!response.data || !response.data.data) {
            console.error('Invalid response structure:', response.data);
            throw new Error('Invalid response structure from server');
        }

        // Return properly structured data
        return {
            success: true,
            data: {
                id: response.data.data.id,
                product_id: response.data.data.product_id,
                branch_id: response.data.data.branch_id,
                product_name: response.data.data.product_name,
                product_price: response.data.data.product_price,
                quantity: response.data.data.quantity,
                color: response.data.data.color,
                image_url: response.data.data.image_url,
                brands_name: response.data.data.brands_name,
                category_name: response.data.data.category_name,
                branches_name: response.data.data.branches_name
            },
            message: response.data.message || 'Successfully added to cart'
        };
    } catch (error) {
        console.error('Detailed API error:', {
            error: error,
            response: error.response?.data
        });
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
export const updateCartItemQuantity = async (id, quantity) => {
    try {
        const response = await api.post(`/cart_details/update/${id}`, {
            quantity
        });
        // Make sure to return the complete response data
        return {
            success: response.data.success || true,
            data: response.data.data || response.data,
            message: response.data.message
        };
    } catch (error) {
        // Properly format and throw the error
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
    }
};

// delete cart item
export const deleteCartItem = async (cartDetailId) => {
    try {
        const response = await api.post(`/cart_details/delete/${cartDetailId}`);
        console.log('Delete cart item response:', response.data);
        
        return {
            success: response.data.success ?? true,
            message: response.data.message || 'Item successfully deleted',
            data: response.data.data
        };
    } catch (error) {
        console.error('Delete cart item error:', {
            error: error,
            response: error.response?.data
        });
        throw {
            success: false,
            message: error.response?.data?.message || 'Failed to delete item',
            error: error
        };
    }
};
