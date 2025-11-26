import React, { useState, useEffect } from 'react';
import { fetchBanner } from '../../../api/bannerAPI';

const PromotionalBanner = () => {
    const [banner, setBanner] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBanner = async () => {
            try {
                setLoading(true);
                const bannerData = await fetchBanner();
                if (bannerData && bannerData.status === 'active') {
                    setBanner(bannerData);
                }
            } catch (error) {
                console.error('Error loading banner:', error);
            } finally {
                setLoading(false);
            }
        };
        loadBanner();
    }, []);

    if (loading) return null;
    if (!banner || banner.status !== 'active') return null;

    return (
        <div className="w-full px-0 pb-4 md:pb-8">
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