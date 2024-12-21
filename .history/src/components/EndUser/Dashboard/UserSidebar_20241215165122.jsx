import React from "react";

function Sidebar() {
  return (
    <div className="w-1/4 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Tạ Việt Phương</h2>
      <p className="text-gray-500 mb-4">#123456789</p>
      <ul className="space-y-2 text-gray-700">
        <li className="hover:text-blue-500 cursor-pointer">Thông tin tài khoản</li>
        <li className="hover:text-blue-500 cursor-pointer">Thông tin địa chỉ</li>
        <li className="hover:text-blue-500 cursor-pointer">Đơn hàng của bạn</li>
        <li className="hover:text-blue-500 cursor-pointer">Sản phẩm yêu thích</li>
        <li className="hover:text-blue-500 cursor-pointer">Đổi mật khẩu</li>
      </ul>
      <button className="mt-6 text-red-500 hover:underline">Đăng xuất</button>
    </div>
  );
}

export default Sidebar;
