import React from "react";
import { toast } from 'react-toastify';
import { FiUser, FiMapPin, FiShoppingBag, FiHeart, FiLock, FiLogOut } from 'react-icons/fi';

function Sidebar({ activeView, onViewChange, userData, onLogout }) {
  const menuItems = [
    { id: 'account', label: 'Thông tin tài khoản', icon: FiUser },
    { id: 'address', label: 'Thông tin địa chỉ', icon: FiMapPin },
    { id: 'orders', label: 'Đơn hàng của bạn', icon: FiShoppingBag },
    { id: 'favorites', label: 'Sản phẩm yêu thích', icon: FiHeart },
    { id: 'password', label: 'Đổi mật khẩu', icon: FiLock },
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
    <div className="w-80 min-w-[20rem] bg-white p-6 rounded-lg shadow-md md:static">
      {/* User Info Section */}
      <div className="flex items-center space-x-4 mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
          {userData?.firstname?.[0]?.toUpperCase() || 'U'}
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            {userData?.firstname} {userData?.lastname}
          </h2>
          <p className="text-sm text-gray-500">#{userData?.id}</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-150
                  ${activeView === item.id 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <item.icon className={`w-5 h-5 ${
                  activeView === item.id ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <button 
        onClick={handleLogout}
        className="flex items-center space-x-3 text-red-500 hover:text-red-600 mt-8 px-4 py-3 w-full rounded-lg hover:bg-red-50 transition-colors duration-150"
      >
        <FiLogOut className="w-5 h-5" />
        <span>Đăng xuất</span>
      </button>
    </div>
  );
}

export default Sidebar;
