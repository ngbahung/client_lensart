const Input = ({ type, placeholder, value, onChange, icon: Icon, ...props }) => (
    <div className="relative mb-4">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-full bg-[#F8FBFF] border border-[#E8F0FE] focus:outline-none focus:border-teal-400 placeholder:text-gray-400"
        {...props}
      />
      {Icon && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon size={20} />
        </div>
      )}
    </div>
  );

export default Input;