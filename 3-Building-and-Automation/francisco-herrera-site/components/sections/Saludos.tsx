import * as React from "react";
import { Quote, CornerDownRight, ChevronRight } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";
import type { SaludosContent, SaludoEntry } from "@/lib/content/home";

type Props = {
  content: SaludosContent;
  lang?: Lang;
};

function formatDate(iso: string, lang: Lang) {
  const d = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
    .format(d)
    .replace(".", "")
    .toUpperCase();
}

export function Saludos({ content, lang = "en" }: Props) {
  // Render the entries twice so the marquee can loop seamlessly. The
  // second copy is aria-hidden so screen readers don't announce duplicates.
  return (
    <section
      className="relative bg-[var(--color-bg-deeper)] section-atmospheric py-24 lg:py-32 overflow-hidden border-t border-black"
      aria-label={t(content.title, lang)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-6 lg:left-12 lg:top-10 z-0 select-none"
      >
        <p className="font-signature text-8xl lg:text-[10rem] text-[var(--color-muted-brand)]/30 -rotate-12 leading-none">
          {t(content.watermark, lang)}
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-[var(--container-content)] px-6">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-3 inline-block">
            {t(content.eyebrow, lang)}
          </span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] mb-5 uppercase tracking-tight leading-[0.95]">
            {t(content.title, lang)}
            <span className="italic font-light text-[var(--color-accent-brand)]">.</span>
          </h2>
          <p className="text-[var(--color-muted-brand)] text-base lg:text-lg leading-relaxed">
            {t(content.description, lang)}
          </p>
        </div>
      </div>

      {/* Marquee — full bleed so cards drift edge-to-edge */}
      <div className="relative group">
        {/* Edge fades — cards emerge/disappear into the dark bg */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-10"
        />

        <div className="overflow-hidden">
          <div
            className="flex w-max animate-marquee-x group-hover:[animation-play-state:paused]"
          >
            {content.entries.map((entry) => (
              <SaludoCard key={entry.id} entry={entry} lang={lang} />
            ))}
            {content.entries.map((entry) => (
              <SaludoCard key={`${entry.id}-clone`} entry={entry} lang={lang} ariaHidden />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative flow indicator — three marching chevrons + hover hint */}
      <div
        aria-hidden="true"
        className="relative z-10 mt-10 flex flex-col items-center gap-3"
      >
        <div className="flex items-center gap-1.5 text-[var(--color-accent-brand)]">
          <ChevronRight
            className="size-7 sm:size-8 animate-marquee-arrow"
            strokeWidth={1.5}
            style={{ animationDelay: "0s" }}
          />
          <ChevronRight
            className="size-7 sm:size-8 animate-marquee-arrow"
            strokeWidth={1.5}
            style={{ animationDelay: "0.3s" }}
          />
          <ChevronRight
            className="size-7 sm:size-8 animate-marquee-arrow"
            strokeWidth={1.5}
            style={{ animationDelay: "0.6s" }}
          />
        </div>
        <p className="font-heading text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[var(--color-muted-brand)]">
          {lang === "en" ? "Hover to pause" : "Pasa el cursor para pausar"}
        </p>
      </div>
    </section>
  );
}

function SaludoCard({
  entry,
  lang,
  ariaHidden,
}: {
  entry: SaludoEntry;
  lang: Lang;
  ariaHidden?: boolean;
}) {
  return (
    <article
      {...(ariaHidden ? { "aria-hidden": "true" } : {})}
      className="shrink-0 w-[320px] sm:w-[360px] mx-3 sm:mx-4 flex flex-col bg-[var(--color-card-bg)]/80 backdrop-blur-sm border border-[var(--color-border-brand)] hover:border-[var(--color-accent-brand)]/60 transition-colors p-6 lg:p-7"
    >
      <Quote
        aria-hidden="true"
        className="size-6 mb-4 text-[var(--color-accent-brand)] shrink-0"
        strokeWidth={1.5}
      />
      <p className="text-[var(--color-fg)]/90 text-base leading-relaxed mb-5 line-clamp-5">
        {entry.message}
      </p>

      {entry.reply && (
        <div className="border-l-2 border-[var(--color-accent-brand)]/60 pl-4 py-1 mb-5">
          <p className="font-heading text-[10px] uppercase tracking-[0.25em] text-[var(--color-accent-brand)] mb-2 flex items-center gap-1.5">
            <CornerDownRight className="size-3" aria-hidden="true" />
            {lang === "en" ? "Francisco replied" : "Francisco respondió"}
          </p>
          <p className="text-[var(--color-fg)]/75 text-sm leading-relaxed italic line-clamp-3">
            {entry.reply}
          </p>
        </div>
      )}

      <footer className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-4 mt-auto border-t border-[var(--color-border-brand)]">
        <span className="font-heading text-sm text-[var(--color-fg)]">
          {entry.name}
        </span>
        <span className="font-heading text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent-brand)]">
          {t(entry.location, lang)}
        </span>
        <span className="font-heading text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted-brand)] ml-auto">
          {formatDate(entry.date, lang)}
        </span>
      </footer>
    </article>
  );
}
