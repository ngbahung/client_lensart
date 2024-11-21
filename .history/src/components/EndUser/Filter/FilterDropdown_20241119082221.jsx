import React, { useState, useCallback } from 'react';
import { FilterSection } from './FilterSection';
import { CheckboxGroup } from './CheckboxGroup';

const FILTER_CONFIG = {
  frameStyles: {
    title: 'Kiểu gọng',
    options: ['Đa giác', 'Vuông', 'Chữ nhật', 'Browline', 'Oval', 'Phi công']
  },
  gender: {
    title: 'Giới tính',
    options: ['Unisex', 'Nam', 'Nữ']
  },
  materials: {
    title: 'Chất liệu',
    options: ['Tổng hợp', 'Acetate', 'Titanium', 'Kim loại', 'Nhựa', 'TR90']
  },
  priceRanges: {
    title: 'Theo giá',
    options: ['Dưới 500.000đ', '500.000đ - 1.500.000đ', '1.500.000đ - 3.000.000đ', 
              '3.000.000đ - 5.000.000đ', 'Trên 5.000.000đ']
  }
};

const FilterSidebar = () => {
  const [filters, setFilters] = useState({
    frameStyles: [],
    gender: [],
    materials: [],
    priceRanges: []
  });

  const handleFilterChange = useCallback((filterType, value) => {
    setFilters(prev => {
      const currentValues = prev[filterType];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      return { ...prev, [filterType]: newValues };
    });
  }, []);

  return (
    <div className="w-72 bg-transparent">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">LỌC THEO</h2>
      </div>
      
      {Object.entries(FILTER_CONFIG).map(([key, { title, options }]) => (
        <FilterSection key={key} title={title}>
          <CheckboxGroup
            options={options}
            selectedValues={filters[key]}
            onChange={(value) => handleFilterChange(key, value)}
          />
        </FilterSection>
      ))}
    </div>
  );
};

export default FilterSidebar;