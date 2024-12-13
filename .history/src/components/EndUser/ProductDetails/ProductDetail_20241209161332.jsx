import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { formatPrice } from '../../../utils/formatPrice';

const ProductDetails = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
  
    const handleQuantityChange = (type) => {
        setQuantity((prev) => (type === "increment" ? prev + 1 : prev > 1 ? prev - 1 : 1));
    };
  
    return (
        <>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            
            <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-teal-500">
                    {formatPrice(product.currentPrice)}
                </span>
                {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                    </span>
                )}
                {product.discount && (
                    <span className="bg-green-400 text-white px-2 py-1 rounded-lg">
                        {product.discount}
                    </span>
                )}
            </div>

            <p className="text-gray-600">{product.description}</p>

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

            <div className="flex items-center space-x-4">
                <label className="font-semibold">Số lượng:</label>
                <button className="border px-3 py-1" onClick={() => handleQuantityChange("decrement")}>-</button>
                <span>{quantity}</span>
                <button className="border px-3 py-1" onClick={() => handleQuantityChange("increment")}>+</button>
            </div>

            <div className="flex space-x-4">
                <button className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-colors">
                    Thêm vào giỏ hàng
                </button>
                <button className="w-full bg-[#ecaa83] text-white py-3 rounded-lg hover:bg-[#e39b71] transition-colors">
                    Mua ngay
                </button>
                <button className="text-red-500">
                    <FaHeart size={24} />
                </button>
            </div>
        </>
    );
};

export default ProductDetails;