"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { artisans, categories } from "./ArtisansComponants/ArtisansData";
import SearchBar from "./ArtisansComponants/SearchBar";
import ArtisanGrid from "./ArtisansComponants/ArtisanGrid";

export default function  ArtisansPage ()  {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  const filteredArtisans = artisans
    .filter((a) =>
      selectedCategory ? a.categoryId === Number(selectedCategory) : true
    )
    .filter((a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value || "");
  };

  return (
    <div className="bg-[#fef6eb] px-4 md:px-8 lg:px-16 xl:px-24 py-12">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-left mb-4 font-cormorant text-[var(--text-hover-clr)]">
        Meet Our Artisans
      </h1>
      <p className="text-left text-gray-600 mb-8 font-nexa max-w-xl text-sm md:text-md">
        Discover talented artisans—look through categories or easily find
        someone by searching their name.
      </p>

      <div className="mb-4 text-right font-nexa">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border border-[var(--text-hover-clr)] rounded-xl px-4 py-1.5 md:py-2"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
     <ArtisanGrid
  artisans={filteredArtisans}
  onNavigate={(path: string) => router.push(path)}
/>
    </div>
  );
};


