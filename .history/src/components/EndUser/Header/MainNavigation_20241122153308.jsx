import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCart3 } from "react-icons/bs";

export const MainNavigation = ({ navItems, additionalLinks, cartCount }) => {
    const [activeDropdown, setActiveDropdown] = useState(null);

    return (
        <nav className="hidden md:block border-t">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <ul className="flex space-x-8">
                        {navItems.map((item) => (
                            <li 
                                key={item.path}
                                className="relative group"
                                onMouseEnter={() => setActiveDropdown(item.path)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link 
                                    to={item.path}
                                    className="flex items-center py-3 text-gray-700 hover:text-[#6fd4d2]"
                                >
                                    {item.name}
                                </Link>
                                
                                {item.subItems && activeDropdown === item.path && (
                                    <div className="absolute left-0 top-full bg-white shadow-lg rounded-md w-48 py-2 z-50">
                                        {item.subItems.map((subItem) => (
                                            <Link
                                                key={subItem.name}
                                                to={`${item.path}?${subItem.filterType}=${subItem.filterValue}`}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </li>
                        ))}
                        
                        {additionalLinks.map((link) => (
                            <li key={link.path}>
                                <Link 
                                    to={link.path}
                                    className="flex items-center py-3 text-gray-700 hover:text-[#6fd4d2]"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Link to="/gio-hang" className="flex items-center py-3 text-gray-700 hover:text-[#6fd4d2]">
                        <div className="relative">
                            <BsCart3 className="h-6 w-6" />
                            {cartCount > 0 && (
                                <div className="absolute -top-2 -right-2 bg-[#ec905c] text-white text-xs 
                                    rounded-full h-4 w-4 flex items-center justify-center">
                                    {cartCount}
                                </div>
                            )}
                        </div>
                        <span className="ml-2">Giỏ hàng</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};