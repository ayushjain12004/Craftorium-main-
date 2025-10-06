"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft, FaClock, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

// ✅ Import images from /public (move them there first)
import SilkDupatta from "../Img/SilkDupatta.webp";
import AtOne from "../Img/artisans-1.webp";
import AtTwo from "../Img/artisans-2.webp";
// import AtThree from "../Img/artisans-3.webp";

const artisanData = {
  1: {
    name: "Ananya Verma",
    bio: "Ananya has been preserving the art of hand block printing for over 15 years...",
    brief: "Specialist in eco-friendly hand block printing and natural dye textiles.",
    address: "Jaipur, Rajasthan",
    workingHours: "Mon - Sat, 9:00 AM - 6:00 PM",
    experience: "15+ Years",
    photos: [AtOne, SilkDupatta, SilkDupatta, SilkDupatta],
    products: ["Handmade Scarf", "Printed Tablecloth", "Decorative Cushion"],
  },
  2: {
    name: "Aarav Sharma",
    bio: "Aarav is a master embroiderer from Kutch, known for his vibrant and intricate needlework...",
    brief: "Expert in Kutch embroidery and traditional folk designs.",
    address: "Kutch, Gujarat",
    workingHours: "Tue - Sun, 10:00 AM - 7:00 PM",
    experience: "12 Years",
    photos: [AtTwo, SilkDupatta, SilkDupatta, SilkDupatta],
    products: ["Embroidered Bag", "Traditional Shawl", "Wall Hanging"],
  },
  // ... continue with all other artisan objects (3–12) here ...
};

export default function ArtisanStoriesPage() {
  const { id } = useParams();
  const router = useRouter();

  const artisan = artisanData[parseInt(id)];

  if (!artisan) {
    return <p className="p-10 text-center text-red-500">Artisan not found</p>;
  }

  return (
    <section className="bg-[#fef6eb] px-4 md:px-8 lg:px-16 xl:px-24 py-16">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="font-cormorant mb-8 flex items-center gap-2 text-[var(--text-clr)] hover:text-[var(--text-hover-clr)] font-medium transition"
      >
        <FaArrowLeft className="text-2xl" /> Back to Artisans
      </button>

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
        <Image
          src={artisan.photos[0]}
          alt={artisan.name}
          width={176}
          height={176}
          className="w-44 h-44 rounded-full border-4 border-[var(--text-hover-clr)] object-cover shadow-xl"
        />
        <div className="w-full lg:max-w-2xl">
          <h1 className="font-nexa text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[var(--text-clr)]">
            {artisan.name}
          </h1>
          <p className="font-nexa text-gray-700 text-md md:text-lg mb-3">
            {artisan.brief}
          </p>
          <p className="font-nexa text-gray-600 text-sm md:text-base mb-4">
            {artisan.bio}
          </p>
          <div className="flex flex-col gap-2 text-gray-700 font-nexa">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[var(--text-hover-clr)]" />{" "}
              {artisan.address}
            </p>
            <p className="flex items-center gap-2">
              <FaClock className="text-[var(--text-hover-clr)]" />{" "}
              {artisan.workingHours}
            </p>
            <p className="flex items-center gap-2">
              <FaBriefcase className="text-[var(--text-hover-clr)]" />{" "}
              {artisan.experience} Experience
            </p>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <h2 className="font-cormorant text-2xl font-semibold mb-6 text-gray-800">
        Gallery
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {artisan.photos.slice(1).map((photo, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl shadow-md transform transition hover:scale-105"
          >
            <Image
              src={photo}
              alt={`${artisan.name} work ${i + 1}`}
              className="w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Products */}
      <h2 className="font-cormorant text-2xl font-bold mb-6 text-[var(--text-hover-clr)]">
        Products by {artisan.name}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {artisan.products.map((product, i) => (
          <div
            key={i}
            className="bg-white border rounded-xl shadow-sm p-4 flex items-center justify-center hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <p className="font-nexa font-medium text-gray-700 text-center">
              {product}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
S