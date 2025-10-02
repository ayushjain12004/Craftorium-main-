"use client";

import Image from "next/image";
import Link from "next/link";

export default function BlogsSection() {
  const blogs = [
    {
      id: 1,
      category: "Jewellery ideas",
      title: "The Art of Handcrafted Jewelry",
      description:
        "Explore the world of artisanal jewelry, where craftsmanship meets timeless beauty.",
      img: "/images/Jewellery.webp", // public folder path
    },
    {
      id: 2,
      category: "Pottery ideas",
      title: "The Craft of Pottery",
      description:
        "Delve into the artistry of handcrafted pottery, where clay comes to life in the hands of skilled potters.",
      img: "/images/Pottery.webp",
    },
    {
      id: 3,
      category: "Textile ideas",
      title: "Handwoven Textiles Unveiled",
      description:
        "Discover the intricate world of handcrafted textiles, where threads tell stories of skill and tradition.",
      img: "/images/Textiles.webp",
    },
  ];

  const Artisanbg = "/images/big-at5.png";

  return (
    <>
      {/* Blogs Section */}
      <section className="px-4 md:px-8 lg:px-16 xl:px-24 py-10 bg-[#fffafa]">
        <h2 className="font-cormorant text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-hover-clr)] mb-8">
          Our Blogs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl border border-gray-300 overflow-hidden cursor-pointer group transition h-104"
            >
              <div className="overflow-hidden">
                <Image
                  src={blog.img} // public folder path
                  alt={blog.title}
                  width={400} // adjust width
                  height={250} // adjust height
                  className="w-full h-68 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>
              <div className="px-4 pt-3 space-y-2">
                <p className="font-cormorant text-xs font-bold uppercase text-gray-500 tracking-wide mb-2">
                  {blog.category}
                </p>
                <h3
                  className="font-cormorant text-xl font-semibold text-[var(--text-hover-clr)] mb-1 
                       transition-all duration-300 ease-in-out 
                       group-hover:text-black group-hover:-translate-y-1"
                >
                  {blog.title}
                </h3>
                <p className="font-nexa text-sm text-gray-600">{blog.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="font-nexa mt-6 flex justify-end">
          <Link
            href="/blogs"
            className="text-[var(--text-hover-clr)] text-sm font-medium relative inline-block
                 after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[var(--text-hover-clr)] 
                 after:transition-all after:duration-300 hover:after:w-full"
          >
            View All
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 py-8 rounded-3xl mx-4 md:mx-8 lg:mx-16 xl:mx-24 my-2 md:my-10 lg:my-12">
        <div className="grid md:grid-cols-2 gap-2 items-center place-items-center p-2">
          <div className="relative w-[450px] h-[350px]">
            <Image
              src={Artisanbg} // public folder path
              alt="Artisan"
              fill
              className="rounded-2xl object-contain border-10 border-[#fef5ef]"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="font-cormorant text-3xl md:text-3xl lg:text-4xl font-bold text-[var(--text-hover-clr)] mb-4">
              Your Purchase Supports a Livelihood
            </h2>
            <p className="text-[var(--text-clr)] text-base md:text-lg max-w-xl font-nexa">
              Every product you explore and buy helps an artisan continue their
              craft and sustain their community.
            </p>
            <button
              className="font-nexa bg-[var(--text-hover-clr)] text-white mt-8 md:mt-12 
             px-6 md:px-8 py-1.5 md:py-3 rounded-[60px] font-semibold shadow 
             transform-gpu will-change-transform
             transition-transform duration-300 ease-out 
             hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
            >
              Explore Our Collection
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
