import React from 'react';

const PromotionalBanner = ({ imageSrc, title, description }) => {
    return (
        <div className="w-full px-0 py-4 sm:py-8">
            <div className="relative overflow-hidden">
                <img 
                    src={imageSrc}
                    alt="Promotional Banner" 
                    className="w-full h-[300px] sm:h-[478px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-semibold">{title}</h3>
                    <p className="text-base sm:text-lg mt-1 sm:mt-2">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default PromotionalBanner;