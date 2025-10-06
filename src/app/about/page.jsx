// app/about/page.tsx
"use client";

import HeroSectionAbt from "./AboutUsComponants/HeroSectionAbt";
import HowWeWork from "./AboutUsComponants/HowWeWork";
import WhoWeAre from "./AboutUsComponants/WhoWeAre";
import OurMission from "./AboutUsComponants/OurMission";
import WhyChooseUs from "./AboutUsComponants/WhyChooseUs";
import AbtCTA from "./AboutUsComponants/AbtCTA";

export default function AboutPage() {
  return (
    <main>
      <HeroSectionAbt />
      <WhoWeAre />
      <HowWeWork />
      <OurMission />
      <WhyChooseUs />
      <AbtCTA />
    </main>
  );
}
