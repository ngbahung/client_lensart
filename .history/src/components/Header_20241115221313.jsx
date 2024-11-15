// Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const navItems = [
        { name: 'Gọng kính', path: '/gong-kinh' },
        { name: 'Kính mát', path: '/kinh-mat' },
        { name: 'Tròng kính', path: '/trong-kinh' },
        { name: 'Thương hiệu', path: '/thuong-hieu' },
    ];

    return (
        <div className="w-full bg-white">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to='/'>
                        <img 
                            src="/src/assets/images/logoBrand.png" 
                            alt="Logo" 
                            className="h-12"
                        />
                    </Link>
                </div>
                <div className="flex-1 max-w-2xl mx-8">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                </div>
                    {/* Right buttons */}
                <div className="flex items-center space-x-4">
                    <button className="flex items-center px-4 py-2 rounded-full bg-[#F5A97F] text-white">
                    <User className="h-5 w-5 mr-2" />
                    <span>Tài khoản</span>
                    </button>
                    <button className="flex items-center px-4 py-2 rounded-full bg-[#F5A97F] text-white">
                    <span>Chính sách</span>
                    </button>
                </div>
        </div>
      </div>
            </div>
        </div>
    );
};

export default Header;