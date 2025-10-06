import HeroSection from "./HomeComponents/HeroSection";
// import CollectionsSection from "./home/HomeComponents/artisans/[id]/page";
import PopularItems from "./HomeComponents/PopularItems";
import ArtisanalElegance from "./HomeComponents/ArtisanalElegance";
import BlogsSection from "./HomeComponents/BlogsSection";
import ArtisanSection from "./HomeComponents/ArtisanSection";
import StartExploring from "./HomeComponents/StartExploring";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      {/* <CollectionsSection /> */}
      <PopularItems />
      <ArtisanalElegance />
      <BlogsSection />
      <ArtisanSection />
      <StartExploring />
    </div>
  );
}
