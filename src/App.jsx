import { useState } from "react";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import VideoScroll from "./components/VideoScroll.jsx";
import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/HeroSection.jsx";
import AboutSection from "./components/AboutSection.jsx";
import ProductsSection from "./components/ProductsSection.jsx";
import IngredientsSection from "./components/IngredientsSection.jsx";

export default function App() {
  // Index of the section currently in view, driven by VideoScroll.
  const [active, setActive] = useState(0);

  return (
    <LanguageProvider>
      <VideoScroll setActive={setActive} />
      <Navbar />
      <main>
        <HeroSection active={active === 0} />
        <AboutSection active={active === 1} />
        <ProductsSection active={active === 2} />
        <IngredientsSection active={active === 3} />
      </main>
    </LanguageProvider>
  );
}
