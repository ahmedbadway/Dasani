import { useLanguage } from "../context/LanguageContext.jsx";
import ScrollWords from "./ScrollWords.jsx";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      data-section-index="0"
      className="flex min-h-screen flex-col items-center justify-center px-6 pt-[5vh] text-center"
      style={{ fontFamily: t.font }}
    >
      <ScrollWords
        text={t.hero.title}
        className="block max-w-4xl font-extrabold leading-tight tracking-tight"
        style={{
          fontSize: "clamp(1.5rem, 4vw, 3rem)",
          textShadow: "0 2px 20px rgba(0,0,0,0.8)",
        }}
      />
    </section>
  );
}
