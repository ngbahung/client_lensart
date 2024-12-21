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

// Route::post('/updatePassword/{id?}', [UserController::class, 'updatePassword']);
// Route::post('/updateAddress/{id?}', [UserController::class, 'updateAddress']);

export 

