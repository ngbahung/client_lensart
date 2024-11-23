
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { formatPrice } from '../../../utils/formatPrice';

const ProductQuickView = ({ product, isOpen, onClose, onAddToCart, onBuyNow }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                    <div className="absolute right-4 top-4">
                        <button 
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 p-2"
                        >
                            <IoClose size={24} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {product.images?.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`aspect-square rounded-lg overflow-hidden bg-gray-100 ${
                                            selectedImage === idx ? 'ring-2 ring-teal-500' : ''
                                        }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                            
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-bold text-teal-500">
                                    {formatPrice(product.currentPrice)}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-lg text-gray-400 line-through">
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
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(product.specifications || {}).map(([key, value]) => (
                                        <div key={key} className="flex justify-between border-b pb-2">
                                            <span className="text-gray-600 capitalize">{key}:</span>
                                            <span className="font-medium">{value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4">
                                    <label className="text-gray-700">Số lượng:</label>
                                    <div className="flex items-center border rounded-lg">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-3 py-1 border-r hover:bg-gray-100"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-1">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="px-3 py-1 border-l hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => onAddToCart(product.id, quantity)}
                                        className="flex-1 bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        Thêm vào giỏ
                                    </button>
                                    <button 
                                        onClick={() => onBuyNow(product.id, quantity)}
                                        className="flex-1 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-colors"
                                    >
                                        Mua ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductQuickView;