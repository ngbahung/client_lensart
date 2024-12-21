// Import các thư viện và dependencies cần thiết
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { BsArrowRight } from 'react-icons/bs';
import { formatPrice } from '../../../utils/formatPrice';

// Component hiển thị badge giảm giá
const DiscountBadge = memo(({ discount }) => (
  <div className="absolute top-2 right-2 bg-green-400 text-white px-2 py-1 rounded-lg text-sm font-medium z-[5]">
    {discount}
  </div>
));

// Component hiển thị hình ảnh sản phẩm với hiệu ứng hover
const ProductImage = memo(({ src, alt }) => (
  <div className="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100 mb-2">
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
    />
  </div>
));

// Component hiển thị tên sản phẩm
const ProductInfo = memo(({ name }) => (
  <div className="px-1 h-10">
    <h3 className="font-medium text-gray-900 uppercase text-lg tracking-wide line-clamp-2">
      {name}
    </h3>
  </div>
));

// Component hiển thị giá sản phẩm (giá hiện tại và giá gốc nếu có)
const ProductPrice = memo(({ currentPrice, originalPrice }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 mt-1 sm:mt-2 px-1">
    <span className="text-base sm:text-lg font-semibold text-teal-500">
      {formatPrice(currentPrice)}
    </span>
    {originalPrice && originalPrice !== currentPrice && (
      <span className="text-xs sm:text-sm text-gray-400 line-through">
        {formatPrice(originalPrice)}
      </span>
    )}
  </div>
));

// Component nút mua hàng với hiệu ứng hover
const BuyButton = memo(({ onClick, id }) => (  // Add id prop
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick(id);  // Pass id to click handler
    }}
    className="w-full mt-3 flex items-center justify-between bg-teal-400 text-white px-4 py-2 rounded-full hover:bg-[#ecaa83] transition-colors group"
  >
    <span>Mua ngay</span>
    <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
  </button>
));

// Component chính hiển thị thẻ sản phẩm
// Bao gồm: ảnh, tên, giá, badge giảm giá (nếu có) và nút mua hàng
const ProductCard = ({
  id,  // Ensure id is received
  discount,
  image,
  name,
  currentPrice,
  originalPrice,
  onBuyClick,
  onProductClick
}) => (
  <div className="w-full bg-white rounded-xl shadow-md p-3 relative hover:shadow-xl transition-shadow flex flex-col h-[350px]">
    {discount && discount !== '-0%' && <DiscountBadge discount={discount} />}
    
    <div 
      onClick={(e) => {
        e.preventDefault();
        onProductClick(id);  // Pass id to click handler
      }} 
      className="cursor-pointer flex-1"
    >
      <ProductImage src={image} alt={name} />
      <ProductInfo name={name} />
      <ProductPrice currentPrice={currentPrice} originalPrice={originalPrice} />
    </div>

    <div className="mt-auto pt-4">
      <BuyButton onClick={onBuyClick} id={id} />
    </div>
  </div>
);

// Định nghĩa kiểu dữ liệu cho props của ProductCard
ProductCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  discount: PropTypes.string,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  currentPrice: PropTypes.number.isRequired,
  originalPrice: PropTypes.number,
  onBuyClick: PropTypes.func.isRequired,
  onProductClick: PropTypes.func.isRequired
};

// Component hiển thị khung xương khi đang tải dữ liệu
export const ProductCardSkeleton = () => (
  <div className="w-full max-w-xs bg-white rounded-xl shadow-sm p-3 animate-pulse">
    <div className="w-full aspect-square rounded-lg bg-gray-200 mb-3" />
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
    <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />
    <div className="h-6 bg-gray-200 rounded w-full" />
  </div>
);

// Component hiển thị khi có lỗi tải dữ liệu sản phẩm
export const ProductCardError = ({ message = "Không thể tải s��n phẩm" }) => (
  <div className="w-full max-w-xs bg-white rounded-xl shadow-sm p-3 text-center text-red-500">
    <p>{message}</p>
  </div>
);

// Xuất component ProductCard với React.memo để tối ưu hiệu năng
export default memo(ProductCard);