
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/EndUser/Breadcrumb/Breadcrumb';
import CustomerReviews from '../../components/EndUser/CustomerReviews/CustomerReviews';
import { formatPrice } from '../../utils/formatPrice';

const ProductDetailPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    // Temporary mock data - replace with API call
    useEffect(() => {
        // Simulate API call
        const mockProduct = {
            id: productId,
            name: "Gọng kính Phi công cao cấp",
            description: "Gọng kính phi công với thiết kế hiện đại, chất liệu cao cấp mang lại cảm giác thoải mái khi đeo.",
            currentPrice: 1200000,
            originalPrice: 1500000,
            discount: "-20%",
            images: [
                "https://picsum.photos/800/800",
                "https://picsum.photos/800/800?random=1",
                "https://picsum.photos/800/800?random=2",
                "https://picsum.photos/800/800?random=3"
            ],
            specifications: {
                style: "Phi công",
                material: "Kim loại",
                gender: "Unisex",
                weight: "20g",
                size: "Medium",
                warranty: "12 tháng"
            },
            reviews: [
                {
                    userName: "Nguyễn Văn A",
                    rating: 5,
                    date: "2024-01-15",
                    comment: "Sản phẩm rất tốt, đóng gói cẩn thận, gọng kính chắc chắn."
                },
                {
                    userName: "Trần Thị B",
                    rating: 4,
                    date: "2024-01-10",
                    comment: "Đẹp như mong đợi, giao hàng nhanh."
                },
                {
                    userName: "Lê Văn C",
                    rating: 5,
                    date: "2024-01-05",
                    comment: "Chất lượng tuyệt vời, đáng đồng tiền."
                }
            ]
        };
        setProduct(mockProduct);
        console.log('Product data:', mockProduct); // Add this line to debug
    }, [productId]);

    // Update useEffect to set the page title
    useEffect(() => {
        if (product) {
            document.title = `${product.name} | LensArt Eyewear`;
        } else {
            document.title = 'Loading... | LensArt Eyewear';
        }
    }, [product]);

    const handleSubmitReview = (reviewData) => {
        // In a real application, this would be an API call
        const newReview = {
            userName: "Current User", // This would come from auth
            rating: reviewData.rating,
            date: new Date().toISOString(),
            comment: reviewData.comment
        };

        setProduct(prev => ({
            ...prev,
            reviews: [newReview, ...prev.reviews]
        }));
    };

    if (!product) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb items={["Trang chủ", "Gọng kính", product.name]} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                        <img
                            src={product.images[selectedImage]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {product.images.map((img, idx) => (
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
                <div className="space-y-6">
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

                    <div className="space-y-4">
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

                        <button className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-colors">
                            Thêm vào giỏ hàng
                        </button>
                        <button className="w-full bg-[#ecaa83] text-white py-3 rounded-lg hover:bg-[#e39b71] transition-colors">
                            Mua ngay
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Customer Reviews Section */}
            <div className="mt-12 border-t pt-8">
                <CustomerReviews 
                    reviews={product.reviews} 
                    onSubmitReview={handleSubmitReview}
                />
            </div>
        </div>
    );
};

export default ProductDetailPage;