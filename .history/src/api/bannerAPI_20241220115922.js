import api from "../utils/api";

export const fetchBanner = async () => {
  try {
    const response = await api.get("/banner");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};