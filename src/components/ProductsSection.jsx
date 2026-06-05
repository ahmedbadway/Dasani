import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext.jsx";
import AnimatedText from "./AnimatedText.jsx";

// SVG placeholder for the product image (no real bottle asset yet).
function BottlePlaceholder() {
  return (
    <svg
      viewBox="0 0 60 140"
      className="h-28 w-auto"
      role="img"
      aria-label="Dasani bottle placeholder"
    >
      <path
        d="M24 6h12v8c0 3 6 6 6 14v90a8 8 0 0 1-8 8H26a8 8 0 0 1-8-8V28c0-8 6-11 6-14V6Z"
        fill="var(--color-light)"
        opacity="0.25"
        stroke="var(--color-light)"
        strokeWidth="2"
      />
      <rect
        x="18"
        y="60"
        width="24"
        height="22"
        fill="var(--color-accent)"
        opacity="0.55"
      />
    </svg>
  );
}

export default function ProductsSection({ active }) {
  const { t } = useLanguage();

  return (
    <motion.section
      id="products"
      animate={{ opacity: active ? 1 : 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-screen items-center justify-center px-6 py-20"
      style={{ fontFamily: t.font }}
    >
      <div className="w-full max-w-5xl text-center">
        <AnimatedText
          text={t.products.heading}
          active={active}
          className="mb-14 block text-3xl font-extrabold sm:text-5xl"
          style={{ color: "var(--color-light)" }}
        />

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {t.products.sizes.map((size, i) => (
            <motion.div
              key={size}
              initial={{ opacity: 0, y: 30 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                delay: active ? i * 0.1 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10"
            >
              <BottlePlaceholder />
              <span className="text-lg font-bold">{size}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
