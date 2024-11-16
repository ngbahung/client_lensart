const Logo = () => {
    return (
        <div>
            {/* Logo thương hiệu */}
            <Link to='/' className="flex-shrink-0">
                <img 
                    src="/src/assets/images/logoBrand.png" 
                    alt="Logo" 
                    className="h-8 w-auto sm:h-10 md:h-12 lg:h-14 transition-all duration-200"
                />
            </Link>
        </div>
    );
};

export default Logo;