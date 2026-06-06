import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Navbar() {
  const { lang, toggle, t } = useLanguage();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Hide when scrolling down past a small threshold, show when scrolling up.
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "about", label: t.nav.about },
    { id: "products", label: t.nav.products },
    { id: "ingredients", label: t.nav.ingredients },
  ];

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-10"
      style={{
        fontFamily: t.font,
        transform: hidden ? "translateY(-120%)" : "translateY(0)",
      }}
    >
      <a
        href="#hero"
        className="text-xl font-extrabold tracking-wide"
        style={{ color: "var(--color-white)" }}
      >
        Dasani
      </a>

      <div className="flex items-center gap-6 sm:gap-9">
        <ul className="hidden items-center gap-6 sm:flex sm:gap-9">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="text-sm font-semibold opacity-80 transition-opacity duration-200 hover:opacity-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={toggle}
          aria-label="Toggle language"
          className="text-2xl leading-none transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          {lang === "en" ? "🇪🇬" : "🇺🇸"}
        </button>
      </div>
    </nav>
  );
}
