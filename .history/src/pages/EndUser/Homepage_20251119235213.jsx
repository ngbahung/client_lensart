import React, { useState, useEffect } from 'react';
import ProductSlider from '../../components/EndUser/ProductSlider/ProductSlider';
import BannerSlider from '../../components/EndUser/BannerSlider/BannerSlider';
import BlogSlider from '../../components/EndUser/BlogSlider/BlogSlider';
import PromotionalBanner from '../../components/EndUser/PromotionalBanner/PromotionalBanner';
import LogoCloud from '../../components/EndUser/LogoCloud/LogoCloud';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getBestSellingProducts, getNewestProducts, transformProduct } from '../../api/productsAPI';
import { getActiveBlogs } from '../../api/blogsAPI';
import HomePageSkeleton from '../../components/EndUser/Loading/HomePageSkeleton';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-screen">
        <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-[#55d5d2] border-t-transparent animate-spin"></div>
            <div className="mt-4 text-center text-[#55d5d2] font-medium">
                Loading...
            </div>
        </div>
    </div>
);

const SliderSection = ({ title, children }) => (
    <div className="container mx-auto px-4 md:px-8">
        <div className="py-4 md:pb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-[#55d5d2] mb-4 md:mb-6 px-2 md:px-4 border-b-2 border-[#ecaa83] pb-2">
                {title}
            </h2>
            {children}
        </div>
    </div>
);

const Homepage = () => {
    const [bestSeller, setBestSellerProducts] = useState([]);
    const [newest, setNewestProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bestSellerData, newestData, blogsData] = await Promise.all([
                    getBestSellingProducts(),
                    getNewestProducts(),
                    getActiveBlogs()
                ]);

                setBestSellerProducts(bestSellerData.map(product => transformProduct(product)));
                setNewestProducts(newestData.map(product => transformProduct(product)));
                console.log('Fetched blogs:', blogsData); // Add this to debug
                setBlogs(blogsData.blogs || []); // Access the blogs array from the response
            } catch (err) {
                console.error('Error fetching data:', err); // Add error logging
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);

    if (loading) return <HomePageSkeleton />;
    if (error) return <div>Error: {error}</div>;                     

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
            {/* <BannerSlider banners={banners} /> */}
            
            <div className="hidden md:block">
                <PromotionalBanner 
                    imageSrc="/src/assets/images/lensart_policy.png"
                    title="Chính sách chỉ có tại LensArt Eyewear"
                    description="Discover our exclusive eyewear collection"
                />
            </div>

            <SliderSection title="BÁN CHẠY NHẤT">
                <ProductSlider products={bestSeller} />
            </SliderSection>

            <LogoCloud brands={brands} />

            <SliderSection title="MỚI NHẤT">
                <ProductSlider products={newest} />
            </SliderSection>

            <SliderSection title="BLOG">
                <BlogSlider blogs={blogs} />
            </SliderSection>
        </div>
    );
}

export default Homepage;