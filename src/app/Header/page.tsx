"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { FaChevronDown, FaHeart, FaPlus, FaMinus } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

import { useTranslation } from "react-i18next";
import "../../i18n";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(
    null
  );
  const shopRef = useRef<HTMLDivElement | null>(null);
  const { t, i18n } = useTranslation();

  // Mega menu data - Myntra style with multiple sections
  const megaMenuData = {
    "Men's Fashion": {
      categories: [
        "Topwear",
        "Bottomwear",
        "Footwear",
        "Sportswear",
        "Accessories",
        "Winterwear",
      ],
    },
    "Women's Fashion": {
      categories: [
        "Western Wear",
        "Ethnic Wear",
        "Footwear",
        "Handbags",
        "Jewelry",
      ],
    },
    "Kids & Toys": {
      categories: [
        "Boys Clothing",
        "Girls Clothing",
        "Infants",
        "Footwear",
        "Toys",
      ],
    },
    "Home & Living": {
      categories: [
        "Home Decor",
        "Kitchen & Dining",
        "Bed & Bath",
        "Furniture",
        "Gardening",
      ],
    },
    Electronics: {
      categories: [
        "Mobile & Accessories",
        "Laptops & Computers",
        "Audio Devices",
        "Cameras",
        "Smart Watches",
      ],
    },
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) {
        setIsShopOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileSection = (section: string) => {
    setOpenMobileSection(openMobileSection === section ? null : section);
  };

  return (
    <header className="bg-[#fef6eb] relative font-nexa">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between px-4 md:px-8 lg:px-8 xl:px-24 py-1">
        {/* Logo + Mobile Menu */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link href="/home" className="flex items-center">
            <Image
              src="/images/ct-logo.png"
              alt="Logo"
              width={200}
              height={80}
              className="h-20 w-auto"
              priority
            />
          </Link>

          <button
            className="lg:hidden text-[var(--text-clr)]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Nav Links */}
        <nav
          className={`${
            isOpen ? "flex" : "hidden"
          } flex-col lg:flex lg:flex-row lg:items-center lg:space-x-6 xl:space-x-10 text-md lg:text-lg xl:text-xl font-semibold text-[var(--text-clr)] mt-4 lg:mt-0 space-y-2 md:space-y-0`}
        >
          <Link
            href="/home"
            className="hover:text-[var(--text-hover-clr)] py-2 lg:py-0"
          >
            {t("home")}
          </Link>

          {/* Shop Mega Menu - Myntra Style */}
          <div
            ref={shopRef}
            className="relative"
            onMouseEnter={() =>
              window.innerWidth >= 1024 && setIsShopOpen(true)
            }
            onMouseLeave={() =>
              window.innerWidth >= 1024 && setIsShopOpen(false)
            }
          >
            {/* Main Shop Button */}
            <button
              className="flex items-center gap-1 px-2 py-2 rounded-md transition-colors hover:text-[var(--text-hover-clr)] w-full lg:w-auto justify-between lg:justify-start"
              onClick={() =>
                window.innerWidth < 1024 && setIsShopOpen(!isShopOpen)
              }
            >
              <span>{t("shop")}</span>
              <FaChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  isShopOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/* Mega Menu Panel */}
            {isShopOpen && (
              <>
                {/* Desktop Mega Menu */}
                <div className="hidden lg:block absolute left-0 top-full mt-0 w-[800px] bg-white border border-gray-200 rounded-lg shadow-2xl z-50">
                  <div className="p-6">
                    {/* Header */}
                    <div className="mb-4"></div>

                    {/* Mega Menu Grid */}
                    <div className="grid grid-cols-5 gap-6">
                      {Object.entries(megaMenuData).map(
                        ([section, data], index) => (
                          <div key={index} className="space-y-3">
                            {/* Section Title */}
                            <h3 className="font-bold text-[var(--text-hover-clr)] text-sm uppercase tracking-wide border-b border-gray-200 pb-2">
                              {section}
                            </h3>

                            {/* Categories List */}
                            <ul className="space-y-2">
                              {data.categories.map((category, catIndex) => (
                                <li key={catIndex}>
                                  <Link
                                    href="/products"
                                    className="block text-sm text-gray-600 hover:text-[var(--text-hover-clr)] transition-colors py-1"
                                  >
                                    {category}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile Mega Menu */}
                <div className="lg:hidden bg-white border border-gray-200 rounded-lg shadow-lg mt-2 w-full">
                  <div className="p-4">
                    {/* Mobile Header */}
                    <div className="mb-4 pb-3 border-b border-gray-200">
                      <Link
                        href="/products"
                        className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors block text-center"
                      >
                        SHOP ALL CATEGORIES
                      </Link>
                    </div>

                    {/* Mobile Accordion */}
                    <div className="space-y-2">
                      {Object.entries(megaMenuData).map(
                        ([section, data], index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg overflow-hidden"
                          >
                            {/* Mobile Section Header */}
                            <button
                              className="flex items-center justify-between w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                              onClick={() => toggleMobileSection(section)}
                            >
                              <span className="font-semibold text-gray-900 text-left">
                                {section}
                              </span>
                              {openMobileSection === section ? (
                                <FaMinus
                                  size={14}
                                  className="text-[var(--text-hover-clr)]"
                                />
                              ) : (
                                <FaPlus
                                  size={14}
                                  className="text-[var(--text-hover-clr)]"
                                />
                              )}
                            </button>

                            {/* Mobile Categories List */}
                            {openMobileSection === section && (
                              <div className="bg-white border-t border-gray-200">
                                <div className="p-3 space-y-2">
                                  {data.categories.map((category, catIndex) => (
                                    <Link
                                      key={catIndex}
                                      href="/products"
                                      className="block py-2 px-3 text-gray-700 hover:text-[var(--text-hover-clr)] hover:bg-blue-50 rounded-md transition-colors text-sm"
                                      onClick={() => setIsShopOpen(false)}
                                    >
                                      {category}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>

                    {/* Mobile Close Button */}
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <button
                        onClick={() => setIsShopOpen(false)}
                        className="w-full bg-gray-200 text-gray-700 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
                      >
                        Close Menu
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Other Links */}
          <Link
            href="/Blogs"
            className="hover:text-[var(--text-hover-clr)] py-2 lg:py-0"
          >
            {t("blog")}
          </Link>
          <Link
            href="/about"
            className="hover:text-[var(--text-hover-clr)] py-2 lg:py-0"
          >
            {t("about")}
          </Link>
          <Link
            href="/Artisan"
            className="hover:text-[var(--text-hover-clr)] py-2 lg:py-0"
          >
            {t("artisans")}
          </Link>
          <Link
            href="/Contact"
            className="hover:text-[var(--text-hover-clr)] py-2 lg:py-0"
          >
            {t("contact")}
          </Link>
        </nav>

        {/* Search + Icons */}
        <div
          className={`${
            isOpen ? "flex mt-4" : "hidden"
          } lg:flex items-center space-x-4 mb-4 md:mb-0`}
        >
          <div className="flex items-center border-2 border-[var(--text-hover-clr)] rounded-full px-5 py-1 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search..."
              className="outline-none bg-transparent text-sm flex-1"
            />
            <Search className="w-5 h-5 font-bold text-[var(--text-hover-clr)]" />
          </div>
          <Link href="/wishlist" className="hover:text-[var(--text-hover-clr)]">
            <FaHeart />
          </Link>
          <Link href="/cart" className="hover:text-[var(--text-hover-clr)]">
            <ShoppingCart className="w-6 h-6 text-[var(--text-clr)] cursor-pointer" />
          </Link>

<Link href="/Profile" className="hover:text-[var(--text-hover-clr)]">
  <User className="w-6 h-6 text-[var(--text-clr)] cursor-pointer" />
</Link>
        </div>
      </div>
    </header>
  );
}
