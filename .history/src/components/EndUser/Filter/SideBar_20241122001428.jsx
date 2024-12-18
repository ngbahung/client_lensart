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
  }
};

// Hàm định dạng giá từ dạng "min-max" sang dạng "xxxđ - xxxđ"
// Input: "0-500000" -> Output: "0đ - 500.000đ"
const formatPrice = (range) => {
  const [min, max] = range.split('-');
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
  // Quản lý trạng thái đóng/mở của section trên mobile
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border-b pb-2 lg:mb-6 lg:border-b-0 lg:pb-0">
      <div 
        className="flex justify-between items-center cursor-pointer lg:cursor-default"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold mb-2 text-gray-700">{title}</h3>
        <div className="lg:hidden">
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      <div className={`space-y-2 ${isOpen ? 'block' : 'hidden'} lg:block`}>
        {options.map((option) => (
          <div key={option} className="flex items-center">
            <input
              type="checkbox"
              name={type}
              value={option}
              checked={selectedFilters[type]?.includes(option) || false}
              onChange={() => onFilterChange(type, option)}
              className="w-4 h-4 text-teal-300 rounded focus:ring-teal-500"
            />
            <label className="ml-2 text-sm lg:text-base text-gray-600 hover:text-gray-800">
              {type === 'priceRange' ? formatPrice(option) : option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
});

// Component SideBar: Component chính quản lý toàn bộ bộ lọc
// Props:
// - onFilterChange: Callback khi có thay đổi bộ lọc
// - selectedFilters: Object chứa trạng thái các bộ lọc đã chọn
// - filterOptions: Cấu hình tùy chọn cho bộ l���c (mặc định: FILTER_CATEGORIES)
const SideBar = memo(({ onFilterChange, selectedFilters, filterOptions = FILTER_CATEGORIES }) => {
  // Quản lý trạng thái đóng/mở của sidebar trên mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div 
        className="p-4 flex justify-between items-center lg:hidden cursor-pointer"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <h2 className="text-lg font-bold text-gray-800">Bộ lọc sản phẩm</h2>
        {isSidebarOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block p-4`}>
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