import api from './axiosInstance';

export const getProducts = async () => {
    const response = await api.get('/products');
    return response.data;
    }
    