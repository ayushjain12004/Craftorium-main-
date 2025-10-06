'use client';
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';
import Image from 'next/image';
import { 
    FaPlus, 
    FaMinus, 
    FaTrash, 
    FaShoppingBag, 
    FaArrowLeft,
    FaShoppingCart
} from 'react-icons/fa';
import { assets } from '@/assets/assets';

const Cart = () => {
    const { 
        cartItems, 
        products, 
        updateCartQuantity, 
        getCartCount, 
        getCartAmount, 
         
        clearCart,
        currency,
        isAuthenticated
    } = useAppContext();

    // Get cart products with details
    const getCartProducts = () => {
        return Object.keys(cartItems)
            .map(itemId => {
                const product = products.find(p => p._id === itemId);
                if (product) {
                    return {
                        ...product,
                        quantity: cartItems[itemId]
                    };
                }
                return null;
            })
            .filter(item => item !== null);
    };

    const cartProducts = getCartProducts();
    const totalAmount = getCartAmount();
    const cartCount = getCartCount();

    const handleQuantityChange = (productId, newQuantity) => {
        updateCartQuantity(productId, newQuantity);
    };

    const handleRemoveItem = (productId) => {
        updateCartQuantity(productId, 0);
    };

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            clearCart();
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#fef6eb] flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <FaShoppingCart className="text-3xl text-gray-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Login Required</h2>
                    <p className="text-gray-600 mb-6">Please login to view your cart</p>
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

    if (cartCount === 0) {
        return (
            <div className="min-h-screen bg-[#fef6eb] py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center py-12">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <FaShoppingCart className="text-4xl text-gray-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
                        <p className="text-gray-600 mb-8 text-lg">Looks like you haven't added any items to your cart yet.</p>
                        <Link 
                            href="/" 
                            className="bg-[#615004] text-white px-8 py-3 rounded-lg hover:bg-[#184309] transition-colors inline-flex items-center gap-2"
                        >
                            <FaArrowLeft className="text-sm" />
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fef6eb] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#615004] mb-2">Shopping Cart</h1>
                        <p className="text-gray-600">
                            {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
                        </p>
                    </div>
                    <button
                        onClick={handleClearCart}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
                    >
                        <FaTrash className="text-sm" />
                        Clear Cart
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            {cartProducts.map((product) => (
                                <div key={product._id} className="border-b border-gray-200 last:border-b-0">
                                    <div className="p-6 flex flex-col sm:flex-row gap-4">
                                        {/* Product Image */}
                                        <div className="flex-shrink-0">
                                            <Image
                                                src={product.image?.[0] || assets.placeholder_image}
                                                alt={product.name}
                                                width={120}
                                                height={120}
                                                className="w-24 h-24 object-cover rounded-lg"
                                                onError={(e) => {
                                                    e.target.src = assets.placeholder_image;
                                                }}
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                                {product.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                {product.description}
                                            </p>
                                            <p className="text-lg font-bold text-[#615004]">
                                                {currency}{product.offerPrice}
                                            </p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex flex-col items-end justify-between">
                                            <button
                                                onClick={() => handleRemoveItem(product._id)}
                                                className="text-red-500 hover:text-red-700 transition-colors mb-4"
                                            >
                                                <FaTrash className="text-sm" />
                                            </button>

                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => handleQuantityChange(product._id, product.quantity - 1)}
                                                    disabled={product.quantity <= 1}
                                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    <FaMinus className="text-xs" />
                                                </button>

                                                <span className="w-12 text-center font-medium">
                                                    {product.quantity}
                                                </span>

                                                <button
                                                    onClick={() => handleQuantityChange(product._id, product.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                                                >
                                                    <FaPlus className="text-xs" />
                                                </button>
                                            </div>

                                            <div className="mt-4 text-right">
                                                <p className="text-lg font-bold text-gray-800">
                                                    {currency}{(product.offerPrice * product.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                            {/* Summary Details */}
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal ({cartCount} items)</span>
                                    <span>{currency}{totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>{currency}{(totalAmount * 0.1).toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between text-lg font-bold text-gray-800">
                                        <span>Total</span>
                                        <span>{currency}{(totalAmount * 1.1).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <button className="w-full bg-[#615004] text-white py-3 rounded-lg hover:bg-[#184309] transition-colors font-semibold mb-4 flex items-center justify-center gap-2">
                                <FaShoppingBag className="text-sm" />
                                Proceed to Checkout
                            </button>

                            {/* Continue Shopping */}
                            <Link 
                                href="/" 
                                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                            >
                                <FaArrowLeft className="text-sm" />
                                Continue Shopping
                            </Link>

                            {/* Additional Info */}
                            <div className="mt-6 text-xs text-gray-500 text-center">
                                <p>Free shipping on orders over {currency}50</p>
                                <p>30-day return policy</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommended Products Section (Optional) */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-[#615004] mb-6">You Might Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products
                            .filter(product => !cartItems[product._id])
                            .slice(0, 4)
                            .map(product => (
                                <div key={product._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                    <Image
                                        src={product.image?.[0] || assets.placeholder_image}
                                        alt={product.name}
                                        width={200}
                                        height={200}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                        onError={(e) => {
                                            e.target.src = assets.placeholder_image;
                                        }}
                                    />
                                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-[#615004] font-bold text-lg mb-3">
                                        {currency}{product.offerPrice}
                                    </p>
                                    <Link 
                                        href={`/product/${product._id}`}
                                        className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-center block"
                                    >
                                        View Product
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;