"use client";

import { FiMail, FiCalendar } from "react-icons/fi";
import Link from "next/link";

const ctaButtons = [
  {
    label: "Get in Touch",
    href: "/contact-us",
    icon: (
      <FiMail className="text-[var(--primary-text-clr)] text-2xl animate-bounceHover" />
    ),
    bg: "bg-gradient-to-r from-[var(--secondary-clr)] to-[var(--secondary-dark-clr)]",
    text: "text-[var(--primary-text-clr)]",
  },
  {
    label: "Explore Our Products",
    href: "#",
    icon: (
      <FiCalendar className="text-[var(--secondary-clr)] text-2xl animate-bounceHover" />
    ),
    bg: "bg-[var(--section-bg-clr)] border-2 border-[var(--secondary-clr)]",
    text: "text-[var(--secondary-clr)]",
    hoverBg:
      "hover:bg-gradient-to-r hover:from-[var(--secondary-clr)] hover:to-[var(--secondary-dark-clr)]",
    hoverText: "hover:text-[var(--primary-text-clr)]",
  },
];

export default function ConnectCTA() {
  return (
    <section className="p-4 bg-[var(--section-bg-clr)]">
      <div className="bg-[var(--section-bg-clr)] pt-12 pb-20 text-center">
        <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-[var(--text-clr)] mb-6">
          Let&apos;s Create Something Amazing!
        </h2>
        <p className="text-[var(--text-hover-clr)] text-lg mb-12 max-w-2xl mx-auto text-nexa">
          Whether you want to craft a unique project, explore our portfolio, or
          simply chat about creative ideas, Craftprium is here to inspire and
          collaborate with you. Connect with us and let&apos;s bring your vision
          to life!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 text-nexa">
         {ctaButtons.map((btn, idx) => (
  <Link
    key={idx}
    href={btn.href}
    className={`flex items-center justify-center gap-3 px-7 py-4 rounded-xl font-bold shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg ${btn.bg} ${btn.text} ${btn.hoverBg || ""} ${btn.hoverText || ""}`}
  >
    {btn.icon} {btn.label}
  </Link>
))}

        </div>
      </div>
    </section>
  );
}
