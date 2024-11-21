import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { BsArrowRight } from 'react-icons/bs';
import { formatPrice } from '../../../utils/formatPrice';

// Sub-components with memo
const DiscountBadge = memo(({ discount }) => (
  <div className="absolute top-2 right-2 bg-green-400 text-white px-2 py-1 rounded-lg text-sm font-medium z-[5]">
    {discount}
  </div>
));

const ProductImage = memo(({ src, alt }) => (
  <div className="relative w-full h-36 sm:h-48 rounded-lg overflow-hidden bg-gray-100 mb-2 sm:mb-3">
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
    />
  </div>
));

const ProductInfo = memo(({ name }) => (
  <div className="px-1">
    <h3 className="font-medium text-gray-900 uppercase text-sm tracking-wide">
      {name}
    </h3>
  </div>
));

const ProductPrice = memo(({ currentPrice, originalPrice }) => (
  <div className="flex items-center gap-2 mt-2 px-1">
    <span className="text-lg font-semibold text-teal-500">
      {formatPrice(currentPrice)}
    </span>
    {originalPrice && (
      <span className="text-sm text-gray-400 line-through">
        {formatPrice(originalPrice)}
      </span>
    )}
  </div>
));

const BuyButton = memo(({ onClick }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className="w-full mt-3 flex items-center justify-between bg-teal-400 text-white px-4 py-2 rounded-full hover:bg-[#ecaa83] transition-colors group"
  >
    <span>Mua ngay</span>
    <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
  </button>
));

const ProductCard = ({
  id,
  discount,
  image,
  name,
  currentPrice,
  originalPrice,
  onBuyClick,
  onProductClick
}) => (
  <div className="w-full bg-white rounded-xl shadow-md p-2 relative hover:shadow-xl transition-shadow">
    {discount && <DiscountBadge discount={discount} />}
    
    <div 
      onClick={(e) => {
        e.preventDefault();
        onProductClick();
      }} 
      className="cursor-pointer"
    >
      <ProductImage src={image} alt={name} />
      <ProductInfo name={name} />
      <ProductPrice currentPrice={currentPrice} originalPrice={originalPrice} />
    </div>

    <BuyButton onClick={onBuyClick} />
  </div>
);

ProductCard.propTypes = {
  discount: PropTypes.string,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  currentPrice: PropTypes.number.isRequired,
  originalPrice: PropTypes.number,
  onBuyClick: PropTypes.func.isRequired,
  onProductClick: PropTypes.func.isRequired
};

// Optional: Adding loading and error states
export const ProductCardSkeleton = () => (
  <div className="w-full max-w-xs bg-white rounded-xl shadow-sm p-3 animate-pulse">
    <div className="w-full aspect-square rounded-lg bg-gray-200 mb-3" />
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
    <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />
    <div className="h-6 bg-gray-200 rounded w-full" />
  </div>
);

export const ProductCardError = ({ message = "Không thể tải sản phẩm" }) => (
  <div className="w-full max-w-xs bg-white rounded-xl shadow-sm p-3 text-center text-red-500">
    <p>{message}</p>
  </div>
);

export default memo(ProductCard);