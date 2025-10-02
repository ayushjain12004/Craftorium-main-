"use client";

import { ChangeEvent } from "react";

type Category = {
  id: number;
  name: string;
};

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (val: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value || null);
  };

  return (
    <div className="flex justify-center mb-6">
      <select
        value={selectedCategory || ""}
        onChange={handleChange}
        className="border border-[var(--text-hover-clr)] rounded px-4 py-1.5 md:py-2"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
