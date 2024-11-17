const Select = ({ value, onChange, options, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="relative mb-4">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 rounded-full bg-[#F8FBFF] border border-[#E8F0FE] flex justify-between items-center cursor-pointer"
        >
          <span className={value ? 'text-gray-900' : 'text-gray-400'}>
            {value || placeholder}
          </span>
          <BsChevronDown className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  