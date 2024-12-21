import api from "../utils/api";

export const getCoupons = async () => {
    try {
        const response = await api.get('/coupons');
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch coupons'
        };
    }

}