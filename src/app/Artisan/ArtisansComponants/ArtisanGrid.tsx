"use client";

import ArtisanCard from "./ArtisanCard";

type Artisan = {
  id: number;
  name: string;
  craft: string;
  image: string;
  categoryId?: number;
};
interface ArtisanGridProps {
  artisans: Artisan[];
  onNavigate: (path: string) => void;
}


const ArtisanGrid: React.FC<ArtisanGridProps> = ({ artisans, onNavigate }) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-16 place-items-center">
      {artisans.map((artisan) => (
        <ArtisanCard
          key={artisan.id}
          artisan={artisan}
          onClick={() => onNavigate(`/artisan/${artisan.id}`)}
        />
      ))}
    </div>

    {artisans.length === 0 && (
      <p className="text-center text-red-500 mt-8">No artisans found.</p>
    )}
  </>
);

export default ArtisanGrid;
