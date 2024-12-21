import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../../components/Admin/Manage_Products/Products/Table';
import Pagination from "../../../components/Admin/Manage_Products/Products/Pagination";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const ITEMS_PER_PAGE = 7; // Số lượng items mỗi trang
  const [searchTerm, setSearchTerm] = useState("");

  const mockData = [
    { id: 1, name: "Sunglasses Model A", description: "Stylish summer sunglasses", price: 99.99, status: 'active' },
    { id: 2, name: "Reading Glasses B", description: "Comfortable reading glasses", price: 79.99, status: 'active' },
    { id: 3, name: "Tom Ford", description: "Luxury designer frames", price: 299.99, status: 'inactive' },
    { id: 4, name: "Gucci", description: "High-end fashion glasses", price: 199.99, status: 'active' },
    { id: 5, name: "Prada", description: "Elegant and stylish", price: 249.99, status: 'active' },
    { id: 6, name: "Versace", description: "Bold and luxurious", price: 279.99, status: 'inactive' },
    { id: 7, name: "Burberry", description: "Classic and timeless", price: 189.99, status: 'active' },
    { id: 8, name: "Chanel", description: "Iconic fashion glasses", price: 299.99, status: 'active' },
    { id: 9, name: "Nike Vision", description: "Sporty and durable", price: 129.99, status: 'inactive' },
    { id: 10, name: "Dior", description: "Chic and sophisticated", price: 259.99, status: 'active' }
  ];

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/products');
      if (response.status === 200 && response.data && response.data.data) {
        const allProducts = response.data.data;
        setProducts(allProducts);
        setTotalPages(Math.ceil(allProducts.length / ITEMS_PER_PAGE));
        setError(null);
        return true; // Add return value to indicate success
      }
      throw new Error("Invalid response format");
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts(mockData);
      setTotalPages(Math.ceil(mockData.length / ITEMS_PER_PAGE));
      return false; // Add return value to indicate failure
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Thêm useEffect để lắng nghe thay đổi
  useEffect(() => {
    console.log("ProductsPage re-rendering"); // Debug log
  });

  const filteredProducts = products.filter(product => 
    product.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusChange = async (productId) => {
    try {
      await axios.post(`http://localhost:8000/api/products/switch-status/${productId}`);
      
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product.id === productId ? {
            ...product, 
            status: product.status === 'active' ? 'inactive' : 'active'
          } : product
        )
      );
    } catch (error) {
      alert("Failed to update product status");
      console.error("Failed to update product status:", error);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset về trang 1 khi search
    // Cập nhật tổng số trang dựa trên kết quả tìm kiếm
    const filtered = products.filter(product => 
      product.id.toString().toLowerCase().includes(value.toLowerCase()) ||
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  };

  return (
    <div className="bg-white p-6 rounded-md flex flex-col min-h-[calc(100vh-120px)]">
      <div className="flex-grow">
        <div className="grid grid-cols-1 gap-4">
          <Table 
            products={getCurrentPageItems()}
            isLoading={isLoading}
            error={error}
            onStatusChange={handleStatusChange}
            onSearch={handleSearch}
            searchTerm={searchTerm}
            onUpdate={fetchProducts} // Thêm prop này
          />
        </div>
      </div>
      {!isLoading && filteredProducts.length > 0 && (
        <div className="flex justify-end mt-4">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;