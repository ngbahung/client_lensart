import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiUser, BiBookOpen, BiSearch, BiLogOut, BiCog, BiChevronDown, BiMenu } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { FiShoppingBag, FiHeart, FiLock, FiMapPin } from 'react-icons/fi';
import Logo from '../../Logo';
import { useAuth } from '../../../contexts/AuthContext';
import { debounce } from 'lodash';
import { searchProducts } from '../../../api/productsAPI';
import SearchResults from './SearchResults';
import { useCart } from '../../../contexts/CartContext';
import { getFeatures } from '../../../api/featuresAPI';
import { getShapes } from '../../../api/shapesAPI';
import { toast } from 'react-toastify';

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
    const [features, setFeatures] = useState([]);
    const [shapes, setShapes] = useState([]);

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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [featuresData, shapesData] = await Promise.all([
                    getFeatures(),
                    getShapes()
                ]);
                setFeatures(featuresData);
                setShapes(shapesData);
            } catch (error) {
                console.error('Error fetching dropdown data:', error);
            }
        };
        fetchData();
    }, []);

    const navItems = [
        { 
            name: 'Tròng kính', 
            path: '/trong-kinh',
            categoryId: 1,
            subItems: features.map(feature => ({
                name: `Tròng ${feature.name}`,
                filterType: 'features',
                filterValue: feature.id.toString()
            }))
        },
        { 
            name: 'Gọng kính', 
            path: '/gong-kinh',
            categoryId: 2,
            subItems: shapes.map(shape => ({
                name: `Gọng ${shape.name}`,
                filterType: 'shapes',
                filterValue: shape.id.toString()
            }))
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
                },
                { 
                    name: 'Kính Mát Unisex',
                    filterType: 'gender',
                    filterValue: 'Unisex'
                }
            ]
        },
    ];

    // Các liên kết phụ trong footer và menu mobile
    const additionalLinks = [
        { name: 'Về LensArt', path: '/ve-lensart' },
        { name: 'Blog', path: '/blog' },  // Update this path
        { name: 'Liên hệ', path: '/lien-he' },
    ];

    // Update user display in dropdown with enhanced menu
    const userDropdown = (
        <div className="py-2">
            {isAuthenticated && user ? (
                <>
                    {/* User Info Header */}
                    <div className="px-4 py-3 bg-[#d67d4e] mb-2">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center ring-2 ring-white/50">
                                <span className="text-white font-bold text-sm">
                                    {user?.firstname?.[0]?.toUpperCase() || 'U'}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate">
                                    {user.firstname} {user.lastname}
                                </p>
                                <p className="text-xs text-white/80 truncate">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <Link 
                        to="/profile" 
                        className="flex items-center px-4 py-2.5 text-sm text-white hover:bg-[#d67d4e] transition-all duration-200 group"
                        onClick={() => setIsDropdownOpen(false)}
                    >
                        <BiUser className="mr-3 w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Thông tin tài khoản</span>
                    </Link>

                    <Link 
                        to="/profile?view=address" 
                        className="flex items-center px-4 py-2.5 text-sm text-white hover:bg-[#d67d4e] transition-all duration-200 group"
                        onClick={() => setIsDropdownOpen(false)}
                    >
                        <FiMapPin className="mr-3 w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Địa chỉ giao hàng</span>
                    </Link>

                    <Link 
                        to="/profile?view=orders" 
                        className="flex items-center px-4 py-2.5 text-sm text-white hover:bg-[#d67d4e] transition-all duration-200 group"
                        onClick={() => setIsDropdownOpen(false)}
                    >
                        <FiShoppingBag className="mr-3 w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Đơn hàng của tôi</span>
                    </Link>

                    <Link 
                        to="/profile?view=favorites" 
                        className="flex items-center px-4 py-2.5 text-sm text-white hover:bg-[#d67d4e] transition-all duration-200 group"
                        onClick={() => setIsDropdownOpen(false)}
                    >
                        <FiHeart className="mr-3 w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Sản phẩm yêu thích</span>
                    </Link>

                    <Link 
                        to="/profile?view=password" 
                        className="flex items-center px-4 py-2.5 text-sm text-white hover:bg-[#d67d4e] transition-all duration-200 group"
                        onClick={() => setIsDropdownOpen(false)}
                    >
                        <FiLock className="mr-3 w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Đổi mật khẩu</span>
                    </Link>

                    {/* Divider */}
                    <div className="my-2 border-t border-white/20"></div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2.5 text-sm text-white hover:bg-red-500/90 transition-all duration-200 group"
                    >
                        <BiLogOut className="mr-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        <span>Đăng xuất</span>
                    </button>
                </>
            ) : (
                <>
                    <Link to="/login" 
                        className="flex items-center px-4 py-2.5 text-sm text-white hover:bg-[#d67d4e] transition-all duration-200 group"
                        onClick={() => setIsDropdownOpen(false)}
                    >
                        <BiUser className="mr-3 w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Đăng nhập</span>
                    </Link>
                    <Link to="/register" 
                        className="flex items-center px-4 py-2.5 text-sm text-white hover:bg-[#d67d4e] transition-all duration-200 group"
                        onClick={() => setIsDropdownOpen(false)}
                    >
                        <BiCog className="mr-3 w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Đăng ký</span>
                    </Link>
                </>
            )}
        </div>
    );

    const handleSubItemClick = (item, subItem) => {
        const url = `${item.path}?${subItem.filterType}=${encodeURIComponent(subItem.filterValue)}`;
        setIsMobileMenuOpen(false);
        navigate(url, { 
            replace: true,
            state: { 
                filterType: subItem.filterType,
                filterValue: subItem.filterValue 
            }
        });
    };

    const renderDropdownItems = (item) => (
        Array.isArray(item.subItems) && item.subItems.map((subItem) => (
            <button
                key={subItem.name}
                onClick={() => handleSubItemClick(item, subItem)}
                className="w-full text-left block px-4 py-2 text-sm text-white hover:bg-[#5fc2c0] transition-colors"
            >
                {subItem.name}
            </button>
        ))
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
                                    <div className="absolute right-0 mt-2 w-64 rounded-xl shadow-2xl bg-gradient-to-b from-[#ec905c] to-[#e88547] z-50 transform transition-all duration-300 ease-in-out overflow-hidden border-t-2 border-white/20">
                                        {userDropdown}
                                    </div>
                                )}
                            </div>
                            <Link 
                                to="/chinh-sach" 
                                className="flex items-center p-2 md:px-4 md:py-2 rounded-full bg-[#F5A97F] text-white hover:bg-[#ec905c] transition-colors"
                            >
                                <BiBookOpen className="h-5 w-5 md:mr-2" />
                                <span className="font-semibold text-[15px] hidden md:inline">Chính sách</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Hàng 2: Navigation chính (ẩn trên mobile) */}
                <div className='hidden md:block bg-gradient-to-r from-[#6fd4d2] to-[#55d5d2] shadow-md'>
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between h-14">
                            <div>
                                {/* Navigation */}
                                <nav className="hidden md:flex space-x-1 lg:space-x-2">
                                    {navItems.map((item) => (
                                        <div key={item.path} className="relative group">
                                            <Link
                                                to={item.path}
                                                className="flex items-center px-4 py-4 text-white/90 hover:text-white hover:bg-white/10 rounded-t-lg transition-all duration-200 text-sm lg:text-base font-medium group"
                                            >
                                                <span className="relative">
                                                    {item.name}
                                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                                </span>
                                                <BiChevronDown className="h-4 w-4 ml-1.5 transition-transform duration-300 group-hover:rotate-180" />
                                            </Link>
                                            
                                            {/* Navigation Dropdown with enhanced styling */}
                                            <div className="absolute left-0 top-full invisible group-hover:visible opacity-0 group-hover:opacity-100 
                                                transition-all duration-300 ease-in-out mt-0 w-56 bg-white rounded-b-xl rounded-tr-xl shadow-2xl z-50 overflow-hidden border-t-2 border-[#6fd4d2]">
                                                <div className="py-2">
                                                    {Array.isArray(item.subItems) && item.subItems.map((subItem) => (
                                                        <button
                                                            key={subItem.name}
                                                            onClick={() => handleSubItemClick(item, subItem)}
                                                            className="w-full text-left block px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-[#eff9f9] hover:to-[#6fd4d2]/10 hover:text-[#6fd4d2] transition-all duration-200 font-medium relative group/item"
                                                        >
                                                            <span className="relative z-10">{subItem.name}</span>
                                                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#6fd4d2] transition-all duration-200 group-hover/item:h-full"></span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </nav>
                            </div>
                            
                            {/* Right side links */}
                            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
                                <Link 
                                    to="/ve-lensart" 
                                    className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm lg:text-base font-medium relative group"
                                >
                                    <span className="relative">
                                        Về LensArt
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                    </span>
                                </Link>
                                
                                <Link 
                                    to="/blog"
                                    className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm lg:text-base font-medium relative group"
                                >
                                    <span className="relative">
                                        Blog
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                    </span>
                                </Link>

                                <Link 
                                    to="/lien-he" 
                                    className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm lg:text-base font-medium relative group"
                                >
                                    <span className="relative">
                                        Liên hệ
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                    </span>
                                </Link>

                                {/* Desktop Cart Button with enhanced styling */}
                                <Link 
                                    to="/gio-hang" 
                                    className="flex items-center space-x-2 px-4 py-2 ml-2 bg-white/15 hover:bg-white/25 text-white rounded-lg transition-all duration-200 text-sm lg:text-base font-medium shadow-md hover:shadow-lg group"
                                >
                                    <span>Giỏ hàng</span>
                                    <div className="relative">
                                        <BsCart3 className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                                        {itemCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-gradient-to-br from-[#F5A97F] to-[#ec905c] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-lg animate-pulse">
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
                className="fixed bottom-6 right-6 bg-[#55d5d2] p-3 rounded-full shadow-lg md:hidden z-50 transition-all duration-300 hover:bg-[#4cc4c1] active:scale-95"
                style={{
                    boxShadow: '0 4px 12px rgba(85, 213, 210, 0.4)'
                }}
            >
                <div className="relative">
                    <BsCart3 className="h-6 w-6 text-white" />
                    {itemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#ec905c] text-white text-xs 
                            rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                            {itemCount}
                        </span>
                    )}
                </div>
            </Link>
        </>
    );
};

export default Header;