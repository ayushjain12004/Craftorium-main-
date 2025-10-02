"use client";

export default function HeroSectionAbt() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat bg-fixed py-12 md:py-28 lg:py-44 px-4 md:px-8 lg:px-16 xl:px-24"
      style={{
        backgroundImage: `url(/images/contact-hero.webp)`,
        backgroundColor: "var(--section-bg-clr)",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center lg:text-left lg:items-start">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-cormorant text-white">
          About Craftorium
        </h1>

        <p className="text-lg md:text-2xl max-w-2xl mb-10 font-nexa text-white">
          Discover who we are, what drives us, and how we craft meaningful
          stories that connect brands with people worldwide.
        </p>

        <button
          className="font-nexa bg-[#fef6eb] text-[var(--text-hover-clr)] px-6 md:px-8 py-2 md:py-3 
                     rounded-[40px] md:rounded-[60px] text-md md:text-xl font-bold
                     transition-transform duration-300 ease-out shadow-md
                     hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
        >
          Explore More
        </button>
      </div>
    </section>
  );
}
