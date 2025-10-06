"use client";
import Link from "next/link";
import Image from "next/image";


export default function ArtisanalElegance() {
  return (
    <section className="bg-[#ffe6cd] py-8 px-4 md:px-8 lg:px-16 xl:px-24 flex flex-col md:flex-row items-center justify-between">
      {/* Text Section */}
      <div className="md:w-1/2 space-y-5">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-hover-clr)] font-cormorant">
          Artisanal Elegance
        </h2>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed lg:pr-4 xl:pr-0 font-nexa">
          From intricate Jewelry to exquisite pottery and cloths, explore a world of
          creativity and craftsmanship. From intricate Jewelry to exquisite pottery
          and cloths, explore a world of creativity and craftsmanship. From intricate
          Jewelry to exquisite pottery and cloths, explore a world of creativity and
          craftsmanship.
        </p>
        
          <Link
  href="/cart-component/all-products"
  className="relative z-10 font-nexa bg-[var(--text-hover-clr)] text-white mt-8 md:mt-12 
             px-6 md:px-8 py-1.5 md:py-2 rounded-[60px] font-semibold shadow 
             transform-gpu will-change-transform
             transition-transform duration-300 ease-out
             hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
>
  SHOP NOW
</Link>

        
       
      </div>

      {/* Image Section */}
      <div className="relative mt-10 md:mt-0 md:w-1/2 flex justify-end">
        <div className="rounded-2xl overflow-hidden border-10 border-[#fef5ef] w-[340px] md:w-[350px] lg:w-[450px]">
          <Image
            src="/images/artisans.webp"
            alt="Beige Textile"
             width={450} // you must provide width and height with next/image
             height={450}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="font-nexa absolute md:bottom-12 lg:bottom-24 bottom-3 left-3 md:-left-26 lg:-left-22 xl:left-28 bg-white px-6 py-3 rounded-lg text-lg shadow-md font-medium text-gray-600">
          {/* You had `StrinConstants.beigeTextile` → replace with static text or import constants */}
          Beige Textile
        </div>
      </div>
    </section>
  );
}
