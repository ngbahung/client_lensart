const Button = ({ onClick, children, className = '', ...props }) => (
  <button
    onClick={onClick}
    className={`w-full bg-[#6fd4d2] text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg text-sm sm:text-base font-medium hover:bg-cyan-600 transition-colors duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;