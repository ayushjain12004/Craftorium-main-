// app/Profile/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

export default function Profile() {
  const {
    userData,
    isAuthenticated,
    updateCartQuantity,
    loading,
    cartItems,
    wishlistItems,
    products,
    addToCart,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    logout,
  } = useAppContext();

  const router = useRouter();
  const [cartProducts, setCartProducts] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/Login");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      const cartProductsList = Object.keys(cartItems)
        .map((itemId) => {
          const product = products.find((p) => p._id === itemId);
          return product ? { ...product, quantity: cartItems[itemId] } : null;
        })
        .filter(Boolean);
      setCartProducts(cartProductsList);
    }
  }, [cartItems, products]);

  useEffect(() => {
    if (products.length > 0 && wishlistItems) {
      const wishlistProductsList = products.filter((product) =>
        wishlistItems.includes(product._id)
      );
      setWishlistProducts(wishlistProductsList);
    }
  }, [wishlistItems, products]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleRemoveItem = (productId) => {
    updateCartQuantity(productId, 0);
  };
  const handleQuantityChange = (productId, newQuantity) => {
    updateCartQuantity(productId, newQuantity);
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fef6eb] flex items-center justify-center">
        <div className="text-[#615004]">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#fef6eb] flex items-center justify-center">
        <div className="text-center">
          <div className="text-[#615004] text-xl mb-4">
            Redirecting to login...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fef6eb] py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#615004]">My Profile</h1>
          <button
            onClick={handleLogout}
            className="text-[#ffffff] align-text-bottom bg-[#615004] px-6 py-2 rounded-lg hover:bg-[#5d4827] "
          >
            Logout
          </button>
        </div>

        {/* User Info Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-[#615004] mb-4">
                Personal Information
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Username
                  </label>
                  <p className="text-lg text-[#615004]">{userData?.username}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <p className="text-lg text-[#615004]">{userData?.email}</p>
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Role
                  </label>
                  <p className="text-lg text-[#615004] capitalize">
                    {userData?.role}
                  </p>
                </div> */}
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Member Since
                  </label>
                  <p className="text-lg text-[#615004]">
                    {userData?.createdAt
                      ? new Date(userData.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#615004] mb-4">
                Account Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-[#f8f9fa] rounded-lg">
                  <span className="text-gray-600">Cart Items</span>
                  <span className="text-lg font-bold text-[#615004]">
                    {cartProducts.length} items
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#f8f9fa] rounded-lg">
                  <span className="text-gray-600">Wishlist Items</span>
                  <span className="text-lg font-bold text-[#615004]">
                    {wishlistProducts.length} items
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wishlist Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#615004]">My Wishlist</h2>
            <span className="text-gray-600">
              {wishlistProducts.length}{" "}
              {wishlistProducts.length === 1 ? "item" : "items"}
            </span>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Your wishlist is empty</p>
              <Link
                href="/products"
                className="bg-[#615004] text-white px-6 py-2 rounded hover:bg-[#184309] transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map((product) => (
                <div
                  key={product._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  {product.image && product.image.length > 0 && (
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                  )}
                  <h3 className="font-semibold text-[#615004] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-[#615004]">
                      ${product.offerPrice}
                    </span>
                    <div className="flex items-center">
                      <span className="text-yellow-500">
                        ⭐ {product.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => addToCart(product._id)}
                      className="flex-1 bg-[#615004] text-white py-2 px-4 rounded hover:bg-[#184309] transition-colors text-sm"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(product._id)}
                      className="bg-[#184309] text-white py-2 px-4 rounded hover:bg-red-600 transition-colors text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#615004]">My Cart</h2>
            <span className="text-gray-600">
              {cartProducts.length}{" "}
              {cartProducts.length === 1 ? "item" : "items"}
            </span>
          </div>

          {cartProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Link
                href="/products"
                className="bg-[#615004] text-white px-6 py-2 rounded hover:bg-[#184309] transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center border border-gray-200 rounded-lg p-4"
                >
                  {product.image && product.image.length > 0 && (
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded mr-4"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#615004]">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Quantity: {product.quantity}
                    </p>
                    <p className="text-lg font-bold text-[#615004]">
                      ${(product.offerPrice * product.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleWishlist(product._id)}
                      className={`p-2 rounded text-sm ${
                        isInWishlist(product._id)
                          ? "bg-[#184309] text-white"
                          : "bg-[#615004] text-white hover:bg-[#184309]"
                      } transition-colors`}
                    >
                      {isInWishlist(product._id)
                        ? "Remove from Wishlist"
                        : "Add to Wishlist"}
                    </button>

                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => handleRemoveItem(product._id)}
                        className="text-[#2a7825] hover:text-[#fb2a00] transition-colors mb-4"
                      >
                        <FaTrash className="text-sm" />
                      </button>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              product._id,
                              product.quantity - 1
                            )
                          }
                          disabled={product.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <FaMinus className="text-xs" />
                        </button>

                        <span className="w-12 text-center font-medium">
                          {product.quantity}
                        </span>

                        <button
                          onClick={() =>
                            handleQuantityChange(
                              product._id,
                              product.quantity + 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>

                      <div className="mt-4 text-right">
                    
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-[#615004]">
                    $
                    {cartProducts
                      .reduce(
                        (total, product) =>
                          total + product.offerPrice * product.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <button className="w-full bg-[#615004] text-white py-3 rounded hover:bg-[#184309] transition-colors mt-4">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
