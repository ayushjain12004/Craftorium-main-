"use client";
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

const Wishlist = () => {
  const { getWishlistProducts, removeFromWishlist, addToCart, currency } = useAppContext();
  const router = useRouter();

  // Get actual wishlist products from context
  const wishlistItems = getWishlistProducts ? getWishlistProducts() : [];

  const handleRemoveFromWishlist = (productId, e) => {
    e?.stopPropagation();
    if (removeFromWishlist) {
      removeFromWishlist(productId);
    } else {
      console.log("Remove from wishlist function not available");
    }
  };

  const handleAddToCart = (productId, e) => {
    e?.stopPropagation();
    if (addToCart) {
      addToCart(productId);
    } else {
      console.log("Add to cart function not available");
    }
  };

  const handleViewProduct = (productId, e) => {
    e?.stopPropagation();
    router.push('/cart-component/product/' + productId);
    scrollTo(0, 0);
  };

  const handleProductClick = (productId) => {
    router.push('/cart-component/product/' + productId);
    scrollTo(0, 0);
  };

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 px-4">
        <Image
          src={assets.placeholder_image || "/placeholder.jpg"}
          alt="Empty Wishlist"
          width={200}
          height={200}
          className="opacity-50"
        />
        <p className="text-xl font-medium text-gray-600 mt-6">Your wishlist is empty</p>
        <p className="text-gray-500 text-center mt-2">
          Start adding products you love to your wishlist
        </p>
      </div>
    );
  }

  return (
    <div className="mt-14 px-4 md:px-14">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">My Wishlist</h1>
        <p className="text-gray-600">{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}</p>
      </div>

      {/* Wishlist Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div
            key={product._id}
            onClick={() => handleProductClick(product._id)}
            className="flex flex-col items-start bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition relative cursor-pointer"
          >
            {/* Remove from wishlist button */}
            <button
              onClick={(e) => handleRemoveFromWishlist(product._id, e)}
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition z-10"
            >
              <Image
                src={assets.heart_filled_icon || assets.heart_icon}
                alt="Remove from wishlist"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </button>

            {/* Product image */}
            <Image
              src={product.image?.[0] || assets.placeholder_image || "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-52 object-cover"
              width={800}
              height={600}
            />

            {/* Text content */}
            <div className="p-4 space-y-2 w-full">
              <p className="font-medium text-lg truncate">{product.name}</p>
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-orange-600">
                  {currency || '$'}{product.offerPrice || product.price}
                </p>
                {product.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={(e) => handleAddToCart(product._id, e)}
                  className="flex-1 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition text-sm"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={(e) => handleViewProduct(product._id, e)}
                  className="flex items-center justify-center gap-1.5 border border-orange-600 text-orange-600 px-4 py-2 rounded hover:bg-orange-50 transition text-sm"
                >
                  View
                  <Image
                    className="h-3 w-3"
                    src={assets.redirect_icon}
                    alt="View product"
                    width={12}
                    height={12}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;