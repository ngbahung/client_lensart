import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiUser, BiBookOpen, BiSearch, BiLogOut, BiCog, BiChevronDown, BiMenu } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Logo from '../../Logo';

const Header = () => {
    // Các state quản lý trạng thái của component
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);    // Quản lý trạng thái dropdown tài khoản
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Quản lý trạng thái menu mobile
    const dropdownRef = useRef(null);     // Reference để xử lý click outside dropdown
    const [isRegistered, setIsRegistered] = useState(false);        // Quản lý trạng thái đăng nhập
    const [searchQuery, setSearchQuery] = useState('');             // Quản lý giá trị tìm kiếm
    const [cartCount, setCartCount] = useState(0);                  // Quản lý số lượng sản phẩm trong giỏ hàng
    const navigate = useNavigate();

    // Hook xử lý đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Xử lý đăng xuất
    const handleLogout = () => {
        setIsRegistered(false);
        setIsDropdownOpen(false);
        // Add your logout logic here
        navigate('/login');
    };

    // Dữ liệu điều hướng chính
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

    // Các liên kết phụ
    const additionalLinks = [
        { name: 'Về LensArt', path: '/ve-lensart' },
        { name: 'Blog', path: '/blog' },
        { name: 'Liên hệ', path: '/lien-he' },
    ];

    return (
        <>
            <header className="w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
                <div className="container mx-auto px-4">
                    {/* Header Row 1: Logo, Search, Account */}
                    <div className="flex items-center justify-between h-16">
                        {/* Nút menu mobile */}
                        <div className="flex items-center md:w-1/4">
                            <button 
                                className="md:hidden p-2"
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <BiMenu className="h-6 w-6" />
                            </button>
                            <Logo className="h-8 w-auto" />
                        </div>

                        {/* Thanh tìm kiếm - centered */}
                        <div className="flex-1 mx-4 lg:mx-8 flex justify-center md:w-2/4">
                            <div className="relative w-full max-w-[486px]">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Tìm gọng kính, kính mát, tròng kính..."
                                    className="w-full h-11 pl-10 pr-4 py-2.5 bg-[#6fd4d2]/50 rounded-[30px] text-sm md:text-base outline-none focus:ring-2 focus:ring-[#6fd4d2] transition-all"
                                />
                                <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                            </div>
                        </div>

                        {/* Các nút thao tác (Tài khoản, Chính sách) */}
                        <div className="flex items-center space-x-2 md:space-x-4 md:w-1/4 justify-end">
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
                                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#ec905c] z-50 transform transition-all duration-300 ease-in-out">
                                        <div className="py-2">
                                            {isRegistered ? (
                                                <>
                                                    <Link to="/profile" 
                                                        className="flex items-center px-4 py-2 text-sm text-white hover:underline transition-all duration-300"
                                                    >
                                                        <BiUser className="mr-2" />
                                                        Tài khoản
                                                    </Link>
                                                    <Link to="/settings" 
                                                        className="flex items-center px-4 py-2 text-sm text-white hover:underline transition-all duration-300"
                                                    >
                                                        <BiCog className="mr-2" />
                                                        Lịch sử mua hàng
                                                    </Link>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full flex items-center px-4 py-2 text-sm text-white hover:underline transition-all duration-300"
                                                    >
                                                        <BiLogOut className="mr-2" />
                                                        Đăng xuất
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <Link to="/login" 
                                                        className="block px-4 py-2 text-sm text-white hover:bg-[#e88547] transition-all duration-300"
                                                        onClick={() => setIsDropdownOpen(false)}
                                                    >
                                                        Đăng nhập
                                                    </Link>
                                                    <Link to="/register" 
                                                        className="block px-4 py-2 text-sm text-white hover:bg-[#e88547] transition-all duration-300"
                                                        onClick={() => setIsDropdownOpen(false)}
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

                {/* Header Row 2: Navigation - Ẩn trên mobile */}
                <div className='hidden md:block bg-[#6fd4d2]'>
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
                                                            className="block px-4 py-2 text-sm text-white hover:bg-[#5fc2c0] transition-colors"
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
                                    </Link>
                                </div>

                                <div className="relative group">
                                    <Link 
                                        to="/lien-he" 
                                        className="flex items-center text-gray-700 hover:text-white transition-colors text-sm lg:text-base"
                                    >
                                        Liên hệ
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
                                            <div className="absolute -top-2 -right-2 bg-[#ec905c] text-white text-xs 
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

            {/* Sidebar cho mobile - Hiển thị khi click vào nút menu */}
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 md:hidden ${
                isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}>
                <div className={`fixed inset-y-0 left-0 w-64 bg-white transform transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                    <div className="p-4">
                        <button 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-4 right-4"
                        >
                            <AiOutlineClose className="h-6 w-6" />
                        </button>

                        <div className="mt-8">
                            {navItems.map((item) => (
                                <div key={item.path} className="mb-4">
                                    <Link 
                                        to={item.path}
                                        className="font-medium mb-2 block hover:text-[#6fd4d2]"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                    <div className="pl-4">
                                        {item.subItems.map((subItem, index) => (
                                            <Link
                                                key={index}
                                                to={`${item.path}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                                                className="block py-2 text-gray-600 hover:text-[#6fd4d2]"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {subItem}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div className="border-t pt-4 mt-4">
                                {additionalLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className="block py-2 text-gray-600"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Nút giỏ hàng nổi - Chỉ hiển thị trên mobile */}
            <Link 
                to="/gio-hang" 
                className="fixed bottom-4 right-4 bg-[#6fd4d2] p-3 rounded-full shadow-lg md:hidden z-40"
            >
                <div className="relative">
                    <BsCart3 className="h-6 w-6 text-white" />
                    {cartCount >= 0 && (
                        <>
                            <div className="absolute -top-2 -right-2 bg-[#ec905c] text-white text-xs 
                                rounded-full h-4 w-4 flex items-center justify-center">
                                {cartCount}
                            </div>
                        </>
                    )}
                </div>
            </Link>
        </>
    );
};

export default Header;