import React, { useState, useEffect } from 'react';
import ProductSlider from '../../components/EndUser/ProductSlider/ProductSlider';
import BannerSlider from '../../components/EndUser/BannerSlider/BannerSlider';
import BlogSlider from '../../components/EndUser/BlogSlider/BlogSlider';
import PromotionalBanner from '../../components/EndUser/PromotionalBanner/PromotionalBanner';
import LogoCloud from '../../components/EndUser/LogoCloud/LogoCloud';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 

const SliderSection = ({ title, children }) => (
    <div className="container mx-auto px-4 md:px-8">
        <div className="py-4 md:py-8">
            <h2 className="text-xl md:text-2xl font-semibold text-[#55d5d2] mb-4 md:mb-6 px-2 md:px-4 border-b-2 border-[#ecaa83] pb-2">
                {title}
            </h2>
            {children}
        </div>
    </div>
);

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
            id: 'product1',  // Use meaningful IDs
            discount: '-20%',
            image: 'https://picsum.photos/400/400', // Using placeholder image
            name: 'Classic Aviator',
            currentPrice: 1200000,
            originalPrice: 1500000,
        },
        {
            id: 'product2',
            discount: '-15%',
            image: 'https://picsum.photos/400/400?random=1',
            name: 'Modern Square',
            currentPrice: 900000,
            originalPrice: 1050000,
        },
        {
            id: 'product3',
            discount: '-25%',
            image: 'https://picsum.photos/400/400?random=2',
            name: 'Round Vintage',
            currentPrice: 850000,
            originalPrice: 1100000,
        },
        {
            id: 'product4',
            discount: '-10%',
            image: 'https://picsum.photos/400/400?random=3',
            name: 'Cat Eye Classic',
            currentPrice: 950000,
            originalPrice: 1050000,
        },
    ];

    const brands = [
        {
            id: 1,
            name: 'Ray-Ban',
            logo: 'https://blog.opticalh.com/wp-content/uploads/2024/10/Ray-Ban_logo.svg-1024x552.png'
        },
        {
            id: 2,
            name: 'Oakley',
            logo: 'https://i.pinimg.com/originals/1c/e1/80/1ce180da62952af7c28170616ce807e7.jpg'
        },
        {
            id: 3,
            name: 'Gucci',
            logo: 'https://logowik.com/content/uploads/images/493_gucci.jpg'
        },
        {
            id: 4,
            name: 'Prada',
            logo: 'https://cdn.sanity.io/images/kts928pd/production/5be7f05ad50b4254e440898461e4ad1026a11723-900x592.png'
        },
        {
            id: 5,
            name: 'Tom Ford',
            logo: 'https://logos-world.net/wp-content/uploads/2020/12/Tom-Ford-Logo.png'
        },
        {
            id: 6,
            name: 'Dior',
            logo: 'https://kreafolk.com/cdn/shop/articles/dior-logo-design-history-and-evolution-kreafolk_637ca925-15a9-4a0f-8b46-ee73ee0236eb.jpg?v=1717725054&width=2048'
        }
    ];

    return (
        <div>
            <BannerSlider banners={banners} />
            
            <div className="hidden md:block">
                <PromotionalBanner 
                    imageSrc="/src/assets/images/lensart_policy.png"
                    title="Chính sách chỉ có tại LensArt Eyewear"
                    description="Discover our exclusive eyewear collection"
                />
            </div>

            <SliderSection title="BÁN CHẠY NHẤT">
                <ProductSlider products={products} />
            </SliderSection>

            <LogoCloud brands={brands} />

            <SliderSection title="MỚI NHẤT">
                <ProductSlider products={products} />
            </SliderSection>

            <SliderSection title="BLOG">
                <BlogSlider />
            </SliderSection>
        </div>
    );
}

export default Homepage;