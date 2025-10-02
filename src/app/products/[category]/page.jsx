'use client'
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

const CategoryPage = () => {
  const params = useParams();
  const { products } = useAppContext();
  const category = params.category;

  // Debug: Log the received category and all available categories
  console.log('URL Category:', category);
  console.log('All products:', products);
  console.log('All categories in products:', Array.from(new Set(products.map(p => p.category))));

  // Convert URL parameter back to category format (replace hyphens with spaces and capitalize)
  const formatCategoryFromUrl = (urlCategory) => {
    return urlCategory
      .replace(/-/g, ' ') // Replace hyphens with spaces
      .split(' ') // Split into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' '); // Join back with spaces
  };

  const formattedCategory = formatCategoryFromUrl(category);
  
  // Filter products by category - more flexible matching
  const categoryProducts = products.filter(product => {
    if (!product.category) return false;
    
    const productCategory = product.category.toLowerCase().trim();
    const targetCategory = formattedCategory.toLowerCase().trim();
    
    return productCategory === targetCategory;
  });

  // --- Filter State ---
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2500);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2500 });
  
  // --- Mobile Filter State ---
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Format category name for display
  const formatCategoryName = (cat) => {
    if (!cat) return 'Category';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  // --- Detect mobile screen ---
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // --- Extract price range from category products ---
  useEffect(() => {
    if (categoryProducts && categoryProducts.length > 0) {
      const prices = categoryProducts.map(product => {
        let productPrice = 0;
        if (product.price) {
          if (typeof product.price === "string") productPrice = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
          else if (typeof product.price === "number") productPrice = product.price;
        }
        return productPrice;
      }).filter(price => !isNaN(price) && price > 0);

      if (prices.length > 0) {
        const min = Math.floor(Math.min(...prices));
        const max = Math.ceil(Math.max(...prices));
        setMinPrice(min);
        setMaxPrice(max);
        setPriceRange({ min, max });
      }
    }
  }, [categoryProducts]);

  // --- Handlers ---
  const handleBrandChange = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };
  
  const handleColorChange = (color) => {
    setSelectedColor(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  // Price Range Handlers
  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
  };

  const handleMinInputChange = (e) => {
    const val = Math.min(Math.max(parseFloat(e.target.value) || minPrice, minPrice), priceRange.max - 1);
    setPriceRange(prev => ({ ...prev, min: val }));
  };

  const handleMaxInputChange = (e) => {
    const val = Math.min(Math.max(parseFloat(e.target.value) || maxPrice, priceRange.min + 1), maxPrice);
    setPriceRange(prev => ({ ...prev, max: val }));
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  // --- Filter Products ---
  const filteredProducts = categoryProducts.filter((product) => {
    if (selectedColor.length > 0 && !selectedColor.includes(product.color || "Uncategorized")) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand || "Unknown")) return false;

    let productPrice = 0;
    const priceToUse = product.offerPrice || product.price;
    if (priceToUse) {
      if (typeof priceToUse === "string") productPrice = parseFloat(priceToUse.replace(/[^0-9.-]+/g, ""));
      else if (typeof priceToUse === "number") productPrice = priceToUse;
    }
    if (productPrice < priceRange.min || productPrice > priceRange.max) return false;

    return true;
  });

  const categoryBrands = Array.from(new Set(categoryProducts.map(p => p.brand || "Unknown")));
  const categoryColors = Array.from(new Set(categoryProducts.map(p => p.color)));

  // Price Filter Component
  const PriceFilter = () => {
    const [minValue, setMinValue] = useState(priceRange.min);
    const [maxValue, setMaxValue] = useState(priceRange.max);

    useEffect(() => {
      setMinValue(priceRange.min);
      setMaxValue(priceRange.max);
    }, [priceRange]);
    
    const handleMinChange = (e) => {
      const value = Math.min(Number(e.target.value), maxValue - 1);
      setMinValue(value);
      handlePriceRangeChange({ min: value, max: maxValue });
    };

    const handleMaxChange = (e) => {
      const value = Math.max(Number(e.target.value), minValue + 1);
      setMaxValue(value);
      handlePriceRangeChange({ min: minValue, max: value });
    };

    const minPercent = ((minValue - minPrice) / (maxPrice - minPrice)) * 100;
    const maxPercent = ((maxValue - minPrice) / (maxPrice - minPrice)) * 100;

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 0
      }).format(amount);
    };

    return (
      <div className={`${isMobile ? 'bg-gray-50 p-4 rounded-lg' : 'bg-white p-4 rounded-lg border border-orange-200'}`}>
        <h5 className="font-cormorant text-text-clr font-semibold mb-4 text-lg">Price</h5>
        
        <div className="mb-6 relative">
          <div className="absolute h-1 bg-gray-300 rounded-full w-full top-1/2 transform -translate-y-1/2"></div>
          <div 
            className="absolute h-1 bg-orange-500 rounded-full top-1/2 transform -translate-y-1/2"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`
            }}
          ></div>

          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={minValue}
            onChange={handleMinChange}
            className="absolute w-full h-2 top-1/2 transform -translate-y-1/2 appearance-none cursor-pointer opacity-0 z-10"
          />

          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={maxValue}
            onChange={handleMaxChange}
            className="absolute w-full h-2 top-1/2 transform -translate-y-1/2 appearance-none cursor-pointer opacity-0 z-10"
          />

          <div
            className="absolute w-4 h-4 bg-white border-2 border-orange-500 rounded-full shadow-md -top-1 -ml-2 cursor-pointer z-20 hover:scale-110 transition-transform"
            style={{ left: `${minPercent}%` }}
          />

          <div
            className="absolute w-4 h-4 bg-white border-2 border-orange-500 rounded-full shadow-md -top-1 -ml-2 cursor-pointer z-20 hover:scale-110 transition-transform"
            style={{ left: `${maxPercent}%` }}
          />
        </div>

        <div className="flex gap-3 mb-3">
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Min</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                value={minValue}
                onChange={handleMinInputChange}
                min={minPrice}
                max={maxValue - 1}
                className="w-full border border-gray-300 pl-8 pr-3 py-2 rounded text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 focus:outline-none"
              />
            </div>
          </div>
          
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Max</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                value={maxValue}
                onChange={handleMaxInputChange}
                min={minValue + 1}
                max={maxPrice}
                className="w-full border border-gray-300 pl-8 pr-3 py-2 rounded text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>₹{formatCurrency(minValue)}</span>
          <span>₹{formatCurrency(maxValue)}</span>
        </div>
      </div>
    );
  };

  const FilterSidebar = () => (
    <div className={`bg-white p-4 rounded-lg shadow-sm border border-orange-200 ${
      isMobile ? 
        `fixed inset-0 h-full w-full z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'
        }` 
        : 'md:w-full'
    }`}>
      {isMobile && (
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h3 className="font-cormorant text-text-clr font-semibold text-xl">Filters</h3>
          <button 
            onClick={toggleMobileFilter}
            className="text-3xl text-gray-600 hover:text-orange-500 p-2"
          >
            ×
          </button>
        </div>
      )}

      <div className={`flex flex-col gap-6 ${isMobile ? 'px-2' : ''}`}>
        <PriceFilter />

        <div className={`${isMobile ? 'bg-gray-50 p-4 rounded-lg' : 'bg-white p-4 rounded-lg border border-orange-200'}`}>
          <h5 className="font-cormorant text-text-clr font-semibold mb-3 text-lg">Brands</h5>
          <div className="flex flex-col gap-3 scrollbar-hide max-h-80 overflow-y-auto">
            {categoryBrands.map((brand, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer hover:text-text-hover-clr font-nexa text-base p-2 rounded hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="accent-orange-500 w-5 h-5"
                />
                <span className="text-base">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={`${isMobile ? 'bg-gray-50 p-4 rounded-lg' : 'bg-white p-4 rounded-lg border border-orange-200'}`}>
          <h5 className="font-cormorant text-text-clr font-semibold mb-3 text-lg">Colors</h5>
          <div className="flex flex-col gap-3 scrollbar-hide max-h-80 overflow-y-auto">
            {categoryColors.map((color, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer hover:text-text-hover-clr font-nexa text-base p-2 rounded hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={selectedColor.includes(color)}
                  onChange={() => handleColorChange(color)}
                  className="accent-orange-500 w-5 h-5"
                />
                <span className="text-base">{color}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {isMobile && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 mt-6 pt-4 pb-4">
          <button
            onClick={toggleMobileFilter}
            className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-lg"
          >
            Apply Filters ({selectedBrands.length + selectedColor.length})
          </button>
        </div>
      )}
    </div>
  );

  // Show loading or error state
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 md:px-16 lg:px-32 bg-section-bg-clr py-10">
        <h1 className="font-cormorant text-3xl font-semibold text-text-clr mb-4">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <>
      {isMobile && isMobileFilterOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileFilter}
        />
      )}

      <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-32 bg-section-bg-clr py-10 gap-6">
        {!isMobile && (
          <div className="md:w-1/4 mb-6 md:mb-0 flex flex-col gap-6">
            <FilterSidebar />
          </div>
        )}

        <div className="flex-1">
          {/* Breadcrumb and Header */}
          <div className="mb-6">
            <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Link href="/products" className="hover:text-orange-500">All Products</Link>
              <span>→</span>
              <span className="text-text-clr font-semibold">{formatCategoryName(formattedCategory)}</span>
            </nav>
            <h1 className="font-cormorant text-3xl font-semibold text-text-clr">
              {formatCategoryName(formattedCategory)}
            </h1>
            <p className="text-gray-600 mt-2">
              {categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'} found in this category
            </p>
          </div>

          {isMobile && (
            <div className="mb-4 flex justify-between items-center">
              <h2 className="font-cormorant text-text-clr font-semibold text-xl">
                Products ({filteredProducts.length})
              </h2>
              <button
                onClick={toggleMobileFilter}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                <span>Filters</span>
                <span className="bg-white text-orange-500 rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {selectedBrands.length + selectedColor.length}
                </span>
              </button>
            </div>
          )}

          {isMobile && <FilterSidebar />}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
            {filteredProducts.length === 0 && categoryProducts.length > 0 && (
              <p className="text-center col-span-full text-text-clr font-nexa mt-6">
                No {formattedCategory} found matching the selected filters.
              </p>
            )}
            {categoryProducts.length === 0 && (
              <div className="text-center col-span-full text-text-clr font-nexa mt-6">
                <p className="text-xl mb-4">No products found in "{formattedCategory}" category.</p>
                <Link href="/products" className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                  Browse All Products
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;