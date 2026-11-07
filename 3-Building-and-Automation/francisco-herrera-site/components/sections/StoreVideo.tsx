import * as React from "react";
import { t, type Lang, type Localized } from "@/lib/i18n";

type Props = {
  lang?: Lang;
};

const VIDEO_ID = "1Z6OkfxnVT0";
const VIDEO_HREF = `https://youtu.be/${VIDEO_ID}`;
const VIDEO_EMBED_SRC = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&playsinline=1&rel=0&disablekb=1`;

const eyebrow: Localized = { en: "Watch / Ver", es: "Watch / Ver" };
const title: Localized = {
  en: "Francisco in Performance",
  es: "Francisco in Performance",
};
const description: Localized = {
  en: "A few minutes on stage — the songs, the storytelling, the room.",
  es: "Unos minutos en escena — las canciones, las historias, la sala.",
};
const watermark: Localized = { en: "Vivo", es: "Vivo" };
const watchCta: Localized = {
  en: "Watch on YouTube",
  es: "Ver en YouTube",
};
const ariaLabel: Localized = {
  en: "Watch Francisco perform live",
  es: "Vean a Francisco en vivo",
};

export function StoreVideo({ lang = "en" }: Props) {
  return (
    <section
      className="relative w-full h-[420px] sm:h-[560px] lg:h-[700px] overflow-hidden bg-black"
      aria-label={t(ariaLabel, lang)}
    >
      <div className="absolute inset-0 pointer-events-none">
        <iframe
          src={VIDEO_EMBED_SRC}
          title={t(ariaLabel, lang)}
          allow="autoplay; encrypted-media"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-full min-w-full min-h-[56.25vw]"
        />
      </div>

      <div aria-hidden="true" className="absolute inset-0 bg-black/30" />
      <div
        aria-hidden="true"
        className="absolute inset-0 [background:linear-gradient(to_right,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.30)_15%,rgba(0,0,0,0.10)_38%,rgba(0,0,0,0.05)_62%,rgba(0,0,0,0.25)_88%,rgba(0,0,0,0.50)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 [background:radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.22)_55%,transparent_85%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-6 lg:right-20 lg:top-10 z-10 select-none"
      >
        <p className="font-signature text-8xl lg:text-[10rem] text-[var(--color-accent-brand)]/55 -rotate-12 leading-none [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
          {t(watermark, lang)}
        </p>
      </div>

      <div className="relative h-full mx-auto max-w-[var(--container-content)] px-6 flex flex-col items-center justify-center text-center z-20">
        <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-4">
          {t(eyebrow, lang)}
        </span>
        <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-7xl text-[var(--color-fg)] mb-5 uppercase tracking-tight leading-[0.95] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
          Francisco
          <br />
          <span className="italic font-light text-[var(--color-accent-brand)]">
            in performance.
          </span>
        </h2>
        <p className="text-[var(--color-fg)]/85 text-base lg:text-lg mb-10 max-w-2xl leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
          {t(description, lang)}
        </p>
        <a
          href={VIDEO_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-ui font-semibold text-xs uppercase tracking-[0.2em] bg-[var(--color-accent-brand)] text-[var(--color-bg)] hover:bg-[var(--color-fg)] transition-colors px-7 py-3"
        >
          {t(watchCta, lang)}
        </a>
      </div>
    </section>
  );
}
