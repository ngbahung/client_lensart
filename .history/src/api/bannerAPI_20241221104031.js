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