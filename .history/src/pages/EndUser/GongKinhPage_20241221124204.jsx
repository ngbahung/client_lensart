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
import { getShapes } from '../../api/shapesAPI';

const GongKinhPage = ({ categoryId = 1, pageTitle = "Gọng Kính" }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { type, value } = useParams();
    const [title, setTitle] = useState(pageTitle);
    const [filters, setFilters] = useState({
        brands: [],
        shapes: [],
        material: [],
        features: [],
        gender: [],
        priceRange: []
    });
    const [sortBy, setSortBy] = useState('newest'); // Add this line
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16;
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterOptions, setFilterOptions] = useState({
        brands: [],
        shapes: [],
        material: [],
        features: [],
        gender: [],
        priceRange: []
    });

    // Add new state for API data
    const [brandsData, setBrandsData] = useState([]);
    const [materialsData, setMaterialsData] = useState([]);
    const [featuresData, setFeaturesData] = useState([]);
    const [shapesData, setShapesData] = useState([]); // Add shapes data state

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

        // Handle each filter type from URL
        for (const [key, value] of params.entries()) {
            if (newFilters.hasOwnProperty(key) && value) {
                newFilters[key] = [value];
                hasChanges = true;
            }
        }

        // Special handling for features and shapes filters
        if (params.has('features')) {
            newFilters.features = [params.get('features')];
            hasChanges = true;
        }
        if (params.has('shapes')) {
            newFilters.shapes = [params.get('shapes')];
            hasChanges = true;
        }

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
            [name]: prevFilters[name]?.includes(value)
                ? prevFilters[name].filter((val) => val !== value)
                : [...(prevFilters[name] || []), value],
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
            // Brand filter
            const matchesBrand = filters.brands.length === 0 || 
                filters.brands.some(brandId => brandId === product.brand_id.toString());

            // Shape filter
            const matchesShape = filters.shapes.length === 0 || 
                filters.shapes.some(shapeId => shapeId === product.shape_id.toString());

            // Material filter
            const matchesMaterial = filters.material.length === 0 || 
                filters.material.some(materialId => materialId === product.material_id.toString());

            // Features filter (only for category 3 - contact lenses)
            const matchesFeatures = filters.features.length === 0 || 
                filters.features.some(featureId => {
                    // Get the feature name from filterOptions
                    const featureOption = filterOptions.features.find(f => f.value === featureId);
                    // Check if the product has the feature in its features array
                    return product.features?.some(productFeature => 
                        productFeature.id.toString() === featureId ||
                        productFeature.feature_id?.toString() === featureId
                    );
                });

            // Gender filter
            const matchesGender = filters.gender.length === 0 || 
                filters.gender.includes(
                    product.gender === 'female' ? 'Nữ' :
                    product.gender === 'male' ? 'Nam' : 'Unisex'
                );

            // Price range filter
            const matchesPriceRange = filters.priceRange.length === 0 || 
                filters.priceRange.some(range => {
                    const [min, max] = range.split('-').map(Number);
                    const price = product.offer_price || product.price;
                    if (max === 999999999) {
                        return price >= min;
                    }
                    return price >= min && price <= max;
                });

            // For category 3 (contact lenses), only check relevant filters
            if (categoryId === 3) {
                return matchesFeatures &&
                       matchesBrand &&
                       matchesGender &&
                       matchesPriceRange;
            }

            // For other categories, check all filters
            return matchesBrand &&
                   matchesShape &&
                   matchesMaterial &&
                   matchesGender &&
                   matchesPriceRange;
        });
    };

    const filterAndSortProducts = (products) => {
        let result = filterProducts(products);
        
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => 
                    (a.offer_price || a.price) - (b.offer_price || b.price)
                );
                break;
            case 'price-desc':
                result.sort((a, b) => 
                    (b.offer_price || b.price) - (a.offer_price || a.price)
                );
                break;
            case 'best-selling':
                // Keep existing order or implement if you have sales data
                break;
            case 'newest':
                result.sort((a, b) => 
                    new Date(b.created_time) - new Date(a.created_time)
                );
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
                const [brands, materials, shapes, features] = await Promise.all([
                    getBrands(),
                    getMaterials(),
                    getShapes(),
                    categoryId === 3 ? getFeatures() : Promise.resolve([])
                ]);

                console.log('Fetched features:', features); // Debug log

                setFilterOptions(prev => ({
                    ...prev,
                    brands: brands.map(brand => ({ 
                        value: brand.id.toString(),
                        label: brand.name 
                    })).sort((a, b) => a.label.localeCompare(b.label)), // Sort alphabetically
                    material: materials.map(material => ({ 
                        value: material.id.toString(),
                        label: material.name 
                    })),
                    shapes: shapes.map(shape => ({ 
                        value: shape.id.toString(),
                        label: shape.name 
                    })),
                    features: categoryId === 3 ? features.map(feature => ({
                        value: feature.id.toString(),
                        label: feature.name
                    })) : [],
                    gender: [
                        { value: 'Nam', label: 'Nam' },
                        { value: 'Nữ', label: 'Nữ' },
                        { value: 'Unisex', label: 'Unisex' }
                    ],
                    priceRange: [
                        { value: '0-500000', label: '0đ - 500.000đ' },
                        { value: '500000-1000000', label: '500.000đ - 1.000.000đ' },
                        { value: '1000000-2000000', label: '1.000.000đ - 2.000.000đ' },
                        { value: '2000000-999999999', label: 'Trên 2.000.000đ' }
                    ]
                }));

                // Also store raw data for reference
                setBrandsData(brands);
                setMaterialsData(materials);
                setShapesData(shapes);
                setFeaturesData(features);

            } catch (error) {
                toast.error('Không thể tải dữ liệu bộ lọc');
                console.error('Error fetching filter data:', error);
            }
        };

        fetchFilterData();
    }, [categoryId]);

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

    // Update the getFilterLabel function
    const getFilterLabel = (key, value, filterOptions) => {
        // Find the matching option label for IDs
        if (key === 'brands' || key === 'shapes' || key === 'material' || key === 'features') {
            const option = filterOptions[key]?.find(opt => opt.value === value);
            return option ? option.label : value;
        }
        
        // Handle gender
        if (key === 'gender') {
            return value;
        }
        
        // Handle price range formatting
        if (key === 'priceRange') {
            const [min, max] = value.split('-').map(Number);
            if (max === 999999999) {
                return `Trên ${min.toLocaleString()}đ`;
            }
            return `${min.toLocaleString()}đ - ${max.toLocaleString()}đ`;
        }
        
        return value;
    };

    return (
        <div className="mt-1 container mx-auto px-2 sm:px-4">
            <Breadcrumb items={[
                { label: "Trang chủ", path: "/" },
                { label: title, path: null }
            ]} />
            <PromotionalBanner />
            
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
                    values.map((value, index) => (
                        <div key={`${key}-${value}-${index}`} 
                             className="px-4 py-2 bg-teal-100 rounded-full text-sm flex items-center gap-2">
                            <span>{getFilterLabel(key, value, filterOptions)}</span>
                            <button 
                                onClick={() => handleFilterChange(key, value)}
                                className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                                ×
                            </button>
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
                            ...(categoryId !== 3 && { // Conditionally render these filters
                                brands: {
                                    title: "Thương hiệu",
                                    options: filterOptions.brands
                                },
                                shapes: {
                                    title: "Hình dạng",
                                    options: filterOptions.shapes
                                },
                                material: {
                                    title: "Chất liệu",
                                    options: filterOptions.material
                                }
                            }),
                            ...(categoryId === 3 && { // Conditionally hide features filter
                                features: {
                                    title: "Tính năng",
                                    options: filterOptions.features
                                },
                                brands: {
                                    title: "Thương hiệu",
                                    options: filterOptions.brands
                                }
                            }),
                            gender: {
                                title: "Giới tính",
                                options: ["Nam", "Nữ", "Unisex"]
                            },
                            priceRange: {
                                title: "Khoảng giá",
                                options: ["0-500000", "500000-1000000", "1000000-2000000", "2000000-999999999"]
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
