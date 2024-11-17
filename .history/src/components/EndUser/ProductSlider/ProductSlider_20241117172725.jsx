import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/ProductCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        responsive: [
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
                }
            }
        ]
    };

    return (
        <div className="product-slider relative px-4">
            <Slider {...settings}>
                {products.map(product => (
                    <div key={product.id} className="px-2">
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