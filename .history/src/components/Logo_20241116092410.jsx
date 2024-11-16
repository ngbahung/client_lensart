import { Link } from 'react-router-dom';
import { useState } from 'react';

const Logo = () => {
    const [imageError, setImageError] = useState(false);

    return (
        <Link to='/' className="flex-shrink-0">
            <img 
                src="/src/assets/images/logoBrand.png" 
                alt="Logo" 
                className="h-8 w-auto sm:h-10 md:h-12 lg:h-14 transition-all duration-200"
                onError={(e) => {
                    setImageError(true);
                    e.target.src = '/src/assets/images/fallback-logo.png'; // Add a fallback image
                }}
            />
        </Link>
    );
};

export default Logo;