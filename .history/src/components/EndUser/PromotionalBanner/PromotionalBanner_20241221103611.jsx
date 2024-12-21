import React, { useState, useEffect } from 'react';
import { fetchBanner } from '../../../api/bannerAPI';

const PromotionalBanner = () => {
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        const loadBanner = async () => {
            try {
                const bannerData = await fetchBanner();
                setBanner(bannerData[0]); // Assuming we want the first banner
            } catch (error) {
                console.error('Error loading banner:', error);
            }
        };
        loadBanner();
    }, []);

    if (!banner) return null;

    return (
        <div className="w-full px-0 py-4 md:py-8">
            <div className="relative overflow-hidden">
                <img 
                    src={banner.image_url}
                    alt={banner.image_public_id || "Promotional Banner"}
                    className="w-full h-[478px] md:h-[487px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl font-semibold">{banner.title}</h3>
                    <p className="text-base md:text-lg mt-2">{banner.description}</p>
                </div>
            </div>
        </div>
    );
};

export default PromotionalBanner;