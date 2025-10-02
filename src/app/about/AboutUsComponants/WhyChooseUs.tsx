"use client";

import Image from "next/image";

export default function WhyChooseUs() {
  const leftFeatures = [
    {
      id: 1,
      title: "Creative Solutions",
      desc: "Our team delivers innovative and personalized solutions tailored to your brand’s unique needs.",
      icon: "/images/abt-4.webp",
    },
    {
      id: 2,
      title: "Certified Experts",
      desc: "Work with professionals who are skilled, certified, and experienced in delivering exceptional results.",
      icon: "/images/abt-3.webp",
    },
  ];

  const rightFeatures = [
    {
      id: 3,
      title: "Affordable Packages",
      desc: "We offer flexible pricing and packages so every business can access top-quality services.",
      icon: "/images/abt-2.webp",
    },
    {
      id: 4,
      title: "Guaranteed Satisfaction",
      desc: "Our priority is your satisfaction—clients trust us for consistent, high-quality outcomes.",
      icon: "/images/abt-1.webp",
    },
  ];

  return (
    <section className="py-2 md:py-16 lg:py-20 px-4 md:px-8 lg:px-16 xl:px-24 bg-[var(--section-bg-clr)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Text Section */}
        <div className="lg:col-span-6">
          <div className="text-center lg:text-left">
            <h2 className="inline-block bg-[var(--text-hover-clr)] text-white font-nexa px-5 py-1 md:py-2 rounded-full text-sm mb-5 shadow-lg">
              Why Choose Craftorium
            </h2>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-cormorant font-bold text-[var(--text-clr)] leading-tight text-center md:text-left">
            The Craftorium <br /> Advantage
          </h2>
          <p className="mt-6 text-[var(--text-clr)] text-sm md:text-md lg:text-lg max-w-lg font-nexa">
            At Craftorium, we combine creativity, technology, and strategy to
            help businesses grow and stand out. With years of experience, we
            deliver solutions that make a real impact for our clients.
          </p>
          <div className="mt-6 flex gap-6">
            <button
              className="font-nexa bg-[var(--text-hover-clr)] text-white px-6 md:px-8 py-1.5 md:py-2 
                  rounded-[40px] md:rounded-[60px] text-md md:text-xl font-bold 
                  transition-transform duration-300 ease-out
                  hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
            >
              Explore All Services
            </button>
          </div>
        </div>

        {/* Right Features Section */}
        <div className="lg:col-span-6 relative">
          {/* Divider Line */}
          <div className="hidden lg:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-[var(--text-hover-clr)]" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8">
            {/* Left Column Features */}
            <div className="space-y-10 pr-6 md:mt-20">
              {leftFeatures.map((f, i) => (
                <div key={f.id}>
                  <div className="flex items-start gap-4">
                    <Image
                      src={f.icon}
                      alt={f.title}
                      width={40}
                      height={40}
                      className="transition-transform duration-300 ease-out hover:scale-110 hover:rotate-12"
                    />
                    <div>
                      <h4 className="text-xl font-bold font-cormorant text-[var(--text-hover-clr)]">
                        {f.title}
                      </h4>
                      <p className="font-nexa mt-2 text-[var(--text-clr)] text-sm leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                  {i < leftFeatures.length - 1 && (
                    <div className="mt-6 border-t-2 border-[var(--text-hover-clr)]" />
                  )}
                </div>
              ))}
            </div>

            {/* Right Column Features */}
            <div className="space-y-10 pl-0 md:pl-6 lg:pl-6 md:-mt-4">
              {rightFeatures.map((f, i) => (
                <div key={f.id}>
                  <div className="flex items-start gap-4">
                    <Image
                      src={f.icon}
                      alt={f.title}
                      width={40}
                      height={40}
                      className="transition-transform duration-300 ease-out hover:scale-110 hover:rotate-12"
                    />
                    <div>
                      <h4 className="text-xl font-bold font-cormorant text-[var(--text-hover-clr)]">
                        {f.title}
                      </h4>
                      <p className="font-nexa mt-2 text-[var(--text-clr)] text-sm leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                  {i < rightFeatures.length - 1 && (
                    <div className="mt-6 border-t-2 border-[var(--text-hover-clr)]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
