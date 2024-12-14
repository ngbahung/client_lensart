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

export const getActiveBlogs = async () => {
    try {
        const response = await api.get("/active-blogs");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching active blogs:", error);
        throw error;
    }
};

export const createBlog = async (blog) => {
    try {
        const response = await api.post("/blogs/create", blog);
        return response.data.data;
    } catch (error) {
        console.error("Error creating blog:", error);
        throw error;
    }
};

export const updateBlog = async (blog) => {
    try {
        const response = await api.post(`/blogs/update/${blog.id}`, blog);
        return response.data.data;
    } catch (error) {
        console.error("Error updating blog:", error);
        throw error;
    }
};

export const getBlogById = async (id) => {
    try {
        const response = await api.get(`/blogs/getById/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching blog:", error);
        throw error;
    }
}

export const switchBlogStatus = async (id) => {
    try {
        const response = await api.post(`/blogs/switch-status/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error switching blog status:", error);
        throw error;
    }
};

export const deleteBlog = async (id) => {
    try {
        const response = await api.post(`/blogs/delete/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error deleting blog:", error);
        throw error;
    }
};