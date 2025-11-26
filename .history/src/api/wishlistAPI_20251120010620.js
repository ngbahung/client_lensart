import api from "../utils/api";

export const getWishlists = async () => {
    try {
        const response = await api.get('/wishlists');
        // Return the details array from the nested structure
        return response.data.data.details || [];
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
        
        // Check if product is already in wishlist
        const alreadyInWishlist = response.data.data?.original?.message === "Product already in wishlist";
        
        return {
            success: true,
            message: response.data.message || 'Product added to wishlist',
            data: response.data.data,
            alreadyExists: alreadyInWishlist
        };
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating wishlist');
    }
}

export const deleteWishlist = async (wishlistDetailId) => {
    try {
        const response = await api.delete(`/wishlist/${wishlistDetailId}`);
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
        return {
            success: true,
            message: response.data?.message || 'Product moved to cart successfully',
            data: response.data?.data || response.data
        };
    } catch (error) {
        console.error('Error moving product to cart:', error);
        throw new Error(error.response?.data?.message || 'Error moving product to cart');
    }
}

export const moveAllToCart = async () => {
    try {
        const response = await api.post('/wishlists/move-all-to-cart');
        return response.data;
    } catch (error) {
        console.error('Error moving all products to cart:', error);
        throw error;
    }
}

export const checkWishlistStatus = async (productId) => {
    try {
        const response = await api.get('/wishlists');
        const details = response.data?.data?.details || [];
        const wishlistItem = details.find(item => 
            parseInt(item.product_id) === parseInt(productId)
        );
        
        return {
            isWishlisted: Boolean(wishlistItem),
            wishlistDetailId: wishlistItem ? wishlistItem.wishlist_detail_id : null
        };
    } catch (error) {
        console.error('Error checking wishlist status:', error);
        return {
            isWishlisted: false,
            wishlistDetailId: null
        };
    }
};
