// Guitare source: sections/home-featured-blog.liquid
// - ".dt-sc-blog-section" + ".dt-sc-blog-item" lines 1-324
// - Per item: image / meta (date/author/tags) / title / excerpt / read-more (98-150)
// - Demo (templates/index.json): bg image, 4-col grid, overlay_color #e2a53f at
//   overlay_opacity 0.5 — the visual signature of this section.
// - CSS: dt-framework.css .dt-sc-blog-section lines 812-894

import * as React from "react";
import NextLink from "next/link";
import { Calendar } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";
import type { FeaturedBlogContent } from "@/lib/content/home";

type Props = {
  content: FeaturedBlogContent;
  lang?: Lang;
};

export function FeaturedBlog({ content, lang = "en" }: Props) {
  return (
    <section
      className="relative w-full bg-[var(--color-bg-warm)] section-atmospheric overflow-hidden py-20 lg:py-24 border-t border-black"
      aria-label={t(content.title, lang)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={content.background}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Gold overlay #e2a53f @ 0.5 — Guitare visual signature (templates/index.json overlay_color, overlay_opacity 0.5) */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundColor: "var(--color-overlay-brand)" }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/40" />

      <div className="relative mx-auto max-w-[var(--container-content)] px-6">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="font-ui font-semibold text-xs uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-3 inline-block">
            {t(content.eyebrow, lang)}
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl !text-[var(--color-fg)] uppercase tracking-tight leading-[0.95]">
            {t(content.title, lang)}
            <span className="italic font-light text-[var(--color-accent-brand)]">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {content.posts.map((post) => (
            <article
              key={post.id}
              className="group bg-[var(--color-bg)] flex flex-col h-full"
            >
              <NextLink
                href={post.href}
                className="relative block aspect-[3/2] overflow-hidden bg-black"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={t(post.title, lang)}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </NextLink>
              <div className="p-5 flex flex-col grow">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent-brand)] mb-3">
                  <Calendar className="size-3" aria-hidden="true" />
                  <span>{t(post.date, lang)}</span>
                </div>
                <h3 className="font-heading text-lg !text-[var(--color-fg)] mb-2 leading-snug group-hover:text-[var(--color-accent-brand)] transition-colors">
                  <NextLink href={post.href}>{t(post.title, lang)}</NextLink>
                </h3>
                <p className="text-sm text-[var(--color-muted-brand)] leading-relaxed mb-4 grow">
                  {t(post.excerpt, lang)}
                </p>
                <NextLink
                  href={post.href}
                  className="font-heading text-xs uppercase tracking-[0.2em] text-[var(--color-accent-brand)] hover:text-[var(--color-fg)] transition-colors self-start border-b border-transparent hover:border-[var(--color-fg)] pb-1"
                >
                  {lang === "en" ? "READ MORE →" : "LEER MÁS →"}
                </NextLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
