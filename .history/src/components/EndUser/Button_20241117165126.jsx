const LoginButton = ({ onClick }) => (
    <button
      onClick={onClick}
      className="w-full bg-[#6fd4d2] text-white py-3 rounded-lg font-medium hover:bg-cyan-600 transition-colors duration-200"
    >
      Đăng nhập
    </button>
  );

export default LoginButton;