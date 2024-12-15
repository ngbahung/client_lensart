import React from "react";
import { toast } from 'react-toastify';

function Sidebar({ activeView, onViewChange, userData, onLogout }) {
  const menuItems = [
    { id: 'account', label: 'Thông tin tài khoản' },
    { id: 'address', label: 'Thông tin địa chỉ' },
    { id: 'orders', label: 'Đơn hàng của bạn' },
    { id: 'favorites', label: 'Sản phẩm yêu thích' },
    { id: 'password', label: 'Đổi mật khẩu' },
  ];

  const handleLogout = async () => {
    try {
      await onLogout();
      toast.success('Đăng xuất thành công');
    } catch (error) {
      toast.error('Đăng xuất thất bại');
    }
  };

  return (
    <div className="w-full md:w-80 md:min-w-[20rem] bg-white p-4 md:p-6 rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-1">
            {userData?.firstname} {userData?.lastname}
          </h2>
          <p className="text-sm text-gray-500">#{userData?.id}</p>
        </div>
      </div>
      <ul className="space-y-2 text-gray-700">
        {menuItems.map(item => (
          <li
            key={item.id}
            className={`p-2 rounded-md transition-colors ${
              activeView === item.id 
                ? 'bg-blue-50 text-blue-500' 
                : 'hover:bg-gray-50 hover:text-blue-500'
            }`}
            onClick={() => onViewChange(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <button 
        onClick={handleLogout}
        className="mt-6 w-full p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
      >
        Đăng xuất
      </button>
    </div>
  );
}

export default Sidebar;
