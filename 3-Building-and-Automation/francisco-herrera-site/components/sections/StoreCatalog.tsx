"use client";

import * as React from "react";
import NextLink from "next/link";
import { Share2 } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";
import type { StoreContent, StoreProduct, Money } from "@/lib/content/store";

type Props = {
  content: StoreContent["catalog"];
  lang?: Lang;
};

function formatMoney(m: Money) {
  const fixed = m.amount % 1 === 0 ? m.amount.toFixed(0) : m.amount.toFixed(2);
  return `$${fixed}`;
}

export function StoreCatalog({ content, lang = "en" }: Props) {
  return (
    <section
      className="relative isolate overflow-hidden bg-[var(--color-bg)] section-atmospheric py-24 lg:py-32 border-t border-[var(--color-border-brand)]"
      aria-label={t(content.title, lang)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/photos/4.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: "center 30%" }}
        loading="lazy"
      />
      {/* Black scrim — same recipe as /booking DIRECT section. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#0f0f0f]/55" />
      {/* Silently-script side watermark — same recipe as other section
          watermarks across the site (Salas, Archivo, Escenarios, etc.). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-6 lg:left-12 lg:top-10 z-0 select-none"
      >
        <p className="font-signature text-8xl lg:text-[10rem] text-[var(--color-accent-brand)]/25 -rotate-12 leading-none [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
          Catálogo
        </p>
      </div>
      <div className="relative z-10 mx-auto max-w-[var(--container-content)] px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-3 inline-block">
            {t(content.eyebrow, lang)}
          </span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] uppercase tracking-tight leading-[0.95]">
            {lang === "en" ? "All albums" : "Todos los álbumes"}
            <br />
            <span className="italic font-light text-[var(--color-accent-brand)]">
              {lang === "en" ? "& downloads." : "y descargas."}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {content.items.map((item) => (
            <ProductCard key={item.id} item={item} content={content} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  item,
  content,
  lang,
}: {
  item: StoreProduct;
  content: StoreContent["catalog"];
  lang: Lang;
}) {
  const onSale = item.salePrice !== undefined;
  const isOut = item.outOfStock === true;
  const href = `/store/${item.slug}`;

  return (
    <article className="group flex flex-col bg-[var(--color-card-bg)] border border-[var(--color-border-brand)] hover:border-[var(--color-accent-brand)] transition-colors">
      <NextLink href={href} className="relative block aspect-square overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={t(item.imageAlt, lang)}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {onSale && !isOut && (
          <span className="absolute top-3 left-3 bg-[var(--color-accent-brand)] text-[var(--color-bg)] font-heading text-[10px] uppercase tracking-[0.2em] px-2.5 py-1">
            {t(content.sale, lang)}
          </span>
        )}
        {isOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/55">
            <span className="font-heading text-xs uppercase tracking-[0.3em] text-[var(--color-fg)] border border-[var(--color-fg)] px-4 py-2">
              {t(content.outOfStock, lang)}
            </span>
          </div>
        )}
      </NextLink>

      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-heading text-base lg:text-lg text-[var(--color-fg)] mb-3 leading-snug group-hover:text-[var(--color-accent-brand)] transition-colors">
          <NextLink href={href}>{t(item.title, lang)}</NextLink>
        </h3>

        <p className="text-sm text-[var(--color-muted-brand)] leading-relaxed mb-5 line-clamp-4">
          {t(item.description, lang)}{" "}
          <NextLink
            href={href}
            className="text-[var(--color-accent-brand)] hover:underline font-heading uppercase tracking-[0.15em] text-[11px] ml-0.5"
          >
            {lang === "en" ? "Read more" : "Leer más"}
          </NextLink>
        </p>

        <div className="mt-auto">
          <div className="flex items-baseline gap-3 mb-4">
            {onSale ? (
              <>
                <span className="font-heading text-sm text-[var(--color-muted-brand)] line-through">
                  {formatMoney(item.price)}
                </span>
                <span className="font-heading text-lg text-[var(--color-accent-brand)]">
                  {formatMoney(item.salePrice!)}
                </span>
              </>
            ) : (
              <span className="font-heading text-lg text-[var(--color-fg)]">
                {formatMoney(item.price)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isOut ? (
              <button
                type="button"
                disabled
                className="flex-1 inline-flex items-center justify-center px-5 py-3 font-heading text-xs uppercase tracking-[0.2em] border border-[var(--color-border-brand)] text-[var(--color-muted-brand)]/70 cursor-not-allowed"
              >
                {t(content.outOfStock, lang)}
              </button>
            ) : (
              <NextLink
                href={href}
                className="flex-1 inline-flex items-center justify-center px-5 py-3 font-heading text-xs uppercase tracking-[0.2em] border border-[var(--color-accent-brand)] text-[var(--color-fg)] hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] transition-colors"
              >
                {t(content.addToCart, lang)}: {formatMoney(item.salePrice ?? item.price)}
              </NextLink>
            )}
            <button
              type="button"
              aria-label={t(content.share, lang)}
              className="inline-flex items-center justify-center w-11 h-11 border border-[var(--color-border-brand)] text-[var(--color-fg)] hover:border-[var(--color-accent-brand)] hover:text-[var(--color-accent-brand)] transition-colors"
            >
              <Share2 className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
