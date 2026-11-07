"use client";

import * as React from "react";
import NextLink from "next/link";
import { t, type Lang } from "@/lib/i18n";
import type { FeaturedRelease, StoreContent } from "@/lib/content/store";

type Props = {
  content: StoreContent["featured"];
  lang?: Lang;
};

export function FeaturedReleases({ content, lang = "en" }: Props) {
  return (
    <section
      className="relative isolate overflow-hidden bg-(--color-bg-deeper) section-atmospheric py-24 lg:py-32"
      aria-label={t(content.title, lang)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/photos/1.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: "center 35%" }}
        loading="lazy"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#1f1b10]/85" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-10 lg:left-12 lg:top-16 z-0 select-none"
      >
        <p className="font-signature text-8xl lg:text-[10rem] text-(--color-muted-brand)/30 -rotate-12 leading-none">
          {lang === "en" ? "Albums" : "Álbumes"}
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-(--container-content) px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-(--color-accent-brand) mb-3 inline-block">
            {t(content.eyebrow, lang)}
          </span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-(--color-fg) uppercase tracking-tight leading-[0.95]">
            {lang === "en" ? "Three albums" : "Tres álbumes"}
            <br />
            <span className="italic font-light text-(--color-accent-brand)">
              {lang === "en" ? "to start with." : "para empezar."}
            </span>
          </h2>
        </div>

        <div className="space-y-24 lg:space-y-32">
          {content.releases.slice(0, 3).map((release, idx) => (
            <ReleaseRow key={release.id} release={release} reverse={idx % 2 === 1} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReleaseRow({
  release,
  reverse,
  lang,
}: {
  release: FeaturedRelease;
  reverse: boolean;
  lang: Lang;
}) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div className={reverse ? "md:order-2" : "md:order-1"}>
        <div className="mx-auto flex justify-center items-center">
          <div className="bg-black w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center border border-(--color-accent-brand)/40 [filter:drop-shadow(0_30px_40px_rgba(0,0,0,0.55))]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={release.image}
              alt={t(release.imageAlt, lang)}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className={reverse ? "md:order-1" : "md:order-2"}>
        {/* /epk-style split headline. If the title contains an em-dash
            (e.g. "Fuerza de la Raíz — Strength from the Roots"), split
            at the em-dash: head goes on line 1, italic gold tail on
            line 2. Otherwise append a trailing italic gold period —
            same fallback as every other section header on the site. */}
        {(() => {
          const full = t(release.title, lang);
          const idx = full.indexOf(" — ");
          if (idx >= 0) {
            const head = full.slice(0, idx) + " —";
            const tail = full.slice(idx + 3) + ".";
            return (
              <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-(--color-fg) mb-2 uppercase tracking-tight leading-[0.95]">
                {head}
                <br />
                <span className="italic font-light text-(--color-accent-brand)">
                  {tail}
                </span>
              </h3>
            );
          }
          return (
            <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-(--color-fg) mb-2 uppercase tracking-tight leading-[0.95]">
              {full}
              <span className="italic font-light text-(--color-accent-brand)">.</span>
            </h3>
          );
        })()}
        <p className="text-xs uppercase tracking-[0.18em] text-(--color-accent-brand) mb-6">
          {t(release.meta, lang)}
        </p>

        <div className="text-(--color-fg)/85 text-sm lg:text-base leading-relaxed mb-8">
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
                className="text-(--color-accent-brand) hover:underline text-sm font-heading uppercase tracking-[0.15em]"
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
                className="text-(--color-accent-brand) hover:underline ml-1 font-heading uppercase tracking-[0.15em] text-xs"
              >
                {lang === "en" ? "Read more" : "Leer más"}
              </button>
            </p>
          )}
        </div>

        <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-(--color-fg) mb-4">
          {lang === "en" ? "Album Details" : "Detalles del Álbum"}
        </h4>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm mb-8">
          {release.details.map((row, i) => (
            <div
              key={i}
              className="flex items-baseline gap-2 border-b border-(--color-border-brand) py-1.5"
            >
              <dt className="font-heading text-xs uppercase tracking-[0.15em] text-(--color-muted-brand) shrink-0">
                {t(row.label, lang)}:
              </dt>
              <dd className="text-(--color-fg)/85">{t(row.value, lang)}</dd>
            </div>
          ))}
        </dl>

        <NextLink
          href={release.cta.href}
          className="inline-flex items-center justify-center border border-(--color-accent-brand) px-8 py-3 font-heading text-xs uppercase tracking-[0.18em] text-(--color-fg) hover:bg-(--color-accent-brand) hover:text-(--color-bg) transition-colors"
        >
          {t(release.cta.label, lang)}
        </NextLink>
      </div>
    </div>
  );
}
