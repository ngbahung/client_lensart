
import React from 'react';
import { Link } from 'react-router-dom';
import { BsCart3 } from "react-icons/bs";

export const CartButton = ({ cartCount }) => {
    return (
        <Link 
            to="/gio-hang" 
            className="fixed bottom-4 right-4 bg-[#6fd4d2] p-3 rounded-full shadow-lg md:hidden z-40"
        >
            <div className="relative">
                <BsCart3 className="h-6 w-6 text-white" />
                {cartCount >= 0 && (
                    <div className="absolute -top-2 -right-2 bg-[#ec905c] text-white text-xs 
                        rounded-full h-4 w-4 flex items-center justify-center">
                        {cartCount}
                    </div>
                )}
            </div>
        </Link>
    );
};