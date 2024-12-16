import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
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
      
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            currentPage === index + 1
              ? "bg-[rgba(85,213,210,1)] border-[rgba(85,213,210,1)] text-white"
              : "border-[rgba(85,213,210,1)] text-[rgba(85,213,210,1)] bg-[rgba(239,249,249,1)] hover:bg-opacity-20"
          }`}
        >
          {index + 1}
        </button>
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