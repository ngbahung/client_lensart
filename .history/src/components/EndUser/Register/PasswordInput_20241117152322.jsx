
const PasswordInput = ({ value, onChange, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);
  
    return (
      <div className="relative mb-4">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-full bg-[#F8FBFF] border border-[#E8F0FE] focus:outline-none focus:border-teal-400 placeholder:text-gray-400"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
        </button>
      </div>
    );
  };

export default PasswordInput;