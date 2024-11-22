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