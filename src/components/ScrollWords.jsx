/**
 * Renders text as per-word spans, hidden by default. The single rAF scroll
 * loop in VideoScroll finds every [data-word] inside a [data-section-index]
 * and drives its opacity/translateY directly from scroll progress — so there
 * is intentionally no Motion or transition here.
 */
export default function ScrollWords({ text, className, style }) {
  const words = text.split(" ");

  return (
    <span className={className} style={style} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          data-word
          aria-hidden="true"
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            opacity: 0,
            transform: "translateY(20px)",
          }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
