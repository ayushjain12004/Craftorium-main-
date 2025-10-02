"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  const heroBg = "/images/craftorium-hero-img.webp"; // public folder path

  return (
    <section className="relative w-full pt-32 md:pt-36 lg:pt-54 pb-18 flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroBg} // public folder path
          alt="Craftorium Hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="font-cormorant text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-8">
          Connecting Craftsmanship with the World
        </h1>
        <p className="font-nexa text-md md:text-lg text-white max-w-2xl mx-auto mb-5 md:mb-12">
          Discover handmade treasures and the stories behind them.
        </p>
        <div className="pt-6">
          <Link href="/cart-component/all-products"   className="font-nexa bg-[var(--text-hover-clr)] text-white px-6 md:px-8 py-1.5 md:py-2 
             rounded-[40px] md:rounded-[60px] text-md md:text-xl font-bold 
             transition-transform duration-300 ease-out
             hover:-translate-y-1 hover:scale-105 hover:shadow-lg">
               SHOP NOW
          </Link>
        
        </div>
      </div>
    </section>
  );
}
