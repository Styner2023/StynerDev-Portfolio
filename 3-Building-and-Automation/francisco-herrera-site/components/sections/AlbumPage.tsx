"use client";

import * as React from "react";
import NextLink from "next/link";
import { ArrowLeft, Play } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";
import type { FeaturedRelease, Track, TrackPrice } from "@/lib/content/store";

type Props = {
  release: FeaturedRelease;
  lang?: Lang;
};

function formatPrice(p: TrackPrice, lang: Lang): React.ReactNode {
  if (p.kind === "free") return <span>{lang === "en" ? "Free" : "Gratis"}</span>;
  if (p.kind === "your-price") return <span>{lang === "en" ? "Your price" : "Tú decides"}</span>;
  if (p.salePrice !== undefined) {
    return (
      <span className="inline-flex items-baseline gap-2">
        <span className="line-through text-[var(--color-muted-brand)]">${p.amount.toFixed(2)}</span>
        <span className="text-[var(--color-accent-brand)]">${p.salePrice.toFixed(2)}</span>
      </span>
    );
  }
  return <span>${p.amount.toFixed(2)}</span>;
}

export function AlbumPage({ release, lang = "en" }: Props) {
  const [expanded, setExpanded] = React.useState(false);
  const tracks = release.tracks ?? [];
  const featured =
    tracks.find((t) => t.index === release.featuredTrackIndex) ?? tracks[0];

  const downloadLabel = (() => {
    if (release.pricing.model === "your-price") {
      return lang === "en" ? "Download: Your Price" : "Descarga: Tú Decides";
    }
    if (release.pricing.download) {
      return lang === "en"
        ? `Download: $${release.pricing.download.amount.toFixed(2)}`
        : `Descarga: $${release.pricing.download.amount.toFixed(2)}`;
    }
    return null;
  })();

  return (
    <section className="relative bg-[var(--color-bg)] section-atmospheric py-20 lg:py-28">
      <div className="relative z-10 mx-auto max-w-[var(--container-content)] px-6">
        <div className="mb-10">
          <NextLink
            href="/store"
            className="inline-flex items-center gap-2 font-heading text-xs uppercase tracking-[0.2em] text-[var(--color-muted-brand)] hover:text-[var(--color-accent-brand)] transition-colors"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {lang === "en" ? "Back to store" : "Volver a la tienda"}
          </NextLink>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] gap-10 lg:gap-16 items-start mb-16">
          <div className="bg-black w-full aspect-square flex items-center justify-center border border-[var(--color-accent-brand)]/40 [filter:drop-shadow(0_30px_40px_rgba(0,0,0,0.55))]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={release.image}
              alt={t(release.imageAlt, lang)}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>

          <div>
            <span className="font-heading text-xs sm:text-sm uppercase tracking-[0.4em] text-white mb-3 inline-block">
              {t(release.meta, lang)}
            </span>
            <h1 className="font-signature text-5xl sm:text-6xl lg:text-7xl text-[var(--color-accent-brand)] mb-3 leading-tight">
              {t(release.title, lang)}
            </h1>
            <p className="font-heading text-base text-[var(--color-fg)]/80 mb-6">
              {t(release.artist, lang)}
            </p>

            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-8">
              {release.pricing.physical && (
                <span className="font-heading text-2xl text-[var(--color-fg)]">
                  ${release.pricing.physical.amount.toFixed(2)}
                </span>
              )}
              {downloadLabel && (
                <span className="font-heading text-base text-[var(--color-muted-brand)]">
                  {downloadLabel}
                </span>
              )}
            </div>

            <div className="text-[var(--color-fg)]/85 text-sm lg:text-base leading-relaxed mb-8 max-w-2xl">
              {expanded ? (
                <>
                  {release.fullStory.map((para, i) => (
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
                  {t(release.excerpt, lang)}{" "}
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="text-[var(--color-accent-brand)] hover:underline ml-1 font-heading uppercase tracking-[0.15em] text-xs"
                  >
                    {lang === "en" ? "Read more →" : "Leer más →"}
                  </button>
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent-brand)] text-[var(--color-bg)] px-8 py-3 font-heading text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-accent-brand)]/90 transition-colors"
              >
                {lang === "en" ? "Add to Cart" : "Agregar al Carrito"}
              </button>
              {release.pricing.model !== "your-price" && release.pricing.download && (
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 border border-[var(--color-accent-brand)] px-8 py-3 font-heading text-xs uppercase tracking-[0.2em] text-[var(--color-fg)] hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] transition-colors"
                >
                  {lang === "en" ? "Download Album" : "Descargar Álbum"}
                </button>
              )}
            </div>
          </div>
        </div>

        {featured && (
          <div className="border-t border-[var(--color-border-brand)] pt-10 mb-12">
            <div className="flex items-center gap-5">
              <button
                type="button"
                aria-label={lang === "en" ? `Play ${featured.title}` : `Reproducir ${featured.title}`}
                className="flex items-center justify-center w-14 h-14 rounded-full border border-[var(--color-accent-brand)] text-[var(--color-accent-brand)] hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] transition-colors shrink-0"
              >
                <Play className="size-5" aria-hidden="true" />
              </button>
              <div>
                <p className="font-heading text-lg text-[var(--color-fg)]">{featured.title}</p>
                <p className="font-mono text-xs text-[var(--color-muted-brand)]">
                  {featured.duration} ·{" "}
                  {lang === "en" ? "Audio preview coming soon." : "Vista previa de audio próximamente."}
                </p>
              </div>
            </div>
          </div>
        )}

        {tracks.length > 0 && (
          <>
            <h2 className="sr-only">{lang === "en" ? "Tracklist" : "Lista de canciones"}</h2>
            <ol className="border border-[var(--color-border-brand)] divide-y divide-[var(--color-border-brand)]">
              {tracks.map((track) => (
                <TrackRow key={track.index} track={track} lang={lang} />
              ))}
            </ol>
          </>
        )}
      </div>
    </section>
  );
}

function TrackRow({ track, lang }: { track: Track; lang: Lang }) {
  return (
    <li className="grid grid-cols-[2.25rem_1fr_auto_auto] sm:grid-cols-[3rem_1fr_auto_4.5rem_auto] items-center gap-4 px-4 sm:px-6 py-3.5 hover:bg-[var(--color-card-bg)]/60 transition-colors">
      <span className="font-mono text-xs text-[var(--color-muted-brand)] tabular-nums">
        {String(track.index).padStart(2, "0")}
      </span>
      <span className="font-heading text-sm sm:text-base text-[var(--color-fg)] leading-snug">
        {track.title}
      </span>
      <span className="hidden sm:inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted-brand)]">
        {track.hasInfo && (
          <span className="border border-[var(--color-border-brand)] px-2 py-0.5">
            {lang === "en" ? "Info" : "Info"}
          </span>
        )}
        {track.hasLyrics && (
          <span className="border border-[var(--color-border-brand)] px-2 py-0.5">
            {lang === "en" ? "Lyrics" : "Letra"}
          </span>
        )}
      </span>
      <span className="font-mono text-xs text-[var(--color-muted-brand)] tabular-nums text-right">
        {track.duration}
      </span>
      <span className="font-heading text-xs text-[var(--color-fg)] text-right whitespace-nowrap">
        {formatPrice(track.price, lang)}
      </span>
    </li>
  );
}
