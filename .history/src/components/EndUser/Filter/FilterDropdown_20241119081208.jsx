import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FilterSection = ({ title, children, isOpen: defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-3 px-4 text-left"
      >
        <span className="font-medium">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );
};

const CheckboxGroup = ({ options }) => {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">{option}</span>
        </label>
      ))}
    </div>
  );
};

const FilterSidebar = () => {
  const frameStyles = [
    'Đa giác',
    'Vuông',
    'Chữ nhật',
    'Browline',
    'Oval',
    'Phi công'
  ];

  const gender = [
    'Unisex',
    'Nam',
    'Nữ'
  ];

  const materials = [
    'Tổng hợp',
    'Acetate',
    'Titanium',
    'Kim loại',
    'Nhựa',
    'TR90'
  ];

  const priceRanges = [
    'Dưới 500.000đ',
    '500.000đ - 1.500.000đ',
    '1.500.000đ - 3.000.000đ',
    '3.000.000đ - 5.000.000đ',
    'Trên 5.000.000đ'
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">LỌC THEO</h2>
      </div>
      
      <FilterSection title="Kiểu gọng">
        <CheckboxGroup options={frameStyles} />
      </FilterSection>

      <FilterSection title="Giới tính">
        <CheckboxGroup options={gender} />
      </FilterSection>

      <FilterSection title="Chất liệu">
        <CheckboxGroup options={materials} />
      </FilterSection>

      <FilterSection title="Theo giá">
        <CheckboxGroup options={priceRanges} />
      </FilterSection>
    </div>
  );
};

export default FilterSidebar;