import api from "../utils/api";

export const fetchBanner = async () => {
  try {
    const response = await api.get("/active-banner");
    return response.data.data; // Access the data property of the response
  } catch (error) {
    throw error.response?.data || error.message;
  }
};