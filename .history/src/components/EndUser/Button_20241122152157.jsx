const Button = ({ onClick, children, className = '', ...props }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center justify-center min-w-[120px] bg-[#6fd4d2] text-white 
    py-2.5 px-4 rounded-lg text-sm font-medium 
    hover:bg-[#5fc2c0] active:bg-[#4eb0ae] 
    transition-colors duration-200 
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-[#6fd4d2] focus:ring-offset-2
    ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;