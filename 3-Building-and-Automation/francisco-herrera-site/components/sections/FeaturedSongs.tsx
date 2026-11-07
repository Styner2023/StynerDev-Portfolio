"use client";

import * as React from "react";
import NextLink from "next/link";
import { t, type Lang } from "@/lib/i18n";
import type { FeaturedSongsContent, FeaturedSong } from "@/lib/content/home";

type Props = {
  content: FeaturedSongsContent;
  lang?: Lang;
};

export function FeaturedSongs({ content, lang = "en" }: Props) {
  return (
    <section
      className="relative bg-[var(--color-bg)] section-atmospheric py-24 lg:py-32 overflow-hidden"
      aria-label={t(content.title, lang)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-10 lg:left-12 lg:top-16 z-0 select-none"
      >
        <p className="font-signature text-8xl lg:text-[10rem] text-[var(--color-muted-brand)]/30 -rotate-12 leading-none">
          {t(content.watermark, lang)}
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-[var(--container-content)] px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-3 inline-block">
            {t(content.eyebrow, lang)}
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[var(--color-fg)] uppercase tracking-tight leading-[0.95]">
            {lang === "en" ? "Featured song" : "Colección de"}
            <br />
            <span className="italic font-light text-[var(--color-accent-brand)]">
              {lang === "en" ? "collection." : "canciones destacadas."}
            </span>
          </h2>
        </div>

        <div className="space-y-24 lg:space-y-32">
          {content.songs.map((song) => (
            <SongRow key={song.id} song={song} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SongRow({ song, lang }: { song: FeaturedSong; lang: Lang }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div
      className={[
        "grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center",
        song.reverse ? "md:[&>*:first-child]:order-1 md:[&>*:last-child]:order-2" : "",
      ].join(" ")}
    >
      {/* Album disc with circular gold-bordered frame */}
      <div className={song.reverse ? "md:order-1" : "md:order-2"}>
        <div className="mx-auto flex justify-center items-center">
          <div className="bg-black rounded-full w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center border-2 border-[var(--color-accent-brand)]/50 [filter:drop-shadow(0_30px_40px_rgba(0,0,0,0.55))]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={song.image}
              alt={t(song.imageAlt, lang)}
              className="max-h-[85%] max-w-[85%] object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Text content */}
      <div className={song.reverse ? "md:order-2" : "md:order-1"}>
        <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[var(--color-fg)] mb-2 uppercase tracking-tight leading-[0.95]">
          {t(song.title, lang)}
        </h3>
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-brand)] mb-6">
          {t(song.meta, lang)}
        </p>

        <div className="text-[var(--color-fg)]/85 text-sm lg:text-base leading-relaxed mb-8">
          {expanded ? (
            <>
              {song.fullStory.map((para, i) => (
                <p key={i} className="mb-4">
                  {t(para, lang)}
                </p>
              ))}
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="text-[var(--color-accent-brand)] hover:underline text-sm font-heading uppercase tracking-[0.15em]"
              >
                {lang === "en" ? "Show less" : "Ver menos"}
              </button>
            </>
          ) : (
            <p>
              {t(song.excerpt, lang)}{" "}
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="text-[var(--color-accent-brand)] hover:underline ml-1 font-heading uppercase tracking-[0.15em] text-xs"
              >
                {lang === "en" ? "Read more" : "Leer más"}
              </button>
            </p>
          )}
        </div>

        <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-[var(--color-fg)] mb-4">
          {lang === "en" ? "Album Details" : "Detalles del Álbum"}
        </h4>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm mb-8">
          {song.details.map((row, i) => (
            <div key={i} className="flex items-baseline gap-2 border-b border-[var(--color-border-brand)] py-1.5">
              <dt className="font-heading text-xs uppercase tracking-[0.15em] text-[var(--color-muted-brand)] shrink-0">
                {t(row.label, lang)}:
              </dt>
              <dd className="text-[var(--color-fg)]/85">{t(row.value, lang)}</dd>
            </div>
          ))}
        </dl>

        <NextLink
          href={song.cta.href}
          className="inline-flex items-center justify-center border border-[var(--color-accent-brand)] px-8 py-3 font-heading text-xs uppercase tracking-[0.18em] text-[var(--color-fg)] hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] transition-colors"
        >
          {t(song.cta.label, lang)}
        </NextLink>
      </div>
    </div>
  );
}
