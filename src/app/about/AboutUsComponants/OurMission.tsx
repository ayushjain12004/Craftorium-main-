"use client";

import { useEffect, useState, useRef } from "react";

export default function OurMission() {
  const achievements = [
    { id: 1, label: "Vendors Onboarded", value: 1200 },
    { id: 2, label: "Products Listed", value: 5400 },
    { id: 3, label: "Happy Customers", value: 15000 },
    { id: 4, label: "Years of Experience", value: 5 },
  ];

  const [counts, setCounts] = useState(achievements.map(() => 0));
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentSection = sectionRef.current; // copy ref for safety

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start: number | null = null;
          const duration = 2000; // animation duration in ms

          const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;

            setCounts(
              achievements.map((item) => {
                const increment = (item.value * progress) / duration;
                return increment >= item.value
                  ? item.value
                  : Math.ceil(increment);
              })
            );

            if (progress < duration) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);

          if (currentSection) observer.unobserve(currentSection);
        }
      },
      { threshold: 0.3 }
    );

    if (currentSection) observer.observe(currentSection);

    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, [achievements]); // ✅ include achievements as dependency

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-16 lg:py-24 px-6 md:px-12 lg:px-20 bg-[var(--section-bg-clr)]"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-8 md:mb-16">
        <h2 className="inline-block bg-[var(--text-hover-clr)] text-white font-nexa px-5 py-1 md:py-2 rounded-full text-sm mb-5 shadow-lg">
          Our Mission &amp; Achievements
        </h2>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-[var(--text-clr)]">
          Craftorium: Empowering Creators, Achieving Milestones
        </h3>
        <p className="text-md md:text-lg lg:text-xl font-nexa text-[var(--text-clr)] mt-4 max-w-2xl mx-auto">
          At Craftorium, we provide a trusted multivendor marketplace where
          creativity meets opportunity. Here&apos;s what we have achieved so far:
        </p>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
        {achievements.map((item, idx) => (
          <div
            key={item.id}
            className="p-8 rounded-3xl shadow-lg flex flex-col items-center hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <h4 className="text-4xl md:text-5xl font-cormorant font-bold text-[var(--text-hover-clr)] mb-2">
              {counts[idx]}
              {item.label.includes("Years") ? "+" : ""}
            </h4>
            <p className="text-[var(--text-clr)] font-nexa text-lg md:text-xl">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
