import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';




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