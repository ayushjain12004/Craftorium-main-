"use client";

import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Use public folder paths instead of imports
const artisans = [
  { id: 1, name: "Ananya Verma", craft: "Hand Block Printing", image: "/images/artisans-1.webp" },
  { id: 2, name: "Aarav Sharma", craft: "Hand Block Printing", image: "/images/artisans-2.webp" },
  { id: 3, name: "Kavya Iyer", craft: "Silk Weaving", image: "/images/artisans-3.webp" },
  { id: 4, name: "Riya Das", craft: "Terracotta Pottery", image: "/images/artisans-1.webp" },
  { id: 5, name: "Aditya Menon", craft: "Wood Carving", image: "/images/artisans-2.webp" },
  { id: 6, name: "Meera Rao", craft: "Handloom Weaving", image: "/images/artisans-3.webp" },
  { id: 8, name: "Kavya Iyer", craft: "Silk Weaving", image: "/images/artisans-3.webp" },
  { id: 9, name: "Riya Das", craft: "Terracotta Pottery", image: "/images/artisans-1.webp" },
  { id: 10, name: "Aditya Menon", craft: "Wood Carving", image: "/images/artisans-2.webp" },
  { id: 11, name: "Meera Rao", craft: "Handloom Weaving", image: "/images/artisans-3.webp" },
];

export default function ArtisanSection() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      let closestIndex = 0;
      let minDistance = Infinity;

      Array.from(container.children).forEach((child, index) => {
        const el = child as HTMLElement; // ✅ Narrow type
        const childCenter = el.offsetLeft + el.offsetWidth / 2 - container.scrollLeft;
        const distance = Math.abs(container.offsetWidth / 2 - childCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setCenterIndex(closestIndex);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on mount

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const cardWidth = 250;
      const gap = 28;
      const scrollStep = cardWidth + gap;

      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollStep : scrollStep,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="pt-8 md:pt-12 lg:pt-16 pb-8 md:pb-12 lg:pb-20 bg-[#fef6eb]"
      id="artisans"
    >
      <div className="px-4 md:px-8 lg:px-16 xl:px-24 text-center">
        <h2 className="font-cormorant text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--text-hover-clr)] mb-4">
          Meet the Hands Behind the Art
        </h2>
        <p className="font-nexa text-gray-600 text-sm md:text-md max-w-2xl mx-auto mb-6 md:mb-12">
          Discover the incredible journeys of our artisans — their struggles,
          achievements, and timeless crafts that make every product unique.
        </p>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 bg-[#ffe6cd] text-black p-3 rounded-full shadow-md hover:bg-[#ffd9b3] z-10"
          >
            <FaChevronLeft size={20} />
          </button>

          <div
            ref={containerRef}
            className="flex overflow-x-auto space-x-6 scrollbar-hide snap-x snap-mandatory"
          >
            {artisans.map((artisan, index) => (
              <div
                key={artisan.id + index}
                onClick={() => router.push(`/artisan/${artisan.id}`)}
                className="cursor-pointer relative group flex-shrink-0 w-[250px] snap-center"
              >
                <div className="overflow-hidden relative rounded-xl">
                  <Image
                    src={artisan.image}
                    height={300}
                    width={300}
                    alt={artisan.name}
                    className="w-full h-[300px] object-fill transform group-hover:scale-105 transition duration-500"
                  />
                  {index !== centerIndex && (
                    <div className="absolute inset-0 bg-black/60 transition"></div>
                  )}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[85%] bg-[#ffe6cd] rounded-[10px] px-4 py-2 text-center shadow-md">
                    <h3 className="font-nexa text-lg md:text-xl font-semibold text-[var(--text-hover-clr)]">
                      {artisan.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-nexa">{artisan.craft}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 bg-[#ffe6cd] text-black p-3 rounded-full shadow-md hover:bg-[#ffd9b3] z-10"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
