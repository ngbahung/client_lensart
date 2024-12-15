import React from "react";

function Sidebar({ activeView, onViewChange }) {
  const menuItems = [
    { id: 'account', label: 'Thông tin tài khoản' },
    { id: 'address', label: 'Thông tin địa chỉ' },
    { id: 'orders', label: 'Đơn hàng của bạn' },
    { id: 'favorites', label: 'Sản phẩm yêu thích' },
    { id: 'password', label: 'Đổi mật khẩu' },
  ];

  return (
    <div className="w-80 min-w-[20rem] bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Tạ Việt Phương</h2>
      <p className="text-gray-500 mb-4">#123456789</p>
      <ul className="space-y-2 text-gray-700">
        {menuItems.map(item => (
          <li
            key={item.id}
            className={`cursor-pointer ${
              activeView === item.id ? 'text-blue-500' : 'hover:text-blue-500'
            }`}
            onClick={() => onViewChange(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <button className="mt-6 text-red-500 hover:underline">Đăng xuất</button>
    </div>
  );
}

export default Sidebar;
