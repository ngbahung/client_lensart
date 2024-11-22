import { Link } from 'react-router-dom';
import { useState } from 'react';

const Logo = () => {
    const [imageError, setImageError] = useState(false);

    return (
        <Link to='/' className="flex-shrink-0">
            <img 
                src="/src/assets/images/logoBrand.png" 
                alt="Logo" 
                className="h-6 w-auto sm:h-8 md:h-10 lg:h-12 transition-all duration-300"
                onError={(e) => {
                    setImageError(true);
                    e.target.src = '/src/assets/images/fallback-logo.png';
                }}
            />
        </Link>
    );
};

export default Logo;