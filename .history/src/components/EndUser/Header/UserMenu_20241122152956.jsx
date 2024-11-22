
import React, { forwardRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiUser, BiCog, BiLogOut, BiBookOpen } from "react-icons/bi";

export const UserMenu = forwardRef(({ isRegistered, isDropdownOpen, setIsDropdownOpen, setIsRegistered }, ref) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsRegistered(false);
        setIsDropdownOpen(false);
        navigate('/login');
    };

    return (
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4 md:w-1/4 justify-end">
            <div className="relative" ref={ref}>
                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="p-1.5 sm:p-2 md:px-4 md:py-2 rounded-full bg-[#F5A97F] text-white hover:bg-[#f49b6a] transition-colors"
                >
                    <BiUser className="h-4 w-4 sm:h-5 sm:w-5 md:mr-2" />
                    <span className="hidden md:inline text-sm">Tài khoản</span>
                </button>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#ec905c] z-50">
                        <div className="py-2">
                            {isRegistered ? (
                                <>
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-white hover:bg-[#f49b6a]">
                                        <BiCog className="inline-block mr-2" /> Hồ sơ
                                    </Link>
                                    <button 
                                        onClick={handleLogout} 
                                        className="w-full text-left block px-4 py-2 text-sm text-white hover:bg-[#f49b6a]"
                                    >
                                        <BiLogOut className="inline-block mr-2" /> Đăng xuất
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="block px-4 py-2 text-sm text-white hover:bg-[#f49b6a]">
                                        Đăng nhập
                                    </Link>
                                    <Link to="/register" className="block px-4 py-2 text-sm text-white hover:bg-[#f49b6a]">
                                        Đăng ký
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <button className="hidden md:flex items-center p-2 md:px-4 md:py-2 rounded-full bg-[#F5A97F] text-white hover:bg-[#ec905c] transition-colors">
                <BiBookOpen className="h-5 w-5 md:mr-2" />
                <span className="font-semibold text-[15px] hidden md:inline">Chính sách</span>
            </button>
        </div>
    );
});