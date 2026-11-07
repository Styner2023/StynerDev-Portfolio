import * as React from "react";
import { Quote } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";
import type { PullQuoteContent } from "@/lib/content/home";

type Props = {
  content: PullQuoteContent;
  lang?: Lang;
};

export function PullQuote({ content, lang = "en" }: Props) {
  const hasImage = !!content.image;

  return (
    <section
      className="relative bg-[var(--color-bg-deeper)] section-atmospheric py-24 lg:py-32 border-t border-black overflow-hidden"
      aria-label={t(content.attribution, lang)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-6 lg:right-20 lg:top-10 z-0 select-none"
      >
        <p className="font-signature text-8xl lg:text-[10rem] text-[var(--color-accent-brand)]/25 -rotate-12 leading-none">
          {t(content.watermark, lang)}
        </p>
      </div>

      <div
        className={[
          "relative z-10 mx-auto px-6",
          hasImage
            ? "max-w-[var(--container-content)] grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-center"
            : "max-w-4xl text-center",
        ].join(" ")}
      >
        {hasImage && content.image && (
          <figure className="mx-auto md:mx-0 shrink-0">
            <div className="border border-[var(--color-accent-brand)]/40 p-2 [filter:drop-shadow(0_30px_40px_rgba(0,0,0,0.55))]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.image}
                alt={content.imageAlt ? t(content.imageAlt, lang) : t(content.attribution, lang)}
                className="w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 object-cover"
                loading="lazy"
              />
            </div>
          </figure>
        )}

        <div className={hasImage ? "text-center md:text-left" : "text-center"}>
          <Quote
            aria-hidden="true"
            className={[
              "size-10 lg:size-14 mb-6 text-[var(--color-accent-brand)]",
              hasImage ? "mx-auto md:mx-0" : "mx-auto",
            ].join(" ")}
            strokeWidth={1.25}
          />
          <blockquote>
            <p className="font-signature text-3xl sm:text-4xl lg:text-5xl text-[var(--color-fg)] leading-snug mb-8">
              &ldquo;{t(content.primaryQuote, lang)}&rdquo;
            </p>
            <div
              aria-hidden="true"
              className={[
                "h-px w-24 bg-gradient-to-r from-transparent via-[var(--color-accent-brand)]/60 to-transparent mb-8",
                hasImage ? "mx-auto md:mx-0" : "mx-auto",
              ].join(" ")}
            />
            <p className="text-[var(--color-fg)]/70 text-base sm:text-lg italic leading-relaxed mb-10 max-w-2xl mx-auto md:mx-0">
              &ldquo;{t(content.secondaryQuote, lang)}&rdquo;
            </p>
          </blockquote>
          <cite className="not-italic block">
            <span className="font-heading text-sm sm:text-base uppercase tracking-[0.25em] text-[var(--color-accent-brand)]">
              {t(content.attribution, lang)}
            </span>
            <span className="block mt-2 font-heading text-xs uppercase tracking-[0.2em] text-[var(--color-muted-brand)]">
              {t(content.attributionDetail, lang)}
            </span>
          </cite>
        </div>
      </div>
    </section>
  );
}
