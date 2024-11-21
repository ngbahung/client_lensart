import React from 'react';

const PromotionalBanner = ({ imageSrc, title, description }) => {
    return (
        <div className="w-full px-0 py-4 md:py-8">
            <div className="relative overflow-hidden">
                <img 
                    src={imageSrc}
                    alt="Promotional Banner" 
                    className="w-full h-[478px] md:h-[350px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
                    <p className="text-base md:text-lg mt-2">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default PromotionalBanner;