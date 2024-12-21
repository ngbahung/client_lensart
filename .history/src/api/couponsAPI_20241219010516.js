import api from "../utils/api";

export const getCouponByCode = async (code) => {
    try {
        const response = await api.get(`/coupons/getByCode/${code}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error('Mã giảm giá không tồn tại');
        }
        throw new Error('Có lỗi xảy ra khi kiểm tra mã giảm giá');
    }
};
