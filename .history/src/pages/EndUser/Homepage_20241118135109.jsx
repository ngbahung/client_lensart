import React, { useEffect } from 'react';
import ProductSlider from '../../components/EndUser/ProductSlider/ProductSlider';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Homepage = () => {
    useEffect(() => {
        document.title = 'Trang chủ | LensArt Eyewear';
    }, []);

    const bannerSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

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
            <div className="banner-slider mb-4 md:mb-8">
                <Slider {...bannerSettings}>
                    {banners.map(banner => (
                        <div key={banner.id} className="relative">
                            <img 
                                src={banner.image} 
                                alt={banner.alt}
                                className="w-full h-[300px] md:h-[600px] object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 md:p-8">
                                <div className="container mx-auto">
                                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">{banner.alt}</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
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
