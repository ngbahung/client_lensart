// Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiUser, BiBookOpen, BiSearch } from "react-icons/bi";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

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

                    {/* Navigation
                    <nav className="hidden md:flex space-x-4 lg:space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="text-gray-600 hover:text-white transition-colors text-sm lg:text-base"
                            >
                                {item.name}
                            </Link>
                        ))} 
                    </nav> */}

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
                        <button className="flex items-center p-2 md:px-4 md:py-2 rounded-full bg-[#F5A97F] text-white hover:bg-[#ec905c] transition-colors">
                            <BiUser className="h-5 w-5 md:mr-2" />
                            <span className="font-semibold text-[15px] hidden md:inline">Tài khoản</span>
                        </button>
                        <button className="flex items-center p-2 md:px-4 md:py-2 rounded-full bg-[#F5A97F] text-white hover:bg-[#ec905c] transition-colors">
                            <BiBookOpen className="h-5 w-5 md:mr-2" />
                            <span className="font-semibold text-[15px] hidden md:inline">Chính sách</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;