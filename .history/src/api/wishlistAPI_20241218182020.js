import api from "../utils/api";

export const getWishlists = async () => {
    try {
        const response = await api.get('/wishlists');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching wishlists:', error);
        throw error;
    }
}

export const createWishlist = async (productId) => {
    try {
        const response = await api.post('/wishlists/create', {
            product_id: productId
        });
        return {
            success: response.data.success,
            message: response.data.message,
            data: response.data.data
        };
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating wishlist');
    }
}

export const deleteWishlist = async (productId) => {
    try {
        const response = await api.delete(`/wishlists/${productId}`);
        return {
            success: response.data.success,
            message: response.data.message
        };
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error deleting from wishlist');
    }
}

export const clearWishlist = async () => {
    try {
        const response = await api.delete('/wishlists/clear');
        return response.data;
    } catch (error) {
        console.error('Error clearing wishlist:', error);
        throw error;
    }
}

export const moveProductToCart = async (wishlistDetailId) => {
    try {
        const response = await api.post(`/wishlists/move-to-cart/${wishlistDetailId}`);
        return response.data;
    } catch (error) {
        console.error('Error moving product to cart:', error);
        throw error;
    }
}

export const checkWishlistStatus = async (productId) => {
    try {
        const response = await api.get('/wishlists');
        // Check if the product exists in user's wishlist
        const isWishlisted = response.data.data.some(item => 
            parseInt(item.product_id) === parseInt(productId)
        );
        return isWishlisted;
    } catch (error) {
        console.error('Error checking wishlist status:', error);
        return false;
    }
};