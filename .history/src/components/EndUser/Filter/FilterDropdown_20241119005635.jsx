import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    "Đa giác",
    "Vuông",
    "Chữ nhật",
    "Browline",
    "Oval",
    "Phi công",
  ];

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option) // Remove if already selected
        : [...prev, option] // Add to selection
    );
  };

  return (
    <div className="relative w-64">
      <button
        onClick={toggleDropdown}
        className="flex justify-between items-center w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none"
      >
        <span>Kiểu gọng</span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <ul className="max-h-48 overflow-y-auto">
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

export default FilterDropdown;
