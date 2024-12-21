import api from "../utils/api";

// // GET ALL
// //**************************************
// Route::group([
//     'middleware' => ['auth:sanctum', 'can:is-customer'],
// ], function () {
//     Route::get('/cart_details', [CartDetailController::class, 'index']);
// });


// //**************************************
// // CREATE
// //**************************************
// Route::group([
//     'middleware' => ['auth:sanctum', 'can:is-customer'],
// ], function () {
//     Route::post('/cart_details/create', [CartDetailController::class, 'store']);
// });

// //**************************************
// //  UPDATE
// //**************************************
// Route::group([
//     'middleware' => ['checkIdParameter', 'auth:sanctum', 'can:is-customer'],
// ], function () {
//     Route::post('/cart_details/update/{id?}', [CartDetailController::class, 'update']);
// });

// //**************************************
// //  DELETE
// //**************************************
// Route::group([
//     'middleware' => ['checkIdParameter', 'auth:sanctum', 'can:is-customer'],
// ], function () {
//     Route::post('/cart_details/delete/{id?}', [CartDetailController::class, 'delete']);
// });

// Route::group([
//     'middleware' => ['auth:sanctum', 'can:is-customer'],
// ], function () {
//     Route::post('/cart_details/clear/{cartId?}', [CartDetailController::class, 'clearCart']);
// });
// //**************************************
// //  Tick Product on Carts
// //**************************************
// Route::group([
//     'middleware' => ['auth:sanctum', 'can:is-customer'],
// ], function () {
//     Route::post('/cart/calculate-total', [CartDetailController::class, 'calculateTotalWithCoupon']);
// });

// //**************************************
// // Click vào Mua Nhanh
// //**************************************
// Route::group([
//     'middleware' => ['auth:sanctum', 'can:is-customer'],
// ], function () {
//     Route::post('/cart/quick-buy', [CartDetailController::class, 'quickBuy']);
// });


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

