import api from "../utils/api";

export const fetchBanners = async () => {
  try {
    const response = await api.get("/banners");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};