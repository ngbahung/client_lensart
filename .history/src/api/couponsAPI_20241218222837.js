import api from "../utils/api";

export const getCouponByCode = async (code) => {
    try {
        const response = await api.get(`/coupons/getByCode/${code}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching coupon:", error);
        throw error;
    }
};