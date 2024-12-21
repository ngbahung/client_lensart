import { get } from "lodash";
import api from "../utils/api";

export const getUserData = async () => {
  try {
    const response = await api.get('/users/profile');
    console.log('Dữ liệu người dùng:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
  }
};

export default {
  getUserData
};

// đổi mật khẩu
export const updatePassword = async (id, data) => {
  try {
    const response = await api.post(`/users/updatePassword/${id}`, data);
    console.log('Dữ liệu cập nhật mật khẩu:', response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
  }
};

// cập nhật thông tin địa chỉ của người dùng
export const updateAddress = async (id, data) => {
  try {
    const response = await api.post(`/users/updateAddress/${id}`, data);
    console.log('Dữ liệu cập nhật địa chỉ:', response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
  }
}

