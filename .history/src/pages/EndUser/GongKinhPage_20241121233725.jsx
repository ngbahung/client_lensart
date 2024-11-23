import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import SideBar from "../../components/EndUser/Filter/SideBar";
import ProductGrid from "../../components/EndUser/ProductGrid/ProductGrid";
import PromotionalBanner from "../../components/EndUser/PromotionalBanner/PromotionalBanner";
import Breadcrumb from "../../components/EndUser/Breadcrumb/Breadcrumb";
import ProductSlider from "../../components/EndUser/ProductSlider/ProductSlider";

const GongKinhPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [filters, setFilters] = useState({
        style: [],
        material: [],
        gender: [],
        priceRange: []
    });
    const [sortBy, setSortBy] = useState('newest'); // Add this line
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16;

    // Add URL parameter handling
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const styleParam = searchParams.get('style');
        const materialParam = searchParams.get('material');
        const genderParam = searchParams.get('gender');

        if (styleParam || materialParam || genderParam) {
            const newFilters = { ...filters };
            
            if (styleParam) {
                newFilters.style = [styleParam];
            }
            if (materialParam) {
                newFilters.material = [materialParam];
            }
            if (genderParam) {
                newFilters.gender = [genderParam];
            }

            setFilters(newFilters);
        }
    }, [location.search]);

    const handleFilterChange = (name, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: prevFilters[name].includes(value)
                ? prevFilters[name].filter((val) => val !== value)
                : [...prevFilters[name], value],
        }));
    };

    const handleBuyClick = (productId) => {
        console.log('Buy clicked for product:', productId);
    };

    const handleProductClick = (productId) => {
        navigate(`/gong-kinh/${productId}`);
    };

    const filterProducts = (products) => {
        return products.filter(product => {
            const matchesStyle = filters.style.length === 0 || filters.style.includes(product.style);
            const matchesMaterial = filters.material.length === 0 || filters.material.includes(product.material);
            const matchesGender = filters.gender.length === 0 || filters.gender.includes(product.gender);
            const matchesPriceRange = filters.priceRange.length === 0 || filters.priceRange.some(range => {
                const [min, max] = range.split('-').map(Number);
                return product.currentPrice >= min && product.currentPrice <= max;
            });

            return matchesStyle && matchesMaterial && matchesGender && matchesPriceRange;
        });
    };

    const filterAndSortProducts = (products) => {
        let result = filterProducts(products);
        
        // Apply sorting
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.currentPrice - b.currentPrice);
                break;
            case 'price-desc':
                result.sort((a, b) => b.currentPrice - a.currentPrice);
                break;
            case 'best-selling':
                // Assuming there's a sales property, you can modify this
                result.sort((a, b) => (b.sales || 0) - (a.sales || 0));
                break;
            case 'newest':
                // Assuming products array is already sorted by newest
                break;
            default:
                break;
        }
        return result;
    };

    const handleSortChange = (value) => {
        setSortBy(value);
        setCurrentPage(1); // Reset to first page when sorting changes
    };

    const products = [
        {
            id: 1,
            discount: "-20%",
            image: "https://picsum.photos/400/400",
            name: "Gọng kính Phi công",
            currentPrice: 1200000,
            originalPrice: 1500000,
            style: "Phi công",
            material: "Kim loại",
            gender: "Unisex"
        },
        {
            id: 2,
            discount: "-15%",
            image: "https://picsum.photos/400/400?random=1",
            name: "Gọng kính Vuông",
            currentPrice: 900000,
            originalPrice: 1050000,
            style: "Vuông",
            material: "Nhựa",
            gender: "Nam"
        },
        {
            id: 3,
            discount: "-25%",
            image: "https://picsum.photos/400/400?random=2",
            name: "Gọng kính Oval",
            currentPrice: 850000,
            originalPrice: 1100000,
            style: "Oval",
            material: "Kim loại",
            gender: "Nữ"
        },
        {
            id: 4,
            discount: "-10%",
            image: "https://picsum.photos/400/400?random=3",
            name: "Gọng kính Browline",
            currentPrice: 750000,
            originalPrice: 900000,
            style: "Browline",
            material: "Nhựa",
            gender: "Nam"
        },
        {
            id: 5,
            discount: "-30%",
            image: "https://picsum.photos/400/400?random=4",
            name: "Gọng kính Đa giác",
            currentPrice: 1050000,
            originalPrice: 1500000,
            style: "Đa giác",
            material: "Titanium",
            gender: "Nữ"
        },
        // ... you can continue with the rest of the products following the same pattern
    ]

    const filteredProducts = filterAndSortProducts(products);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div className="mt-1 container mx-auto px-2 sm:px-4">
            <Breadcrumb items={["Trang chủ", "Gọng kính"]} />
            <PromotionalBanner 
                imageSrc="https://picsum.photos/1200/400"
                title="New Collection Available"
                description="Discover our latest eyewear collection with exclusive discounts"
            />
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                <div className="w-full lg:w-1/4">
                    <SideBar 
                        onFilterChange={handleFilterChange}
                        filterOptions={{
                            style: ["Aviator", "Square", "Round", "Cat-Eye"],
                            material: ["Metal", "Plastic", "Acetate"],
                            gender: ["Men", "Women", "Unisex"],
                            priceRange: ["0-500000", "500000-1000000", "1000000-2000000"]
                        }}
                    />
                </div>
                <div className="w-full lg:w-3/4 mb-8">
                    <ProductGrid 
                        products={currentProducts}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        onBuyClick={handleBuyClick}
                        onProductClick={handleProductClick}
                        sortBy={sortBy}
                        onSortChange={handleSortChange}
                    />
                </div>
            </div>
            <div className="px-2 sm:px-4 md:px-8">
                <div className="py-4 md:py-8">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#55d5d2] mb-4 md:mb-6 px-2 md:px-4 border-b-2 border-[#ecaa83] pb-2">MỚI NHẤT</h2>
                    <ProductSlider products={products} />
                </div>
            </div>
        </div>
    );
}

export default GongKinhPage;