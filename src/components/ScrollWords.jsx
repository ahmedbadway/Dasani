import { useEffect, useRef, useState } from "react";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Renders text as per-word spans that "write" in word by word (fade + rise)
 * once the text scrolls into view. The reveal is time-based (a CSS stagger),
 * triggered by an IntersectionObserver — so the full text always finishes,
 * regardless of scroll speed or how long the paragraph is.
 */
export default function ScrollWords({ text, className, style }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={className} style={style} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden="true"
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.5s ${EASE}, transform 0.5s ${EASE}`,
            transitionDelay: `${i * 0.04}s`,
          }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
