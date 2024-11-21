// components/ProductGrid.jsx
import React from "react";
import ProductCard from "../ProductCard/ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
