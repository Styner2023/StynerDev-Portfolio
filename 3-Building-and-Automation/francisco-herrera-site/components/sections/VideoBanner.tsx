"use client";

// Guitare source: sections/home-video-banner.liquid
// - ".dt-sc-video-banner-section" lines 1-102
// - Modal popup option .video_modal + .video_modal_content (lines 86-95)
// - Centered play icon overlay launches modal (line 85)
// - Demo (templates/index.json): video_height "700", overlay_style "with-overlay",
//   modal format with iframe_url
// - Schema: video_height default 500 (line 598); demo overrides to 700.

import * as React from "react";
import { Play, X } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";
import type { VideoBannerContent } from "@/lib/content/home";

type Props = {
  content: VideoBannerContent;
  lang?: Lang;
};

export function VideoBanner({ content, lang = "en" }: Props) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <section
        // 700px height per templates/index.json "video_height":"700"
        className="relative w-full h-[420px] sm:h-[560px] lg:h-[700px] overflow-hidden bg-black"
        aria-label={t(content.title, lang)}
      >
        {content.backgroundVideo ? (
          <>
            {/* Blurred & scaled bg fills the letterbox texture */}
            <video
              src={content.backgroundVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover scale-110 blur-2xl opacity-70"
            />
            {/* Heavy dimmer over the blurred bg — kills bright colors
                like the red flag bleed-through so both letterbox sides
                read as the same uniform dark. The foreground video below
                renders on top, so the dimmer only affects the letterbox. */}
            <div aria-hidden="true" className="absolute inset-0 bg-black/75" />
            <video
              src={content.backgroundVideo}
              poster={content.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-contain"
            />
          </>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={content.poster}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div aria-hidden="true" className="absolute inset-0 bg-black/55" />

        <div className="relative h-full mx-auto max-w-[var(--container-content)] px-6 flex flex-col items-center justify-center text-center">
          <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-4">
            {t(content.eyebrow, lang)}
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl !text-[var(--color-fg)] mb-3 uppercase tracking-tight leading-[0.95]">
            Saber Ante
            <br />
            <span className="italic font-light text-[var(--color-accent-brand)]">
              La Migra.
            </span>
          </h2>
          <p className="text-[var(--color-fg)]/80 text-base lg:text-lg mb-10">
            {t(content.caption, lang)}
          </p>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={lang === "en" ? "Play video" : "Reproducir video"}
            className="group inline-flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-[var(--color-accent-brand)] text-[var(--color-bg)] hover:bg-[var(--color-fg)] transition-colors shadow-[0_0_0_8px_rgba(226,165,63,0.25)] hover:shadow-[0_0_0_12px_rgba(226,165,63,0.18)]"
          >
            <Play className="size-8 sm:size-10 translate-x-0.5" aria-hidden="true" fill="currentColor" />
          </button>
        </div>
      </section>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t(content.title, lang)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <button
            type="button"
            aria-label={lang === "en" ? "Close" : "Cerrar"}
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 inline-flex h-11 w-11 items-center justify-center text-[var(--color-fg)] hover:text-[var(--color-accent-brand)] border border-[var(--color-border-brand)]"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
          <div className="w-full max-w-5xl aspect-video">
            <iframe
              src={`${content.videoUrl}?autoplay=1`}
              title={t(content.title, lang)}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        </div>
      )}
    </>
  );
}
