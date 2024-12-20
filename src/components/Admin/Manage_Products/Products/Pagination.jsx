import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const maxVisibleButtons = 8;
    const pages = [];
    
    if (totalPages <= maxVisibleButtons) {
      // Nếu tổng số trang ít hơn hoặc bằng maxVisibleButtons, hiển thị tất cả
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Luôn hiển thị trang đầu
      pages.push(1);
      
      // Tính toán vị trí bắt đầu và kết thúc của dải số trang
      let start = Math.max(2, currentPage - 2);
      let end = Math.min(start + 4, totalPages - 1);
      
      // Điều chỉnh start nếu end đã gần cuối
      if (end === totalPages - 1) {
        start = Math.max(2, end - 4);
      }
      
      // Thêm dấu ... nếu cần
      if (start > 2) {
        pages.push('...');
      }
      
      // Thêm các trang ở giữa
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Thêm dấu ... nếu cần
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Luôn hiển thị trang cuối
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          currentPage === 1
            ? "border-gray-200 text-gray-500 bg-gray-100"
            : "border-[rgba(85,213,210,1)] text-[rgba(85,213,210,1)] bg-[rgba(239,249,249,1)] hover:opacity-80"
        }`}
      >
        <FaChevronLeft className="w-3 h-3" />
      </button>
      
      {getPageNumbers().map((pageNumber, index) => (
        <React.Fragment key={index}>
          {pageNumber === '...' ? (
            <span className="w-8 text-center">...</span>
          ) : (
            <button
              onClick={() => onPageChange(pageNumber)}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                currentPage === pageNumber
                  ? "bg-[rgba(85,213,210,1)] border-[rgba(85,213,210,1)] text-white"
                  : "border-[rgba(85,213,210,1)] text-[rgba(85,213,210,1)] bg-[rgba(239,249,249,1)] hover:bg-opacity-20"
              }`}
            >
              {pageNumber}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          currentPage === totalPages
            ? "border-gray-200 text-gray-500 bg-gray-100"
            : "border-[rgba(85,213,210,1)] text-[rgba(85,213,210,1)] bg-[rgba(239,249,249,1)] hover:opacity-80"
        }`}
      >
        <FaChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
};

export default Pagination;