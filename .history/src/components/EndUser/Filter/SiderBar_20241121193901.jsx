// components/Sidebar.jsx
import React from "react";

const Sidebar = ({ onFilterChange }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="w-1/4 p-4">
      <h2 className="font-bold mb-4">Lọc Theo</h2>
      <div>
        <h3 className="font-medium">Kiểu Gọng</h3>
        {["Đa giác", "Vuông", "Chữ nhật", "Browline", "Oval", "Phi công"].map((type) => (
          <div key={type}>
            <input type="checkbox" name="style" value={type} onChange={handleFilterChange} />
            <label className="ml-2">{type}</label>
          </div>
        ))}
      </div>
      {/* Add more filter sections (Gender, Material, Price Range) */}
    </div>
  );
};

export default Sidebar;
