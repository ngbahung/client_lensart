import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProductCard from '../ProductCard/ProductCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomArrow = ({ direction, onClick }) => {
    const arrowClass = `absolute ${direction === 'left' ? '-left-2 sm:-left-6' : '-right-2 sm:-right-6'} top-1/2 -translate-y-1/2 
        bg-white rounded-full p-1.5 sm:p-2.5 shadow-md cursor-pointer z-10 hover:bg-gray-100 transition-colors`;
    
    return (
        <div className={arrowClass} onClick={onClick}>
            {direction === 'left' ? 
                <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" /> : 
                <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            }
        </div>
    );
};

const ProductSlider = ({ products }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        draggable: true,
        swipe: true,
        swipeToSlide: true,
        touchMove: true,
        prevArrow: <CustomArrow direction="left" />,
        nextArrow: <CustomArrow direction="right" />,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    dots: true
                }
            }
        ]
    };

    return (
        <div className="product-slider relative px-4 sm:px-12">
            <Slider {...settings}>
                {products.map(product => (
                    <div key={product.id} className="px-1 sm:px-2">
                        <ProductCard
                            {...product}
                            onBuyClick={() => console.log('Buy clicked', product.id)}
                            onProductClick={() => console.log('Product clicked', product.id)}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

ProductSlider.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            discount: PropTypes.string,
            image: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            sku: PropTypes.string.isRequired,
            currentPrice: PropTypes.number.isRequired,
            originalPrice: PropTypes.number,
        })
    ).isRequired,
};

export default ProductSlider;