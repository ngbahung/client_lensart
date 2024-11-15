// Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiUser, BiBookOpen } from "react-icons/bi";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const navItems = [
        { name: 'Gọng kính', path: '/gong-kinh' },
        { name: 'Kính mát', path: '/kinh-mat' },
        { name: 'Tròng kính', path: '/trong-kinh' },
        { name: 'Thương hiệu', path: '/thuong-hieu' },
    ];

    return (
        <header className="w-full bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to='/' className="flex-shrink-0">
                        <img 
                            src="/src/assets/images/logoBrand.png" 
                            alt="Logo" 
                            className="h-12 w-auto"
                        />
                    </Link>

                    {/* Navigation
                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="text-gray-600 hover:text-white transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav> */}

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl mx-8">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Tìm kiếm..."
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A97F] focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4">
                        <button className="flex items-center px-4 py-2 rounded-full bg-[#F5A97F] text-white hover:bg-[#f49b6a] transition-colors">
                            <BiUser className="h-5 w-5 mr-2" />
                            <span>Tài khoản</span>
                        </button>
                        <button className="flex items-center px-4 py-2 rounded-full bg-[#F5A97F] text-white hover:bg-[#f49b6a] transition-colors">
                            <BiBookOpen className="h-5 w-5 mr-2" />
                            <span>Chính sách</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;