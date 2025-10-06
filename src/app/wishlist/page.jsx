'use client';
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import ProductCard from '@/components/ProductCard'; // Adjust path as needed
import Link from 'next/link';
import { assets } from '@/assets/assets';
import Image from 'next/image';

const Wishlist = () => {
    const { getWishlistProducts, wishlistItems, isAuthenticated, loading } = useAppContext();
    const wishlistProducts = getWishlistProducts ? getWishlistProducts() : [];

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-[#f1e3d4] flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#615004] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading wishlist...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#fef6eb] flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <Image 
                            src={assets.heart_icon} 
                            alt="Heart" 
                            width={40} 
                            height={40} 
                            className="opacity-50"
                        />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Login Required</h2>
                    <p className="text-gray-600 mb-6">Please login to view your wishlist</p>
                    <Link 
                        href="/Login" 
                        className="bg-[#615004] text-white px-6 py-2 rounded-lg hover:bg-[#184309] transition-colors inline-block"
                    >
                        Login Now
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f9f0e1] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#615004] mb-2">My Wishlist</h1>
                    <p className="text-gray-600">
                        {wishlistItems?.length || 0} {wishlistItems?.length === 1 ? 'item' : 'items'} in your wishlist
                    </p>
                </div>

                {/* Wishlist Products */}
                {wishlistProducts && wishlistProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {wishlistProducts.map((product) => (
                            <ProductCard 
                                key={product._id} 
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <Image 
                                src={assets.heart_icon} 
                                alt="Empty wishlist" 
                                width={48} 
                                height={48} 
                                className="opacity-40"
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h3>
                        <p className="text-gray-500 mb-6">Start adding items you love to your wishlist</p>
                        <Link 
                            href="/" 
                            className="bg-[#615004] text-white px-6 py-2 rounded-lg hover:bg-[#184309] transition-colors inline-block"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;