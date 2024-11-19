const Button = ({ onClick, children, className = '', ...props }) => (
  <button
    onClick={onClick}
    className={`w-full bg-[#6fd4d2] text-white py-3 rounded-lg font-medium hover:bg-cyan-600 transition-colors duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;