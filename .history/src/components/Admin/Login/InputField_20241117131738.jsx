const InputField = ({ 
    type, 
    placeholder, 
    value, 
    onChange, 
    icon 
  }) => (
    <div className="relative mb-4">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-100 focus:outline-none focus:border-cyan-500 text-gray-800 placeholder-gray-400"
      />
      {icon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
          {icon}
        </div>
      )}
    </div>
  );

export default InputField;