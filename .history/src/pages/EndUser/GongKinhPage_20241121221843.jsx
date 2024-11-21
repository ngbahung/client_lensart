import { useState } from "react";
import SideBar from "../../components/EndUser/Filter/SideBar";
import ProductGrid from "../../components/EndUser/ProductGrid/ProductGrid";
import PromotionalBanner from "../../components/EndUser/PromotionalBanner/PromotionalBanner";
import Breadcrumb from "../../components/EndUser/Breadcrumb/Breadcrumb";

const GongKinhPage = () => {
    const [filters, setFilters] = useState({ style: [] });
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

    const products = [
        {
            id: 1,
            discount: "-20%",
            image: "https://picsum.photos/400/400",
            name: "Classic Aviator",
            currentPrice: 1200000,
            originalPrice: 1500000,
        },
        {
            id: 2,
            discount: "-15%",
            image: "https://picsum.photos/400/400?random=1",
            name: "Modern Square",
            currentPrice: 900000,
            originalPrice: 1050000,
        },
        {
            id: 3,
            discount: "-25%",
            image: "https://picsum.photos/400/400?random=2",
            name: "Round Vintage",
            currentPrice: 850000,
            originalPrice: 1100000,
        },
        {
            id: 4,
            discount: "-10%",
            image: "https://picsum.photos/400/400?random=3",
            name: "Retro Browline",
            currentPrice: 750000,
            originalPrice: 900000,
        },
        {
            id: 5,
            discount: "-30%",
            image: "https://picsum.photos/400/400?random=4",
            name: "Oversized Frames",
            currentPrice: 1050000,
            originalPrice: 1500000,
        },
        {
            id: 6,
            discount: "-15%",
            image: "https://picsum.photos/400/400?random=5",
            name: "Geometric Glasses",
            currentPrice: 950000,
            originalPrice: 1100000,
        },
        {
            id: 7,
            discount: "-20%",
            image: "https://picsum.photos/400/400?random=6",
            name: "Trendy Cat-Eye",
            currentPrice: 800000,
            originalPrice: 1000000,
        },

        {
            id: 8,
            discount: "-25%",
            image: "https://picsum.photos/400/400?random=7",
            name: "Classic Clubmaster",
            currentPrice: 750000,
            originalPrice: 1000000,
        },
        {
            id: 9,
            discount: "-20%",
            image: "https://picsum.photos/400/400?random=8",
            name: "Sport Frames",
            currentPrice: 950000,
            originalPrice: 1200000,
        },
        {
            id: 10,
            discount: "-15%",
            image: "https://picsum.photos/400/400?random=9",
            name: "Minimalist Round",
            currentPrice: 880000,
            originalPrice: 1000000,
        },
        {
            id: 11,
            discount: "-25%",
            image: "https://picsum.photos/400/400?random=10",
            name: "Bold Rectangle",
            currentPrice: 920000,
            originalPrice: 1150000,
        },
        {
            id: 12,
            discount: "-18%",
            image: "https://picsum.photos/400/400?random=11",
            name: "Tortoise Shell",
            currentPrice: 850000,
            originalPrice: 1000000,
        },
        {
            id: 13,
            discount: "-22%",
            image: "https://picsum.photos/400/400?random=12",
            name: "Metal Rim",
            currentPrice: 780000,
            originalPrice: 950000,
        },
        {
            id: 14,
            discount: "-20%",
            image: "https://picsum.photos/400/400?random=13",
            name: "Oval Classic",
            currentPrice: 900000,
            originalPrice: 1100000,
        },
        {
            id: 15,
            discount: "-15%",
            image: "https://picsum.photos/400/400?random=14",
            name: "Square Modern",
            currentPrice: 850000,
            originalPrice: 1000000,
        },
        {
            id: 16,
            discount: "-25%",
            image: "https://picsum.photos/400/400?random=15",
            name: "Rimless Elite",
            currentPrice: 1100000,
            originalPrice: 1400000,
        }
    ]

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

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
                    <SideBar onFilterChange={handleFilterChange} />
                </div>
                <div className="w-3/4">
                    <ProductGrid 
                        products={currentProducts}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default GongKinhPage;