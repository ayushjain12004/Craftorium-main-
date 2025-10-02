"use client";

import { motion } from "framer-motion";
import { UserIcon, EyeIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export default function HowWeWork() {
  const steps = [
    {
      id: 1,
      title: "Join Craftorium",
      desc: "Sign up as a vendor or buyer and create your profile to start your journey.",
      icon: (
        <UserIcon className="w-12 h-12 text-white p-2 bg-[var(--text-hover-clr)] rounded-full" />
      ),
    },
    {
      id: 2,
      title: "Showcase & Discover",
      desc: "Vendors list their products, buyers explore unique creations and make purchases.",
      icon: (
        <EyeIcon className="w-12 h-12 text-white p-2 bg-[var(--text-hover-clr)] rounded-full" />
      ),
    },
    {
      id: 3,
      title: "Grow & Connect",
      desc: "Vendors expand their reach, and buyers connect with creators in a trusted marketplace.",
      icon: (
        <ChartBarIcon className="w-12 h-12 text-white p-2 bg-[var(--text-hover-clr)] rounded-full" />
      ),
    },
  ];

  return (
    <section className="py-4 md:py-12 lg:py-16 px-4 md:px-8 lg:px-12 xl:px-16 bg-[var(--section-bg-clr)]">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="inline-block bg-[var(--text-hover-clr)] text-white font-nexa px-5 py-1.5 md:py-2 rounded-full text-sm mb-5 shadow-lg">
          How We Work
        </h2>
        <h3 className="text-4xl md:text-4xl lg:text-5xl font-cormorant font-bold text-[var(--text-clr)]">
          Simple Steps to Get Started
        </h3>
        <p className="text-md md:text-lg lg:text-xl font-nexa text-[var(--text-clr)] mt-4 max-w-2xl mx-auto">
          Craftorium connects creators and buyers seamlessly. Here’s how you can
          join our multivendor platform and start your creative journey.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto">
        {/* Vertical Line (desktop only) */}
        <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 w-1 bg-[var(--text-hover-clr)] h-full z-0"></div>

        <div className="flex flex-col space-y-8 md:space-y-12 lg:space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className={`flex flex-col md:flex-row items-center justify-between relative ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Circle on timeline */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[var(--text-hover-clr)] rounded-full z-20"></div>

              {/* Step card */}
              <div className="md:w-1/2 mt-6 md:mt-0 flex flex-col items-center md:items-start md:px-8">
                <div className="bg-white p-8 rounded-3xl shadow-lg w-full text-center md:text-left">
                  <div className="mb-4 flex justify-center md:justify-start">
                    {step.icon}
                  </div>
                  <h4 className="text-xl md:text-2xl font-semibold text-[var(--text-clr)] mb-2">
                    {step.title}
                  </h4>
                  <p className="text-[var(--text-clr)] font-nexa leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
