import { useLanguage } from "../context/LanguageContext.jsx";
import ScrollWords from "./ScrollWords.jsx";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      data-section-index="1"
      className="flex min-h-screen flex-col items-center justify-center px-6 pt-[5vh]"
      style={{ fontFamily: t.font }}
    >
      <div className="max-w-2xl text-center">
        <ScrollWords
          text={t.about.heading}
          className="mb-6 block font-extrabold"
          style={{
            color: "var(--color-light)",
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            textShadow: "0 2px 20px rgba(0,0,0,0.8)",
          }}
        />
        <ScrollWords
          text={t.about.body}
          className="block text-lg leading-relaxed opacity-90 sm:text-xl"
        />
      </div>
    </section>
  );
}
