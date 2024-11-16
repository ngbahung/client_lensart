const LoginButton = ({ onClick }) => (
    <button
      onClick={onClick}
      className="w-full bg-cyan-500 text-white py-3 rounded-lg font-medium hover:bg-cyan-600 transition-colors duration-200"
    >
      Đăng nhập
    </button>
  );

export default LoginButton;