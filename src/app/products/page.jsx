'use client'
import React, { useState, useEffect, useRef } from "react";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

const AllProducts = () => {
  const { products } = useAppContext();

  // --- Filter State ---
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2500);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2500 });
  
  // --- Mobile Filter State ---
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // --- Detect mobile screen ---
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // --- Extract price range from products ---
  useEffect(() => {
    if (products && products.length > 0) {
      const prices = products.map(product => {
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
  }, [products]);

  // --- Handlers ---
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

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
  const filteredProducts = products.filter((product) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category || "Uncategorized")) return false;
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

  const allCategories = Array.from(new Set(products.map(p => p.category)));
  const allBrands = Array.from(new Set(products.map(p => p.brand || "Unknown")));
  const allColor = Array.from(new Set(products.map(p => p.color)));

  // Price Filter Component
  const PriceFilter = () => {
    const [minValue, setMinValue] = useState(priceRange.min);
    const [maxValue, setMaxValue] = useState(priceRange.max);
    const sliderRef = useRef(null);

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
        
        {/* Dual Range Slider */}
        <div className="mb-6 relative">
          <div className="absolute h-1 bg-gray-300 rounded-full w-full top-1/2 transform -translate-y-1/2"></div>
          <div 
            className="absolute h-1 bg-[#615004] rounded-full top-1/2 transform -translate-y-1/2"
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
            className="absolute w-4 h-4 bg-white border-2 border-[#615004] rounded-full shadow-md -top-1 -ml-2 cursor-pointer z-20 hover:scale-110 transition-transform"
            style={{ left: `${minPercent}%` }}
          />

          <div
            className="absolute w-4 h-4 bg-white border-2 border-[#615004] rounded-full shadow-md -top-1 -ml-2 cursor-pointer z-20 hover:scale-110 transition-transform"
            style={{ left: `${maxPercent}%` }}
          />
        </div>

        {/* Price Input Fields */}
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
            className="text-3xl text-gray-600 hover:text-[#615004] p-2"
          >
            ×
          </button>
        </div>
      )}

      <div className={`flex flex-col gap-6 ${isMobile ? 'px-2' : ''}`}>
        <PriceFilter />

        {/* Category Section with Links */}
        <div className={`${isMobile ? 'bg-gray-50 p-4 rounded-lg' : 'bg-white p-4 rounded-lg border border-orange-200'}`}>
          <h5 className="font-cormorant text-text-clr font-semibold mb-3 text-lg">Categories</h5>
          <div className="flex flex-col gap-3 scrollbar-hide max-h-80 overflow-y-auto">
            {allCategories.map((cat, i) => (
              <div key={i} className="flex items-center justify-between group">
                <label className="flex items-center gap-3 cursor-pointer hover:text-text-hover-clr font-nexa text-base p-2 rounded hover:bg-gray-100 flex-1">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                    className="accent-[#615004] w-5 h-5"
                  />
                  <span className="text-base">{cat}</span>
                </label>
                <Link 
                  href={`/products/${cat.toLowerCase()}`}
                  className="text-[#615004] opacity-0 group-hover:opacity-100 transition-opacity px-2 hover:text-orange-600"
                  title={`View all ${cat}`}
                >
                  →
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className={`${isMobile ? 'bg-gray-50 p-4 rounded-lg' : 'bg-white p-4 rounded-lg border border-orange-200'}`}>
          <h5 className="font-cormorant text-text-clr font-semibold mb-3 text-lg">Brands</h5>
          <div className="flex flex-col gap-3 scrollbar-hide max-h-80 overflow-y-auto">
            {allBrands.map((brand, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer hover:text-text-hover-clr font-nexa text-base p-2 rounded hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="accent-[#615004] w-5 h-5"
                />
                <span className="text-base">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={`${isMobile ? 'bg-gray-50 p-4 rounded-lg' : 'bg-white p-4 rounded-lg border border-orange-200'}`}>
          <h5 className="font-cormorant text-text-clr font-semibold mb-3 text-lg">Colors</h5>
          <div className="flex flex-col gap-3 scrollbar-hide max-h-80 overflow-y-auto">
            {allColor.map((color, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer hover:text-text-hover-clr font-nexa text-base p-2 rounded hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={selectedColor.includes(color)}
                  onChange={() => handleColorChange(color)}
                  className="accent-[#615004] w-5 h-5"
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
            className="w-full bg-[#184309] text-white py-4 rounded-lg font-semibold hover:bg-[#615004] transition-colors text-lg"
          >
            Apply Filters ({selectedCategories.length + selectedBrands.length + selectedColor.length})
          </button>
        </div>
      )}
    </div>
  );

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
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="font-cormorant text-3xl font-semibold text-text-clr">All Products</h1>
            <p className="text-gray-600 mt-2">Browse our complete collection</p>
          </div>

          {isMobile && (
            <div className="mb-4 flex justify-between items-center">
              <h2 className="font-cormorant text-text-clr font-semibold text-xl">
                Products ({filteredProducts.length})
              </h2>
              <button
                onClick={toggleMobileFilter}
                className="bg-[#184309] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1c4b0a] transition-colors flex items-center gap-2"
              >
                <span>Filters</span>
                <span className="bg-white text-[#184309] rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {selectedCategories.length + selectedBrands.length + selectedColor.length}
                </span>
              </button>
            </div>
          )}

          {isMobile && <FilterSidebar />}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
            {filteredProducts.length === 0 && (
              <p className="text-center col-span-full text-text-clr font-nexa mt-6">
                No products match the selected filters.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;