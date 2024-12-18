import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createReview } from '../../api/reviewsAPI';
import { useAuth } from '../../contexts/AuthContext';
import { checkWishlistStatus } from '../../api/wishlistAPI';

// Components
import ProductDetails from '../../components/EndUser/ProductDetails/ProductDetail';
import BranchInfo from '../../components/EndUser/ProductDetails/BranchInfo';
import ShippingReturnPolicy from '../../components/EndUser/ProductDetails/ShippingReturnPolicy';
import ProductSlider from '../../components/EndUser/ProductSlider/ProductSlider';
import Breadcrumb from '../../components/EndUser/Breadcrumb/Breadcrumb';
import ImageGallery from '../../components/EndUser/ImageGallery/ImageGallery';
import CustomerReviews from '../../components/EndUser/CustomerReviews/CustomerReviews';

// APIs
import { 
    getProductById, 
    getProductByCategoryId, 
    transformProduct,
    getProductImagesByProductId,
    getProductDetailsByProductId,
    getProductFeaturesByProductId,
    getFullProductDetails
} from '../../api/productsAPI';

// Constants
const BRANCH_COEFFICIENTS = {
    'hcm': 1.0,
    'hanoi': 1.05,
    'danang': 0.95
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
    const { user, isAuthenticated } = useAuth();
    const [product, setProduct] = useState({
        branchPrices: [], // Initialize with empty array
        // ...other product properties
    });
    const [similarProducts, setSimilarProducts] = useState([]); // Add this line
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const calculateBranchPrice = (originalPrice, location) => {
        if (!originalPrice) return 0;
        const coefficient = BRANCH_COEFFICIENTS[location] || 1;
        return Math.round(originalPrice * coefficient);
    };

    const filteredBranches = product && product.branchPrices 
        ? product.branchPrices.filter(branch => 
            selectedLocation === 'all' || branch.location === selectedLocation
        )
        : [];

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true);
                const productData = await getProductById(productId);
                setProduct(productData);
                
                // Only check wishlist status if user is authenticated
                if (isAuthenticated) {
                    const wishlistStatus = await checkWishlistStatus(productId);
                    setIsWishlisted(wishlistStatus);
                }
                
                // Get similar products if we have category_id
                if (productData.category?.id) {
                    const similarData = await getProductByCategoryId(productData.category.id);
                    setSimilarProducts(similarData
                        .filter(p => p.id !== parseInt(productId))
                        .map(transformProduct)
                        .slice(0, 8));
                }
            } catch (err) {
                setError(err.message);
                toast.error('Không thể tải thông tin sản phẩm');
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [productId, isAuthenticated]);

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

    const handleSubmitReview = async (reviewData) => {
        try {
            const review = {
                product_id: parseInt(productId),
                user_id: user.id,
                rating: reviewData.rating,
                review: reviewData.comment,
                status: 'active'
            };

            const newReview = await createReview(review);
            
            if (newReview.success) {
                toast.success('Đánh giá đã được gửi thành công!');
                // Update the product's reviews in state
                setProduct(prev => ({
                    ...prev,
                    reviews: [{
                        id: newReview.data.id,
                        userName: `${user.firstname} ${user.lastname}`,
                        rating: reviewData.rating,
                        comment: reviewData.comment,
                        date: new Date().toISOString(),
                        status: 'active'
                    }, ...prev.reviews]
                }));
            } else {
                toast.error(newReview.message || 'Không thể gửi đánh giá');
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi gửi đánh giá');
            console.error('Review submission error:', error);
        }
    };

    const handleBranchChange = (branchId) => {
        const newBranch = product.branchPrices.find(b => b.branchId === parseInt(branchId));
        setSelectedBranch(newBranch);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    {/* Add skeleton loading UI */}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 text-center text-red-500">
                {error}
            </div>
        );
    }

    if (!product) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb items={["Trang chủ", "Gọng kính", product.name]} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div className="space-y-6">
                    <ImageGallery images={product.images} />
                </div>
                <div className="space-y-6">
                    <ProductDetails 
                        product={{...product, isWishlisted}} 
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
            
            <div className="mt-8">
                <ShippingReturnPolicy />
            </div>
            
            <div className="mt-8 border-t pt-8">
                <CustomerReviews 
                    reviews={product.reviews} 
                    averageRating={product.averageRating}
                    totalReviews={product.totalReviews}
                    onSubmitReview={handleSubmitReview}
                />
            </div>

            <div className="px-2 sm:px-4 md:px-8">
                <div className="py-4 md:py-8">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#55d5d2] mb-4 md:mb-6 px-2 md:px-4 border-b-2 border-[#ecaa83] pb-2">MỚI NHẤT</h2>
                    <ProductSlider products={similarProducts} />
                </div>
            </div>

        </div>
    );
};

export default ProductDetailPage;