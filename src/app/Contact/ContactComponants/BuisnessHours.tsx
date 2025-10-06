"use client";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

interface SocialLink {
  icon:  React.ReactNode;
  url: string;
  name: string;
}

const BusinessHoursSocial: React.FC = () => {
  const socialLinks: SocialLink[] = [
    { icon: <FaFacebookF />, url: "https://facebook.com", name: "Facebook" },
    { icon: <FaInstagram />, url: "https://instagram.com", name: "Instagram" },
    { icon: <FaLinkedinIn />, url: "https://linkedin.com", name: "LinkedIn" },
    { icon: <FaTwitter />, url: "https://twitter.com", name: "Twitter" },
    { icon: <FaYoutube />, url: "https://youtube.com", name: "YouTube" },
  ];

  return (
    <section
      className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-16 xl:px-24"
      style={{ backgroundColor: "var(--section-bg-clr)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Business Hours */}
        <div>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-8 font-cormorant text-center lg:text-left"
            style={{ color: "var(--text-clr)" }}
          >
            Business Hours
          </h2>
          <ul
            className="space-y-5 text-base md:text-lg font-nexa"
            style={{ color: "var(--text-clr)" }}
          >
            <li className="flex justify-between border-b pb-2">
              <span>Monday – Friday</span>
              <span>9:00 AM – 6:00 PM</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span>Saturday – Sunday</span>
              <span>Closed</span>
            </li>
            <li className="flex justify-between">
              <span>Vendor Support</span>
              <span>10:00 AM – 5:00 PM</span>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex flex-col">
          <h2
            className="text-3xl font-extrabold mb-8 font-cormorant text-center lg:text-right"
            style={{ color: "var(--text-clr)" }}
          >
            Connect With Us
          </h2>
          <div className="flex gap-5 flex-wrap justify-center lg:justify-end">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 flex items-center justify-center rounded-xl text-white shadow-md backdrop-blur-md transition-all duration-500 hover:scale-110 hover:shadow-xl"
                style={{
                  background:
                    "linear-gradient(135deg, var(--text-clr), var(--text-hover-clr))",
                }}
              >
                <span className="text-lg">{link.icon}</span>
                <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-xs font-medium transition-opacity duration-300 text-white bg-black/60 px-2 py-1 rounded-md">
                  {link.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessHoursSocial;
