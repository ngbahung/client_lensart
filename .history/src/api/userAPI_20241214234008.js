import

const getUserData = async () => {
  try {
    const response = await api.get('/users/profile');
    console.log('Dữ liệu người dùng:', response.data.data);
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
  }
};

export default {
  getUserData
};
