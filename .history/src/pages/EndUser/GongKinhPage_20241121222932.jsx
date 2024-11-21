import { useState } from "react";
import SideBar from "../../components/EndUser/Filter/SideBar";
import ProductGrid from "../../components/EndUser/ProductGrid/ProductGrid";
import PromotionalBanner from "../../components/EndUser/PromotionalBanner/PromotionalBanner";
import Breadcrumb from "../../components/EndUser/Breadcrumb/Breadcrumb";
import ProductSlider from "../../components/EndUser/ProductSlider/ProductSlider";

const GongKinhPage = () => {
    const [filters, setFilters] = useState({
        style: [],
        material: [],
        gender: [],
        priceRange: []
    });
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16;

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
        console.log('Product clicked:', productId);
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

    const products = [
        {
            id: 1,
            discount: "-20%",
            image: "https://picsum.photos/400/400",
            name: "Classic Aviator",
            currentPrice: 1200000,
            originalPrice: 1500000,
            style: "Aviator",
            material: "Metal",
            gender: "Unisex"
        },
        {
            id: 2,
            discount: "-15%",
            image: "https://picsum.photos/400/400?random=1",
            name: "Modern Square",
            currentPrice: 900000,
            originalPrice: 1050000,
            style: "Square",
            material: "Plastic",
            gender: "Men"
        },
        {
            id: 3,
            discount: "-25%",
            image: "https://picsum.photos/400/400?random=2",
            name: "Round Vintage",
            currentPrice: 850000,
            originalPrice: 1100000,
            style: "Round",
            material: "Metal",
            gender: "Women"
        },
        {
            id: 4,
            discount: "-10%",
            image: "https://picsum.photos/400/400?random=3",
            name: "Retro Browline",
            currentPrice: 750000,
            originalPrice: 900000,
            style: "Browline",
            material: "Plastic",
            gender: "Men"
        },
        {
            id: 5,
            discount: "-30%",
            image: "https://picsum.photos/400/400?random=4",
            name: "Oversized Frames",
            currentPrice: 1050000,
            originalPrice: 1500000,
            style: "Oversized",
            material: "Acetate",
            gender: "Women"
        },
        {
            id: 6,
            discount: "-15%",
            image: "https://picsum.photos/400/400?random=5",
            name: "Geometric Glasses",
            currentPrice: 950000,
            originalPrice: 1100000,
            style: "Geometric",
            material: "Metal",
            gender: "Unisex"
        },
        {
            id: 7,
            discount: "-20%",
            image: "https://picsum.photos/400/400?random=6",
            name: "Trendy Cat-Eye",
            currentPrice: 800000,
            originalPrice: 1000000,
            style: "Cat-Eye",
            material: "Plastic",
            gender: "Women"
        },
        {
            id: 8,
            discount: "-25%",
            image: "https://picsum.photos/400/400?random=7",
            name: "Classic Clubmaster",
            currentPrice: 750000,
            originalPrice: 1000000,
            style: "Clubmaster",
            material: "Metal",
            gender: "Men"
        },
        {
            id: 9,
            discount: "-20%",
            image: "https://picsum.photos/400/400?random=8",
            name: "Sport Frames",
            currentPrice: 950000,
            originalPrice: 1200000,
            style: "Sport",
            material: "Plastic",
            gender: "Unisex"
        },
        {
            id: 10,
            discount: "-15%",
            image: "https://picsum.photos/400/400?random=9",
            name: "Minimalist Round",
            currentPrice: 880000,
            originalPrice: 1000000,
            style: "Round",
            material: "Metal",
            gender: "Men"
        },
        {
            id: 11,
            discount: "-25%",
            image: "https://picsum.photos/400/400?random=10",
            name: "Bold Rectangle",
            currentPrice: 920000,
            originalPrice: 1150000,
            style: "Rectangle",
            material: "Plastic",
            gender: "Women"
        },
        {
            id: 12,
            discount: "-18%",
            image: "https://picsum.photos/400/400?random=11",
            name: "Tortoise Shell",
            currentPrice: 850000,
            originalPrice: 1000000,
            style: "Tortoise",
            material: "Acetate",
            gender: "Unisex"
        },
        {
            id: 13,
            discount: "-22%",
            image: "https://picsum.photos/400/400?random=12",
            name: "Metal Rim",
            currentPrice: 780000,
            originalPrice: 950000,
            style: "Rimless",
            material: "Metal",
            gender: "Men"
        },
        {
            id: 14,
            discount: "-20%",
            image: "https://picsum.photos/400/400?random=13",
            name: "Oval Classic",
            currentPrice: 900000,
            originalPrice: 1100000,
            style: "Oval",
            material: "Plastic",
            gender: "Women"
        },
        {
            id: 15,
            discount: "-15%",
            image: "https://picsum.photos/400/400?random=14",
            name: "Square Modern",
            currentPrice: 850000,
            originalPrice: 1000000,
            style: "Square",
            material: "Metal",
            gender: "Unisex"
        },
        {
            id: 16,
            discount: "-25%",
            image: "https://picsum.photos/400/400?random=15",
            name: "Rimless Elite",
            currentPrice: 1100000,
            originalPrice: 1400000,
            style: "Rimless",
            material: "Acetate",
            gender: "Men"
        }
    ]

    const filteredProducts = filterProducts(products);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div className="mt-1 container mx-auto px-4">
            <Breadcrumb items={["Trang chủ", "Gọng kính"]} />
            <PromotionalBanner 
                imageSrc="https://picsum.photos/1200/400"
                title="New Collection Available"
                description="Discover our latest eyewear collection with exclusive discounts"
            />
            <div className="flex gap-6">
                <div className="w-1/4">
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
                <div className="w-3/4 mb-8">
                    <ProductGrid 
                        products={currentProducts}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        onBuyClick={handleBuyClick}
                        onProductClick={handleProductClick}
                    />
                </div>
            </div>
            <div className="container mx-auto px-4 md:px-8">
                <div className="py-4 md:py-8">
                    <h2 className="text-xl md:text-2xl font-semibold text-[#55d5d2] mb-4 md:mb-6 px-2 md:px-4 border-b-2 border-[#ecaa83] pb-2">MỚI NHẤT</h2>
                    <ProductSlider products={products} />
                </div>
            </div>
        </div>
    );
}

export default GongKinhPage;