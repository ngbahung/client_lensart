import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { formatPrice } from '../../../utils/formatPrice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createWishlist, deleteWishlist } from '../../../api/wishlistAPI';
import { useAuth } from "../../../contexts/AuthContext";
import { useCart } from '../../../contexts/CartContext';

const ProductDetails = ({ product, selectedBranch, cityNames }) => {  {/* Add cityNames to props */}
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(null);
    const [availableQuantity, setAvailableQuantity] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted);
    const [isWishlistLoading, setIsWishlistLoading] = useState(false);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [colorQuantities, setColorQuantities] = useState({});
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const { addToCart } = useCart();
    const [wishlistButtonStyle, setWishlistButtonStyle] = useState({});
  
    // Calculate quantities for each color in each branch
    useEffect(() => {
        const quantities = {};
        product.variants.colors.forEach(color => {
            // Get quantities by branch for this color
            const branchQuantities = product.product_details
                .filter(detail => detail.color === color.name && detail.status === 'active')
                .reduce((acc, detail) => ({
                    ...acc,
                    [detail.branch_id]: detail.quantity
                }), {});

            quantities[color.name] = {
                total: color.totalQuantity,
                byBranch: branchQuantities
            };
        });
        setColorQuantities(quantities);
    }, [product.variants.colors, product.product_details]);

    // Update available quantity when branch or color changes
    useEffect(() => {
        if (!selectedColor || !selectedBranch) {
            setAvailableQuantity(0);
            setQuantity(1);
            return;
        }

        const currentVariant = product.variants.colors.find(c => c.name === selectedColor);
        if (currentVariant && currentVariant.quantities[selectedBranch.branchId]) {
            const currentQuantity = currentVariant.quantities[selectedBranch.branchId].quantity;
            setAvailableQuantity(currentQuantity);
            // Ensure current quantity doesn't exceed available stock
            setQuantity(prev => Math.min(prev, currentQuantity));
        } else {
            setAvailableQuantity(0);
            setQuantity(1);
        }
    }, [selectedBranch, selectedColor, product.variants.colors]);

    const handleQuantityChange = (type) => {
        if (!selectedColor || !selectedBranch) return;

        setQuantity(prev => {
            const newQuantity = type === "increment" ? prev + 1 : prev - 1;
            // Ensure quantity stays within valid range
            return Math.min(Math.max(1, newQuantity), availableQuantity);
        });
    };

    const handleColorSelect = (colorName) => {
        setSelectedColor(colorName);
        setQuantity(1); // Reset quantity when color changes
    };

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
        // Here you would typically make an API call to update the wishlist
    };

    const handleWishlist = async () => {
        if (!isAuthenticated) {
            toast.info('Vui lòng đăng nhập để thêm vào danh sách yêu thích');
            navigate('/login');
            return;
        }

        setIsWishlistLoading(true);
        // Add button press effect
        setWishlistButtonStyle({ transform: 'scale(0.95)' });

        try {
            if (isWishlisted) {
                const response = await deleteWishlist(product.id);
                if (response.success) {
                    setIsWishlisted(false);
                    // Animate heart when removing
                    setWishlistButtonStyle({ transform: 'scale(1.2)' });
                    setTimeout(() => setWishlistButtonStyle({}), 200);
                    toast.success(response.message || 'Đã xóa khỏi danh sách yêu thích');
                } else {
                    throw new Error(response.message);
                }
            } else {
                const response = await createWishlist(product.id);
                if (response.success) {
                    setIsWishlisted(true);
                    // Animate heart when adding
                    setWishlistButtonStyle({ transform: 'scale(1.2)' });
                    setTimeout(() => setWishlistButtonStyle({}), 200);
                    toast.success(response.message || 'Đã thêm vào danh sách yêu thích');
                } else {
                    throw new Error(response.message);
                }
            }
        } catch (error) {
            toast.error(error.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
            setWishlistButtonStyle({});
            console.error('Wishlist operation error:', error);
        } finally {
            setIsWishlistLoading(false);
            // Reset button style after a delay
            setTimeout(() => setWishlistButtonStyle({}), 200);
        }
    };

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            toast.info('Vui lòng đăng nhập để thêm vào giỏ hàng');
            navigate('/login');
            return;
        }

        if (!selectedColor || !selectedBranch) {
            toast.error('Vui lòng chọn màu sắc và chi nhánh');
            return;
        }

        if (quantity < 1 || quantity > availableQuantity) {
            toast.error('Số lượng không hợp lệ');
            return;
        }

        setIsAddingToCart(true);
        try {
            await addToCart(
                product.id,
                selectedBranch.branchId,
                selectedColor,
                quantity
            );
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Có lỗi xảy ra khi thêm vào giỏ hàng');
        } finally {
            setIsAddingToCart(false);
        }
    };

    const calculatePrices = () => {
        if (!selectedBranch) {
          return {
            current: product.currentPrice,
            original: product.originalPrice
          };
        }
    
        const priceIndex = selectedBranch.priceIndex;
        return {
          current: Math.round(product.currentPrice * priceIndex),    // currentPrice is already the offer_price
          original: Math.round(product.originalPrice * priceIndex)   // originalPrice is the base price
        };
      };
    
      const { current: currentPrice, original: originalPrice } = calculatePrices();
      const discount = ((originalPrice - currentPrice) / originalPrice * 100).toFixed(0) + '%';

    const renderColorOptions = () => {
        return product.variants.colors.map(color => {
          const branchQuantity = selectedBranch 
            ? color.quantities[selectedBranch.branchId]?.quantity || 0
            : Object.values(color.quantities).reduce((sum, branch) => sum + branch.quantity, 0);
          
          const isAvailable = branchQuantity > 0;
    
          return (
            <button
              key={color.name}
              onClick={() => handleColorSelect(color.name)}
              disabled={!isAvailable}
              className={`px-4 py-2 text-sm rounded-lg border transition-all
                ${selectedColor === color.name 
                  ? 'border-teal-500 bg-teal-50 text-teal-700 font-medium' 
                  : 'border-gray-300 hover:border-teal-500 text-gray-700'}
                ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {color.name}
              <span className="block text-xs text-gray-500">
                {isAvailable ? `Còn ${branchQuantity}` : 'Hết hàng'}
              </span>
            </button>
          );
        });
      };

    const renderQuantityControls = () => (
        <div className="flex items-center space-x-4 mt-6">
            <label className="font-semibold">Số lượng:</label>
            <button 
                className="border px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleQuantityChange("decrement")}
                disabled={!selectedColor || !selectedBranch || quantity <= 1}
            >
                -
            </button>
            <span className="w-12 text-center">{quantity}</span>
            <button 
                className="border px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleQuantityChange("increment")}
                disabled={!selectedColor || !selectedBranch || quantity >= availableQuantity}
            >
                +
            </button>
            <span className="text-sm text-gray-500">
                {selectedColor && selectedBranch
                    ? availableQuantity > 0 
                        ? `Còn lại: ${availableQuantity}` 
                        : 'Hết hàng'
                    : 'Vui lòng chọn màu sắc và chi nhánh'}
            </span>
        </div>
    );

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            
            <div className="flex items-center gap-4 flex-wrap">
                <span className="text-3xl font-bold text-teal-500">
                    {formatPrice(currentPrice)}
                </span>
                <span className="text-xl text-gray-400 line-through">
                    {formatPrice(originalPrice)}
                </span>
                <span className="bg-green-400 text-white px-2 py-1 rounded-lg">
                    -{discount}
                </span>
            </div>

            {selectedBranch && (
                <div className="mt-2 text-sm text-gray-600">
                    Giá tại: {cityNames[selectedBranch.location]}
                    {!selectedBranch.inStock && (
                        <span className="text-red-500 ml-2">- Hết hàng</span>
                    )}
                </div>
            )}

            <p className="text-gray-600">{product.description}</p>

            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Màu sắc:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {renderColorOptions()}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Thông số:</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Thương hiệu:</span>
                        <span className="font-medium">{product.brand?.name}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Chất liệu:</span>
                        <span className="font-medium">{product.material?.name}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Kiểu dáng:</span>
                        <span className="font-medium">{product.shape?.name}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Giới tính:</span>
                        <span className="font-medium">{product.specifications.gender}</span>
                    </div>
                </div>
            </div>

            {renderQuantityControls()}

            <div className="flex space-x-4">
                <button 
                    className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 flex items-center justify-center"
                    disabled={!selectedColor || availableQuantity === 0 || isAddingToCart}
                    onClick={handleAddToCart}
                >
                    {isAddingToCart ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            ĐANG THÊM...
                        </span>
                    ) : (
                        'THÊM VÀO GIỎ HÀNG'
                    )}
                </button>
                <button 
                    className="w-full bg-[#ecaa83] text-white py-3 rounded-lg hover:bg-[#e39b71] transition-colors disabled:opacity-50"
                    disabled={!selectedColor || availableQuantity === 0}
                >
                    MUA NGAY
                </button>
                <button 
                    className={`${
                        isWishlisted ? 'text-red-500' : 'text-gray-400'
                    } hover:text-red-500 transition-all duration-200 disabled:opacity-50`}
                    onClick={handleWishlist}
                    disabled={isWishlistLoading}
                    style={{
                        ...wishlistButtonStyle,
                        transition: 'all 0.2s ease'
                    }}
                >
                    <FaHeart 
                        size={24} 
                        className={`${isWishlistLoading ? 'animate-pulse' : ''} 
                            ${isWishlisted ? 'fill-current' : 'stroke-current'}`}
                    />
                </button>
            </div>
        </>
    );
};

export default ProductDetails;