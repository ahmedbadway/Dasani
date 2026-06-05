import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext.jsx";
import AnimatedText from "./AnimatedText.jsx";

export default function AboutSection({ active }) {
  const { t } = useLanguage();

  return (
    <motion.section
      id="about"
      animate={{ opacity: active ? 1 : 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-screen items-center justify-center px-6"
      style={{ fontFamily: t.font }}
    >
      <div className="max-w-2xl text-center">
        <AnimatedText
          text={t.about.heading}
          active={active}
          className="mb-6 block text-3xl font-extrabold sm:text-5xl"
          style={{ color: "var(--color-light)" }}
        />
        <AnimatedText
          text={t.about.body}
          active={active}
          className="block text-lg leading-relaxed opacity-90 sm:text-xl"
        />
      </div>
    </motion.section>
  );
}
