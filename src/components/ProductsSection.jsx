import { useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import ScrollWords from "./ScrollWords.jsx";

// Bottle images mapped by index (labels are localized, filenames are not).
const BOTTLE_IMAGES = [
  "images/bottle-330.png",
  "images/bottle-600.png",
  "images/bottle-8l.png",
  "images/bottle-5gal.png",
];

// SVG placeholder shown if the real bottle image fails to load.
function BottleFallback() {
  return (
    <svg
      viewBox="0 0 60 140"
      style={{ height: "150px", width: "auto" }}
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

function ProductCard({ size, image }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10"
      style={{ minWidth: "160px" }}
    >
      {failed ? (
        <BottleFallback />
      ) : (
        <img
          src={`${import.meta.env.BASE_URL}${image}`}
          alt={`Dasani ${size}`}
          onError={() => setFailed(true)}
          style={{ height: "150px", objectFit: "contain" }}
        />
      )}
      <ScrollWords
        text={size}
        className="block font-bold"
        style={{ fontSize: "1.2rem" }}
      />
    </div>
  );
}

export default function ProductsSection() {
  const { t } = useLanguage();

  return (
    <section
      id="products"
      data-section-index="2"
      className="flex min-h-screen flex-col items-center justify-center px-6 pt-[5vh] pb-20"
      style={{ fontFamily: t.font }}
    >
      <div className="w-full max-w-5xl text-center">
        <ScrollWords
          text={t.products.heading}
          className="mb-14 block font-extrabold"
          style={{
            color: "var(--color-light)",
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            textShadow: "0 2px 20px rgba(0,0,0,0.8)",
          }}
        />

        <div className="flex flex-wrap justify-center" style={{ gap: "2rem" }}>
          {t.products.sizes.map((size, i) => (
            <ProductCard key={size} size={size} image={BOTTLE_IMAGES[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
