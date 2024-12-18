import api from "../utils/api";

export const getCoupons = async () => {
    try {
        const response = await api.get('/coupons');
        return {
            success: true,
            data: response.data
        };
    }