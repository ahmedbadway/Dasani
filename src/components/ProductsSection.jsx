import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import ScrollWords from "./ScrollWords.jsx";

const BOTTLE_IMAGES = [
  "images/bottle-330.png",
  "images/bottle-600.png",
  "images/bottle-8l.png",
  "images/bottle-5gal.png",
];

function BottleFallback({ large }) {
  const h = large ? "320px" : "150px";
  return (
    <svg
      viewBox="0 0 60 140"
      style={{ height: h, width: "auto" }}
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

function Lightbox({ size, image, onClose }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(10,22,40,0.85)",
        backdropFilter: "blur(12px)",
        animation: "lb-in 0.25s cubic-bezier(0.22,1,0.36,1)",
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Dasani ${size}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          padding: "2.5rem",
          borderRadius: "1.5rem",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          animation: "lb-scale-in 0.3s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {failed ? (
          <BottleFallback large />
        ) : (
          <img
            src={`${import.meta.env.BASE_URL}${image}`}
            alt={`Dasani ${size}`}
            onError={() => setFailed(true)}
            style={{ maxHeight: "60vh", maxWidth: "80vw", objectFit: "contain" }}
          />
        )}
        <span
          style={{
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            fontWeight: 700,
            color: "var(--color-light)",
          }}
        >
          {size}
        </span>
        <button
          type="button"
          onClick={onClose}
          style={{
            marginTop: "0.5rem",
            padding: "0.5rem 1.5rem",
            borderRadius: "9999px",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "var(--color-white)",
            cursor: "pointer",
            fontSize: "0.9rem",
            transition: "background 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
          onMouseOut={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function ProductCard({ size, image, onClick }) {
  const [failed, setFailed] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-105 active:scale-95"
      style={{ minWidth: "160px", cursor: "pointer" }}
    >
      {failed ? (
        <BottleFallback />
      ) : (
        <img
          src={`${import.meta.env.BASE_URL}${image}`}
          alt={`Dasani ${size}`}
          onError={() => setFailed(true)}
          style={{ height: "150px", objectFit: "contain", pointerEvents: "none" }}
        />
      )}
      <ScrollWords
        text={size}
        className="block font-bold"
        style={{ fontSize: "1.2rem" }}
      />
    </button>
  );
}

export default function ProductsSection() {
  const { t } = useLanguage();
  const [active, setActive] = useState(null); // { size, image }

  return (
    <section
      id="products"
      data-section-index="2"
      className="flex min-h-screen flex-col items-center justify-center px-6 pt-[5vh] pb-20"
      style={{ fontFamily: t.font }}
    >
      <style>{`
        @keyframes lb-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes lb-scale-in { from { opacity: 0; transform: scale(0.9) } to { opacity: 1; transform: scale(1) } }
      `}</style>

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
            <ProductCard
              key={size}
              size={size}
              image={BOTTLE_IMAGES[i]}
              onClick={() => setActive({ size, image: BOTTLE_IMAGES[i] })}
            />
          ))}
        </div>
      </div>

      {active && (
        <Lightbox
          size={active.size}
          image={active.image}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  );
}
