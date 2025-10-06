"use client";

import Image from "next/image";

type Artisan = {
  id: number;
  name: string;
  image: string;
  craft: string;
  categoryId?: number;
};

interface ArtisanCardProps {
  artisan: Artisan;
  index?: number;
  centerIndex?: number;
  onClick?: () => void;
}

const ArtisanCard: React.FC<ArtisanCardProps> = ({
  artisan,
  index,
  centerIndex,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer relative group flex-shrink-0 w-[280px] snap-center"
    >
      <div className="overflow-hidden relative rounded-xl">
        <Image
          src={artisan.image}
          alt={artisan.name}
          width={280}
          height={340}
          className="w-full h-[340px] object-fill transform group-hover:scale-105 transition duration-500"
        />
        {index !== undefined &&
          centerIndex !== undefined &&
          index !== centerIndex && (
            <div className="absolute inset-0 bg-black/60 transition z-10"></div>
          )}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[85%] bg-[#ffe6cd] rounded-[10px] px-4 py-2 text-center shadow-md">
          <h3 className="font-nexa text-lg md:text-xl font-semibold text-[var(--text-hover-clr)]">
            {artisan.name}
          </h3>
          <p className="text-sm text-gray-500 font-nexa">{artisan.craft}</p>
        </div>
      </div>
    </div>
  );
};

export default ArtisanCard;
