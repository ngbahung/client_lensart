import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import NavLink and useNavigate from react-router-dom
import { useAdminAuth } from '../../../contexts/AdminAuthContext'; // Import useAdminAuth from AdminAuthContext
import Logo from '../../Logo';
import { FaImage, FaListUl, FaCartPlus, FaBloggerB, FaUsers, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdDashboard } from "react-icons/md";
import { FaBoxArchive, FaCodeBranch } from "react-icons/fa6";
import { TbTransactionDollar } from "react-icons/tb";
import { BiSolidCoupon } from "react-icons/bi";
import { TbLogout2 } from "react-icons/tb";

const Navbar = () => {
  const { logout } = useAdminAuth(); // Destructure logout from useAdminAuth
  const navigate = useNavigate(); // Initialize useNavigate
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
      navigate('/admin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="w-[17%] bg-white h-screen fixed left-0 top-0 shadow-lg flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <span className="text-xl text-gray-800"><Logo /></span>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2 text-xs text-gray-400 ml-[10px]">DASHBOARD</div>
        <nav className="px-2">
          <ul className="space-y-1">
            {/* Dashboard */}
            <li className="hover:bg-gray-100 rounded-lg">
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-3 text-[rgba(85,213,210,1)]" // Khi active, áp dụng màu này
                    : "flex items-center px-4 py-3 text-black-700 hover:text-[rgba(85,213,210,1)]"
                }
              >
                <MdDashboard className="w-5 h-5 text-black-500 ml-[30px]" />
                <span className="ml-3">Dashboard</span>
              </NavLink>
            </li>

            {/* ECOMMERCE Section */}
            <div className="px-4 py-2 text-xs text-gray-400 mt-4 ml-[2px]">ECOMMERCE</div>

            {/* Manage Categories */}
            <li className="hover:bg-gray-100 rounded-lg">
              <button
                onClick={() => toggleMenu('categories')}
                className={`w-full flex items-center justify-between px-4 py-3 ${
                  isChildActive('/category') || isChildActive('/shape') || 
                  isChildActive('/materials') || isChildActive('/features')
                    ? 'text-[rgba(85,213,210,1)]'
                    : 'text-black-700 hover:text-[rgba(85,213,210,1)]'
                }`}
              >
                <div className="flex items-center">
                  <FaListUl className={`w-5 h-5 ml-[30px] ${
                    isChildActive('/category') ? 'text-[rgba(85,213,210,1)]' : 'text-black-500'
                  }`} />
                  <span className="ml-3">Manage Categories</span>
                </div>
                <span className="ml-auto pr-2">
                  {expandedMenus.categories ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              {expandedMenus.categories && (
                <ul className="ml-[50px] mt-2 space-y-1">
                  {['Category', 'Shape', 'Materials', 'Features'].map((item) => (
                    <li key={item} className="hover:bg-gray-100 rounded-lg ml-[12px]">
                      <NavLink
                        to={`/admin/${item.toLowerCase()}`}
                        className={`block px-4 py-2 ${
                          isChildActive(item.toLowerCase())
                            ? 'text-[rgba(85,213,210,1)]'
                            : 'text-black-700 hover:text-[rgba(85,213,210,1)]'
                        }`}
                      >
                        {item}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>


            {/* Manage Products */}
            <li className="hover:bg-gray-100 rounded-lg">
              <button
                onClick={() => toggleMenu('products')}
                className={`w-full flex items-center justify-between px-4 py-3 ${
                  isChildActive('/brands') || isChildActive('/products') || 
                  isChildActive('/product-reviews')
                    ? 'text-[rgba(85,213,210,1)]'
                    : 'text-black-700 hover:text-[rgba(85,213,210,1)]'
                }`}
              >
                <div className="flex items-center">
                  <FaBoxArchive className={`w-5 h-5 ml-[30px] ${
                    isChildActive('/brands') ? 'text-[rgba(85,213,210,1)]' : 'text-black-500'
                  }`} />
                  <span className="ml-3">Manage Products</span>
                </div>
                <span className="ml-auto pr-2">
                  {expandedMenus.products ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              {expandedMenus.products && (
                <ul className="ml-[50px] mt-2 space-y-1">
                  {['Brands', 'Products', 'Product Reviews'].map((item) => (
                    <li key={item} className="hover:bg-gray-100 rounded-lg ml-[12px]">
                      <NavLink
                        to={`/admin/${item.toLowerCase().replace(' ', '-')}`}
                        className={`block px-4 py-2 ${
                          isChildActive(item)
                            ? 'text-[rgba(85,213,210,1)]'
                            : 'text-black-700 hover:text-[rgba(85,213,210,1)]'
                        }`}
                      >
                        {item}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Orders */}
            <li className="hover:bg-gray-100 rounded-lg">
              <button
                onClick={() => toggleMenu('orders')}
                className={`w-full flex items-center justify-between px-4 py-3 ${
                  isChildActive('/all-orders') || isChildActive('/all-pending-orders') || 
                  isChildActive('/all-processed-orders') || isChildActive('/all-out-for-delivery-orders') ||
                  isChildActive('/all-delivered-orders') || isChildActive('/all-canceled-orders')
                    ? 'text-[rgba(85,213,210,1)]'
                    : 'text-black-700 hover:text-[rgba(85,213,210,1)]'
                }`}
              >
                <div className="flex items-center">
                  <FaCartPlus className={`w-5 h-5 ml-[30px] ${
                    isChildActive('/all-orders') ? 'text-[rgba(85,213,210,1)]' : 'text-black-500'
                  }`} />
                  <span className="ml-3">Orders</span>
                </div>
                <span className="ml-auto pr-2">
                  {expandedMenus.orders ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              {expandedMenus.orders && (
                <ul className="ml-[50px] mt-2 space-y-1">
                  {['All Orders', 'All Pending Orders', 'All Processed Orders', 'All Out For Delivery Orders', 'All Delivered Orders', 'All Canceled Orders'].map((item) => (
                    <li key={item} className="hover:bg-gray-100 rounded-lg ml-[12px]">
                      <NavLink
                        to={`/admin/${item.toLowerCase().replace(' ', '-')}`}
                        className={`block px-4 py-2 ${
                          isChildActive(item.toLowerCase())
                            ? 'text-[rgba(85,213,210,1)]'
                            : 'text-black-700 hover:text-[rgba(85,213,210,1)]'
                        }`}
                      >
                        {item}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Transactions */}
            <li className="hover:bg-gray-100 rounded-lg">
              <NavLink
                to="/admin/transactions"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-3 text-[rgba(85,213,210,1)]" // Màu active
                    : "flex items-center px-4 py-3 text-black-700 hover:text-[rgba(85,213,210,1)]"
                }
              >
                <TbTransactionDollar className="w-5 h-5 text-black-500 ml-[30px]" />
                <span className="ml-3">Transactions</span>
              </NavLink>
            </li>

            {/* Coupons */}
            <li className="hover:bg-gray-100 rounded-lg">
              <NavLink
                to="/admin/coupons"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-3 text-[rgba(85,213,210,1)]" // Màu active
                    : "flex items-center px-4 py-3 text-black-700 hover:text-[rgba(85,213,210,1)]"
                }
              >
                <BiSolidCoupon className="w-5 h-5 text-black-500 ml-[30px]" />
                <span className="ml-3">Coupons</span>
              </NavLink>
            </li>

            {/* Manage Blogs */}
            <li className="hover:bg-gray-100 rounded-lg">
              <NavLink
                to="/admin/blogs"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-3 text-[rgba(85,213,210,1)]" // Màu active
                    : "flex items-center px-4 py-3 text-black-700 hover:text-[rgba(85,213,210,1)]"
                }
              >
                <FaBloggerB className="w-5 h-5 text-black-500 ml-[30px]" />
                <span className="ml-3">Manage Blogs</span>
              </NavLink>
            </li>

            {/* Branches */}
            <li className="hover:bg-gray-100 rounded-lg">
              <NavLink
                to="/admin/branches"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-3 text-[rgba(85,213,210,1)]" // Màu active
                    : "flex items-center px-4 py-3 text-black-700 hover:text-[rgba(85,213,210,1)]"
                }
              >
                <FaCodeBranch className="w-5 h-5 text-black-500 ml-[30px]" />
                <span className="ml-3">Branches</span>
              </NavLink>
            </li>

            {/* SETTINGS Section */}
            <div className="px-4 py-2 text-xs text-gray-400 mt-4 ml-[2px]">SETTINGS</div>

            {/* Users */}
            <li className="hover:bg-gray-100 rounded-lg">
              <button
                onClick={() => toggleMenu('users')}
                className={`w-full flex items-center justify-between px-4 py-3 ${
                  isChildActive('/user-list') || isChildActive('/add-user') || 
                  isChildActive('/user-roles')
                    ? 'text-[rgba(85,213,210,1)]'
                    : 'text-black-700 hover:text-[rgba(85,213,210,1)]'
                }`}
              >
                <div className="flex items-center">
                  <FaUsers className={`w-5 h-5 ml-[30px] ${
                    isChildActive('/user-list') ? 'text-[rgba(85,213,210,1)]' : 'text-black-500'
                  }`} />
                  <span className="ml-3">Users</span>
                </div>
                <span className="ml-auto pr-2">
                  {expandedMenus.users ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              {expandedMenus.users && (
                <ul className="ml-[50px] mt-2 space-y-1">
                  {['User List', 'Add User', 'User Roles'].map((item) => (
                    <li key={item} className="hover:bg-gray-100 rounded-lg ml-[12px]">
                      <NavLink
                        to={`/admin/${item.toLowerCase().replace(' ', '-')}`}
                        className={`block px-4 py-2 ${
                          isChildActive(item.toLowerCase())
                            ? 'text-[rgba(85,213,210,1)]'
                            : 'text-black-700 hover:text-[rgba(85,213,210,1)]'
                        }`}
                      >
                        {item}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Banners */}
            <li className="hover:bg-gray-100 rounded-lg">
              <NavLink
                to="/admin/banners"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-3 text-[rgba(85,213,210,1)]" // Màu active
                    : "flex items-center px-4 py-3 text-black-700 hover:text-[rgba(85,213,210,1)]"
                }
              >
                <FaImage className="w-5 h-5 text-black-500 ml-[30px]" />
                <span className="ml-3">Banners</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Logout Section */}
      <div className="border-t p-4">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-black-700 hover:bg-gray-100 rounded-lg hover:text-[rgba(85,213,210,1)]"
        >
          <TbLogout2 className="w-5 h-5 text-black-500 ml-[30px]" />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
