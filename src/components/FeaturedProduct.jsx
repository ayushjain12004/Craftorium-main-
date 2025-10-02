
"use client";
import React, { useMemo } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from '@/context/AppContext';

const FeaturedProduct = ({ allProducts, currentProduct }) => {
 
  // Filter similar products by category (exclude the current product)
  const similarProducts = useMemo(() => {
    if (!allProducts || !currentProduct) return [];
    return allProducts.filter(
      (p) => p.category === currentProduct.category && p._id !== currentProduct._id
    );
  }, [allProducts, currentProduct]);

  if (similarProducts.length === 0) return null;

  return (
    <div className="mt-14">
      
      

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12 md:px-14 px-4">
        {similarProducts.map((product) => (
          <div
            key={product._id}
            className="flex flex-col items-start bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            {/* Product image */}
            <Image
              src={product.image[0] || assets.placeholder_image}
              alt={product.name}
              className="w-full h-52 object-cover"
              width={800}
              height={600}
            />

            {/* Text content */}
            <div className="p-4 space-y-2">
              <p className="font-medium text-lg truncate">{product.name}</p>
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>

              {/* Buy button */}
              <button className="mt-2 flex items-center gap-1.5 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition">
                See Product
                <Image
                  className="h-3 w-3"
                  src={assets.redirect_icon}
                  // alt="Redirect Icon"
              
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
