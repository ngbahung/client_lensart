import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { formatPrice } from '../../../utils/formatPrice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createWishlist, deleteWishlist } from '../../../api/wishlistAPI';
import { useAuth } from "../../../contexts/AuthContext";

const ProductDetails = ({ product, selectedBranch, cityNames }) => {  {/* Add cityNames to props */}
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(null);
    const [availableQuantity, setAvailableQuantity] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted);
    const [isWishlistLoading, setIsWishlistLoading] = useState(false);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
  
    // Calculate available quantity for selected branch and color
    useEffect(() => {
        if (selectedBranch && selectedColor) {
            const branchDetail = product.product_details?.find(
                detail => detail.branch_id === selectedBranch.branchId && 
                         detail.color === selectedColor
            );
            setAvailableQuantity(branchDetail?.quantity || 0);
        } else if (selectedColor) {
            // Sum quantity across all branches for selected color
            const totalQuantity = product.product_details?.reduce((sum, detail) => 
                detail.color === selectedColor ? sum + detail.quantity : sum, 0
            ) || 0;
            setAvailableQuantity(totalQuantity);
        } else {
            // Total quantity across all colors and branches
            setAvailableQuantity(product.remainingQuantity);
        }
    }, [selectedBranch, selectedColor, product.product_details]);

    const handleQuantityChange = (type) => {
        setQuantity(prev => {
            const newQuantity = type === "increment" ? prev + 1 : prev - 1;
            return Math.min(Math.max(1, newQuantity), availableQuantity);
        });
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color);
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
        try {
          if (isWishlisted) {
            await deleteWishlist(product.id);
            toast.success('Đã xóa khỏi danh sách yêu thích');
          } else {
            await createWishlist(product.id);
            toast.success('Đã thêm vào danh sách yêu thích');
          }
          setIsWishlisted(!isWishlisted);
        } catch (error) {
          toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
        } finally {
          setIsWishlistLoading(false);
        }
      };

    const currentPrice = selectedBranch?.currentPrice || product.currentPrice;
    const originalPrice = selectedBranch?.originalPrice || product.originalPrice;
    const discount = ((originalPrice - currentPrice) / originalPrice * 100).toFixed(0) + '%';

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
                    {product.variants.colors.map((color) => {
                        const colorQuantity = product.product_details
                            ?.filter(detail => detail.color === color.name)
                            .reduce((sum, detail) => sum + detail.quantity, 0) || 0;

                        return (
                            <button
                                key={color.id}
                                onClick={() => handleColorSelect(color.name)}
                                disabled={colorQuantity === 0}
                                className={`px-4 py-2 text-sm rounded-lg border transition-all
                                    ${selectedColor === color.name 
                                        ? 'border-teal-500 bg-teal-50 text-teal-700 font-medium' 
                                        : 'border-gray-300 hover:border-teal-500 text-gray-700'}
                                    ${colorQuantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {color.name}
                                <span className="block text-xs text-gray-500">
                                    {colorQuantity > 0 ? `Còn ${colorQuantity}` : 'Hết hàng'}
                                </span>
                            </button>
                        );
                    })}
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

            <div className="flex items-center space-x-4 mt-6">
                <label className="font-semibold">Số lượng:</label>
                <button 
                    className="border px-3 py-1 disabled:opacity-50"
                    onClick={() => handleQuantityChange("decrement")}
                    disabled={quantity <= 1}
                >
                    -
                </button>
                <span>{quantity}</span>
                <button 
                    className="border px-3 py-1 disabled:opacity-50"
                    onClick={() => handleQuantityChange("increment")}
                    disabled={quantity >= availableQuantity}
                >
                    +
                </button>
                <span className="text-sm text-gray-500 ml-4">
                    Còn lại: {availableQuantity}
                </span>
            </div>

            <div className="flex space-x-4">
                <button 
                    className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50"
                    disabled={!selectedColor || availableQuantity === 0}
                >
                    THÊM VÀO GIỎ HÀNG
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
                      } hover:text-red-500 transition-colors disabled:opacity-50`}
                      onClick={handleWishlist}
                      disabled={isWishlistLoading}
                ></button>
                    <FaHeart size={24} className={isWishlistLoading ? 'animate-pulse' : ''} />
                </button>
            </div>
        </>
    );
};

export default ProductDetails;