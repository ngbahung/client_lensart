
import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import ProductCard from '../ProductCard/ProductCard';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
  >
    <BsArrowRight size={24} className="text-gray-800" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
  >
    <BsArrowLeft size={24} className="text-gray-800" />
  </button>
);

const ProductSlider = ({ title, products }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
    <div className="py-8">
      {title && (
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h2>
      )}
      <div className="relative px-8">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="px-2">
              <ProductCard
                discount={product.discount}
                image={product.image}
                name={product.name}
                sku={product.sku}
                currentPrice={product.currentPrice}
                originalPrice={product.originalPrice}
                onBuyClick={() => product.onBuyClick(product.id)}
                onProductClick={() => product.onProductClick(product.id)}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

ProductSlider.propTypes = {
  title: PropTypes.string,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      discount: PropTypes.string,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      sku: PropTypes.string.isRequired,
      currentPrice: PropTypes.number.isRequired,
      originalPrice: PropTypes.number,
      onBuyClick: PropTypes.func.isRequired,
      onProductClick: PropTypes.func.isRequired,
    })
  ).isRequired,
};

export default ProductSlider;