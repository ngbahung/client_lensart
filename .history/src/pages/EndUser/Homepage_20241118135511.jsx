import React, { useEffect } from 'react';
import ProductSlider from '../../components/EndUser/ProductSlider/ProductSlider';
import BannerSlider from '../../components/EndUser/BannerSlider/BannerSlider';
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
            
            {/* Image Cards Section */}
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <img src="https://picsum.photos/600/400?random=10" alt="Promotion 1" className="w-full h-[200px] object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                            <h3 className="text-lg font-semibold">New Collection</h3>
                            <p className="text-sm">Discover our latest arrivals</p>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <img src="https://picsum.photos/600/400?random=11" alt="Promotion 2" className="w-full h-[200px] object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                            <h3 className="text-lg font-semibold">Summer Sale</h3>
                            <p className="text-sm">Up to 50% off on selected items</p>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <img src="https://picsum.photos/600/400?random=12" alt="Promotion 3" className="w-full h-[200px] object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                            <h3 className="text-lg font-semibold">Designer Frames</h3>
                            <p className="text-sm">Premium eyewear collection</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto">
                <div className="py-8">
                    <h2 className="text-2xl font-semibold text-[#55d5d2] mb-6 px-4 border-b-2 border-[#ecaa83] pb-2">SẢN PHẨM NỔI BẬT</h2>
                    <ProductSlider products={products} />
                </div>
            </div>
            <div className="container mx-auto">
                <div className="py-8">
                    <h2 className="text-2xl font-semibold text-[#55d5d2] mb-6 px-4 border-b-2 border-[#ecaa83] pb-2">SẢN PHẨM NỔI BẬT</h2>
                    <ProductSlider products={products} />
                </div>
            </div>
        </div>
    );
}

export default Homepage;
