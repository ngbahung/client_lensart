import React, { memo, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// Cấu trúc dữ liệu cho các danh mục bộ lọc
// Mỗi danh mục có title (tiêu đề) và options (các lựa chọn)
const FILTER_CATEGORIES = {
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
    options: ["0-500000", "500000-1000000", "1000000-2000000", "2000000-5000000"]
  },
  brands: {
    title: "Thương hiệu",
    options: ["Ray-Ban", "Oakley", "Gucci", "Prada", "Versace"]
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

  // Add search functionality for brands
  const [searchTerm, setSearchTerm] = useState('');
  const shouldShowSearch = type === 'brands' && Array.isArray(options) && options.length > 8;

  const filteredOptions = shouldShowSearch 
    ? options.filter(opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;

  const getOptionKey = (option, index) => {
    if (typeof option === 'object' && option.value) {
      return `${type}-${option.value}`;
    }
    return `${type}-${option}-${index}`;
  };

  const renderOption = (option) => {
    if (typeof option === 'object' && option.label) {
      return option.label;
    }
    if (type === 'priceRange') {
      return formatPrice(option);
    }
    if (type === 'features') {
      return option.label || option;
    }
    return option;
  };

  const getValue = (option) => {
    if (typeof option === 'object' && option.value) {
      return option.value;
    }
    if (type === 'features') {
      return option.id?.toString() || option;
    }
    return option;
  };

  const shouldShowScroll = (type === 'brands' || type === 'features') && 
    Array.isArray(options) && options.length > 8;

  return (
    <div className="border-b border-gray-100 last:border-none py-2">
      <div 
        className={`flex justify-between items-center cursor-pointer py-3 px-4 rounded-lg transition-all duration-200 
          ${hasActiveFilters ? 'bg-teal-50/50' : 'hover:bg-gray-50'}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className={`font-medium text-base flex items-center gap-2
          ${hasActiveFilters ? 'text-teal-700' : 'text-gray-700'}`}>
          {title}
          {hasActiveFilters && (
            <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
              {selectedFilters[type].length}
            </span>
          )}
        </h3>
        {isExpanded 
          ? <IoIosArrowUp className={`w-5 h-5 ${hasActiveFilters ? 'text-teal-600' : 'text-gray-400'}`} /> 
          : <IoIosArrowDown className={`w-5 h-5 ${hasActiveFilters ? 'text-teal-600' : 'text-gray-400'}`} />
        }
      </div>
      
      <div className={`transition-all duration-300 ease-in-out overflow-hidden
        ${isExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="space-y-1 px-4 py-2">
          {shouldShowSearch && (
            <div className="mb-2">
              <input
                type="text"
                placeholder="Tìm thương hiệu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          )}
          <div className={shouldShowSearch ? 'max-h-[300px] overflow-y-auto' : ''}>
            {filteredOptions.map((option, index) => {
              const value = option.value || option;
              const label = option.label || option;
              return (
                <div 
                  key={`${type}-${value}-${index}`}
                  className={`flex items-center p-2 rounded-md transition-colors
                    ${selectedFilters[type]?.includes(value) 
                      ? 'bg-teal-50 hover:bg-teal-100/70' 
                      : 'hover:bg-gray-50'}`}
                >
                  <input
                    type="checkbox"
                    name={type}
                    value={value}
                    checked={selectedFilters[type]?.includes(value) || false}
                    onChange={() => onFilterChange(type, value)}
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded 
                      focus:ring-teal-500 focus:ring-offset-0 transition-colors cursor-pointer"
                  />
                  <label className="ml-3 text-sm text-gray-600 hover:text-gray-900 
                    cursor-pointer select-none flex-1 font-medium">
                    {label}
                  </label>
                </div>
              );
            })}
          </div>
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="divide-y divide-gray-100">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Bộ lọc tìm kiếm</h2>
        </div>
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
