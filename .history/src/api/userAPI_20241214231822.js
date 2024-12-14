import axiosInstance from "./authAPI";

const fetchUserData = async () => {
  try {
    const response = await axiosInstance.get('/user/');
    console.log('Dữ liệu người dùng:', response.data);
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
  }
};
