import SEO from "../components/SEO.jsx";
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
      <SEO
        title="Free Online PDF Tools"
        description="PDF24X offers 200+ free tools to convert, merge, compress, split and edit PDFs, images and more. No sign up, no installs."
        path="/"
      />
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
