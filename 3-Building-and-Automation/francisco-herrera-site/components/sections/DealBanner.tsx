// Guitare source: sections/home-deal-banner.liquid
// - Wrapper "dt-sc-section-wrapper" with optional bg image lines 1-78
// - Inner ".dt-sc-deal-banner-section" 75% desktop / 100% mobile (line 115)
// - Content: subtitle (gold) / title / description / CTA (lines 42-50, 68)
// - Schema: heading default "Deal banner" (line 478), subtitle/desc/CTA defaults
// CSS reference: dt-custom.css.liquid section-scoped.

import * as React from "react";
import NextLink from "next/link";
import { t, type Lang } from "@/lib/i18n";
import { buttonVariants } from "@/components/ui/button";
import type { DealBannerContent } from "@/lib/content/home";

type Props = {
  content: DealBannerContent;
  lang?: Lang;
};

export function DealBanner({ content, lang = "en" }: Props) {
  return (
    <section
      aria-label={t(content.title, lang)}
      className="relative isolate w-full bg-[var(--color-bg-deeper)] section-atmospheric overflow-hidden border-t border-black"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/photos/2.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: "center 15%" }}
        loading="lazy"
      />
      {/* Deeper-tobacco scrim — mirrors /epk Contact section. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#1f1b10]/85" />
      {/* Hard black divider with a centered gold accent — the band reads
          as a deliberate architectural line; the small gold rule in the
          middle adds an editorial flourish (chapter-break feel). */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-7 lg:h-9 bg-black z-10 flex items-center justify-center"
      >
        <span className="block h-px w-48 lg:w-72 bg-[var(--color-accent-brand)]" />
      </div>
      <div className="relative mx-auto max-w-[var(--container-content)] px-6 py-24 lg:py-28 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-4 inline-block">
            {t(content.eyebrow, lang)}
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl !text-[var(--color-fg)] mb-6 uppercase tracking-tight !leading-[0.95]">
            {lang === "en" ? "Music as" : "Música como"}
            <br />
            <span className="italic font-light text-[var(--color-accent-brand)]">
              {lang === "en" ? "public art." : "arte público."}
            </span>
          </h2>
          <p className="text-[var(--color-fg)]/85 text-base sm:text-lg mb-8 leading-relaxed">
            {t(content.body, lang)}
          </p>
          <NextLink
            href={content.cta.href}
            className={buttonVariants({ variant: "outline", size: "md" })}
          >
            {t(content.cta.label, lang)}
          </NextLink>
        </div>
      </div>
    </section>
  );
}
