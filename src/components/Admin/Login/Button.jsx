const LoginButton = ({ children, onClick, isLoading, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-1/3 bg-white text-[#55d5d2] py-2 rounded-[20px] font-medium border border-[#55d5d2] hover:bg-[#55d5d2] hover:text-white transition-colors duration-200 ${
      isLoading && 'opacity-50 cursor-not-allowed'
    }`}
  >
    {children}
  </button>
);

export default LoginButton;
