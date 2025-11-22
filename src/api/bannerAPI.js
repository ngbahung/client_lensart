import api from "../utils/api";

export const fetchBanner = async () => {
    try {
        const response = await api.get("/active-banner");
        if (response.data && response.data.status === "success") {
            return response.data.data;
        }
        return null;
    } catch (error) {
        console.error("Banner fetch error:", error);
        return null;
    }
};

export const getBanner = async () => {
    try {
        const response = await api.get("/banner");
        return response.data;
    } catch (error) {
        console.error("Error getting banner:", error);
        throw error;
    }
};

export const updateBanner = async (formData) => {
    try {
        const response = await api.post("/banner/update", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};

export const switchBannerStatus = async () => {
    try {
        const response = await api.post("/banner/switch-status");
        return response.data;
    } catch (error) {
        console.error("Error switching banner status:", error);
        throw error;
    }
};

export const createBanner = async (formData) => {
    try {
        const response = await api.post("/banner/create", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating banner:", error);
        throw error;
    }
};