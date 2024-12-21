import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/EndUser/Breadcrumb/Breadcrumb';
import CustomerReviews from '../../components/EndUser/CustomerReviews/CustomerReviews';
import ProductDetail from '../../components/EndUser/ProductDetails/ProductDetail';

const ProductDetailPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

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
            
            <div className="mt-6">
                <ProductDetail product={product} />
            </div>
            
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