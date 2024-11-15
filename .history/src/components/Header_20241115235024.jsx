import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiUser, BiBookOpen, BiSearch, BiLogOut, BiCog, BiChevronDown } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [cartCount, setCartCount] = useState(0);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        setIsRegistered(false);
        setIsDropdownOpen(false);
        // Add your logout logic here
    };

    const navItems = [
        { 
            name: 'Gọng kính', 
            path: '/gong-kinh',
            subItems: ['Gọng Kim Loại', 'Gọng Không Viền', 'Gọng Mắt Mèo', 'Gọng Oval', 'Gọng Kính Nhựa']
        },
        { 
            name: 'Kính mát', 
            path: '/kinh-mat',
            subItems: ['Kính Mát Nam', 'Kính Mát Nữ']
        },
        { 
            name: 'Tròng kính', 
            path: '/trong-kinh',
            subItems: ['Tròng Cận', 'Tròng Chống Ánh Sáng Xanh', 'Tròng Đổi Màu']
        },
    ];

    return (
        <header className="w-full bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div>
                        {/* Logo */}
                        <Link to='/' className="flex-shrink-0">
                            <img 
                                src="/src/assets/images/logoBrand.png" 
                                alt="Logo" 
                                className="h-8 w-auto sm:h-10 md:h-12 lg:h-14 transition-all duration-200"
                            />
                        </Link>
                    </div>

                    
                    {/* Search Bar */}
                    <div className="flex-1 mx-4 lg:mx-8">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Tìm gọng kính, kính mát, tròng kính..."
                                className="w-full max-w-[486px] h-11 pl-10 pr-4 py-2.5 bg-[#6fd4d2]/50 rounded-[30px] text-sm md:text-base outline-none focus:ring-2 focus:ring-[#6fd4d2] transition-all"
                            />
                            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 md:space-x-4">
                        <div className="relative" ref={dropdownRef}>
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center p-2 md:px-4 md:py-2 rounded-full bg-[#F5A97F] text-white hover:bg-[#f49b6a] transition-colors"
                            >
                                <BiUser className="h-5 w-5 md:mr-2" />
                                <span className="hidden md:inline">Tài khoản</span>
                            </button>

                            {/* Account Dropdown */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#6fd4d2] z-50">
                                    <div className="py-2">
                                        {isRegistered ? (
                                            <>
                                                <Link to="/profile" 
                                                    className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#5fc2c0]"
                                                >
                                                    <BiUser className="mr-2" />
                                                    Tài khoản
                                                </Link>
                                                <Link to="/settings" 
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    <BiCog className="mr-2" />
                                                    Lịch sử mua hàng
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-[#5fc2c0]"
                                                >
                                                    <BiLogOut className="mr-2" />
                                                    Đăng xuất
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <Link to="/login" 
                                                    className="block px-4 py-2 text-sm text-white hover:bg-[#5fc2c0]"
                                                >
                                                    Đăng nhập
                                                </Link>
                                                <Link to="/register" 
                                                    className="block px-4 py-2 text-sm text-white hover:bg-[#5fc2c0]"
                                                >
                                                    Đăng ký
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <button className="flex items-center p-2 md:px-4 md:py-2 rounded-full bg-[#F5A97F] text-white hover:bg-[#ec905c] transition-colors">
                            <BiBookOpen className="h-5 w-5 md:mr-2" />
                            <span className="font-semibold text-[15px] hidden md:inline">Chính sách</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Second Row Navigation */}
            <div className='bg-[#6fd4d2]'>
                <div className="container mx-auto px-4 ">
                    <div className="flex items-center justify-between h-16">
                        <div>
                            {/* Navigation */}
                            <nav className="hidden md:flex space-x-4 lg:space-x-8">
                                {navItems.map((item) => (
                                    <div key={item.path} className="relative group">
                                        <Link
                                            to={item.path}
                                            className="flex items-center text-gray-600 hover:text-white transition-colors text-sm lg:text-base pb-2"
                                        >
                                            {item.name}
                                            <BiChevronDown className="h-5 w-5 ml-1 transition-transform group-hover:rotate-180" />
                                        </Link>
                                        
                                        {/* Navigation Dropdown */}
                                        <div className="absolute left-0 invisible group-hover:visible opacity-0 group-hover:opacity-100 
                                            transition-all duration-300 ease-in-out mt-0 w-48 bg-[#6fd4d2] rounded-md shadow-lg z-50">
                                            <div className="py-2">
                                                {item.subItems.map((subItem, index) => (
                                                    <Link
                                                        key={index}
                                                        to={`${item.path}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                                                        className="block px-4 py-2 text-sm text-black hover:bg-[#5fc2c0] transition-colors"
                                                    >
                                                        {subItem}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </nav>
                        </div>
                        <div className="hidden md:flex items-center justify-end space-x-4 lg:space-x-8 py-3">
                            <Link 
                                to="/ve-lensart" 
                                className="text-gray-700 hover:text-white transition-colors text-sm lg:text-base"
                            >
                                Về LensArt
                            </Link>
                            
                            <div className="relative group">
                                <Link 
                                    to="/blog" 
                                    className="flex items-center text-gray-700 hover:text-white transition-colors text-sm lg:text-base"
                                >
                                    Blog
                                    <BiChevronDown className="h-5 w-5 ml-1 transition-transform group-hover:rotate-180" />
                                </Link>
                            </div>

                            <div className="relative group">
                                <Link 
                                    to="/lien-he" 
                                    className="flex items-center text-gray-700 hover:text-white transition-colors text-sm lg:text-base"
                                >
                                    Liên hệ
                                    <BiChevronDown className="h-5 w-5 ml-1 transition-transform group-hover:rotate-180" />
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <Link 
                                to="/gio-hang" 
                                className="flex items-center text-gray-700 hover:text-white transition-colors text-sm lg:text-base"
                            >
                                <span>Giỏ hàng</span>
                                <div className="relative">
                                    <BsCart3 className="h-5 w-5 ml-2" />
                                    {cartCount >= 0 && (
                                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                                            rounded-full h-4 w-4 flex items-center justify-center
                                            transform transition-all duration-300">
                                            {cartCount}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;