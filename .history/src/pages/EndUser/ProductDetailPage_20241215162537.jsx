import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// Components
import ProductDetails from '../../components/EndUser/ProductDetails/ProductDetail';
import BranchInfo from '../../components/EndUser/ProductDetails/BranchInfo';
import ShippingReturnPolicy from '../../components/EndUser/ProductDetails/ShippingReturnPolicy';
import ProductSlider from '../../components/EndUser/ProductSlider/ProductSlider';

// APIs
import { 
  getProductById, 
  getProductByCategoryId, 
  transformProduct,
  getProductImagesByProductId,
  getProductDetailsByProductId,
  getProductFeaturesByProductId,
    get
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
    const [product, setProduct] = useState({
        branchPrices: [], // Initialize with empty array
        // ...other product properties
    });
    const [similarProducts, setSimilarProducts] = useState([]); // Add this line
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                const fullProductData = await getFullProductDetails(productId);
                setProduct(fullProductData);
                
                if (fullProductData.category_id) {
                    const similarData = await getProductByCategoryId(fullProductData.category_id);
                    setSimilarProducts(similarData.map(transformProduct)
                        .filter(p => p.id !== parseInt(productId))
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
            
            <div className="mt-8">
                <ShippingReturnPolicy />
            </div>
            
            <div className="mt-8 border-t pt-8">
                <CustomerReviews 
                    reviews={product.reviews} 
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