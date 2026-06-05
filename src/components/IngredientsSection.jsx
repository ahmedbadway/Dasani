import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext.jsx";
import AnimatedText from "./AnimatedText.jsx";

export default function IngredientsSection({ active }) {
  const { t } = useLanguage();

  return (
    <motion.section
      id="ingredients"
      animate={{ opacity: active ? 1 : 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-screen items-center justify-center px-6 py-20"
      style={{ fontFamily: t.font }}
    >
      <div className="w-full max-w-4xl text-center">
        <AnimatedText
          text={t.ingredients.heading}
          active={active}
          className="mb-14 block text-3xl font-extrabold sm:text-5xl"
          style={{ color: "var(--color-light)" }}
        />

        <div className="flex flex-wrap justify-center gap-5">
          {t.ingredients.minerals.map((mineral, i) => (
            <motion.div
              key={mineral.name}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={
                active
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.92, y: 20 }
              }
              transition={{
                duration: 0.55,
                delay: active ? i * 0.08 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex w-36 flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <span
                className="text-3xl font-extrabold"
                style={{ color: "var(--color-accent)" }}
              >
                {mineral.value}
              </span>
              <span className="text-xs font-semibold opacity-70">
                {t.ingredients.unit}
              </span>
              <span className="mt-1 text-base font-bold">{mineral.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
