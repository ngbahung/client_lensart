import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaSearch, FaEnvelope, FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const Header = () => {
  const [dateTime, setDateTime] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileMenuRef = useRef(null);
  const notificationRef = useRef(null);

  const updateDateTime = () => {
    const now = new Date();
    const daysOfWeek = [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
    ];

    const formattedDateTime = `${now
      .toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
      .replace(":", ":")}, ${daysOfWeek[now.getDay()]}, ${now
      .toLocaleDateString("vi-VN")
      .replaceAll("/", "/")}`;

    setDateTime(formattedDateTime);
  };

  useEffect(() => {
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mock notifications data
  const notifications = [
    { id: 1, message: "New order received", time: "5 minutes ago", unread: true },
    { id: 2, message: "Product review posted", time: "1 hour ago", unread: true },
    { id: 3, message: "Low stock alert", time: "2 hours ago", unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="h-16 bg-gradient-to-r from-[rgba(85,213,210,1)] to-[rgba(65,193,190,1)] flex items-center justify-between px-6 fixed w-[83%] z-10 shadow-lg">
      {/* Left Section - Date & Time with enhanced styling */}
      <div className="flex items-center space-x-4">
        <div className="text-white text-[15px] font-medium bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20 shadow-sm">
          <span className="font-semibold">🕐</span> {dateTime}
        </div>
      </div>

      {/* Right Section - Search, Notifications & Profile */}
      <div className="flex items-center space-x-3">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="bg-white/20 backdrop-blur-sm text-white placeholder-white/70 px-4 py-2 pl-10 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all duration-200 w-64"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 text-sm" />
        </div>

        {/* Messages Icon */}
        <button className="relative p-2 hover:bg-white/20 rounded-lg transition-all duration-200 group">
          <FaEnvelope className="text-white text-xl" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center group-hover:scale-110 transition-transform">
            3
          </span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-white/20 rounded-lg transition-all duration-200 group"
          >
            <FaBell className="text-white text-xl" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse group-hover:scale-110 transition-transform">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Menu */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden animate-slideDown z-50">
              <div className="bg-gradient-to-r from-[rgba(85,213,210,1)] to-[rgba(65,193,190,1)] px-4 py-3">
                <h3 className="text-white font-semibold text-sm">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b last:border-b-0 ${
                      notif.unread ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 font-medium">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                      </div>
                      {notif.unread && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 ml-2"></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 bg-gray-50 text-center">
                <button className="text-sm text-[rgba(85,213,210,1)] hover:underline font-medium">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-white/30"></div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-3 hover:bg-white/20 px-3 py-2 rounded-lg transition-all duration-200 group"
          >
            <img
              src="https://cdn.tuoitre.vn/zoom/700_525/471584752817336320/2024/8/1/loopy-02-1722510337621638910331-72-0-596-1000-crop-1722510365891115014227.jpg"
              alt="Admin Avatar"
              className="rounded-full w-10 h-10 object-cover border-2 border-white/40 shadow-md group-hover:border-white transition-all"
            />
            <div className="text-left hidden lg:block">
              <div className="text-white text-sm font-semibold">Admin</div>
              <div className="text-white/80 text-xs">Administrator</div>
            </div>
            <MdKeyboardArrowDown
              className={`text-white text-xl transition-transform duration-200 ${
                showProfileMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden animate-slideDown z-50">
              <div className="px-4 py-3 bg-gradient-to-r from-[rgba(85,213,210,1)] to-[rgba(65,193,190,1)]">
                <p className="text-white font-semibold text-sm">Admin Panel</p>
                <p className="text-white/80 text-xs">admin@lensart.com</p>
              </div>
              <div className="py-2">
                <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-3">
                  <FaUser className="text-gray-500" />
                  <span className="text-sm">My Profile</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-3">
                  <FaCog className="text-gray-500" />
                  <span className="text-sm">Settings</span>
                </button>
                <div className="border-t my-2"></div>
                <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-3">
                  <FaSignOutAlt className="text-red-600" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Header;
