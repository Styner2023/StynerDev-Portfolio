"use client";

import * as React from "react";
import { t, type Lang } from "@/lib/i18n";
import type { PlayAlongContent } from "@/lib/content/home";

type Props = {
  content: PlayAlongContent;
  lang?: Lang;
};

export function PlayAlong({ content, lang = "en" }: Props) {
  const [activeId, setActiveId] = React.useState(content.songs[0]?.id);
  const activeSong = content.songs.find((s) => s.id === activeId) ?? content.songs[0];

  return (
    <section
      className="relative bg-[var(--color-bg-deeper)] section-atmospheric py-24 lg:py-32 overflow-hidden border-t border-black"
      aria-label={t(content.title, lang)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-12 lg:left-12 lg:top-20 z-0 select-none"
      >
        <p className="font-signature text-8xl lg:text-[10rem] text-[var(--color-muted-brand)]/30 -rotate-12 leading-none">
          {t(content.watermark, lang)}
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-[var(--container-content)] px-6">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-3 inline-block">
            {t(content.eyebrow, lang)}
          </span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] mb-5 uppercase tracking-tight leading-[0.95]">
            {lang === "en" ? "Pick up your" : "Toma tu"}
            <br />
            <span className="italic font-light text-[var(--color-accent-brand)]">
              {lang === "en" ? "guitar." : "guitarra."}
            </span>
          </h2>
          <p className="text-[var(--color-muted-brand)] text-base lg:text-lg leading-relaxed">
            {t(content.description, lang)}
          </p>
        </div>

        {/* Song picker — only renders when 2+ songs are configured */}
        {content.songs.length > 1 && (
          <div role="tablist" aria-label={lang === "en" ? "Choose a song" : "Elige una canción"} className="flex flex-wrap justify-center gap-3 mb-8">
            {content.songs.map((song) => {
              const active = song.id === activeId;
              return (
                <button
                  key={song.id}
                  type="button"
                  role="tab"
                  aria-selected={active ? "true" : "false"}
                  onClick={() => setActiveId(song.id)}
                  className={[
                    "px-5 py-2.5 font-heading text-xs uppercase tracking-[0.18em] border transition-colors",
                    active
                      ? "bg-[var(--color-accent-brand)] text-[var(--color-bg)] border-[var(--color-accent-brand)]"
                      : "bg-transparent text-[var(--color-fg)] border-[var(--color-accent-brand)]/40 hover:border-[var(--color-accent-brand)]",
                  ].join(" ")}
                >
                  {t(song.title, lang)}
                </button>
              );
            })}
          </div>
        )}

        {activeSong && (
          <figure className="mx-auto max-w-5xl">
            <div className="border border-[var(--color-accent-brand)]/40 p-2 sm:p-3 [filter:drop-shadow(0_30px_40px_rgba(0,0,0,0.55))]">
              {/* Chordify embed — auto-detected chords + corner YouTube player.
                  Each song is a single iframe; sandbox + lazy-load for perf. */}
              <iframe
                key={activeSong.id}
                src={activeSong.chordifyEmbedUrl}
                title={`${lang === "en" ? "Play along with" : "Toca con"}: ${t(activeSong.title, lang)}`}
                width="100%"
                height={500}
                loading="lazy"
                allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
                allowFullScreen
                className="block w-full h-[420px] sm:h-[500px] bg-black border-0"
              />
            </div>
            <figcaption className="mt-4 text-center font-heading text-xs uppercase tracking-[0.2em] text-[var(--color-muted-brand)]">
              {lang === "en" ? "Play along with" : "Toca con"}{" "}
              <span className="text-[var(--color-accent-brand)]">{t(activeSong.title, lang)}</span>
              {" · "}
              <a
                href="https://chordify.net"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-accent-brand)] transition-colors"
              >
                {lang === "en" ? "Powered by Chordify" : "Por Chordify"}
              </a>
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
