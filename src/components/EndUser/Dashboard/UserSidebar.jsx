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
    <div className="w-80 h-full bg-white p-6 rounded-2xl shadow-lg overflow-y-auto max-h-[calc(100vh-4rem)] md:max-h-none border border-gray-100">
      {/* User Info Section with gradient */}
      <div className="relative mb-6 p-4 rounded-xl overflow-hidden bg-gradient-to-br from-[#6fd4d2] to-[#55d5d2] shadow-md">
        <div className="relative z-10 flex items-center space-x-4">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center ring-2 ring-white/50">
            <span className="text-white font-bold text-xl">
              {userData?.firstname?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base md:text-lg font-bold text-white truncate">
              {userData?.firstname} {userData?.lastname}
            </h2>
            <p className="text-xs text-white/80 flex items-center mt-1">
              <span className="bg-white/20 px-2 py-0.5 rounded-full">ID: {userData?.id}</span>
            </p>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full"></div>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        {menuItems.map(item => (
          <li key={item.id} className="list-none">
            <button
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden
                ${activeView === item.id 
                  ? 'bg-gradient-to-r from-[#6fd4d2] to-[#55d5d2] text-white shadow-md transform scale-[1.02]' 
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100'
                }
              `}
            >
              {activeView === item.id && (
                <div className="absolute inset-0 bg-white/20"></div>
              )}
              <item.icon className={`w-5 h-5 flex-shrink-0 relative z-10 transition-transform group-hover:scale-110 ${
                activeView === item.id ? 'text-white' : 'text-[#6fd4d2]'
              }`} />
              <span className="truncate font-medium relative z-10">{item.label}</span>
              {activeView === item.id && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full relative z-10"></div>
              )}
            </button>
          </li>
        ))}
      </nav>

      {/* Divider */}
      <div className="my-6 border-t border-gray-200"></div>

      {/* Logout Button */}
      <button 
        onClick={handleLogout}
        className="flex items-center space-x-3 text-[#F5A97F] hover:text-[#ec905c] px-4 py-3.5 w-full rounded-xl hover:bg-orange-50 transition-all duration-200 font-medium group"
      >
        <FiLogOut className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
        <span>Đăng xuất</span>
      </button>
    </div>
  );
}

export default Sidebar;
