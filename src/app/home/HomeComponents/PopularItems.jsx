"use client";
import Image from "next/image";
import Link from "next/link";

export default function PopularItems() {
  const products = [
    {
      id: 1,
      title: "Gold Necklaces with Pendants",
      price: "₹1200",
      img: "/images/G1.webp",
      size: "col-span-2 row-span-2",
      category: "Gold Necklace",
    },
    {
      id: 2,
      title: "Pure Cotton Fabric",
      price: "₹100",
      img: "/images/G6.webp",
      category: "Pure Cotton Fabric",
    },
    {
      id: 3,
      title: "Blue Silk Fabric",
      price: "₹300",
      img: "/images/G5.webp",
      category: "Pure Cotton Fabric",
    },
    {
      id: 4,
      title: "Gold Necklace",
      price: "₹999",
      img: "/images/G2.webp",
      size: "col-span-2 row-span-2",
      category: "Gold Necklace",
    },
    {
      id: 5,
      title: "Engagement Ring",
      price: "2199",
      img: "/images/G4.webp",
      category: "Engagement Ring",
    },
    {
      id: 6,
      title: "Gold and Pink Jewelries",
      price: "₹399",
      img: "/images/G3.webp",
      category: "Gold Necklace",
    },
  ];

  // Get unique categories from products
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  // Filter products by category
  const getProductsByCategory = (category) => {
    return products.filter((product) => product.category === category);
  };

  // Get featured products for each category (first product in each category)
  const featuredProducts = categories.map((category) => {
    const categoryProducts = getProductsByCategory(category);
    return categoryProducts[0]; // Take the first product from each category
  });

  return (
    <section className="px-4 md:px-8 lg:px-16 xl:px-24 pt-4 md:pt-10 pb-16 bg-white">
      {/* Header */}
      <div className="text-center mb-6 md:mb-10">
        <h2 className="font-cormorant text-[var(--text-hover-clr)] text-2xl md:text-3xl lg:text-4xl font-bold">
          Popular Items Right Now
        </h2>
        <p className="font-nexa text-gray-600 mt-2 max-w-md mx-auto text-sm">
          From intricate Jewelry to exquisite pottery and clothes, explore a
          world of creativity and craftsmanship.
        </p>
      </div>

      {/* Category Filter Buttons */}

      {/* Grid - Showing all products by default */}
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[240px] lg:auto-rows-[320px] gap-4 font-nexa">
        {products.map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.category
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
            className={`relative rounded-xl overflow-hidden shadow group flex flex-col justify-end p-3 bg-gray-100 ${
              item.size || ""
            } hover:shadow-lg transition-shadow`}
          >
            {/* Product Image */}
            <div className="relative w-full h-full">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="absolute inset-0 object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Category Badge */}
              <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
                {item.category}
              </div>
            </div>

            {/* Product Info */}
            <div className="relative z-10 text-white rounded-lg p-2 text-sm bg-black/40 backdrop-blur-sm">
              <h3 className="font-semibold text-[14px] md:text-[22px]">
                {item.title}
              </h3>
              <p className="text-xl">{item.price}</p>
              <div className="text-xs opacity-90 mt-1">
                Click to view all {item.category}
              </div>
            </div>

            {/* Wishlist Button */}
            <button
              className="absolute top-2 right-2 rounded-full shadow hover:scale-110 transition bg-white/60 p-1 z-20"
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation when clicking wishlist
                e.stopPropagation();
                // Add your wishlist logic here
                console.log("Added to wishlist:", item.title);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-8 h-8 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 
                     1.126-4.312 2.733C11.285 4.876 9.623 
                     3.75 7.688 3.75 5.099 3.75 3 5.765 
                     3 8.25c0 7.22 9 12 9 12s9-4.78 
                     9-12z"
                />
              </svg>
            </button>
          </Link>
        ))}
      </div>

      {/* Category Sections */}
      <div className="mt-16 px-4">
        <h3 className="font-cormorant text-3xl md:text-4xl font-bold text-center mb-8 text-[var(--text-hover-clr)] tracking-wide">
          Pocket Friendly Prices
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {categories.map((category) => {
            const categoryProducts = getProductsByCategory(category);
            const featuredProduct = categoryProducts[0];

            return (
              <Link
                key={category}
                href={`/products/${category
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
                  <div className="relative h-48 md:h-52">
                    <Image
                      src={featuredProduct.img}
                      alt={category}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Price Badge */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#184309] text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg min-w-[120px] text-center">
                      UNDER ₹{featuredProduct.price}
                    </div>
                  </div>

                  <div className="p-4 text-center">
                    <h4 className="font-cormorant text-xl font-semibold text-gray-900 mb-2 group-hover:text-red-500 transition-colors">
                      {category}
                    </h4>
                    <p className="text-gray-600 text-xs mb-3">
                      {categoryProducts.length}{" "}
                      {categoryProducts.length === 1 ? "item" : "items"}
                    </p>
                    <button
                      className="w-full py-2.5 
             text-white 
             font-semibold text-sm 
             rounded-xl 
             shadow-md hover:shadow-lg 
             transition-all duration-300
             border border-[var(--text-clr)]
            bg-[#615004] text-white p-4 rounded hover:bg-[#184309] transition-colors duration-300"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
