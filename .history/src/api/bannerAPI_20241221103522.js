import api from "../utils/api";

export const fetchBanner = async () => {
  try {
    const response = await api.get("/active-banner");
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};