"use client";
import React from "react";

const ContactHero: React.FC = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat bg-fixed py-28 md:py-44 px-4 md:px-8 lg:px-16 xl:px-24"
      style={{
        backgroundImage: `url(/images/contact-hero.webp)`, // using public folder
        backgroundColor: "var(--section-bg-clr)",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center lg:text-left lg:items-start">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 font-cormorant text-white">
          Get in Touch with Craftorium
        </h1>

        <p className="text-lg md:text-2xl max-w-xl mb-10 font-nexa text-white">
          We’d love to hear from you! Reach out for queries, suggestions, or
          collaborations.
        </p>

        <button
          className="font-nexa bg-[#fef6eb] text-[var(--text-hover-clr)] px-6 md:px-8 py-2 md:py-3 
                     rounded-[40px] md:rounded-[60px] text-md md:text-xl font-bold
                     transition-transform duration-300 ease-out shadow-md
                     hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
        >
          Contact Us
        </button>
      </div>
    </section>
  );
};

export default ContactHero;
