import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext.jsx";
import AnimatedText from "./AnimatedText.jsx";

export default function HeroSection({ active }) {
  const { t } = useLanguage();

  return (
    <motion.section
      id="hero"
      animate={{ opacity: active ? 1 : 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-screen items-center justify-center px-6 text-center"
      style={{ fontFamily: t.font }}
    >
      <AnimatedText
        text={t.hero.title}
        active={active}
        className="block max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl"
        style={{ textShadow: "0 2px 30px rgba(10,22,40,0.5)" }}
      />
    </motion.section>
  );
}
