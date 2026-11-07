import * as React from "react";
import { Apple, Rss, Download } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";
import type { SongOfLiberationContent } from "@/lib/content/home";

type Props = {
  content: SongOfLiberationContent;
  lang?: Lang;
};

export function SongOfLiberation({ content, lang = "en" }: Props) {
  const story = lang === "es" ? content.storyEs : content.storyEn;
  const altStory = lang === "es" ? content.storyEn : content.storyEs;

  return (
    <section
      className="relative isolate bg-(--color-bg-warm) section-atmospheric py-24 lg:py-32 overflow-hidden border-t border-black"
      aria-label={t(content.title, lang)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/photos/francisco-singing-protest.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: "center 35%" }}
        loading="lazy"
      />
      {/* Warm-tobacco scrim — same recipe as /epk Bio section. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#2a2318]/85" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-6 lg:left-12 lg:top-10 z-0 select-none"
      >
        <p className="font-signature text-8xl lg:text-[10rem] text-(--color-muted-brand)/30 -rotate-12 leading-none">
          {t(content.watermark, lang)}
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-(--container-content) px-6">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-(--color-accent-brand) mb-3 inline-block">
            {t(content.eyebrow, lang)}
          </span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-(--color-fg) uppercase tracking-tight leading-[0.95]">
            {t(content.title, lang)}
            <span className="italic font-light text-(--color-accent-brand)">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image with gold-bordered frame */}
          <figure className="relative">
            <div className="border border-(--color-accent-brand)/40 p-2 [filter:drop-shadow(0_30px_40px_rgba(0,0,0,0.55))]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.image}
                alt={t(content.imageAlt, lang)}
                className="w-full h-72 sm:h-96 lg:h-[34rem] object-cover object-[center_20%]"
                loading="lazy"
              />
            </div>
          </figure>

          {/* Text + audio + quote */}
          <div>
            <blockquote className="border-l-2 border-(--color-accent-brand) pl-6 mb-8">
              <p className="font-signature text-3xl sm:text-4xl lg:text-5xl text-(--color-fg) leading-snug mb-3">
                {t(content.quote, lang)}
              </p>
              <cite className="not-italic font-heading text-xs uppercase tracking-[0.25em] text-(--color-accent-brand)">
                {t(content.quoteAttribution, lang)}
              </cite>
            </blockquote>

            <div className="space-y-4 text-(--color-fg)/85 text-base lg:text-lg leading-relaxed mb-6">
              {story.map((para, i) => (
                <p key={`primary-${i}`}>{para}</p>
              ))}
            </div>
            <details className="mb-8 group">
              <summary className="cursor-pointer font-heading text-xs uppercase tracking-[0.2em] text-(--color-accent-brand) hover:underline">
                {lang === "en" ? "Read in Spanish" : "Leer en inglés"}
              </summary>
              <div className="mt-4 space-y-4 text-(--color-muted-brand) text-sm lg:text-base leading-relaxed">
                {altStory.map((para, i) => (
                  <p key={`alt-${i}`}>{para}</p>
                ))}
              </div>
            </details>

            {/* Audio player block */}
            <div className="border border-(--color-border-brand) p-5 mb-4">
              <div className="flex items-baseline justify-between mb-3 gap-4">
                <h3 className="font-heading text-lg text-(--color-fg)">
                  {t(content.song.title, lang)}
                </h3>
                <span className="text-xs uppercase tracking-[0.2em] text-(--color-accent-brand) shrink-0">
                  {content.song.duration}
                </span>
              </div>
              <audio
                controls
                preload="metadata"
                src={content.song.audioSrc}
                className="w-full"
                aria-label={t(content.song.title, lang)}
              >
                {lang === "en"
                  ? "Your browser does not support the audio element."
                  : "Tu navegador no soporta el elemento de audio."}
              </audio>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-xs uppercase tracking-[0.18em]">
                {content.song.iTunesHref && (
                  <a
                    href={content.song.iTunesHref}
                    className="inline-flex items-center gap-1.5 text-(--color-accent-brand) hover:text-(--color-fg) transition-colors"
                  >
                    <Apple className="size-3.5" aria-hidden="true" />
                    {lang === "en" ? "iTunes" : "iTunes"}
                  </a>
                )}
                {content.song.rssHref && (
                  <a
                    href={content.song.rssHref}
                    className="inline-flex items-center gap-1.5 text-(--color-accent-brand) hover:text-(--color-fg) transition-colors"
                  >
                    <Rss className="size-3.5" aria-hidden="true" />
                    {lang === "en" ? "RSS Feed" : "RSS"}
                  </a>
                )}
                {content.song.downloadHref && (
                  <a
                    href={content.song.downloadHref}
                    className="inline-flex items-center gap-1.5 text-(--color-accent-brand) hover:text-(--color-fg) transition-colors"
                  >
                    <Download className="size-3.5" aria-hidden="true" />
                    {lang === "en" ? "Download" : "Descargar"}
                  </a>
                )}
              </div>
            </div>

            <p className="font-heading text-xs uppercase tracking-[0.2em] text-(--color-muted-brand)">
              {t(content.date, lang)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
