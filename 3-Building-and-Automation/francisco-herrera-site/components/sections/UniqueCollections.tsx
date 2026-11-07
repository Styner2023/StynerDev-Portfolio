import * as React from "react";
import NextLink from "next/link";
import { t, type Lang } from "@/lib/i18n";
import type { UniqueCollectionsContent } from "@/lib/content/home";

type Props = {
  content: UniqueCollectionsContent;
  lang?: Lang;
};

export function UniqueCollections({ content, lang = "en" }: Props) {
  return (
    <section
      className="relative bg-[var(--color-bg)] section-atmospheric pt-[120px] pb-[115px] overflow-hidden"
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
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-3 inline-block">
            {t(content.eyebrow, lang)}
          </span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] mb-5 uppercase tracking-tight leading-[0.95]">
            {lang === "en" ? "Our unique" : "Nuestras colecciones"}
            <br />
            <span className="italic font-light text-[var(--color-accent-brand)]">
              {lang === "en" ? "collections." : "únicas."}
            </span>
          </h2>
          <p className="text-[var(--color-muted-brand)] text-base lg:text-lg leading-relaxed">
            {t(content.description, lang)}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {content.albums.map((album) => (
            <div
              key={album.id}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-full mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={album.image}
                  alt={t(album.imageAlt, lang)}
                  className="h-[420px] sm:h-[460px] lg:h-[520px] w-auto object-contain mx-auto transition-all duration-500 ease-out [filter:drop-shadow(0_25px_30px_rgba(0,0,0,0.55))_drop-shadow(0_8px_12px_rgba(0,0,0,0.45))] group-hover:[filter:drop-shadow(0_35px_45px_rgba(0,0,0,0.65))_drop-shadow(0_0_30px_rgba(226,165,63,0.35))] group-hover:scale-[1.04] group-hover:brightness-110"
                  loading="lazy"
                />
              </div>
              <h3 className="font-heading text-xl lg:text-2xl text-[var(--color-fg)] mb-2 min-h-[3.5rem] flex items-center justify-center">
                {t(album.title, lang)}
              </h3>
              <p className="text-[var(--color-accent-brand)] text-lg font-medium mb-5">
                {t(album.price, lang)}
              </p>
              <NextLink
                href={album.cta.href}
                className="inline-flex items-center justify-center border border-[var(--color-accent-brand)] px-6 py-2.5 font-heading text-xs uppercase tracking-[0.18em] text-[var(--color-fg)] hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] transition-colors"
              >
                {t(album.cta.label, lang)}
              </NextLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
