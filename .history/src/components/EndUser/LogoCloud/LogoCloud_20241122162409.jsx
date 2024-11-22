import React from 'react';

const LogoCloud = ({ brands }) => (
    <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-800 mb-8">
                Thương hiệu nổi tiếng
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
                {brands.map((brand) => (
                    <div key={brand.id} className="flex items-center justify-center p-4 hover:opacity-75 transition-opacity">
                        <img
                            src={brand.logo}
                            alt={brand.name}
                            className="h-20 w-auto md:h-24 object-contain" // Increased from h-12 to h-20/h-24
                        />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default LogoCloud;