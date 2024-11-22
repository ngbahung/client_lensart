import React, { useState, useRef, useEffect } from 'react';
import { navItems, additionalLinks } from '../../../config/navigation.config';
import { SearchBar } from './SearchBar';
import { UserMenu } from './UserMenu';
import { MobileMenu } from './MobileMenu';
import { MainNavigation } from './MainNavigation';
import { CartButton } from './CartButton';
import Logo from '../../Logo';
import 

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <header className="w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
                <div className="container mx-auto px-2 sm:px-4">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between h-14 sm:h-16">
                        <div className="flex items-center md:w-1/4 space-x-2">
                            <button 
                                className="md:hidden p-1.5"
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <BiMenu className="h-5 w-5 sm:h-6 sm:w-6" />
                            </button>
                            <Logo />
                        </div>

                        <SearchBar />

                        <UserMenu 
                            ref={dropdownRef}
                            isRegistered={isRegistered}
                            isDropdownOpen={isDropdownOpen}
                            setIsDropdownOpen={setIsDropdownOpen}
                            setIsRegistered={setIsRegistered}
                        />
                    </div>
                </div>

                {/* Main Navigation */}
                <MainNavigation 
                    navItems={navItems} 
                    additionalLinks={additionalLinks}
                    cartCount={cartCount}
                />
            </header>

            <MobileMenu 
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                navItems={navItems}
                additionalLinks={additionalLinks}
            />

            <CartButton cartCount={cartCount} />
        </>
    );
};

export default Header;