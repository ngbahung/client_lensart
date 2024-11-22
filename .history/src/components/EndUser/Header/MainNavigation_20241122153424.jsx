
import React from 'react';
import { Link } from 'react-router-dom';
import { BiChevronDown } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";

export const MainNavigation = ({ navItems, additionalLinks, cartCount }) => {
    return (
        <div className='hidden md:block bg-[#6fd4d2]'>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-12 lg:h-14">
                    <nav className="hidden md:flex space-x-4 lg:space-x-8">
                        {navItems.map((item) => (
                            <div key={item.path} className="relative group">
                                {/* ...existing navigation item code... */}
                            </div>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center justify-end space-x-4 lg:space-x-8 py-3">
                        {additionalLinks.map(link => (
                            <Link 
                                key={link.path}
                                to={link.path} 
                                className="text-gray-700 hover:text-white transition-colors text-sm lg:text-base"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="relative">
                        {/* ...existing cart button code... */}
                    </div>
                </div>
            </div>
        </div>
    );
};