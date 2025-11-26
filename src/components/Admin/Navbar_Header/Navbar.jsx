import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom'; // Import NavLink and useNavigate from react-router-dom
import { useAdminAuth } from '../../../contexts/AdminAuthContext'; // Import useAdminAuth from AdminAuthContext
import Logo from '../../Logo';
import { FaImage, FaListUl, FaCartPlus, FaBloggerB, FaUsers, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdDashboard } from "react-icons/md";
import { FaBoxArchive, FaCodeBranch } from "react-icons/fa6";
import { TbTransactionDollar } from "react-icons/tb";
import { BiSolidCoupon } from "react-icons/bi";
import { TbLogout2 } from "react-icons/tb";
import { toast } from 'react-toastify'; // Add this import

const Navbar = () => {
  const { logout } = useAdminAuth(); // Destructure logout from useAdminAuth
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({
    categories: false,
    products: false,
    orders: false,
    users: false
  });

  // Add state for active parent menu
  const [activeParentMenu, setActiveParentMenu] = useState(null);

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  // Auto-expand menu if child is active
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    
    if (path.includes('/category') || path.includes('/shape') || 
        path.includes('/materials') || path.includes('/features')) {
      setExpandedMenus(prev => ({ ...prev, categories: true }));
    }
    
    if (path.includes('/brands') || path.includes('/products') || 
        path.includes('/product-reviews')) {
      setExpandedMenus(prev => ({ ...prev, products: true }));
    }
    
    if (path.includes('orders')) {
      setExpandedMenus(prev => ({ ...prev, orders: true }));
    }
    
    if (path.includes('/customer-list') || path.includes('/manager-list')) {
      setExpandedMenus(prev => ({ ...prev, users: true }));
    }
  }, [location]);

  // Sửa lại hàm isChildActive để xử lý path chính xác hơn
  const isChildActive = (path) => {
    const currentPath = window.location.pathname.toLowerCase();
    // Xử lý đặc biệt cho product-reviews
    if (path === 'product reviews') {
      return currentPath.includes('product-reviews');
    }
    return currentPath.includes(path.toLowerCase().replace(' ', '-'));
  };

  const [activeLink, setActiveLink] = useState(null); // Lưu trạng thái link đang active

  const handleLinkClick = (linkId) => {
    setActiveLink(linkId); // Cập nhật link đang được nhấn
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Đăng xuất thành công!'); // Add success notification
      navigate('/admin'); // Navigate to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="w-[17%] bg-gradient-to-b from-white to-gray-50 h-screen fixed left-0 top-0 shadow-2xl flex flex-col border-r border-gray-200">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[rgba(85,213,210,0.1)] to-[rgba(85,213,210,0.05)]">
        <div className="flex items-center gap-2 transform hover:scale-105 transition-transform duration-200">
          <span className="text-xl text-gray-800"><Logo /></span>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
        <div className="px-4 py-3 text-xs font-bold tracking-wider text-gray-500 ml-[10px] mt-2">DASHBOARD</div>
        <nav className="px-2">
          <ul className="space-y-1">
            {/* Dashboard */}
            <li className="group">
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-3 mx-2 my-1 text-white bg-gradient-to-r from-[rgba(85,213,210,1)] to-[rgba(65,193,190,1)] rounded-lg shadow-md transform scale-[1.02] transition-all duration-200"
                    : "flex items-center px-4 py-3 mx-2 my-1 text-gray-700 hover:bg-[rgba(85,213,210,0.1)] rounded-lg hover:text-[rgba(85,213,210,1)] transition-all duration-200 hover:translate-x-1"
                }
              >
                {({ isActive }) => (
                  <>
                    <MdDashboard className={`w-5 h-5 ml-[30px] transition-all duration-200 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-[rgba(85,213,210,1)]'}`} />
                    <span className="ml-3 font-medium">Dashboard</span>
                  </>
                )}
              </NavLink>
            </li>

            {/* ECOMMERCE Section */}
            <div className="px-4 py-3 text-xs font-bold tracking-wider text-gray-500 mt-6 ml-[2px] border-t border-gray-200 pt-4">ECOMMERCE</div>

            {/* Manage Categories */}
            <li className="group">
              <button
                onClick={() => toggleMenu('categories')}
                className={`w-full flex items-center justify-between px-4 py-3 mx-2 my-1 rounded-lg transition-all duration-200 ${
                  isChildActive('/category') || isChildActive('/shape') || 
                  isChildActive('/materials') || isChildActive('/features')
                    ? 'text-white bg-gradient-to-r from-[rgba(85,213,210,1)] to-[rgba(65,193,190,1)] shadow-md'
                    : 'text-gray-700 hover:bg-[rgba(85,213,210,0.1)] hover:text-[rgba(85,213,210,1)] hover:translate-x-1'
                }`}
              >
                <div className="flex items-center">
                  <FaListUl className={`w-5 h-5 ml-[30px] transition-colors ${
                    isChildActive('/category') || isChildActive('/shape') || 
                    isChildActive('/materials') || isChildActive('/features')
                      ? 'text-white' 
                      : 'text-gray-600 group-hover:text-[rgba(85,213,210,1)]'
                  }`} />
                  <span className="ml-3 font-medium">Manage Categories</span>
                </div>
                <span className={`ml-auto pr-2 transition-transform duration-200 ${expandedMenus.categories ? 'rotate-180' : ''}`}>
                  <FaChevronDown className="text-sm" />
                </span>
              </button>
              {expandedMenus.categories && (
                <ul className="ml-[50px] mt-1 mb-2 space-y-1 animate-slideDown">
                  {['Category', 'Shape', 'Materials', 'Features'].map((item) => (
                    <li key={item} className="ml-[12px] group/item">
                      <NavLink
                        to={`/admin/${item.toLowerCase()}`}
                        className={`block px-4 py-2 rounded-md text-sm transition-all duration-150 relative ${
                          isChildActive(item.toLowerCase())
                            ? 'text-[rgba(85,213,210,1)] bg-[rgba(85,213,210,0.15)] font-medium'
                            : 'text-gray-600 hover:text-[rgba(85,213,210,1)] hover:bg-[rgba(85,213,210,0.08)] hover:translate-x-1'
                        }`}
                      >
                        <span className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-full transition-all duration-150 ${
                          isChildActive(item.toLowerCase()) 
                            ? 'bg-[rgba(85,213,210,1)]' 
                            : 'bg-transparent group-hover/item:bg-[rgba(85,213,210,0.5)]'
                        }`}></span>
                        {item}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>


            {/* Manage Products */}
            <li className="group">
              <button
                onClick={() => toggleMenu('products')}
                className={`w-full flex items-center justify-between px-4 py-3 mx-2 my-1 rounded-lg transition-all duration-200 ${
                  isChildActive('/brands') || isChildActive('/products') || 
                  isChildActive('/product-reviews')
                    ? 'text-white bg-gradient-to-r from-[rgba(85,213,210,1)] to-[rgba(65,193,190,1)] shadow-md'
                    : 'text-gray-700 hover:bg-[rgba(85,213,210,0.1)] hover:text-[rgba(85,213,210,1)] hover:translate-x-1'
                }`}
              >
                <div className="flex items-center">
                  <FaBoxArchive className={`w-5 h-5 ml-[30px] transition-colors ${
                    isChildActive('/brands') || isChildActive('/products') || 
                    isChildActive('/product-reviews')
                      ? 'text-white' 
                      : 'text-gray-600 group-hover:text-[rgba(85,213,210,1)]'
                  }`} />
                  <span className="ml-3 font-medium">Manage Products</span>
                </div>
                <span className={`ml-auto pr-2 transition-transform duration-200 ${expandedMenus.products ? 'rotate-180' : ''}`}>
                  <FaChevronDown className="text-sm" />
                </span>
              </button>
              {expandedMenus.products && (
                <ul className="ml-[50px] mt-1 mb-2 space-y-1 animate-slideDown">
                  {['Brands', 'Products', 'Product Reviews'].map((item) => (
                    <li key={item} className="ml-[12px] group/item">
                      <NavLink
                        to={`/admin/${item.toLowerCase().replace(' ', '-')}`}
                        className={`block px-4 py-2 rounded-md text-sm transition-all duration-150 relative ${
                          isChildActive(item.toLowerCase().replace(' ', '-'))
                            ? 'text-[rgba(85,213,210,1)] bg-[rgba(85,213,210,0.15)] font-medium'
                            : 'text-gray-600 hover:text-[rgba(85,213,210,1)] hover:bg-[rgba(85,213,210,0.08)] hover:translate-x-1'
                        }`}
                      >
                        <span className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-full transition-all duration-150 ${
                          isChildActive(item.toLowerCase().replace(' ', '-')) 
                            ? 'bg-[rgba(85,213,210,1)]' 
                            : 'bg-transparent group-hover/item:bg-[rgba(85,213,210,0.5)]'
                        }`}></span>
                        {item}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Orders */}
            <li className="group">
              <button
                onClick={() => toggleMenu('orders')}
                className={`w-full flex items-center justify-between px-4 py-3 mx-2 my-1 rounded-lg transition-all duration-200 ${
                  isChildActive('/all-orders') || isChildActive('/all-pending-orders') || 
                  isChildActive('/all-processed-orders') || isChildActive('/all-out-for-delivery-orders') ||
                  isChildActive('/all-delivered-orders') || isChildActive('/all-canceled-orders')
                    ? 'text-white bg-gradient-to-r from-[rgba(85,213,210,1)] to-[rgba(65,193,190,1)] shadow-md'
                    : 'text-gray-700 hover:bg-[rgba(85,213,210,0.1)] hover:text-[rgba(85,213,210,1)] hover:translate-x-1'
                }`}
              >
                <div className="flex items-center">
                  <FaCartPlus className={`w-5 h-5 ml-[30px] transition-colors ${
                    isChildActive('/all-orders') || isChildActive('/all-pending-orders') || 
                    isChildActive('/all-processed-orders') || isChildActive('/all-out-for-delivery-orders') ||
                    isChildActive('/all-delivered-orders') || isChildActive('/all-canceled-orders')
                      ? 'text-white' 
                      : 'text-gray-600 group-hover:text-[rgba(85,213,210,1)]'
                  }`} />
                  <span className="ml-3 font-medium">Orders</span>
                </div>
                <span className={`ml-auto pr-2 transition-transform duration-200 ${expandedMenus.orders ? 'rotate-180' : ''}`}>
                  <FaChevronDown className="text-sm" />
                </span>
              </button>
              {expandedMenus.orders && (
                <ul className="ml-[50px] mt-1 mb-2 space-y-1 animate-slideDown">
                  {['All Orders', 'All Pending Orders', 'All Processed Orders', 'All Out For Delivery Orders', 'All Delivered Orders', 'All Canceled Orders'].map((item) => (
                    <li key={item} className="ml-[12px] group/item">
                      <NavLink
                        to={`/admin/${item.toLowerCase().replaceAll(' ', '-')}`}
                        className={`block px-4 py-2 rounded-md text-sm transition-all duration-150 relative ${
                          isChildActive(item.toLowerCase().replaceAll(' ', '-'))
                            ? 'text-[rgba(85,213,210,1)] bg-[rgba(85,213,210,0.15)] font-medium'
                            : 'text-gray-600 hover:text-[rgba(85,213,210,1)] hover:bg-[rgba(85,213,210,0.08)] hover:translate-x-1'
                        }`}
                      >
                        <span className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-full transition-all duration-150 ${
                          isChildActive(item.toLowerCase().replaceAll(' ', '-')) 
                            ? 'bg-[rgba(85,213,210,1)]' 
                            : 'bg-transparent group-hover/item:bg-[rgba(85,213,210,0.5)]'
                        }`}></span>
                        {item}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Transactions */}
            <li className="group">
              <NavLink
                to="/admin/transactions"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-3 mx-2 my-1 text-white bg-gradient-to-r from-[rgba(85,213,210,1)] to-[rgba(65,193,190,1)] rounded-lg shadow-md transform scale-[1.02] transition-all duration-200"
                    : "flex items-center px-4 py-3 mx-2 my-1 text-gray-700 hover:bg-[rgba(85,213,210,0.1)] rounded-lg hover:text-[rgba(85,213,210,1)] transition-all duration-200 hover:translate-x-1"
                }
              >
                {({ isActive }) => (
                  <>
                    <TbTransactionDollar className={`w-5 h-5 ml-[30px] transition-all duration-200 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-[rgba(85,213,210,1)]'}`} />
                    <span className="ml-3 font-medium">Transactions</span>
                  </>
                )}
              </NavLink>
            </li>

            {/* Coupons */}
            <li className="group">
              <NavLink
                to="/admin/coupons"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-3 mx-2 my-1 text-white bg-gradient-to-r from-[rgba(85,213,210,1)] to-[rgba(65,193,190,1)] rounded-lg shadow-md transform scale-[1.02] transition-all duration-200"
                    : "flex items-center px-4 py-3 mx-2 my-1 text-gray-700 hover:bg-[rgba(85,213,210,0.1)] rounded-lg hover:text-[rgba(85,213,210,1)] transition-all duration-200 hover:translate-x-1"
                }
              >
                {({ isActive }) => (
                  <>
                    <BiSolidCoupon className={`w-5 h-5 ml-[30px] transition-all duration-200 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-[rgba(85,213,210,1)]'}`} />
                    <span className="ml-3 font-medium">Coupons</span>
                  </>
                )}
              </NavLink>
            </li>

            {/* Manage Blogs */}
            <li className="group">
              <NavLink
                to="/admin/blogs"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-3 mx-2 my-1 text-white bg-gradient-to-r from-[rgba(85,213,210,1)] to-[rgba(65,193,190,1)] rounded-lg shadow-md transform scale-[1.02] transition-all duration-200"
                    : "flex items-center px-4 py-3 mx-2 my-1 text-gray-700 hover:bg-[rgba(85,213,210,0.1)] rounded-lg hover:text-[rgba(85,213,210,1)] transition-all duration-200 hover:translate-x-1"
                }
              >
                {({ isActive }) => (
                  <>
                    <FaBloggerB className={`w-5 h-5 ml-[30px] transition-all duration-200 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-[rgba(85,213,210,1)]'}`} />
                    <span className="ml-3 font-medium">Manage Blogs</span>
                  </>
                )}
              </NavLink>
            </li>

            {/* Branches */}
            <li className="group">
              <NavLink
                to="/admin/branches"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-3 mx-2 my-1 text-white bg-gradient-to-r from-[rgba(85,213,210,1)] to-[rgba(65,193,190,1)] rounded-lg shadow-md transform scale-[1.02] transition-all duration-200"
                    : "flex items-center px-4 py-3 mx-2 my-1 text-gray-700 hover:bg-[rgba(85,213,210,0.1)] rounded-lg hover:text-[rgba(85,213,210,1)] transition-all duration-200 hover:translate-x-1"
                }
              >
                {({ isActive }) => (
                  <>
                    <FaCodeBranch className={`w-5 h-5 ml-[30px] transition-all duration-200 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-[rgba(85,213,210,1)]'}`} />
                    <span className="ml-3 font-medium">Branches</span>
                  </>
                )}
              </NavLink>
            </li>

            {/* SETTINGS Section */}
            <div className="px-4 py-3 text-xs font-bold tracking-wider text-gray-500 mt-6 ml-[2px] border-t border-gray-200 pt-4">SETTINGS</div>

            {/* Users */}
            <li className="group">
              <button
                onClick={() => toggleMenu('users')}
                className={`w-full flex items-center justify-between px-4 py-3 mx-2 my-1 rounded-lg transition-all duration-200 ${
                  isChildActive('customer-list') || isChildActive('manager-list')
                    ? 'text-white bg-gradient-to-r from-[rgba(85,213,210,1)] to-[rgba(65,193,190,1)] shadow-md'
                    : 'text-gray-700 hover:bg-[rgba(85,213,210,0.1)] hover:text-[rgba(85,213,210,1)] hover:translate-x-1'
                }`}
              >
                <div className="flex items-center">
                  <FaUsers className={`w-5 h-5 ml-[30px] transition-colors ${
                    isChildActive('customer-list') || isChildActive('manager-list')
                      ? 'text-white'
                      : 'text-gray-600 group-hover:text-[rgba(85,213,210,1)]'
                  }`} />
                  <span className="ml-3 font-medium">Users</span>
                </div>
                <span className={`ml-auto pr-2 transition-transform duration-200 ${expandedMenus.users ? 'rotate-180' : ''}`}>
                  <FaChevronDown className="text-sm" />
                </span>
              </button>
              {expandedMenus.users && (
                <ul className="ml-[50px] mt-1 mb-2 space-y-1 animate-slideDown">
                  {['Customer List', 'Manager List'].map((item) => (
                    <li key={item} className="ml-[12px] group/item">
                      <NavLink
                        to={`/admin/${item.toLowerCase().replace(' ', '-')}`}
                        className={`block px-4 py-2 rounded-md text-sm transition-all duration-150 relative ${
                          isChildActive(item.toLowerCase().replace(' ', '-'))
                            ? 'text-[rgba(85,213,210,1)] bg-[rgba(85,213,210,0.15)] font-medium'
                            : 'text-gray-600 hover:text-[rgba(85,213,210,1)] hover:bg-[rgba(85,213,210,0.08)] hover:translate-x-1'
                        }`}
                      >
                        <span className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-full transition-all duration-150 ${
                          isChildActive(item.toLowerCase().replace(' ', '-')) 
                            ? 'bg-[rgba(85,213,210,1)]' 
                            : 'bg-transparent group-hover/item:bg-[rgba(85,213,210,0.5)]'
                        }`}></span>
                        {item}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Banners */}
            <li className="group">
              <NavLink
                to="/admin/banners"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-3 mx-2 my-1 text-white bg-gradient-to-r from-[rgba(85,213,210,1)] to-[rgba(65,193,190,1)] rounded-lg shadow-md transform scale-[1.02] transition-all duration-200"
                    : "flex items-center px-4 py-3 mx-2 my-1 text-gray-700 hover:bg-[rgba(85,213,210,0.1)] rounded-lg hover:text-[rgba(85,213,210,1)] transition-all duration-200 hover:translate-x-1"
                }
              >
                {({ isActive }) => (
                  <>
                    <FaImage className={`w-5 h-5 ml-[30px] transition-all duration-200 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-[rgba(85,213,210,1)]'}`} />
                    <span className="ml-3 font-medium">Banners</span>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Logout Section */}
      <div className="border-t border-gray-200 p-4 bg-gradient-to-t from-gray-100 to-transparent">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 mx-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:translate-x-1 group border border-transparent hover:border-red-200 shadow-sm hover:shadow-md"
        >
          <TbLogout2 className="w-5 h-5 ml-[30px] transition-transform group-hover:scale-110" />
          <span className="ml-3 font-medium">Logout</span>
        </button>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        
        /* Custom scrollbar styles */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
