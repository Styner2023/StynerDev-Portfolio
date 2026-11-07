"use client";

import * as React from "react";
import NextLink from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { FileText, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";
import { buttonVariants } from "@/components/ui/button";
import type { GridBannerContent, GridBannerCard, AlbumTrack } from "@/lib/content/home";

type Props = {
  content: GridBannerContent;
  lang?: Lang;
};

export function GridBanner({ content, lang = "en" }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);

  React.useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    update();
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  const scrollTo = React.useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      className="relative w-full overflow-hidden py-14 lg:py-16"
      aria-label={t(content.title, lang)}
    >
      {/* Looping background video — muted + autoplay + playsInline so it
          works across mobile/desktop without needing user interaction.
          The static `content.background` image stays as the poster so the
          frame is filled while the video buffers. */}
      <video
        src="/video/1.mp4"
        poster={content.background}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Match homepage hero treatment: light uniform tint + symmetric side-vignette */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/15" />
      <div
        aria-hidden="true"
        className="absolute inset-0 [background:linear-gradient(to_right,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.30)_15%,rgba(0,0,0,0.10)_38%,rgba(0,0,0,0.05)_62%,rgba(0,0,0,0.25)_88%,rgba(0,0,0,0.50)_100%)]"
      />

      <div className="relative mx-auto max-w-[var(--container-content)] px-6">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <span className="font-ui font-semibold text-xs uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-3 inline-block">
            {t(content.eyebrow, lang)}
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl !text-[var(--color-fg)] uppercase tracking-tight leading-[0.95]">
            {lang === "en" ? "Three albums" : "Tres álbumes"}
            <br />
            <span className="italic font-light text-[var(--color-accent-brand)]">
              {lang === "en" ? "to start with." : "para comenzar."}
            </span>
          </h2>
        </div>

        {/* Album title tabs — click to jump directly to an album */}
        {content.cards.length > 1 && (
          <div
            role="tablist"
            aria-label={lang === "en" ? "Choose an album" : "Elige un álbum"}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8"
          >
            {content.cards.map((card, i) => {
              const active = i === selectedIndex;
              return (
                <button
                  key={card.id}
                  type="button"
                  role="tab"
                  {...(active ? { "aria-selected": "true" as const } : { "aria-selected": "false" as const })}
                  onClick={() => scrollTo(i)}
                  className={[
                    "px-4 sm:px-5 py-2 font-heading text-xs uppercase tracking-[0.18em] border transition-colors max-w-[16rem] truncate",
                    active
                      ? "bg-[var(--color-accent-brand)] text-[var(--color-bg)] border-[var(--color-accent-brand)] [text-shadow:none]"
                      : "bg-black/45 backdrop-blur-sm text-white border-[var(--color-accent-brand)]/50 hover:bg-black/60 hover:border-[var(--color-accent-brand)] [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]",
                  ].join(" ")}
                >
                  {t(card.title, lang)}
                </button>
              );
            })}
          </div>
        )}

        {/* Embla carousel — single full-width card visible at a time */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {content.cards.map((card) => (
                <div
                  key={card.id}
                  className="shrink-0 grow-0 basis-full min-w-0"
                  role="tabpanel"
                >
                  <AlbumRow card={card} lang={lang} />
                </div>
              ))}
            </div>
          </div>

          {/* Prev/Next — desktop side arrows for cleaner mobile experience */}
          {content.cards.length > 1 && (
            <>
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canPrev}
                aria-label={lang === "en" ? "Previous album" : "Álbum anterior"}
                className="hidden lg:inline-flex absolute -left-4 top-1/3 -translate-y-1/2 h-12 w-12 items-center justify-center bg-[var(--color-card-bg)] text-[var(--color-fg)] border border-[var(--color-accent-brand)]/40 hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent-brand)] transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                disabled={!canNext}
                aria-label={lang === "en" ? "Next album" : "Siguiente álbum"}
                className="hidden lg:inline-flex absolute -right-4 top-1/3 -translate-y-1/2 h-12 w-12 items-center justify-center bg-[var(--color-card-bg)] text-[var(--color-fg)] border border-[var(--color-accent-brand)]/40 hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent-brand)] transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        {/* Dot indicators + page-of count — works on any viewport */}
        {content.cards.length > 1 && (
          <div className="flex flex-col items-center gap-3 mt-6">
            <div className="flex items-center gap-2.5">
              {content.cards.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollTo(i)}
                  aria-label={`${lang === "en" ? "Album" : "Álbum"} ${i + 1}`}
                  aria-current={i === selectedIndex ? "true" : undefined}
                  className={[
                    "h-2.5 w-2.5 rounded-full border transition-all",
                    i === selectedIndex
                      ? "bg-[var(--color-accent-brand)] border-[var(--color-accent-brand)] scale-110"
                      : "bg-transparent border-[var(--color-fg)]/50 hover:border-[var(--color-accent-brand)]",
                  ].join(" ")}
                />
              ))}
            </div>
            <p className="font-heading text-[10px] uppercase tracking-[0.25em] text-[var(--color-muted-brand)]">
              {lang === "en" ? "Album" : "Álbum"} {selectedIndex + 1} {lang === "en" ? "of" : "de"} {content.cards.length}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// Keep this matched to the Tailwind `duration-*` utility used on the modal
// elements below, so the unmount timeout fires after the exit transition.
const TRANSITION_MS = 200;

function AlbumRow({ card, lang }: { card: GridBannerCard; lang: Lang }) {
  // `mounted` controls DOM presence; `visible` drives the open/close animation.
  // Splitting them lets the exit transition complete before unmount.
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const hasMore = !!card.fullDescription && card.fullDescription.length > 0;

  const openStory = React.useCallback(() => {
    setMounted(true);
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const closeStory = React.useCallback(() => {
    setVisible(false);
    window.setTimeout(() => setMounted(false), TRANSITION_MS);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeStory();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mounted, closeStory]);

  return (
    <article className="bg-[var(--color-card-bg)]/80 backdrop-blur-sm border border-[var(--color-border-brand)] hover:border-[var(--color-accent-brand)] transition-colors p-5 lg:p-7">
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 lg:gap-10">
        {/* Left: cover + title + price + buy CTA */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="aspect-square w-full max-w-[220px] flex items-center justify-center mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image}
              alt={t(card.title, lang)}
              className="h-full w-full object-contain [filter:drop-shadow(0_18px_22px_rgba(0,0,0,0.6))_drop-shadow(0_6px_10px_rgba(0,0,0,0.45))]"
              loading="lazy"
            />
          </div>
          <h3 className="font-heading text-xl lg:text-2xl !text-white mb-1 font-normal">
            {t(card.title, lang)}
          </h3>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-brand)] mb-4">
            {t(card.series, lang)}
          </p>
          <p className="text-base mb-5 flex items-baseline gap-2 flex-wrap justify-center lg:justify-start">
            {card.originalPrice && (
              <span className="text-[var(--color-muted-brand)] line-through text-sm">
                {t(card.originalPrice, lang)}
              </span>
            )}
            <span className="text-[var(--color-fg)] font-heading">{t(card.price, lang)}</span>
          </p>
          <NextLink
            href={card.cta.href}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            {t(card.cta.label, lang)}
          </NextLink>
        </div>

        {/* Right: description + featured player + track listing */}
        <div>
          <p className="text-[var(--color-fg)]/85 text-sm lg:text-base leading-relaxed mb-3">
            {t(card.description, lang)}
          </p>
          {hasMore ? (
            <button
              type="button"
              onClick={openStory}
              className="mb-4 font-heading text-xs uppercase tracking-[0.2em] text-[var(--color-accent-brand)] hover:underline"
            >
              {lang === "en" ? "Read more →" : "Leer más →"}
            </button>
          ) : (
            <div className="mb-4" />
          )}

          {/* Featured track player */}
          <div className="border border-[var(--color-border-brand)] p-3 mb-4">
            <div className="flex items-baseline justify-between mb-2 gap-4">
              <p className="font-heading text-sm uppercase tracking-[0.18em] text-[var(--color-fg)]">
                {card.featuredTrack.title}
              </p>
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent-brand)] shrink-0">
                {card.featuredTrack.duration}
              </span>
            </div>
            {card.featuredTrack.audioSrc ? (
              <audio
                controls
                preload="metadata"
                src={card.featuredTrack.audioSrc}
                className="w-full"
                aria-label={card.featuredTrack.title}
              >
                {lang === "en"
                  ? "Your browser does not support the audio element."
                  : "Tu navegador no soporta el elemento de audio."}
              </audio>
            ) : (
              <p className="text-xs text-[var(--color-muted-brand)] italic py-2">
                {lang === "en"
                  ? "Audio preview coming soon."
                  : "Vista previa de audio próximamente."}
              </p>
            )}
          </div>

          {/* Track listing */}
          <ol className="border-t border-[var(--color-border-brand)]">
            {card.tracks.map((track) => (
              <TrackRow key={track.number} track={track} lang={lang} />
            ))}
          </ol>
        </div>
      </div>

      {/* Read-more story modal */}
      {mounted && card.fullDescription && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t(card.title, lang)}
          className={[
            "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 transition-[background-color,opacity] duration-200 ease-out",
            visible ? "bg-black/85 opacity-100" : "bg-black/0 opacity-0 pointer-events-none",
          ].join(" ")}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeStory();
          }}
        >
          <div
            className={[
              "relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[var(--color-card-bg)] border border-[var(--color-accent-brand)]/40 p-8 lg:p-12",
              "transition-[transform,opacity] duration-200 ease-out",
              visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2",
            ].join(" ")}
          >
            <button
              type="button"
              onClick={closeStory}
              className="absolute top-4 right-4 inline-flex items-center px-5 py-2 font-heading text-xs uppercase tracking-[0.25em] text-[var(--color-accent-brand)] border border-[var(--color-accent-brand)]/50 hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent-brand)] transition-colors"
            >
              {lang === "en" ? "Close / Cerrar" : "Cerrar / Close"}
            </button>
            <div className="flex items-start gap-4 mb-6 pr-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt=""
                aria-hidden="true"
                className="w-16 h-16 object-contain shrink-0"
              />
              <div>
                <h3 className="font-heading text-xl lg:text-2xl !text-white mb-1 font-normal">
                  {t(card.title, lang)}
                </h3>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-brand)]">
                  {t(card.series, lang)}
                </p>
              </div>
            </div>
            <div className="space-y-4 text-[var(--color-fg)]/90 text-sm lg:text-base leading-relaxed">
              <p>{t(card.description, lang)}</p>
              {card.fullDescription.map((para, i) => (
                <p key={i}>{t(para, lang)}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

function TrackRow({ track, lang }: { track: AlbumTrack; lang: Lang }) {
  const isFree = track.price?.toLowerCase() === "free";
  return (
    <li className="grid grid-cols-[2.5rem_1fr_auto_auto] items-center gap-3 py-1.5 border-b border-[var(--color-border-brand)] text-sm">
      <span className="font-heading text-xs text-[var(--color-muted-brand)] tabular-nums">
        {String(track.number).padStart(2, "0")}
      </span>
      <span className="text-[var(--color-fg)] truncate">{track.title}</span>
      <div className="flex items-center gap-2 text-xs text-[var(--color-muted-brand)]">
        {track.lyricsHref && (
          <a
            href={track.lyricsHref}
            className="inline-flex items-center gap-1 text-[var(--color-accent-brand)] hover:underline uppercase tracking-[0.15em]"
            aria-label={`${lang === "en" ? "Lyrics for" : "Letra de"} ${track.title}`}
          >
            <FileText className="size-3" aria-hidden="true" />
            {lang === "en" ? "Lyrics" : "Letra"}
          </a>
        )}
        {track.infoHref && (
          <a
            href={track.infoHref}
            className="inline-flex items-center gap-1 text-[var(--color-accent-brand)] hover:underline uppercase tracking-[0.15em]"
            aria-label={`${lang === "en" ? "Info on" : "Info de"} ${track.title}`}
          >
            <Info className="size-3" aria-hidden="true" />
            Info
          </a>
        )}
        <span className="font-heading tabular-nums shrink-0">{track.duration}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0 min-w-[5rem] justify-end">
        {track.originalPrice && (
          <span className="text-xs text-[var(--color-muted-brand)] line-through">
            {track.originalPrice}
          </span>
        )}
        {track.price && (
          <span
            className={[
              "font-heading text-xs uppercase tracking-[0.15em] px-2 py-1",
              isFree
                ? "text-[var(--color-accent-brand)] border border-[var(--color-accent-brand)]/40"
                : "text-[var(--color-fg)] bg-[var(--color-accent-brand)]/15",
            ].join(" ")}
          >
            {track.price}
          </span>
        )}
      </div>
    </li>
  );
}
