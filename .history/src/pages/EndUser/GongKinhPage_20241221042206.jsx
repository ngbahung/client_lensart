import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { toast } from 'react-toastify';
import SideBar from "../../components/EndUser/Filter/SideBar";
import ProductGrid from "../../components/EndUser/ProductGrid/ProductGrid";
import PromotionalBanner from "../../components/EndUser/PromotionalBanner/PromotionalBanner";
import Breadcrumb from "../../components/EndUser/Breadcrumb/Breadcrumb";
import ProductSlider from "../../components/EndUser/ProductSlider/ProductSlider";
import { getProductByCategoryId, transformProduct } from '../../api/productsAPI';
import { setDocumentTitle } from "../../utils/pageTitle";
import LoadingSkeleton from "../../components/EndUser/Loading/LoadingSkeleton";
import { getBrands } from '../../api/brandsAPI';
import { getFeatures } from '../../api/featuresAPI';
import { getMaterials } from '../../api/materialsAPI';

const GongKinhPage = ({ categoryId = 1, pageTitle = "Gọng Kính" }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { type, value } = useParams();
    const [title, setTitle] = useState(pageTitle);
    const [filters, setFilters] = useState({
        style: [],
        material: [],
        gender: [],
        priceRange: [],
        brands: []  // Add brands to filters
    });
    const [sortBy, setSortBy] = useState('newest'); // Add this line
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16;
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterOptions, setFilterOptions] = useState({
        style: [],
        material: [],
        gender: [],
        priceRange: [],
        brands: []
    });

    // Add new state for API data
    const [brandsData, setBrandsData] = useState([]);
    const [materialsData, setMaterialsData] = useState([]);
    const [featuresData, setFeaturesData] = useState([]);

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
            setTitle(title);
            setDocumentTitle(title);
        } else {
            setTitle("Gọng Kính");
            setDocumentTitle("Gọng Kính");
        }
    }, [type, value]);

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            setLoading(true);
            const data = await getProductByCategoryId(categoryId);
            const transformedProducts = data.map(transformProduct);
            setProducts(transformedProducts);
          } catch (err) {
            setError(err.message);
            toast.error('Không thể tải sản phẩm');
          } finally {
            setLoading(false);
          }
        };
    
        fetchProducts();
      }, [categoryId]);

    // Add URL parameter handling
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const newFilters = { ...filters };
        let hasChanges = false;

        // Reset all filters first
        Object.keys(newFilters).forEach(key => {
            newFilters[key] = [];
        });

        // Parse each filter from URL
        for (const [key, value] of params.entries()) {
            if (newFilters.hasOwnProperty(key) && value) {
                newFilters[key] = [decodeURIComponent(value)];
                hasChanges = true;
            }
        }

        // Only update state if there are changes
        if (hasChanges) {
            setFilters(newFilters);
        }
    }, [location.search]);

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
        setCurrentPage(1); // Reset to first page when filter changes
        toast.info('Đã cập nhật bộ lọc');
    };

    // Add new useEffect to handle URL updates
    useEffect(() => {
        const searchParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, values]) => {
            if (values.length > 0) {
                values.forEach(val => searchParams.append(key, val));
            }
        });

        const newSearch = searchParams.toString();
        const newUrl = newSearch ? `?${newSearch}` : location.pathname;
        navigate(newUrl, { replace: true });
    }, [filters, location.pathname, navigate]);

    const handleBuyClick = async (productId) => {
        try {
            // Add to cart logic
            toast.success('Đã thêm vào giỏ hàng!');
        } catch (error) {
            toast.error('Không thể thêm vào giỏ hàng.');
        }
    };

    const handleProductClick = (productId) => {
        const basePath = categoryId === 3 ? '/trong-kinh' : '/gong-kinh';
        navigate(`${basePath}/${productId}`);
    };

    const filterProducts = (products) => {
        return products.filter(product => {
            // Style filter
            const matchesStyle = filters.style.length === 0 || 
              filters.style.includes(product.style);
        
            // Material filter
            const matchesMaterial = filters.material.length === 0 || 
              filters.material.includes(product.material);
        
            // Gender filter
            const matchesGender = filters.gender.length === 0 || 
              filters.gender.includes(product.gender);
        
            // Updated price range filter
            const matchesPriceRange = filters.priceRange.length === 0 || 
              filters.priceRange.some(range => {
                const [min, max] = range.split('-').map(Number);
                if (max === 999999999) {
                    // Handle "Trên 2000000" case
                    return product.currentPrice >= min;
                }
                return product.currentPrice >= min && product.currentPrice <= max;
              });
        
            // Brand filter
            const matchesBrand = filters.brands.length === 0 || 
              filters.brands.includes(product.brand_id.toString());
        
            return matchesStyle && 
                   matchesMaterial && 
                   matchesGender && 
                   matchesPriceRange && 
                   matchesBrand;
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

    // Fetch filter data
    useEffect(() => {
        const fetchFilterData = async () => {
            try {
                const [brands, features, materials] = await Promise.all([
                    getBrands(),
                    getFeatures(),
                    getMaterials()
                ]);

                setBrandsData(brands);
                setFeaturesData(features);
                setMaterialsData(materials);

                // Update filter options with fetched data
                setFilterOptions(prev => ({
                    ...prev,
                    brands: brands.map(brand => ({ 
                        value: brand.id.toString(),
                        label: brand.name 
                    })),
                    style: features.map(feature => feature.name),
                    material: materials.map(material => material.name)
                }));
            } catch (error) {
                toast.error('Không thể tải dữ liệu bộ lọc');
                console.error('Error fetching filter data:', error);
            }
        };

        fetchFilterData();
    }, []);

    if (loading) return <LoadingSkeleton />;
    if (error) return (
        <div className="container mx-auto px-4 py-8 text-center">
            <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Đã xảy ra lỗi</h3>
                <p>{error}</p>
            </div>
        </div>
    );

    const filteredProducts = filterAndSortProducts(products);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div className="mt-1 container mx-auto px-2 sm:px-4">
            <Breadcrumb items={[
                { label: "Trang chủ", path: "/" },
                { label: title, path: null }
            ]} />
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
                            features: {
                                title: "Tính năng",
                                options: filterOptions.style
                            },
                            material: {
                                title: "Chất liệu",
                                options: filterOptions.material
                            },
                            brands: {
                                title: "Thương hiệu",
                                options: filterOptions.brands
                            },
                            gender: {
                                title: "Giới tính",
                                options: ["Nam", "Nữ", "Unisex"]
                            },
                            priceRange: {
                                title: "Khoảng giá",
                                options: ["0-500000", "500000-1000000", "1000000-2000000", "2000000-999999999"] // Add this new option
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
