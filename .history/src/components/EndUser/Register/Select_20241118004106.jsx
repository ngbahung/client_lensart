import { useState, useEffect, useRef } from 'react';
import { BsChevronDown } from 'react-icons/bs';

const Select = ({ value, onChange, options, placeholder, disabled, isLoading }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Find the selected option's label
    const selectedLabel = options.find(opt => opt.value === value)?.label;
  
    return (
        <div className="relative mb-4" ref={selectRef}>
            <div
                onClick={() => !disabled && !isLoading && setIsOpen(!isOpen)}
                className={`w-full px-4 py-3 rounded-full bg-[#eff9f9] border border-[#E8F0FE] flex justify-between items-center 
                ${disabled || isLoading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
            >
                <span className={selectedLabel ? 'text-gray-900' : 'text-gray-400'}>
                    {isLoading ? 'Đang tải...' : (selectedLabel || placeholder)}
                </span>
                <BsChevronDown className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            
            {isOpen && !disabled && !isLoading && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-left"
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Select;