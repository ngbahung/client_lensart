import React, { memo } from "react";

const FILTER_CATEGORIES = {
  style: {
    title: "Kiểu Gọng",
    options: ["Đa giác", "Vuông", "Chữ nhật", "Browline", "Oval", "Phi công"]
  },
  material: {
    title: "Chất liệu",
    options: ["Kim loại", "Nhựa", "Gỗ", "Titanium"]
  },
  gender: {
    title: "Giới tính",
    options: ["Nam", "Nữ", "Unisex"]
  },
  priceRange: {
    title: "Khoảng giá",
    options: ["0-500000", "500000-1000000", "1000000-2000000", "2000000-5000000"]
  }
};

const formatPrice = (range) => {
  const [min, max] = range.split('-');
  return `${parseInt(min).toLocaleString()}đ - ${parseInt(max).toLocaleString()}đ`;
};

const FilterSection = memo(({ title, options, type, onFilterChange }) => (
  <div className="mb-6">
    <h3 className="font-semibold mb-3 text-gray-700">{title}</h3>
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option} className="flex items-center">
          <input
            type="checkbox"
            name={type}
            value={option}
            onChange={() => onFilterChange(type, option)}
            className="w-4 h-4 text-teal-300 rounded focus:ring-teal-500"
          />
          <label className="ml-2 text-gray-600 hover:text-gray-800">
            {type === 'priceRange' ? formatPrice(option) : option}
          </label>
        </div>
      ))}
    </div>
  </div>
));

const SideBar = memo(({ onFilterChange }) => (
  <div className="p-4 bg-white rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-6 text-gray-800">Bộ lọc sản phẩm</h2>
    {Object.entries(FILTER_CATEGORIES).map(([type, { title, options }]) => (
      <FilterSection
        key={type}
        type={type}
        title={title}
        options={options}
        onFilterChange={onFilterChange}
      />
    ))}
  </div>
));

export default SideBar;
