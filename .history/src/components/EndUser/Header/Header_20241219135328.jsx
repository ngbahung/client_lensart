import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiUser, BiBookOpen, BiSearch, BiLogOut, BiCog, BiChevronDown, BiMenu } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Logo from '../../Logo';
import { useAuth } from '../../../contexts/AuthContext';
import { debounce } from 'lodash';
import { searchProducts } from '../../../api/productsAPI';
import SearchResults from './SearchResults';
import { useCart } from '../../../contexts/CartContext';

const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const { itemCount } = useCart(); // Add this line to get cart item count
    
    // === QUẢN LÝ STATE ===
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);    // Điều khiển dropdown menu tài khoản
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Điều khiển menu mobile
    const dropdownRef = useRef(null);     // Ref để xử lý click outside dropdown
    const [searchQuery, setSearchQuery] = useState('');             // Giá trị ô tìm kiếm
    const navigate = useNavigate();
    console.log('User:', user);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchRef = useRef(null);
    const searchResultsRef = useRef(null);

    // === CÁC SIDE EFFECTS ===
    useEffect(() => {
        // Xử lý đóng dropdown khi click ra ngoài
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle click outside search results
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchResultsRef.current && 
                !searchResultsRef.current.contains(event.target) &&
                !searchRef.current.contains(event.target)) {
                handleSearchClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Debounced search with cleanup
    const debouncedSearch = useCallback(
        debounce(async (term) => {
            if (!term) {
                setSearchResults([]);
                setIsSearching(false);
                return;
            }
            try {
                setIsSearching(true);
                const results = await searchProducts(term);
                setSearchResults(results);
            } catch (error) {
                console.error('Search error:', error);
                setSearchResults([]);
            } finally {
                setIsSearching(false);
            }
        }, 300),
        []
    );

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    // Handle search input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (!value.trim()) {
            setSearchResults([]);
            setIsSearching(false);
        } else {
            debouncedSearch(value);
        }
    };

    // Clear search when clicking outside
    const handleSearchClose = () => {
        setSearchQuery('');
        setSearchResults([]);
        setIsSearching(false);
    };

    // === XỬ LÝ EVENTS ===
    const handleLogout = async () => {
        try {
            await logout();
            setIsDropdownOpen(false);
            navigate('/');
        } catch (error) {
            toast.error('Đăng xuất thất bại');
        }
    };

    // === DỮ LIỆU ĐIỀU HƯỚNG ===
    // Cấu trúc menu chính với các danh mục sản phẩm và bộ lọc
    const navItems = [
        { 
            name: 'Tròng kính', 
            path: '/trong-kinh',
            categoryId: 1,
            subItems: [
                { 
                    name: 'Tròng Cận',
                    filterType: 'type',
                    filterValue: 'Cận'
                },
                { 
                    name: 'Tròng Chống Ánh Sáng Xanh',
                    filterType: 'type',
                    filterValue: 'Chống Ánh Sáng Xanh'
                },
                { 
                    name: 'Tròng Đổi Màu',
                    filterType: 'type',
                    filterValue: 'Đổi Màu'
                }
            ]
        },
        { 
            name: 'Gọng kính', 
            path: '/gong-kinh',
            categoryId: 2,
            subItems: [
                { 
                    name: 'Gọng Kim Loại', 
                    filterType: 'material',
                    filterValue: 'Kim loại'
                },
                { 
                    name: 'Gọng Không Viền', 
                    filterType: 'style',
                    filterValue: 'Không viền'
                },
                { 
                    name: 'Gọng Mắt Mèo', 
                    filterType: 'style',
                    filterValue: 'Mắt mèo'
                },
                { 
                    name: 'Gọng Oval', 
                    filterType: 'style',
                    filterValue: 'Oval'
                },
                { 
                    name: 'Gọng Kính Nhựa', 
                    filterType: 'material',
                    filterValue: 'Nhựa'
                }
            ]
        },
        { 
            name: 'Kính râm', 
            path: '/kinh-ram',
            categoryId: 3,
            subItems: [
                { 
                    name: 'Kính Râm Nam',
                    filterType: 'gender',
                    filterValue: 'Nam'
                },
                { 
                    name: 'Kính Râm Nữ',
                    filterType: 'gender',
                    filterValue: 'Nữ'
                }
            ]
        },
    ];

    // Các liên kết phụ trong footer và menu mobile
    const additionalLinks = [
        { name: 'Về LensArt', path: '/ve-lensart' },
        { name: 'Blog', path: '/blog' },
        { name: 'Liên hệ', path: '/lien-he' },
    ];

    // Update user display in dropdown
    const userDropdown = (
        <div className="py-2">
            {isAuthenticated && user ? (
                <>
                    <Link to="/profile" 
                        className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#e88547] transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                    >
                        <BiUser className="mr-2" />
                        {user.lastname || user.email}
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-[#e88547] transition-colors"
                    >
                        <BiLogOut className="mr-2" />
                        Đăng xuất
                    </button>
                </>
            ) : (
                <>
                    <Link to="/login" 
                        className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#e88547] transition-colors"
                    >
                        <BiUser className="mr-2" />
                        Đăng nhập
                    </Link>
                    <Link to="/register" 
                        className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#e88547] transition-colors"
                    >
                        <BiCog className="mr-2" />
                        Đăng ký
                    </Link>
                </>
            )}
        </div>
    );

    return (
        <>
            {/* === HEADER CHÍNH === */}
            <header className="w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
                <div className="container mx-auto px-4">
                    {/* Hàng 1: Logo, Search, Account */}
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
                        <div className="flex-1 mx-2 md:mx-4 lg:mx-8 flex justify-center md:w-2/4">
                            <div className="relative w-full max-w-[486px]" ref={searchRef}>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Tìm kiếm..."
                                    className="w-full h-10 md:h-11 pl-10 pr-4 py-2 md:py-2.5 bg-[#6fd4d2]/50 rounded-[30px] text-sm md:text-base outline-none focus:ring-2 focus:ring-[#6fd4d2] transition-all"
                                />
                                <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 md:w-5 md:h-5" />
                                {isSearching && (
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-teal-500 border-t-transparent"></div>
                                    </div>
                                )}
                                <SearchResults 
                                    results={searchResults} 
                                    onClose={handleSearchClose}
                                    isSearching={isSearching}
                                    containerRef={searchResultsRef}
                                />
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
                                        {userDropdown}
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

                {/* Hàng 2: Navigation chính (ẩn trên mobile) */}
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
                                                    {Array.isArray(item.subItems) && item.subItems.map((subItem) => (
                                                        <Link
                                                            key={subItem.name}
                                                            to={`${item.path}/filter/${subItem.filterType}/${encodeURIComponent(subItem.filterValue)}`}
                                                            className="block px-4 py-2 text-sm text-white hover:bg-[#5fc2c0] transition-colors"
                                                        >
                                                            {subItem.name}
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

                            {/* Desktop Cart Button */}
                            <div className="relative hidden md:block">
                                <Link 
                                    to="/gio-hang" 
                                    className="flex items-center text-gray-700 hover:text-white transition-colors text-sm lg:text-base"
                                >
                                    <span>Giỏ hàng</span>
                                    <div className="relative">
                                        <BsCart3 className="h-5 w-5 ml-2" />
                                        {itemCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                                {itemCount}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* === MENU MOBILE === */}
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
                                        {Array.isArray(item.subItems) && item.subItems.map((subItem) => (
                                            <Link
                                                key={subItem.name}
                                                to={subItem.filterType && subItem.filterValue ? 
                                                    `${item.path}?${subItem.filterType}=${encodeURIComponent(subItem.filterValue)}` :
                                                    item.path}
                                                className="block py-2 text-gray-600 hover:text-[#6fd4d2]"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {subItem.name}
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

            {/* === NÚT GIỎ HÀNG === */}
            {/* Nút giỏ hàng fixed góc phải dưới (chỉ hiển thị trên mobile) */}
            <Link 
                to="/gio-hang" 
                className="fixed bottom-6 right-6 bg-[#6fd4d2] p-4 rounded-full shadow-lg md:hidden z-50"
            >
                <div className="relative">
                    <BsCart3 className="h-6 w-6 text-white" />
                    {itemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#ec905c] text-white text-xs 
                            rounded-full h-5 w-5 flex items-center justify-center">
                            {itemCount}
                        </span>
                    )}
                </div>
            </Link>
        </>
    );
};

export default Header;