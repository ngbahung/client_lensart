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



// export const changePassword = async (data) => {
//   try {
//     const response = await api.put('/users/change-password', data);
//     console.log('Dữ liệu thay đổi mật khẩu:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Lỗi khi gọi API:', error);
//     throw error;
//   }
// };

