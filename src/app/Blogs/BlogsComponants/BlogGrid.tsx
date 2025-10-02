"use client";

import { useState } from "react";
import Image from "next/image";
import BlogData from "./BlogdataX"; // BlogdataX now uses public image paths

export default function BlogGrid() {
  const [featuredBlog, setFeaturedBlog] = useState(BlogData[0]);

  return (
    <div className="space-y-10 px-4 md:px-8 lg:px-16 xl:px-24 py-10 md:py-12 lg:py-20 bg-[var(--section-bg-clr)]">
      {/* Section Heading */}
      <h2 className="inline-block bg-[var(--text-hover-clr)] text-white font-nexa px-5 py-1.5 md:py-2 rounded-full text-sm mb-5 shadow-lg">
        Our Blogs
      </h2>
      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-clr)] mb-6 font-cormorant">
        Blogs
      </h3>

      {/* Featured Blog */}
      <div className="grid md:grid-cols-2 gap-6 bg-green-50 rounded-2xl overflow-hidden cursor-pointer">
        <Image
          src={featuredBlog.image}
          alt={featuredBlog.title}
          width={600}
          height={400}
          className="w-full h-full object-cover font-nexa"
        />
        <div className="px-4 md:px-6 py-8 md:py-12 lg:py-16 flex flex-col">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-cormorant text-[var(--text-clr)]">
              {featuredBlog.title}
            </h2>
            <p className="mt-3 font-nexa text-[var(--text-hover-clr)] text-sm md:font-md">
              {featuredBlog.description}
            </p>
          </div>
          <div className="block lg:flex items-center justify-between mt-auto">
            <div className="flex items-center mb-4 md:mb-6 lg:mb-0">
              <Image
                src={featuredBlog.authorDP}
                alt={featuredBlog.author}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-medium font-nexa text-[var(--text-clr)]">
                  {featuredBlog.author}
                </p>
                <p className="text-sm text-gray-500 font-nexa">{featuredBlog.role}</p>
              </div>
            </div>
            <span className="text-sm font-medium bg-[var(--text-hover-clr)] text-white px-3 md:px-5 py-1 md:py-2 rounded-full w-fit font-nexa">
              {featuredBlog.category}
            </span>
          </div>
        </div>
      </div>

      {/* Related Blogs */}
      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-clr)] mb-6 mt-16 font-cormorant">
        Related Blogs
      </h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {BlogData.map((post) => (
          <div
            key={post.id}
            className="rounded-xl overflow-hidden shadow-md bg-green-50 hover:shadow-lg transition cursor-pointer"
            onClick={() => setFeaturedBlog(post)}
          >
            <Image
              src={post.image}
              alt={post.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <span className="font-nexa text-sm bg-[var(--text-hover-clr)] px-3 py-1 rounded-full text-white">
                {post.category}
              </span>
              <h3 className="text-xl font-semibold mt-3 font-cormorant">{post.title}</h3>
              <p className="text-gray-600 text-sm mt-2 font-nexa">{post.description}</p>
              <div className="mt-4">
                <p className="text-sm font-medium font-nexa">{post.author}</p>
                <p className="text-xs text-gray-500 font-nexa">{post.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
