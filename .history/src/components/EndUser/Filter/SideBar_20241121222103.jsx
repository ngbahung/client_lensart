// components/Sidebar.jsx
import React from "react";

const SideBar = ({ onFilterChange }) => {
    const filterOptions = {
        style: ["Đa giác", "Vuông", "Chữ nhật", "Browline", "Oval", "Phi công"],
        material: ["Kim loại", "Nhựa", "Gỗ", "Titanium"],
        gender: ["Nam", "Nữ", "Unisex"],
        priceRange: ["0-500000", "500000-1000000", "1000000-2000000", "2000000-5000000"]
    };

    const formatPrice = (range) => {
        const [min, max] = range.split('-');
        return `${parseInt(min).toLocaleString()}đ - ${parseInt(max).toLocaleString()}đ`;
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Bộ lọc sản phẩm</h2>
            
            {/* Style Filter */}
            <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-700">Kiểu Gọng</h3>
                <div className="space-y-2">
                    {filterOptions.style.map((type) => (
                        <div key={type} className="flex items-center">
                            <input
                                type="checkbox"
                                name="style"
                                value={type}
                                onChange={(e) => onFilterChange("style", type)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <label className="ml-2 text-gray-600 hover:text-gray-800">{type}</label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Material Filter */}
            <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-700">Chất liệu</h3>
                <div className="space-y-2">
                    {filterOptions.material.map((material) => (
                        <div key={material} className="flex items-center">
                            <input
                                type="checkbox"
                                name="material"
                                value={material}
                                onChange={(e) => onFilterChange("material", material)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <label className="ml-2 text-gray-600 hover:text-gray-800">{material}</label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Gender Filter */}
            <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-700">Giới tính</h3>
                <div className="space-y-2">
                    {filterOptions.gender.map((gender) => (
                        <div key={gender} className="flex items-center">
                            <input
                                type="checkbox"
                                name="gender"
                                value={gender}
                                onChange={(e) => onFilterChange("gender", gender)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <label className="ml-2 text-gray-600 hover:text-gray-800">{gender}</label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-700">Khoảng giá</h3>
                <div className="space-y-2">
                    {filterOptions.priceRange.map((range) => (
                        <div key={range} className="flex items-center">
                            <input
                                type="checkbox"
                                name="priceRange"
                                value={range}
                                onChange={(e) => onFilterChange("priceRange", range)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <label className="ml-2 text-gray-600 hover:text-gray-800">
                                {formatPrice(range)}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
