import { Link } from 'react-router-dom';
import { useState } from 'react';

const Logo = () => {
    const [imageError, setImageError] = useState(false);

    // SVG fallback logo - không cần load file ngoài
    const FallbackLogo = () => (
        <svg 
            className="h-6 w-auto sm:h-8 md:h-10 lg:h-12" 
            viewBox="0 0 120 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="120" height="40" rx="4" fill="#55D5D2"/>
            <text 
                x="60" 
                y="25" 
                fontFamily="Arial, sans-serif" 
                fontSize="18" 
                fontWeight="bold" 
                fill="white" 
                textAnchor="middle"
            >
                LensArt
            </text>
        </svg>
    );

    return (
        <Link to='/' className="flex-shrink-0">
            {imageError ? (
                <FallbackLogo />
            ) : (
                <img 
                    src="/src/assets/images/logoBrand.png" 
                    alt="Logo" 
                    className="h-6 w-auto sm:h-8 md:h-10 lg:h-12 transition-all duration-300"
                    onError={() => setImageError(true)}
                />
            )}
        </Link>
    );
};

export default Logo;