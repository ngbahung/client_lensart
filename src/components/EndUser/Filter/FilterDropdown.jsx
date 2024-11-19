import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FilterDropdown = ({ title, options, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionChange = (option) => {
    const newSelection = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    
    setSelectedOptions(newSelection);
    onFilterChange(newSelection);
  };

  return (
    <div className="relative w-full sm:w-48 mb-2 sm:mb-4" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none"
      >
        <span>{title}</span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-[50]">
          <ul className="max-h-40 sm:max-h-48 overflow-y-auto text-sm sm:text-base">
            {options.map((option, index) => (
              <li key={index} className="px-4 py-2 hover:bg-gray-100">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleOptionChange(option)}
                    className="form-checkbox text-blue-500"
                  />
                  <span>{option}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

FilterDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default FilterDropdown;
