import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { formatPrice } from '../../../utils/formatPrice';

const ProductDetails = ({ product, selectedBranch }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(null);
    const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted);
  
    const handleQuantityChange = (type) => {
        setQuantity((prev) => (type === "increment" ? prev + 1 : prev > 1 ? prev - 1 : 1));
    };

    const handleColorSelect = (colorId) => {
        setSelectedColor(colorId);
    };

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
        // Here you would typically make an API call to update the wishlist
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
                    Giá tại: {selectedBranch.branchName}
                    {!selectedBranch.inStock && (
                        <span className="text-red-500 ml-2">- Hết hàng</span>
                    )}
                </div>
            )}

            <div className="flex items-center gap-4 mt-4">
                <span className="text-sm text-gray-500">Đã bán: {product.soldQuantity}</span>
            </div>

            <p className="text-gray-600">{product.description}</p>

            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Màu sắc:</h3>
                <div className="flex gap-3">
                    {product.variants.colors.map((color) => (
                        <button
                            key={color.id}
                            onClick={() => handleColorSelect(color.id)}
                            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                                selectedColor === color.id ? 'border-teal-500' : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color.code }}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Thông số kỹ thuật:</h3>
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b pb-2">
                            <span className="text-gray-600 capitalize">{key}:</span>
                            <span className="font-medium">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center space-x-4 mt-6">
                <label className="font-semibold">Số lượng:</label>
                <button className="border px-3 py-1" onClick={() => handleQuantityChange("decrement")}>-</button>
                <span>{quantity}</span>
                <button className="border px-3 py-1" onClick={() => handleQuantityChange("increment")}>+</button>
                <span className="text-sm text-gray-500 ml-4">Còn lại: {product.remainingQuantity}</span>
            </div>

            <div className="flex space-x-4">
                <button className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-colors">
                    Thêm vào giỏ hàng
                </button>
                <button className="w-full bg-[#ecaa83] text-white py-3 rounded-lg hover:bg-[#e39b71] transition-colors">
                    Mua ngay
                </button>
                <button 
                    className={`${isWishlisted ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors`}
                    onClick={toggleWishlist}
                >
                    <FaHeart size={24} />
                </button>
            </div>
        </>
    );
};

export default ProductDetails;