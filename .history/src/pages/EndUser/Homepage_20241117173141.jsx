import React, { useEffect } from 'react';
import ProductSlider from '../../components/EndUser/ProductSlider/ProductSlider';

const Homepage = () => {
    useEffect(() => {
        document.title = 'Trang chủ | LensArt Eyewear';
    }, []);

    // Updated dummy data with valid image URLs
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
        <div className="container mx-auto">
            <div className="py-8">
                <h2 className="text-2xl font-semibold text-[#55d5d2] mb-6 px-4 border-b-10 border-[#ecaa83] pb-2">Sản phẩm nổi bật</h2>
                <ProductSlider products={products} />
            </div>
        </div>
    );
}

export default Homepage;
