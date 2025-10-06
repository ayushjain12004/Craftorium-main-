"use client";

import { ChangeEvent } from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="text-right mb-8 font-nexa">
      <input
        type="text"
        placeholder="Search artisans..."
        value={searchTerm}
        onChange={handleChange}
        className="border rounded-xl px-4 py-1.5 md:py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[var(--text-hover-clr)]"
      />
    </div>
  );
};

export default SearchBar;
