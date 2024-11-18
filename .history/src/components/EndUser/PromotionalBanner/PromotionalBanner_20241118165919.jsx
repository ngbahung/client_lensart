import React from 'react';

const PromotionalBanner = ({ imageSrc, title, description }) => {
    return (
        <div className="w-full px-0 py-8">
            <div className="relative overflow-hidden">
                <img 
                    src={imageSrc}
                    alt="Promotional Banner" 
                    className="w-full h-[478px] Single Promotional Image Section"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-6">
                    <h3 className="text-2xl font-semibold">{title}</h3>
                    <p className="text-lg mt-2">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default PromotionalBanner;