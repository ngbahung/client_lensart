import api from "../utils/api";

export const getCouponByCode = async (code) => {
    try {
        const response = await api.get(`/coupons/${code}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching coupon:", error);
        throw error;
    }
    };
