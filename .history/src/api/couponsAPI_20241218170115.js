import api from "../utils/api";

export const getCoupons = async () => {
    try {
        const response = await api.get('/active-coupons');
        return response.data.data;
    }
    