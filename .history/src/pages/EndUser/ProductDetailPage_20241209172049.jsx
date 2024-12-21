import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/EndUser/Breadcrumb/Breadcrumb';
import CustomerReviews from '../../components/EndUser/CustomerReviews/CustomerReviews';
import ImageGallery from '../../components/EndUser/ImageGallery/ImageGallery';
import ProductDetails from '../../components/EndUser/ProductDetails/ProductDetail';
import BranchInfo from '../../components/EndUser/ProductDetails/BranchInfo';
import ShippingReturnPolicy from '../../components/EndUser/ProductDetails/ShippingReturnPolicy';

const BRANCH_COEFFICIENTS = {
    'hcm': 1.0,    // Base price
    'hanoi': 1.05, // 5% higher
    'danang': 0.95 // 5% lower
};

const LOCATIONS = [
    { id: 'all', name: 'Tất cả chi nhánh' },
    { id: 'hcm', name: 'Hồ Chí Minh' },
    { id: 'hanoi', name: 'Hà Nội' },
    { id: 'danang', name: 'Đà Nẵng' }
];

// Add this mapping at the top with other constants
const CITY_NAMES = {
    'hcm': 'Hồ Chí Minh',
    'hanoi': 'Hà Nội',
    'danang': 'Đà Nẵng'
};

const ProductDetailPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [selectedBranch, setSelectedBranch] = useState(null);

    const calculateBranchPrice = (originalPrice, location) => {
        const coefficient = BRANCH_COEFFICIENTS[location] || 1;
        return Math.round(originalPrice * coefficient);
    };

    const filteredBranches = product?.branchPrices.filter(branch => 
        selectedLocation === 'all' || branch.location === selectedLocation
    ) || [];

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
                    originalPrice: 1500000,
                    inStock: true,
                    location: 'hcm'
                },
                {
                    branchId: 2,
                    branchName: "Chi nhánh Q1",
                    address: "123 Lê Lợi, P. Bến Nghé, Q.1",
                    originalPrice: 1500000,
                    inStock: true,
                    location: 'hcm'
                },
                {
                    branchId: 3,
                    branchName: "Chi nhánh Hoàn Kiếm",
                    address: "45 Hàng Bài, Q. Hoàn Kiếm",
                    originalPrice: 1500000,
                    inStock: false,
                    location: 'hanoi'
                },
                {
                    branchId: 4,
                    branchName: "Chi nhánh Hải Châu",
                    address: "123 Lê Duẩn, Q. Hải Châu",
                    originalPrice: 1500000,
                    inStock: true,
                    location: 'danang'
                }
            ].map(branch => ({
                ...branch,
                currentPrice: calculateBranchPrice(branch.originalPrice, branch.location)
            }))
        };
        setProduct(mockProduct);
        setSelectedBranch(mockProduct.branchPrices[0]); // Set default branch
        console.log('Product data:', mockProduct); // Add this line to debug
    }, [productId]);

    useEffect(() => {
        if (filteredBranches.length > 0) {
            setSelectedBranch(filteredBranches[0]);
        }
    }, [selectedLocation]);

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

    const handleBranchChange = (branchId) => {
        const newBranch = product.branchPrices.find(b => b.branchId === parseInt(branchId));
        setSelectedBranch(newBranch);
    };

    if (!product) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb items={["Trang chủ", "Gọng kính", product.name]} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div className="space-y-6">
                    <ImageGallery images={product.images} />
                    <ShippingReturnPolicy />
                </div>
                <div className="space-y-6">
                    <ProductDetails 
                        product={product} 
                        selectedBranch={selectedBranch}
                        cityNames={CITY_NAMES} 
                    />
                    <BranchInfo 
                        branchPrices={filteredBranches}
                        selectedLocation={selectedLocation}
                        onLocationChange={setSelectedLocation}
                    />
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