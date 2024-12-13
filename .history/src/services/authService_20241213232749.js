import api from "../utils/api";

export const loginAPI = async (credentials) => {
  try {
    await api.get("/sanctum/csrf-cookie");
    const response = await api.post("/auth/login", credentials);
    if (response.status === 200) {
      const userResponse = await api.get("/users/profile");
      return userResponse.data;
    }
    return response.data;
  } catch (err) {
    console.log("Error when login " + err);
  }
};

export const logoutAPI = async () => {
  try {
    const response = await api.post("/auth/logout");
    localStorage.removeItem("user");
    return response.data;
  } catch (err) {
    console.log("Error when logout " + err);
  }
};

export const getUserAPI = async () => {
  try{
    const response = await api.get("/users/profile");
    return response.data;
  } catch(err){
    console.log("Error when getting user info " + err);
  }
}; 