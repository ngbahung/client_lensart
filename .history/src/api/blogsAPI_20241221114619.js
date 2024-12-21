import api from "../utils/api";

// export const getBlogs = async () => {
//     try {
//         const response = await api.get("/blogs");
//         return response.data.data;
//     } catch (error) {
//         console.error("Error fetching blogs:", error);
//         throw error;
//     }
// };

export const getActiveBlogs = async () => {
    try {
        const response = await api.get("/active-blogs");
        
        if (!response?.data?.data) {
            throw new Error('Invalid response format');
        }

        let blogsData = response.data.data;
        if (!Array.isArray(blogsData)) {
            blogsData = blogsData ? [blogsData] : [];
        }

        // Validate blog entries
        blogsData = blogsData.filter(blog => 
            blog && 
            typeof blog === 'object' && 
            blog.id && 
            blog.title
        );
        
        return {
            blogs: blogsData,
            status: response.status
        };
    } catch (error) {
        console.error("Error fetching active blogs:", error);
        throw new Error(error.response?.data?.message || 'Failed to fetch blogs');
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