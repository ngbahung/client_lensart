import React, { useEffect } from 'react';
import ProductSlider from '../../components/EndUser/ProductSlider/ProductSlider';
import BannerSlider from '../../components/EndUser/BannerSlider/BannerSlider';
import BlogSlider from '../../components/EndUser/BlogSlider/BlogSlider';
import PromotionalBanner from '../../components/EndUser/PromotionalBanner/PromotionalBanner';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Homepage = () => {
    useEffect(() => {
        document.title = 'Trang chủ | LensArt Eyewear';
    }, []);

    const banners = [
        {
            id: 1,
            image: 'https://picsum.photos/1920/600',
            alt: 'New Collection 2024'
        },
        {
            id: 2,
            image: 'https://picsum.photos/1920/600?random=1',
            alt: 'Summer Sale'
        },
        {
            id: 3,
            image: 'https://picsum.photos/1920/600?random=2',
            alt: 'Designer Frames'
        }
    ];

    const products = [
        {
            id: 1,
            discount: '-20%',
            image: 'https://picsum.photos/400/400', // Using placeholder image
            name: 'Classic Aviator',
            sku: 'AV-001',
            currentPrice: 1200000,
            originalPrice: 1500000,
        },
        {
            id: 2,
            discount: '-15%',
            image: 'https://picsum.photos/400/400?random=1',
            name: 'Modern Square',
            sku: 'MS-002',
            currentPrice: 900000,
            originalPrice: 1050000,
        },
        {
            id: 3,
            discount: '-25%',
            image: 'https://picsum.photos/400/400?random=2',
            name: 'Round Vintage',
            sku: 'RV-003',
            currentPrice: 850000,
            originalPrice: 1100000,
        },
        {
            id: 4,
            discount: '-10%',
            image: 'https://picsum.photos/400/400?random=3',
            name: 'Cat Eye Classic',
            sku: 'CE-004',
            currentPrice: 950000,
            originalPrice: 1050000,
        },
    ];

    return (
        <div>
            <BannerSlider banners={banners} />
            
            <PromotionalBanner 
                imageSrc="/src/assets/images/lensart_policy.png"
                title="Chính sách chỉ có tại LensArt Eyewear"
                description="Discover our exclusive eyewear collection"
            />

            <div className="container mx-auto px-4 md:px-8">
                <div className="py-4 md:py-8">
                    <h2 className="text-xl md:text-2xl font-semibold text-[#55d5d2] mb-4 md:mb-6 px-2 md:px-4 border-b-2 border-[#ecaa83] pb-2">SẢN PHẨM NỔI BẬT</h2>
                    <ProductSlider products={products} />
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8">
                <div className="py-4 md:py-8">
                    <h2 className="text-xl md:text-2xl font-semibold text-[#55d5d2] mb-4 md:mb-6 px-2 md:px-4 border-b-2 border-[#ecaa83] pb-2">SẢN PHẨM NỔI BẬT</h2>
                    <ProductSlider products={products} />
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8">
                <div className="py-4 md:py-8">
                    <h2 className="text-xl md:text-2xl font-semibold text-[#55d5d2] mb-4 md:mb-6 px-2 md:px-4 border-b-2 border-[#ecaa83] pb-2">BÀI VIẾT MỚI NHẤT</h2>
                    <BlogSlider />
                </div>
            </div>
        </div>
    );
}

export default Homepage;
