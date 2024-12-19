import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Calculate range of pages to show
  const getPageNumbers = () => {
    const maxVisible = 8;
    const pages = [];
    
    if (totalPages <= maxVisible) {
      // If total pages is less than max visible, show all pages
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always include first page
    pages.push(1);

    let startPage = Math.max(2, currentPage - 2);
    let endPage = Math.min(totalPages - 1, startPage + maxVisible - 3);

    // Adjust if we're near the end
    if (endPage === totalPages - 1) {
      startPage = Math.max(2, endPage - (maxVisible - 3));
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push('...');
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push('...');
    }

    // Always include last page
    pages.push(totalPages);

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
      
      {getPageNumbers().map((pageNum, index) => (
        <React.Fragment key={index}>
          {pageNum === '...' ? (
            <span className="w-8 text-center">...</span>
          ) : (
            <button
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                currentPage === pageNum
                  ? "bg-[rgba(85,213,210,1)] border-[rgba(85,213,210,1)] text-white"
                  : "border-[rgba(85,213,210,1)] text-[rgba(85,213,210,1)] bg-[rgba(239,249,249,1)] hover:bg-opacity-20"
              }`}
            >
              {pageNum}
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