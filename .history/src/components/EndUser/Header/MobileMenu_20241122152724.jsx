
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";

export const MobileMenu = ({ isOpen, onClose, navItems, additionalLinks }) => {
    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 md:hidden ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
            <div className={`fixed inset-y-0 left-0 w-64 bg-white transform transition-transform duration-300 ease-in-out ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="p-4">
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4"
                    >
                        <AiOutlineClose className="h-6 w-6" />
                    </button>

                    <div className="mt-8">
                        {navItems.map((item) => (
                            <div key={item.path} className="mb-4">
                                {/* ...existing mobile menu items... */}
                            </div>
                        ))}

                        <div className="border-t pt-4 mt-4">
                            {additionalLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="block py-2 text-gray-600"
                                    onClick={onClose}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};