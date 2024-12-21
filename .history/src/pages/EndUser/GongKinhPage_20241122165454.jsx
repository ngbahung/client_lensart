import { useState, useEffect, useCallback } from "react"; // Add useCallback
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import SideBar from "../../components/EndUser/Filter/SideBar";
import ProductGrid from "../../components/EndUser/ProductGrid/ProductGrid";
import PromotionalBanner from "../../components/EndUser/PromotionalBanner/PromotionalBanner";
import Breadcrumb from "../../components/EndUser/Breadcrumb/Breadcrumb";
import ProductSlider from "../../components/EndUser/ProductSlider/ProductSlider";

const GongKinhPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { type, value } = useParams();
    const [pageTitle, setPageTitle] = useState("Gọng Kính");
    const [filters, setFilters] = useState({
        style: [],
        material: [],
        gender: [],
        priceRange: []
    });
    const [sortBy, setSortBy] = useState('newest'); // Add this line
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16;
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Handle page title based on filter params
    useEffect(() => {
        if (type && value) {
            let title;
            switch (type) {
                case 'material':
                    title = `Gọng ${decodeURIComponent(value)}`;
                    break;
                case 'style':
                    title = `Gọng Kính ${decodeURIComponent(value)}`;
                    break;
                case 'gender':
                    title = `Gọng Kính ${decodeURIComponent(value)}`;
                    break;
                default:
                    title = "Gọng Kính";
            }
            setPageTitle(title);
            // Update document title
            document.title = `${title} | LensArt`;
        } else {
            setPageTitle("Gọng Kính");
            document.title = "Gọng Kính | LensArt";
        }
    }, [type, value]);

    // Memoize the filter update function
    const updateFiltersFromParams = useCallback(() => {
        const params = new URLSearchParams(location.search);
        const newFilters = {
            style: [],
            material: [],
            gender: [],
            priceRange: []
        };

        for (const [key, value] of params.entries()) {
            if (newFilters.hasOwnProperty(key) && value) {
        for (const [key, value] of params.entries()) {
            if (newFilters.hasOwnProperty(key) && value) {
                newFilters[key] = [decodeURIComponent(value)];
                hasChanges = true;
            }
        }

        // Only update state if there are changes and we're not already synced
        if (hasChanges && JSON.stringify(newFilters) !== JSON.stringify(filters)) {
            setFilters(newFilters);
        }
    }, [location.search]); // Remove filters from dependencies

    // Update the filter handling
    useEffect(() => {
        if (type && value) {
            setFilters(prev => ({
                ...prev,
                [type]: [decodeURIComponent(value)]
            }));
        }
    }, [type, value]);

    // Update handleFilterChange to only update the filters state
    const handleFilterChange = (name, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: prevFilters[name].includes(value)
                ? prevFilters[name].filter((val) => val !== value)
                : [...prevFilters[name], value],
        }));
    };

    // Modify this useEffect to prevent unnecessary updates
    useEffect(() => {
        const searchParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, values]) => {
            if (values.length > 0) {
                values.forEach(val => searchParams.append(key, val));
            }
        });

        const newSearch = searchParams.toString();
        const currentSearch = location.search.replace(/^\?/, '');
        
        // Only update URL if the search params actually changed
        if (newSearch !== currentSearch) {
            const newUrl = newSearch ? `?${newSearch}` : location.pathname;
            navigate(newUrl, { replace: true });
        }
    }, [filters, location.pathname]); // Remove navigate from dependencies

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

    const handleInlineFilter = (type, value) => {
        handleFilterChange(type, value);
        setIsFilterOpen(false);
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
            <Breadcrumb items={["Trang chủ", pageTitle]} />
            <PromotionalBanner 
                imageSrc="https://picsum.photos/1200/400"
                title="New Collection Available"
                description="Discover our latest eyewear collection with exclusive discounts"
            />
            
            {/* Add inline filter buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm flex items-center gap-2"
                >
                    <span>Bộ lọc</span>
                    {isFilterOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
                {Object.entries(filters).map(([key, values]) => 
                    values.map(value => (
                        <div key={`${key}-${value}`} 
                             className="px-4 py-2 bg-teal-100 rounded-full text-sm flex items-center gap-2">
                            <span>{value}</span>
                            <button onClick={() => handleFilterChange(key, value)}>×</button>
                        </div>
                    ))
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                <div className={`w-full lg:w-1/4 ${isFilterOpen ? '' : 'hidden lg:block'}`}>
                    <SideBar 
                        onFilterChange={handleFilterChange}
                        selectedFilters={filters}
                        filterOptions={{
                            style: {
                                title: "Kiểu Gọng",
                                options: ["Phi công", "Vuông", "Oval", "Browline", "Đa giác"]
                            },
                            material: {
                                title: "Chất liệu",
                                options: ["Kim loại", "Nhựa", "Titanium"]
                            },
                            gender: {
                                title: "Giới tính",
                                options: ["Nam", "Nữ", "Unisex"]
                            },
                            priceRange: {
                                title: "Khoảng giá",
                                options: ["0-500000", "500000-1000000", "1000000-2000000"]
                            }
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