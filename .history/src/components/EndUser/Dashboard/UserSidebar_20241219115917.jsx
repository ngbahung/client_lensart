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
    <div className="w-80 h-full bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-[calc(100vh-4rem)] md:max-h-none">
      {/* User Info Section - made more compact on mobile */}
      <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-50 rounded-lg">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#6fd4d2] rounded-full flex items-center justify-center text-white font-semibold text-lg">
          {userData?.firstname?.[0]?.toUpperCase() || 'U'}
        </div>
        <div className="min-w-0">
          <h2 className="text-base md:text-lg font-semibold truncate">
            {userData?.firstname} {userData?.lastname}
          </h2>
          <p className="text-xs md:text-sm text-gray-500">#{userData?.id}</p>
        </div>
      </div>

      {/* Navigation Menu - improved touch targets */}
      <nav className="space-y-1">
        {menuItems.map(item => (
          <li key={item.id} className="list-none">
            <button
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-4 md:py-3 rounded-lg transition-colors duration-150
                ${activeView === item.id 
                  ? 'bg-blue-50 text-[#6fd4d2]' 
                  : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                }
                touch-manipulation
              `}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${
                activeView === item.id ? 'text-[' : 'text-gray-400'
              }`} />
              <span className="truncate">{item.label}</span>
            </button>
          </li>
        ))}
      </nav>

      {/* Logout Button - improved touch target */}
      <button 
        onClick={handleLogout}
        className="flex items-center space-x-3 text-red-500 hover:text-red-600 
          active:text-red-700 mt-6 px-4 py-4 md:py-3 w-full rounded-lg 
          hover:bg-red-50 active:bg-red-100 transition-colors duration-150
          touch-manipulation"
      >
        <FiLogOut className="w-5 h-5 flex-shrink-0" />
        <span>Đăng xuất</span>
      </button>
    </div>
  );
}

export default Sidebar;
