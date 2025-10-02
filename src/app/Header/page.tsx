// app/layout.tsx (or app/page.tsx if not global)
"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import "../../i18n";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isSubShopOpen, setIsSubShopOpen] = useState(false);
  const shopRef = useRef<HTMLDivElement | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) {
        setIsShopOpen(false);
        setIsSubShopOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-[#fef6eb] relative font-nexa">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between px-4 md:px-8 lg:px-8 xl:px-24 py-1">
        {/* Logo + Mobile Menu */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link href="/home">
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
          } flex-col lg:flex lg:flex-row lg:space-x-6 xl:space-x-10 text-md lg:text-lg xl:text-xl font-semibold text-[var(--text-clr)] mt-4 lg:mt-0 space-y-2 md:space-y-0`}
        >
          <Link href="/home" className="hover:text-[var(--text-hover-clr)]">
            {t("home")}
          </Link>

          {/* Shop Dropdown */}
        <div
  ref={shopRef}
  className="relative group"
  onMouseEnter={() =>
    window.innerWidth >= 1024 && setIsShopOpen(true)
  }
  onMouseLeave={() => {
    if (window.innerWidth >= 1024) {
      setIsShopOpen(true);
      setIsSubShopOpen(false);
    }
  }}
>
  {/* Main button */}
  <button
    onClick={() =>
      window.innerWidth < 1024 && setIsShopOpen(!isShopOpen)
    }
    className="flex items-center gap-1 px-2 py-1 rounded-md transition-colors hover:text-[var(--text-hover-clr)]"
  >
    {t("shop")}
    <FaChevronDown
      size={16}
      className={`transition-transform duration-300 ${
        isShopOpen ? "rotate-180" : "rotate-0"
      }`}
    />
  </button>

  {/* Main dropdown */}
  {isShopOpen && (
    <div className="absolute left-0 top-full mt-2 w-48 lg:w-52 bg-[#fef6eb] border border-gray-200 rounded-lg shadow-md z-50 text-sm lg:text-base">
      {/* Sub dropdown trigger */}
      <div
        className="relative group"
        onMouseEnter={() =>
          window.innerWidth >= 1024 && setIsSubShopOpen(true)
        }
        onMouseLeave={() =>
          window.innerWidth >= 1024 && setIsSubShopOpen(false)
        }
      >
        <button
          onClick={() =>
            window.innerWidth < 1024 &&
            setIsSubShopOpen(!isSubShopOpen)
          }
          className="flex justify-between items-center w-full px-3 py-2 rounded-md transition-colors hover:bg-gray-100 mt-0"
        >
          {t("productList")}
          <FaChevronDown
            size={14}
            className={`transition-transform duration-300 ${
              isSubShopOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {/* Sub dropdown */}
        {isSubShopOpen && (
          <div className="absolute left-full top-0 ml-1 w-44 bg-[#fef6eb] border border-gray-200 rounded-lg shadow-md">
            <Link
              href="/cart-component/all-products"
              className="block px-3 py-2 text-sm rounded-md transition-colors hover:bg-gray-100"
            >
              {t("allProducts")}
            </Link>
          </div>
        )}
      </div>
    </div>
  )}
</div>

          {/* Other Links */}
          <Link href="/Blogs" className="hover:text-[var(--text-hover-clr)]">
            {t("blog")}
          </Link>
          <Link href="/about" className="hover:text-[var(--text-hover-clr)]">
            {t("about")}
          </Link>
          <Link href="/Artisan" className="hover:text-[var(--text-hover-clr)]">
            {t("artisans")}
          </Link>
          <Link href="/Contact" className="hover:text-[var(--text-hover-clr)]">
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
          <ShoppingCart className="w-6 h-6 text-[var(--text-clr)] cursor-pointer" />
          <User className="w-6 h-6 text-[var(--text-clr)] cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
