import React, { useState, useEffect } from 'react';
import { fetchBanner } from '../../../api/bannerAPI';

const PromotionalBanner = () => {
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        const loadBanner = async () => {
            try {
                const bannerData = await fetchBanner();
                setBanner(bannerData); // Now directly using the data object
            } catch (error) {
                console.error('Error loading banner:', error);
            }
        };
        loadBanner();
    }, []);

    if (!banner || banner.status !== 'active') return null;

    return (
        <div className="w-full px-0 py-4 md:py-8">
            <div className="relative overflow-hidden">
                <img 
                    src={banner.image_url}
                    alt={banner.image_public_id || "Promotional Banner"}
                    className="w-full h-[478px] md:h-[487px] object-cover"
                />
            </div>
        </div>
    );
};

export default PromotionalBanner;