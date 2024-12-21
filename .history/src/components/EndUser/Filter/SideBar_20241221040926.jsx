import React, { memo, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// Cấu trúc dữ liệu cho các danh mục bộ lọc
// Mỗi danh mục có title (tiêu đề) và options (các lựa chọn)
const FILTER_CATEGORIES = {
  shapes: {
    title: "Hình Dạng",
    options: []
  },
  brands: {
    title: "Thương hiệu",
    options: []
  },
  style: {
    title: "Kiểu Gọng",
    options: ["Đa giác", "Vuông", "Chữ nhật", "Browline", "Oval", "Phi công"]
  },
  material: {
    title: "Chất liệu",
    options: ["Kim loại", "Nhựa", "Titanium"]
  },
  gender: {
    title: "Giới tính",
    options: ["Nam", "Nữ", "Unisex"]
  },
  priceRange: {
    title: "Khoảng giá",
    options: ["0-500000", "500000-1000000", "1000000-2000000", "2000000-999999999"]
  }
};

// Hàm định dạng giá từ dạng "min-max" sang dạng "xxxđ - xxxđ"
// Input: "0-500000" -> Output: "0đ - 500.000đ"
const formatPrice = (range) => {
  const [min, max] = range.split('-').map(Number);
  if (max === 999999999) {
    return `Trên ${parseInt(min).toLocaleString()}đ`;
  }
  return `${parseInt(min).toLocaleString()}đ - ${parseInt(max).toLocaleString()}đ`;
};

// Component FilterSection: Hiển thị một phần của bộ lọc
// Props:
// - title: Tiêu đề của phần bộ lọc
// - options: Mảng các tùy chọn
// - type: Loại bộ lọc (style, material, gender, priceRange)
// - onFilterChange: Callback khi người dùng thay đổi lựa chọn
// - selectedFilters: Trạng thái hiện tại của các bộ lọc
const FilterSection = memo(({ title, options, type, onFilterChange, selectedFilters }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasActiveFilters = selectedFilters[type]?.length > 0;

  const renderOption = (option) => {
    if (type === 'priceRange') {
      return formatPrice(option);
    }
    if (type === 'brands') {
      return option.label;
    }
    return option;
  };

  const getValue = (option) => {
    if (type === 'brands') {
      return option.value;
    }
    return option;
  };

  return (
    <div className="border-b border-gray-100 last:border-none">
      <div 
        className="flex justify-between items-center cursor-pointer py-3 hover:bg-gray-50 px-2 rounded-lg transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className={`font-medium ${hasActiveFilters ? 'text-teal-600' : 'text-gray-700'}`}>
          {title}
          {hasActiveFilters && (
            <span className="ml-2 text-sm bg-teal-100 text-teal-600 px-2 py-0.5 rounded-full">
              {selectedFilters[type].length}
            </span>
          )}
        </h3>
        {isExpanded ? <IoIosArrowUp className="text-gray-500" /> : <IoIosArrowDown className="text-gray-500" />}
      </div>
      
      <div className={`transition-all duration-300 overflow-hidden ${
        isExpanded ? 'max-h-96 pb-3' : 'max-h-0'
      }`}>
        <div className="space-y-2 px-2">
          {options.map((option) => (
            <div key={getValue(option)} 
                 className="flex items-center hover:bg-gray-50 p-1.5 rounded-md transition-colors">
              <input
                type="checkbox"
                name={type}
                value={getValue(option)}
                checked={selectedFilters[type]?.includes(getValue(option)) || false}
                onChange={() => onFilterChange(type, getValue(option))}
                className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-400 focus:ring-offset-0"
              />
              <label className="ml-2.5 text-sm text-gray-600 hover:text-gray-900 cursor-pointer select-none flex-1">
                {renderOption(option)}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// Component SideBar: Component chính quản lý toàn bộ bộ lọc
// Props:
// - onFilterChange: Callback khi có thay đổi bộ lọc
// - selectedFilters: Object chứa trạng thái các bộ lọc đã chọn
// - filterOptions: Cấu hình tùy chọn cho bộ lọc (mặc định: FILTER_CATEGORIES)
const SideBar = memo(({ onFilterChange, selectedFilters, filterOptions = FILTER_CATEGORIES }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="divide-y divide-gray-100">
        {Object.entries(filterOptions).map(([type, { title, options }]) => (
          <FilterSection
            key={type}
            type={type}
            title={title}
            options={options}
            onFilterChange={onFilterChange}
            selectedFilters={selectedFilters}
          />
        ))}
      </div>
    </div>
  );
});

export default SideBar;
