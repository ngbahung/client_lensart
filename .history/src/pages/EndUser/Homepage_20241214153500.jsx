import React, { useState, useEffect } from 'react';
import ProductSlider from '../../components/EndUser/ProductSlider/ProductSlider';
import BannerSlider from '../../components/EndUser/BannerSlider/BannerSlider';
import BlogSlider from '../../components/EndUser/BlogSlider/BlogSlider';
import PromotionalBanner from '../../components/EndUser/PromotionalBanner/PromotionalBanner';
import LogoCloud from '../../components/EndUser/LogoCloud/LogoCloud';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getBestSellingProducts, getProductByCategoryId, getProducts, transformProduct } from '../../api/productsApi';

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
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const data = await getBestSellingProducts();
            // Ensure all products are properly transformed
            const transformedProducts = data.map(product => transformProduct(product));
            setProducts(transformedProducts);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchProducts();
      }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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
