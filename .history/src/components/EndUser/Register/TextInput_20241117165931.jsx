const Input = ({ 
  type, 
  placeholder, 
  value, 
  onChange, 
  icon: Icon, 
  label,
  error,
  className = "",
  iconPosition = "right",
  ...props 
}) => (
  <div className="relative mb-4">
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
    )}
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-3 rounded-full
          bg-[#eff9f9] border transition-colors duration-200
          ${error ? 'border-red-400 focus:border-red-500' : 'border-[#E8F0FE] focus:border-teal-400'}
          focus:outline-none placeholder:text-gray-400
          ${Icon && iconPosition === "left" ? 'pl-11' : ''}
          ${Icon && iconPosition === "right" ? 'pr-11' : ''}
          ${className}
        `}
        {...props}
      />
      {Icon && (
        <div className={`absolute top-1/2 -translate-y-1/2 text-gray-400
          ${iconPosition === "left" ? 'left-4' : 'right-4'}`}>
          <Icon size={20} />
        </div>
      )}
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-500">{error}</p>
    )}
  </div>
);

export default Input;