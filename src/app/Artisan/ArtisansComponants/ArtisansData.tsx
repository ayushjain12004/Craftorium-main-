export type Category = {
  id: number;
  name: string;
};

export type Artisan = {
  id: number;
  name: string;
  categoryId: number;
  image: string; // now a string path
  craft: string;
};

export const categories: Category[] = [
  { id: 1, name: "Pottery" },
  { id: 2, name: "Handloom" },
  { id: 3, name: "Woodwork" },
  { id: 4, name: "Embroidery" },
  { id: 5, name: "Painting" },
];

export const artisans: Artisan[] = [
  { id: 1, name: "Ananya Verma", categoryId: 2, image: "/images/artisans-1.webp", craft: "Hand Block Printing" },
  { id: 2, name: "Aarav Sharma", categoryId: 4, image: "/images/artisans-2.webp", craft: "Embroidery" },
  { id: 3, name: "Kavya Iyer", categoryId: 2, image: "/images/artisans-3.webp", craft: "Silk Weaving" },
  { id: 4, name: "Riya Das", categoryId: 1, image: "/images/artisans-1.webp", craft: "Terracotta Pottery" },
  { id: 5, name: "Aditya Menon", categoryId: 3, image: "/images/artisans-2.webp", craft: "Wood Carving" },
  { id: 6, name: "Meera Rao", categoryId: 2, image: "/images/artisans-3.webp", craft: "Handloom Weaving" },
  { id: 7, name: "Vikram Singh", categoryId: 3, image: "/images/artisans-1.webp", craft: "Wood Carving" },
  { id: 8, name: "Sanya Kapoor", categoryId: 4, image: "/images/artisans-2.webp", craft: "Embroidery" },
  { id: 9, name: "Imran Ali", categoryId: 4, image: "/images/artisans-3.webp", craft: "Zardozi Work" },
  { id: 10, name: "Priya Menon", categoryId: 1, image: "/images/artisans-1.webp", craft: "Coir Craft" },
  { id: 11, name: "Arjun Reddy", categoryId: 3, image: "/images/artisans-2.webp", craft: "Stone Carving" },
  { id: 12, name: "Neha Gupta", categoryId: 5, image: "/images/artisans-3.webp", craft: "Madhubani Painting" },
  { id: 13, name: "Rohan Das", categoryId: 1, image: "/images/artisans-1.webp", craft: "Terracotta Pottery" },
];
