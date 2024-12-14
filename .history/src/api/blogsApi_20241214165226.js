import api from "./axiosInstance";

// routes in backend
// Route::get('/active-blogs', [BlogController::class, 'getBlogs']);
// Route::get('/blogs', [BlogController::class, 'index']);
// Route::post('/blogs/create', [BlogController::class, 'store']);
// Route::post('/blogs/update/{id?}', [BlogController::class, 'update']);
// Route::get('/blogs/getById/{id?}', [BlogController::class, 'getById']);
// Route::post('/blogs/switch-status/{id?}', [BlogController::class, 'switchStatus']);
// Route::post('/blogs/delete/{id?}', [BlogController::class, 'delete']);

export const getBlogs = async () => {
    try {
        const response = await api.get("/blogs");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        throw error;
    }
};

