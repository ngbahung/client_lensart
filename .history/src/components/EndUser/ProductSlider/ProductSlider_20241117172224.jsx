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
        <div className="product-slider">
            <style jsx>{`
                .product-slider .slick-track {
                    margin-left: 0;
                    padding: 1rem 0;
                }
                .product-slider .slick-slide {
                    padding: 0 0.5rem;
                }
                .product-slider .slick-dots li button:before {
                    color: #2DD4BF;
                }
                .product-slider .slick-dots li.slick-active button:before {
                    color: #14B8A6;
                }
            `}</style>
            <Slider {...settings}>
                {products.map(product => (
                    <div key={product.id}>
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