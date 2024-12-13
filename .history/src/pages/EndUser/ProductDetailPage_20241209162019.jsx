import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/EndUser/Breadcrumb/Breadcrumb';
import CustomerReviews from '../../components/EndUser/CustomerReviews/CustomerReviews';
import ImageGallery from '../../components/EndUser/ImageGallery/ImageGallery';
import ProductDetails from '../../components/EndUser/ProductDetails/ProductDetail';
import BranchInfo from '../../components/EndUser/ProductDetails/BranchInfo';

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
            variants: {
                colors: [
                    { id: 1, name: "Đen", code: "#000000" },
                    { id: 2, name: "Vàng đồng", code: "#CFB53B" },
                    { id: 3, name: "Bạc", code: "#C0C0C0" }
                ],
                selectedColor: null
            },
            soldQuantity: 156,
            remainingQuantity: 23,
            isWishlisted: false,
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
            ],
            branchPrices: [
                {
                    branchId: 1,
                    branchName: "Chi nhánh Q7",
                    address: "190 Nguyễn Thị Thập, P. Bình Thuận, Q.7",
                    currentPrice: 1200000,
                    originalPrice: 1500000,
                    inStock: true
                },
                {
                    branchId: 2,
                    branchName: "Chi nhánh Q1",
                    address: "123 Lê Lợi, P. Bến Nghé, Q.1",
                    currentPrice: 1250000,
                    originalPrice: 1500000,
                    inStock: true
                },
                {
                    branchId: 3,
                    branchName: "Chi nhánh Gò Vấp",
                    address: "45 Quang Trung, P.10, Q. Gò Vấp",
                    currentPrice: 1180000,
                    originalPrice: 1500000,
                    inStock: false
                }
            ]
        };
        setProduct(mockProduct);
        console.log('Product data:', mockProduct); // Add this line to debug
    }, [productId]);
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb items={["Trang chủ", "Gọng kính", product.name]} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <ImageGallery images={product.images} />
                <div className="space-y-6">
                    <ProductDetails product={product} />
                    <BranchInfo />
                </div>
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