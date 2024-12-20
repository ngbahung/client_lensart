import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= 8) {
      // If total pages is 8 or less, show all pages
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Always include first page
      pages.push(1);
      
      if (currentPage <= 4) {
        // If current page is near the start
        pages.push(2, 3, 4, 5);
        pages.push('...');
        pages.push(totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - 3) {
        // If current page is near the end
        pages.push('...');
        pages.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // If current page is in the middle
        pages.push('...');
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
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
      
      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="px-2">...</span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              currentPage === page
                ? "bg-[rgba(85,213,210,1)] border-[rgba(85,213,210,1)] text-white"
                : "border-[rgba(85,213,210,1)] text-[rgba(85,213,210,1)] bg-[rgba(239,249,249,1)] hover:bg-opacity-20"
            }`}
          >
            {page}
          </button>
        )
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