"use client";
import React, { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";
import { FaGlobe } from "react-icons/fa6";
import Image from "next/image";

const Footer: React.FC = () => {
  const [language, setLanguage] = useState<string>("English (UK)");
  const [currency, setCurrency] = useState<string>("₹ (INR)");

  return (
    <footer className="bg-[var(--section-bg-clr)] text-[var(--text-hover-clr)] border-t font-nexa">
      <div className="px-4 md:px-8 lg:px-16 xl:px-24 py-4 flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Logo + About */}
        <div className="w-64 md:w-72 lg:w-98 flex-shrink-0">
          <div className="flex items-center">
            <Image
              src="/images/ct-logo.png"
              alt="Logo"
              width={150} // adjust width
              height={50} // adjust height
              className="h-full w-auto"
            />
          </div>
          <p className="text-sm w-full md:max-w-xs text-gray-700 mb-6 md:mb-12 mt-2 md:mt-0">
            Sample the sampling in the sample for samples as handcraft items,
            Sample the sampling.
          </p>
          <div className="flex space-x-4 text-[var(--text-hover-clr)]">
            <FaFacebook className="w-6 h-6 cursor-pointer hover:text-[var(--text-hover-clr)]" />
            <FaInstagram className="w-6 h-6 cursor-pointer hover:text-[var(--text-hover-clr)]" />
            <FaYoutube className="w-6 h-6 cursor-pointer hover:text-[var(--text-hover-clr)]" />
            <FaPinterest className="w-6 h-6 cursor-pointer hover:text-[var(--text-hover-clr)]" />
          </div>
        </div>

        {/* Links */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 py-1 md:py-8">
          <div>
            <h3 className="font-bold mb-3 text-lg">Shop</h3>
            <ul className="space-y-2 md:space-y-4 text-md">
              <li>
                <a href="#">Jewellery</a>
              </li>
              <li>
                <a href="#">Textiles</a>
              </li>
              <li>
                <a href="#">Pottery</a>
              </li>
              <li>
                <a href="#">Decor</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3 text-lg">Sell</h3>
            <ul className="space-y-2 md:space-y-4 text-md">
              <li>
                <a href="#">Sell</a>
              </li>
              <li>
                <a href="#">Teams</a>
              </li>
              <li>
                <a href="#">Forums</a>
              </li>
              <li>
                <a href="#">Affiliates & creators</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3 text-lg">About</h3>
            <ul className="space-y-2 md:space-y-4 text-md">
              <li>
                <a href="#">Policies</a>
              </li>
              <li>
                <a href="#">Investors</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Legal imprint</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3 text-lg">Help</h3>
            <ul className="space-y-2 md:space-y-4 text-md">
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Privacy settings</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[var(--text-hover-clr)] text-white text-sm">
        <div className="flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 lg:px-16 xl:px-24 py-3">
          <div className="flex items-center space-x-3">
            <FaGlobe className="w-5 h-5" />

            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent border border-[#fef6eb] rounded px-2 py-1 text-xs"
            >
              <option className="text-black">English (UK)</option>
              <option className="text-black">English (US)</option>
              <option className="text-black">Hindi</option>
              <option className="text-black">French</option>
            </select>

            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent border border-[#fef6eb] rounded px-2 py-1 text-xs"
            >
              <option className="text-black">₹ (INR)</option>
              <option className="text-black">$ (USD)</option>
              <option className="text-black">£ (GBP)</option>
              <option className="text-black">€ (EUR)</option>
            </select>
          </div>

          <p className="text-xs mt-3 md:mt-3 lg:mt-0 text-center">
            DESIGNED BY DIGITAL MARKET TAP
          </p>

          <div className="flex space-x-4 mt-3 md:mt-2 lg:mt-0">
            <a href="#" className="hover:underline">
              Terms Of Use
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Local Shops
            </a>
            <a href="#" className="hover:underline">
              Regions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
