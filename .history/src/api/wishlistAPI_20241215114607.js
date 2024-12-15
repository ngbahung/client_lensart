import api from "../utils/api";

// Route::group([
//     'middleware' => ['auth:sanctum', 'can:is-customer'],
// ], function () {
//     Route::get('/wishlists', [WishlistController::class, 'index']);
//     Route::post('/wishlists/create', [WishlistController::class, 'store']);
//     Route::delete('/wishlist/{id}', [WishlistController::class, 'destroy']);
//     Route::delete('/wishlists/clear', [WishlistController::class, 'clearWishlist']);
// });


// Route::group([
//     'middleware' => ['auth:sanctum', 'can:is-customer'],
// ], function () {
//     Route::post('/wishlists/move-to-cart/{wishlistDetailId}', [WishlistController::class, 'moveProductToCart']);
//     Route::post('/wishlists/move-all-to-cart', [WishlistController::class, 'moveAllToCart']);
// });

export const getWishlists = async () => {
    try {
        const response = await api.get('/wishlists');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching wishlists:', error);
        throw error;
    }
}

export const createWishlist = async (wishlist) => {
    try {
        const response = await api.post('/wishlists/create', wishlist);
        return response.data;
    } catch (error) {
        console.error('Error creating wishlist:', error);
        throw error;
    }
}

