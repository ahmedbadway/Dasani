import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = `${import.meta.env.BASE_URL}videos/Dasani.mp4`;
const SECTION_COUNT = 4;
const SECTION_SPAN = 1 / SECTION_COUNT; // 25% of scroll per section
// Words finish revealing within the first half of a section's scroll band, so
// even long paragraphs (About) are fully shown while the section is still in
// view — instead of the last words landing right as the section scrolls away.
const REVEAL_PORTION = 0.5;
const DESKTOP_MIN = 768;

/**
 * Fixed fullscreen background video.
 *
 * Mobile (< 768px): scroll-driven scrubbing — the rAF loop lerps
 * video.currentTime toward progress * duration for a smooth scrub.
 *
 * Desktop (>= 768px): the video plays continuously and loops as a smooth
 * cinematic background (scroll scrubbing stutters on desktop because each
 * seek re-decodes from a keyframe). Scroll drives only the text reveal.
 *
 * The video is preloaded as a Blob URL for a fast start, autoplays
 * muted/inline, shows a "Tap to start" overlay if blocked, and falls back to
 * an animated gradient when the mp4 is missing.
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
      // Desktop loops as an ambient background; mobile is paused so the
      // scroll loop can drive currentTime (scrubbing). loop is set via JS so
      // it only ever applies to desktop.
      if (isDesktop) video.loop = true;
      video
        .play()
        .then(() => {
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

  // Single rAF loop: a passive scroll listener stores scroll progress. On
  // mobile the loop scrubs video.currentTime; on all devices it drives the
  // per-word text reveal. (Desktop video plays on its own — no scrubbing.)
  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;

    let progress = 0; // latest scroll progress (drives text + mobile scrub)
    let targetTime = 0; // where the mobile video should seek to
    let currentTime = 0; // interpolated playhead (mobile)

    const readProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const video = videoRef.current;
      if (video && video.duration && !Number.isNaN(video.duration)) {
        targetTime = progress * video.duration;
      }
    };

    const loop = () => {
      // Mobile only: smooth scroll-driven scrubbing via lerp.
      const isMobile = window.innerWidth < DESKTOP_MIN;
      const video = videoRef.current;
      if (isMobile && video) {
        if (video.duration && !Number.isNaN(video.duration)) {
          currentTime = lerp(currentTime, targetTime, 0.3);
          if (
            video.readyState >= 2 &&
            Math.abs(currentTime - video.currentTime) > 0.01
          ) {
            try {
              video.currentTime = currentTime;
            } catch {
              /* seeking before ready — ignore */
            }
          }
        }
      }

      // Text: per-word reveal driven by each section's local progress.
      const sections = document.querySelectorAll("[data-section-index]");
      sections.forEach((el) => {
        const idx = Number(el.dataset.sectionIndex);
        const local = Math.min(
          1,
          Math.max(0, (progress - idx * SECTION_SPAN) / SECTION_SPAN)
        );
        // Compress the reveal into the first part of the band so all words
        // are shown before the section leaves the screen.
        const reveal = Math.min(1, local / REVEAL_PORTION);
        const words = el.querySelectorAll("[data-word]");
        const total = words.length || 1;
        words.forEach((word, n) => {
          const t = Math.min(1, Math.max(0, reveal * total - n));
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
