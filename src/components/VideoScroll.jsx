import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = `${import.meta.env.BASE_URL}videos/Dasani.mp4`;
const SECTION_COUNT = 4;
const SECTION_SPAN = 1 / SECTION_COUNT; // 25% of scroll per section
const DESKTOP_MIN = 768;

/**
 * Fixed fullscreen background video.
 *
 * Desktop (>= 768px): the video plays continuously and loops as a smooth
 * cinematic background — native decode, no per-frame seeking, so no scrubbing
 * stutter. Scroll drives only the per-word text reveal.
 *
 * Mobile (< 768px): behavior is intentionally left untouched — the video is
 * probed for autoplay then paused on its first frame (static poster look),
 * with a "Tap to start" overlay if autoplay is blocked.
 *
 * The video is preloaded as a Blob URL for a fast start, and falls back to an
 * animated gradient when the mp4 is missing.
 */
export default function VideoScroll() {
  const videoRef = useRef(null);
  const rafRef = useRef(0);
  const [fallback, setFallback] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);

  // Preload the video as a Blob URL, then probe autoplay.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let blobUrl;
    let cancelled = false;

    const probeAutoplay = () => {
      const isDesktop = window.innerWidth >= DESKTOP_MIN;
      // Looping is enabled for desktop only, via JS, so the mobile element
      // stays exactly as it was (no loop attribute applied to it).
      if (isDesktop) video.loop = true;
      video
        .play()
        .then(() => {
          // Desktop: keep playing (looping ambient background).
          // Mobile: pause on the first frame (unchanged behavior).
          if (!isDesktop) video.pause();
          setNeedsTap(false);
        })
        .catch(() => setNeedsTap(true));
    };

    fetch(VIDEO_SRC)
      .then((res) => {
        if (!res.ok) throw new Error("video fetch failed");
        return res.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        blobUrl = URL.createObjectURL(blob);
        video.src = blobUrl;
        video.load();
        probeAutoplay();
      })
      .catch(() => {
        if (cancelled) return;
        // Fall back to streaming the file directly.
        video.src = VIDEO_SRC;
        video.load();
        probeAutoplay();
      });

    return () => {
      cancelled = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, []);

  // Single rAF loop: a passive scroll listener stores scroll progress, and the
  // loop drives the per-word text reveal in every section from it. The video
  // is no longer scrubbed — it plays on its own for a smooth visual.
  useEffect(() => {
    let progress = 0;

    const readProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    const loop = () => {
      const sections = document.querySelectorAll("[data-section-index]");
      sections.forEach((el) => {
        const idx = Number(el.dataset.sectionIndex);
        const local = Math.min(
          1,
          Math.max(0, (progress - idx * SECTION_SPAN) / SECTION_SPAN)
        );
        const words = el.querySelectorAll("[data-word]");
        const total = words.length || 1;
        words.forEach((word, n) => {
          const t = Math.min(1, Math.max(0, local * total - n));
          word.style.opacity = String(t);
          word.style.transform = `translateY(${20 * (1 - t)}px)`;
        });
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    const onScroll = () => readProgress();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    readProgress(); // initialize at load
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleTap = () => {
    const video = videoRef.current;
    if (!video) return;
    const isDesktop = window.innerWidth >= DESKTOP_MIN;
    video
      .play()
      .then(() => {
        if (!isDesktop) video.pause();
        setNeedsTap(false);
      })
      .catch(() => {
        /* still blocked — keep the overlay */
      });
  };

  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {!fallback && (
          <video
            ref={videoRef}
            className="object-cover"
            muted
            playsInline
            autoPlay
            preload="auto"
            fetchPriority="high"
            onError={() => setFallback(true)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
              objectPosition: "center center",
              willChange: "transform",
              transform: "translateZ(0)",
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
