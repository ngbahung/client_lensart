
import React, { useState } from 'react';
import { BiSearch } from "react-icons/bi";

export const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="flex-1 mx-2 sm:mx-4 lg:mx-8 flex justify-center md:w-2/4">
            <div className="relative w-full max-w-[486px]">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm..."
                    className="w-full h-9 sm:h-11 pl-8 sm:pl-10 pr-4 py-2 bg-[#6fd4d2]/50 rounded-[30px] text-sm outline-none focus:ring-2 focus:ring-[#6fd4d2] transition-all"
                />
                <BiSearch className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
            </div>
        </div>
    );
};