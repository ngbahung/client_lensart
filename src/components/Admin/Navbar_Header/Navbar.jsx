import React, { useState } from 'react';
import Logo from '../../Logo';
import { FaImage, FaListUl, FaCartPlus, FaBloggerB, FaUsers, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdDashboard } from "react-icons/md";
import { FaBoxArchive, FaCodeBranch } from "react-icons/fa6";
import { TbTransactionDollar } from "react-icons/tb";
import { BiSolidCoupon } from "react-icons/bi";
import { TbLogout2 } from "react-icons/tb";

const Navbar = () => {
  const [expandedMenus, setExpandedMenus] = useState({
    categories: false,
    products: false,
    orders: false,
    users: false
  });

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  return (
    <div className="w-[17%] bg-white h-screen fixed left-0 top-0 shadow-lg flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-gray-800"><Logo /></span>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2 text-xs font-semibold text-gray-400 ml-[10px]">DASHBOARD</div>
        <nav className="px-2">
          <ul className="space-y-1">
            {/* Dashboard */}
            <li className="hover:bg-gray-100 rounded-lg">
              <a href="#" className="flex items-center px-4 py-3 text-black-700 hover:text-[rgba(85,213,210,1)]">
                <MdDashboard className="w-5 h-5 text-black-500 ml-[30px]" />
                <span className="ml-3">Dashboard</span>
              </a>
            </li>

            {/* ECOMMERCE Section */}
            <div className="px-4 py-2 text-xs font-semibold text-gray-400 mt-4 ml-[2px]">ECOMMERCE</div>

            {/* Manage Categories */}
            <li className="hover:bg-gray-100 rounded-lg">
              <button
                onClick={() => toggleMenu('categories')}
                className="w-full flex items-center justify-between px-4 py-3 text-black-700 hover:text-[rgba(85,213,210,1)]"
              >
                <div className="flex items-center">
                  <FaListUl className="w-5 h-5 text-black-500 ml-[30px]" />
                  <span className="ml-3">Manage Categories</span>
                </div>
                {/* Biểu tượng thay đổi dựa vào trạng thái menu */}
                <span className="ml-auto pr-2">
                  {expandedMenus.categories ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              {expandedMenus.categories && (
                <ul className="ml-[50px] mt-2 space-y-1">
                  {['Category', 'Shape', 'Material', 'Features'].map((item) => (
                    <li key={item} className="hover:bg-gray-100 rounded-lg ml-[12px]">
                      <a href="#" className="block px-4 py-2 text-black-700 hover:text-[rgba(85,213,210,1)]">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Manage Products */}
            <li className="hover:bg-gray-100 rounded-lg">
              <button
                onClick={() => toggleMenu('products')}
                className="w-full flex items-center justify-between px-4 py-3 text-black-700 hover:text-[rgba(85,213,210,1)]"
              >
                <div className="flex items-center">
                  <FaBoxArchive className="w-5 h-5 text-black-500 ml-[30px]" />
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
                      <a href="#" className="block px-4 py-2 text-black-700 hover:text-[rgba(85,213,210,1)]">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Orders */}
            <li className="hover:bg-gray-100 rounded-lg">
              <button
                onClick={() => toggleMenu('orders')}
                className="w-full flex items-center justify-between px-4 py-3 text-black-700 hover:text-[rgba(85,213,210,1)]"
              >
                <div className="flex items-center">
                  <FaCartPlus className="w-5 h-5 text-black-500 ml-[30px]" />
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
                      <a href="#" className="block px-4 py-2 text-black-700 hover:text-[rgba(85,213,210,1)]">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Transactions */}
            <li className="hover:bg-gray-100 rounded-lg">
              <a href="#" className="flex items-center px-4 py-3 text-black-700 hover:text-[rgba(85,213,210,1)]">
                <TbTransactionDollar className="w-5 h-5 text-black-500 ml-[30px]" />
                <span className="ml-3">Transactions</span>
              </a>
            </li>

            {/* Coupons */}
            <li className="hover:bg-gray-100 rounded-lg">
              <a href="#" className="flex items-center px-4 py-3 text-black-700 hover:text-[rgba(85,213,210,1)]">
                <BiSolidCoupon className="w-5 h-5 text-black-500 ml-[30px]" />
                <span className="ml-3">Coupons</span>
              </a>
            </li>

            {/* Manage Blogs */}
            <li className="hover:bg-gray-100 rounded-lg">
              <a href="#" className="flex items-center px-4 py-3 text-black-700 hover:text-[rgba(85,213,210,1)]">
                <FaBloggerB className="w-5 h-5 text-black-500 ml-[30px]" />
                <span className="ml-3">Manage Blogs</span>
              </a>
            </li>

            {/* Branches */}
            <li className="hover:bg-gray-100 rounded-lg">
              <a href="#" className="flex items-center px-4 py-3 text-black-700 hover:text-[rgba(85,213,210,1)]">
                <FaCodeBranch className="w-5 h-5 text-black-500 ml-[30px]" />
                <span className="ml-3">Branches</span>
              </a>
            </li>

            {/* SETTINGS Section */}
            <div className="px-4 py-2 text-xs font-semibold text-gray-400 mt-4 ml-[2px]">SETTINGS</div>

            {/* Users */}
            <li className="hover:bg-gray-100 rounded-lg">
              <button
                onClick={() => toggleMenu('users')}
                className="w-full flex items-center justify-between px-4 py-3 text-black-700 hover:text-[rgba(85,213,210,1)]"
              >
                <div className="flex items-center">
                  <FaUsers className="w-5 h-5 text-black-500 ml-[30px]" />
                  <span className="ml-3">Users</span>
                </div>
                <span className="ml-auto pr-2">
                  {expandedMenus.users ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              {expandedMenus.users && (
                <ul className="ml-[50px] mt-2 space-y-1">
                  {['Customer List', 'Manage User'].map((item) => (
                    <li key={item} className="hover:bg-gray-100 rounded-lg ml-[12px]">
                      <a href="#" className="block px-4 py-2 text-black-700 hover:text-[rgba(85,213,210,1)]">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Banners */}
            <li className="hover:bg-gray-100 rounded-lg">
              <a href="#" className="flex items-center px-4 py-3 text-black-700 hover:text-[rgba(85,213,210,1)]">
                <FaImage className="w-5 h-5 text-black-500 ml-[30px]" />
                <span className="ml-3">Banners</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Logout Section */}
      <div className="border-t p-4">
        <button className="w-full flex items-center px-4 py-3 text-black-700 hover:bg-gray-100 rounded-lg hover:text-[rgba(85,213,210,1)]">
          <TbLogout2 className="w-5 h-5 text-black-500 ml-[30px]" />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
