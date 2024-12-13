import api from './axiosInstance';

export const getProducts = async () => {
    const response = await api.get('/products');
    return response.data.pro;
    }

export const getProduct = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
}

export const createProduct = async (product) => {
    const response = await api.post('/products', product);
    return response.data;
}

export const updateProduct = async (id, product) => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
}
