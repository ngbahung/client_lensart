import React, { useEffect } from 'react';
import ProductSlider from '../../components/EndUser/ProductSlider/ProductSlider';
import BannerSlider from '../../components/EndUser/BannerSlider/BannerSlider';
import BlogSlider from '../../components/EndUser/BlogSlider/BlogSlider';
import PromotionalBanner from '../../components/EndUser/PromotionalBanner/PromotionalBanner';
import LogoCloud from '../../components/EndUser/LogoCloud/LogoCloud';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
            logo: 'https://banner2.cleanpng.com/20180804/bwe/kisspng-logo-brand-oakley-inc-trademark-product-design-5b65941f8bef94.5255621215333837115732.jpg'
        },
        {
            id: 3,
            name: 'Gucci',
            logo: 'https://example.com/gucci-logo.png'
        },
        {
            id: 4,
            name: 'Prada',
            logo: 'https://example.com/prada-logo.png'
        },
        {
            id: 5,
            name: 'Tom Ford',
            logo: 'https://example.com/tomford-logo.png'
        },
        {
            id: 6,
            name: 'Dior',
            logo: 'https://example.com/dior-logo.png'
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
