import { useEffect, useRef, useState } from "react";

// Four sections mapped to 2.5s slices of the 10s clip.
const SECTIONS = [
  { start: 0, end: 2.5 },
  { start: 2.5, end: 5 },
  { start: 5, end: 7.5 },
  { start: 7.5, end: 10 },
];

const VIDEO_SRC = `${import.meta.env.BASE_URL}videos/Dasani.mp4`;
const MAX_SCALE = 1.12;

/**
 * Core feature. A fixed fullscreen background video that:
 *  1. Autoplays muted/inline on mobile, with a "Tap to start" fallback when
 *     the browser blocks autoplay. src is assigned after mount (iOS Safari).
 *  2. Zooms 1.0 → 1.12 across the full scroll range (rAF-driven transform).
 *  3. Apple-style scroll lock: entering a section locks the page and plays
 *     that section's video slice, unlocking once the slice finishes.
 *
 * Degrades to an animated gradient if the mp4 is missing.
 */
export default function VideoScroll({ setActive }) {
  const videoRef = useRef(null);
  const rafRef = useRef(0);
  const indexRef = useRef(-1);
  const lockTimerRef = useRef(0);
  const [fallback, setFallback] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);

  // iOS Safari: assign src after mount, then attempt autoplay.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = VIDEO_SRC;
    video.load();

    const tryPlay = async () => {
      try {
        await video.play();
        video.pause(); // playback is driven per-section below
        setNeedsTap(false);
      } catch {
        setNeedsTap(true);
      }
    };
    tryPlay();
  }, []);

  // Scroll-driven zoom + active-section detection + slice playback.
  useEffect(() => {
    const video = videoRef.current;

    const unlock = () => {
      document.body.style.overflow = "";
      if (lockTimerRef.current) {
        clearTimeout(lockTimerRef.current);
        lockTimerRef.current = 0;
      }
    };

    const playSlice = (index) => {
      const slice = SECTIONS[index];
      if (!video || !slice || fallback) return;
      if (!video.duration || Number.isNaN(video.duration)) return;

      document.body.style.overflow = "hidden";
      try {
        video.currentTime = slice.start;
      } catch {
        /* seeking before metadata is ready — ignore */
      }

      const onTime = () => {
        if (video.currentTime >= slice.end) {
          video.removeEventListener("timeupdate", onTime);
          video.pause();
          unlock();
        }
      };
      video.addEventListener("timeupdate", onTime);
      video.play().catch(() => {
        setNeedsTap(true);
        video.removeEventListener("timeupdate", onTime);
        unlock();
      });

      // Safety net so the user is never trapped if timeupdate stalls.
      clearTimeout(lockTimerRef.current);
      lockTimerRef.current = setTimeout(() => {
        video.removeEventListener("timeupdate", onTime);
        unlock();
      }, (slice.end - slice.start) * 1000 + 800);
    };

    const update = () => {
      rafRef.current = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollable > 0
          ? Math.min(1, Math.max(0, window.scrollY / scrollable))
          : 0;

      // Zoom effect.
      if (video && !fallback) {
        const scale = 1 + (MAX_SCALE - 1) * progress;
        video.style.transform = `translateZ(0) scale(${scale})`;
      }

      // Active section (snap to nearest 100vh band).
      const index = Math.min(
        SECTIONS.length - 1,
        Math.max(0, Math.floor(window.scrollY / window.innerHeight + 0.5))
      );
      if (index !== indexRef.current) {
        indexRef.current = index;
        setActive(index);
        playSlice(index);
      }
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll(); // initialize section 0

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      unlock();
    };
  }, [fallback, setActive]);

  const handleTap = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      await video.play();
      setNeedsTap(false);
    } catch {
      /* still blocked — leave the overlay up */
    }
  };

  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {!fallback && (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
            onError={() => setFallback(true)}
            style={{
              willChange: "transform",
              transform: "translateZ(0) scale(1)",
            }}
          />
        )}

        {fallback && (
          <div
            className="h-full w-full animate-pulse"
            style={{
              background:
                "linear-gradient(160deg, var(--color-dark) 0%, var(--color-primary) 55%, var(--color-accent) 100%)",
            }}
          />
        )}

        {/* Readability scrim over whichever background is showing */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,22,40,0.45) 0%, rgba(10,22,40,0.25) 50%, rgba(10,22,40,0.65) 100%)",
          }}
        />
      </div>

      {needsTap && !fallback && (
        <button
          type="button"
          onClick={handleTap}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          aria-label="Tap to start the video"
        >
          <span className="rounded-full bg-white/15 px-8 py-4 text-lg font-bold backdrop-blur-md transition-transform duration-200 hover:scale-105 active:scale-95">
            Tap to start
          </span>
        </button>
      )}
    </>
  );
}
