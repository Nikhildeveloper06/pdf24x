import Hero from "../components/Hero.jsx";
import AdSlot from "../components/ui/AdSlot.jsx";
import CategorySection from "../components/CategorySection.jsx";
import HighlyUsed from "../components/HighlyUsed.jsx";
import Benefits from "../components/Benefits.jsx";
import MoreTools from "../components/MoreTools.jsx";
import WhatIs from "../components/WhatIs.jsx";
import CtaBanner from "../components/CtaBanner.jsx";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AdSlot />
      <CategorySection />
      <HighlyUsed />
      <Benefits />
      <AdSlot />
      <MoreTools />
      <WhatIs />
      <CtaBanner />
    </>
  );
}
