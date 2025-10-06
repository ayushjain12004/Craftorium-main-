'use client'
import { productsDummyData } from "@/assets/assets";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = (props) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Verify token with backend
        const { data } = await axios.get('/api/auth/verify', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (data.success) {
          setIsAuthenticated(true);
          setUserData(data.user);
          setIsSeller(data.user.role === 'seller');
          setCartItems(data.user.cartItems || {});
          // Load wishlist from backend for authenticated users
          await fetchWishlistFromBackend();
        } else {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } else {
        // For non-authenticated users, load wishlist from localStorage
        loadWishlistFromLocalStorage();
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      // Load wishlist from localStorage if auth fails
      loadWishlistFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlistFromBackend = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const { data } = await axios.get('/api/user/wishlist', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        setWishlistItems(data.wishlistItems || []);
      }
    } catch (error) {
      console.error("Error fetching wishlist from backend:", error);
      // Fallback to localStorage if backend fails
      loadWishlistFromLocalStorage();
    }
  };

  const loadWishlistFromLocalStorage = () => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error);
      setWishlistItems([]);
    }
  };

  const syncWishlistToBackend = async (wishlistData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await axios.post('/api/user/wishlist', 
        { wishlistItems: wishlistData },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
    } catch (error) {
      console.error("Error syncing wishlist to backend:", error);
    }
  };

  const fetchProductData = async () => {
    try {
      const formattedProducts = productsDummyData.map(p => ({
        _id: p._id,
        name: p.name,
        description: p.description,
        rating: p.rating || 0,
        offerPrice: p.offerPrice,
        image: p.image || [],
        category: p.category || "Uncategorized",
        brand: p.brand || "Unknown",
        color: p.color || "Unspecified",
      }));
      setProducts(formattedProducts);
    } catch (error) {
      console.error("Error fetching product data:", error);
      toast.error("Failed to load products");
    }
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUserData(null);
        return;
      }

      const { data } = await axios.get("/api/user/data", {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (data?.success) {
        setUserData(data.user);
        setIsSeller(data.user.role === 'seller');
        setCartItems(data.user.cartItems || {});
        setIsAuthenticated(true);
        // Also fetch wishlist when user data is fetched
        await fetchWishlistFromBackend();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (error.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUserData(null);
      }
    }
  };

  // Authentication functions
  const login = async (emailOrUsername, password) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/auth/login', {
        username: emailOrUsername,
        password
      });

      if (data.success) {
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        setUserData(data.user);
        setIsSeller(data.user.role === 'seller');
        setCartItems(data.user.cartItems || {});
        
        // Fetch wishlist from backend after login
        await fetchWishlistFromBackend();
        
        toast.success('Login successful!');
        return { success: true };
      }
    } catch (error) {
      console.error("Login error:", error);
      const message = error.response?.data?.error || 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/auth/signup', userData);

      if (data.success) {
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        setUserData(data.user);
        setIsSeller(data.user.role === 'seller');
        
        // Sync local wishlist to backend after signup
        if (wishlistItems.length > 0) {
          await syncWishlistToBackend(wishlistItems);
        }
        
        toast.success('Account created successfully!');
        return { success: true };
      }
    } catch (error) {
      console.error("Signup error:", error);
      const message = error.response?.data?.error || 'Signup failed';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserData(null);
    setIsSeller(false);
    setCartItems({});
    // Don't clear wishlist items on logout - keep them in localStorage
    toast.success('Logged out successfully');
    router.push('/');
  };

  // Wishlist functions
  const addToWishlist = async (productId) => {
    try {
      if (!wishlistItems.includes(productId)) {
        const updatedWishlist = [...wishlistItems, productId];
        setWishlistItems(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        
        // Sync to backend if user is authenticated
        if (isAuthenticated) {
          await syncWishlistToBackend(updatedWishlist);
        }
        
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist");
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const updatedWishlist = wishlistItems.filter(id => id !== productId);
      setWishlistItems(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      
      // Sync to backend if user is authenticated
      if (isAuthenticated) {
        await syncWishlistToBackend(updatedWishlist);
      }
      
      toast.success("Removed from wishlist");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove from wishlist");
    }
  };

  const toggleWishlist = async (productId) => {
    if (isInWishlist(productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.includes(productId);
  };

  const getWishlistProducts = () => {
    if (!products || !wishlistItems) return [];
    return products.filter(product => wishlistItems.includes(product._id));
  };

  // Cart functions (unchanged)
  const addToCart = async (itemId) => {
    try {
      let cartData = { ...cartItems };
      if (cartData[itemId]) {
        cartData[itemId] += 1;
      } else {
        cartData[itemId] = 1;
      }
      setCartItems(cartData);
      
      if (isAuthenticated) {
        await syncCartToBackend(cartData);
      }
      
      toast.success("Added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  const updateCartQuantity = async (itemId, quantity) => {
    try {
      let cartData = { ...cartItems };
      if (quantity === 0) {
        delete cartData[itemId];
      } else {
        cartData[itemId] = quantity;
      }
      setCartItems(cartData);
      
      if (isAuthenticated) {
        await syncCartToBackend(cartData);
      }
      
      if (quantity === 0) {
        toast.success("Removed from cart");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart");
    }
  };

  const syncCartToBackend = async (cartData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await axios.post("/api/user/cart", 
        { cartItems: cartData },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
    } catch (error) {
      console.error("Error syncing cart to backend:", error);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        totalCount += cartItems[itemId];
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      let itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo && cartItems[itemId] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[itemId];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  const clearCart = () => {
    setCartItems({});
    if (isAuthenticated) {
      syncCartToBackend({});
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const value = {
    // Authentication
    isAuthenticated,
    login,
    signup,
    logout,
    userData,
    fetchUserData,
    
    // User role
    isSeller,
    setIsSeller,
    
    // Products
    products,
    fetchProductData,
    
    // Cart
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
    clearCart,
    
    // Wishlist
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    getWishlistProducts,
    
    // Utilities
    currency,
    router,
    loading,
    setLoading,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};