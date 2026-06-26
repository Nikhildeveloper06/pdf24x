import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import AdSlot from "./components/ui/AdSlot.jsx";
import CategorySection from "./components/CategorySection.jsx";
import HighlyUsed from "./components/HighlyUsed.jsx";
import Benefits from "./components/Benefits.jsx";
import MoreTools from "./components/MoreTools.jsx";
import WhatIs from "./components/WhatIs.jsx";
import CtaBanner from "./components/CtaBanner.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [dark, setDark] = useState(false);

  // Toggle the `dark` class on <html> so the CSS-variable palette switches.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Navbar dark={dark} onToggleTheme={() => setDark((d) => !d)} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <AdSlot />
        <CategorySection />
        <HighlyUsed />
        <Benefits />
        <AdSlot />
        <MoreTools />
        <WhatIs />
        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
}
