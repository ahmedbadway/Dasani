import { useLanguage } from "../context/LanguageContext.jsx";
import ScrollWords from "./ScrollWords.jsx";

export default function IngredientsSection() {
  const { t } = useLanguage();

  return (
    <section
      id="ingredients"
      data-section-index="3"
      className="flex min-h-screen flex-col items-center justify-center px-6 pt-[5vh] pb-20"
      style={{ fontFamily: t.font }}
    >
      <div className="w-full max-w-4xl text-center">
        <ScrollWords
          text={t.ingredients.heading}
          className="mb-14 block font-extrabold"
          style={{
            color: "var(--color-light)",
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            textShadow: "0 2px 20px rgba(0,0,0,0.8)",
          }}
        />

        <div
          className="flex flex-wrap justify-center"
          style={{ gap: "1.5rem" }}
        >
          {t.ingredients.minerals.map((mineral) => (
            <div
              key={mineral.name}
              className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
              style={{ minWidth: "140px", padding: "1.5rem" }}
            >
              <ScrollWords
                text={mineral.value}
                className="block font-bold"
                style={{ fontSize: "2.5rem", color: "var(--color-accent)" }}
              />
              <ScrollWords
                text={t.ingredients.unit}
                className="block font-semibold"
                style={{ fontSize: "0.85rem", opacity: 0.7 }}
              />
              <ScrollWords
                text={mineral.name}
                className="mt-1 block text-base font-bold"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
