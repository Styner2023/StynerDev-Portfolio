"use client";

import * as React from "react";
import { Play } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";
import type { VoicemailContent } from "@/lib/content/home";

type Props = {
  content: VoicemailContent;
  lang?: Lang;
};

const TRANSITION_MS = 200;

export function Voicemail({ content, lang = "en" }: Props) {
  // Two-phase open/close so the modal animates smoothly both ways.
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const open = React.useCallback(() => {
    setMounted(true);
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const close = React.useCallback(() => {
    setVisible(false);
    window.setTimeout(() => setMounted(false), TRANSITION_MS);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mounted, close]);

  // Append autoplay so the modal video starts as soon as the modal mounts.
  const autoplayUrl = (() => {
    const url = new URL(content.videoEmbedUrl);
    url.searchParams.set("autoplay", "1");
    url.searchParams.set("rel", "0");
    return url.toString();
  })();

  return (
    <>
      <section
        className="relative w-full h-[420px] sm:h-[560px] lg:h-[700px] overflow-hidden bg-black"
        aria-label={t(content.title, lang)}
      >
        {/* Looping background video (or poster fallback). The contrast +
            saturation filter compensates for the upscaled source so the
            footage reads as cinematic rather than soft. */}
        {content.loopVideoSrc ? (
          <video
            src={content.loopVideoSrc}
            poster={content.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover [filter:contrast(1.08)_saturate(1.15)_brightness(0.95)]"
          />
        ) : content.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={content.poster}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}

        {/* Match homepage hero treatment: light uniform tint + symmetric side-vignette */}
        <div aria-hidden="true" className="absolute inset-0 bg-black/15" />
        <div
          aria-hidden="true"
          className="absolute inset-0 [background:linear-gradient(to_right,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.30)_15%,rgba(0,0,0,0.10)_38%,rgba(0,0,0,0.05)_62%,rgba(0,0,0,0.25)_88%,rgba(0,0,0,0.50)_100%)]"
        />
        {/* Soft radial backdrop centered behind the text — gives the headline
            and description enough contrast against bright frames of the loop
            without putting a visible box around any element. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 [background:radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.22)_55%,transparent_85%)]"
        />

        {/* Cursive watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-6 lg:right-20 lg:top-10 z-10 select-none"
        >
          <p className="font-signature text-8xl lg:text-[10rem] text-[var(--color-accent-brand)]/55 -rotate-12 leading-none [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
            {t(content.watermark, lang)}
          </p>
        </div>

        {/* Centered content */}
        <div className="relative h-full mx-auto max-w-[var(--container-content)] px-6 flex flex-col items-center justify-center text-center z-20">
          <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-4">
            {t(content.eyebrow, lang)}
          </span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] mb-5 uppercase tracking-tight leading-[0.95]">
            {lang === "en" ? "A message" : "Un mensaje"}
            <br />
            <span className="italic font-light text-[var(--color-accent-brand)]">
              {lang === "en" ? "from Francisco." : "de Francisco."}
            </span>
          </h2>
          <p className="text-[var(--color-fg)]/85 text-base lg:text-lg mb-10 max-w-2xl leading-relaxed">
            {t(content.description, lang)}
          </p>

          <button
            type="button"
            onClick={open}
            aria-label={lang === "en" ? "Play voicemail" : "Reproducir mensaje"}
            className="group/play inline-flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-[var(--color-accent-brand)] text-[var(--color-bg)] hover:bg-[var(--color-fg)] transition-colors shadow-[0_0_0_8px_rgba(226,165,63,0.25)] hover:shadow-[0_0_0_12px_rgba(226,165,63,0.18)]"
          >
            <Play className="size-8 sm:size-10 translate-x-0.5" aria-hidden="true" fill="currentColor" />
          </button>
        </div>
      </section>

      {/* Modal — elegant, animated, with text Close button */}
      {mounted && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t(content.title, lang)}
          className={[
            "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 transition-[background-color,opacity] duration-200 ease-out",
            visible ? "bg-black/85 opacity-100" : "bg-black/0 opacity-0 pointer-events-none",
          ].join(" ")}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            className={[
              "relative w-full max-w-5xl",
              "transition-[transform,opacity] duration-200 ease-out",
              visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2",
            ].join(" ")}
          >
            <button
              type="button"
              onClick={close}
              className="absolute -top-14 right-0 inline-flex items-center px-5 py-2 font-heading text-xs uppercase tracking-[0.25em] text-[var(--color-accent-brand)] border border-[var(--color-accent-brand)]/50 hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent-brand)] transition-colors"
            >
              {lang === "en" ? "Close / Cerrar" : "Cerrar / Close"}
            </button>
            <div className="relative aspect-video bg-black border border-[var(--color-accent-brand)]/40">
              <iframe
                src={autoplayUrl}
                title={t(content.videoTitle, lang)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
