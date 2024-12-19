import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const maxVisible = 8;
    let pages = [];

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than maxVisible
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 4) {
        // Show first 6 pages + ellipsis + last page
        pages.push(...Array.from({ length: 5 }, (_, i) => i + 2));
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Show first page + ellipsis + last 6 pages
        pages.push('...');
        pages.push(...Array.from({ length: 6 }, (_, i) => totalPages - 6 + i + 1));
      } else {
        // Show first page + ellipsis + current-1, current, current+1 + ellipsis + last page
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
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="w-8 text-center">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                currentPage === page
                  ? "bg-[rgba(85,213,210,1)] border-[rgba(85,213,210,1)] text-white"
                  : "border-[rgba(85,213,210,1)] text-[rgba(85,213,210,1)] bg-[rgba(239,249,249,1)] hover:bg-opacity-20"
              }`}
            >
              {page}
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