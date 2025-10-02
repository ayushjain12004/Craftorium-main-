"use client";

import Image from "next/image";

export default function WhoWeAre() {
  return (
    <section className="relative py-14 md:py-18 lg:py-24 px-4 md:px-8 lg:px-16 xl:px-24 bg-[var(--section-bg-clr)] overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
        {/* Text Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <div className="inline-block bg-[var(--text-hover-clr)] text-white font-nexa px-5 py-1.5 md:py-2 rounded-full text-sm mb-5 shadow-lg">
            Who We Are
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-cormorant font-bold mb-6 text-[var(--text-clr)]">
            Craftorium — The Multivendor Marketplace
          </h2>

          <p className="text-md md:text-lg lg:text-lg xl:text-xl font-nexa text-[var(--text-clr)] leading-relaxed mb-2 md:mb-6">
            Craftorium is a{" "}
            <span className="font-bold">unique multivendor platform</span>{" "}
            where creators, makers, and brands come together to showcase their
            products. From handcrafted items to modern innovations, we empower
            vendors to grow and provide customers with an extraordinary shopping
            experience.
          </p>

          <p className="text-md md:text-lg lg:text-lg xl:text-xl font-nexa text-[var(--text-clr)] leading-relaxed">
            Whether you’re a nano, micro, or large-scale seller, Craftorium
            helps you reach a wider audience, build your brand, and thrive in a
            trusted, creative marketplace.
          </p>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 relative flex justify-center lg:justify-end">
          <div className="relative rounded-3xl overflow-hidden w-full h-full">
            <Image
              src="/images/who-we-are.webp"
              alt="Who We Are Illustration"
              className="w-full h-full object-cover"
              width={600} 
              height={400} 
              priority
            />
          </div>

          {/* Decorative Blur Circle */}
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-[var(--text-hover-clr)]/20 rounded-full blur-3xl hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
}
