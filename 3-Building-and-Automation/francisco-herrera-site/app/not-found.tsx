import * as React from "react";
import NextLink from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { t, type Localized } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";

// Custom 404 — reuses the brand surface so a mistyped URL still feels like
// the site, not a server-default page. Single dark hero with a Francisco
// photo, signature script title in gold, and two CTAs back into the site.

const COPY: Record<string, Localized> = {
  eyebrow: { en: "404 / Page not found", es: "404 / Página no encontrada" },
  title: { en: "Lost on the road", es: "Perdido en el camino" },
  body: {
    en: "The page you're looking for has wandered off — but the music hasn't. Try one of these instead.",
    es: "La página que buscas se ha extraviado — pero la música sigue. Prueba una de estas.",
  },
  home: { en: "Home", es: "Inicio" },
  blog: { en: "Read the blog", es: "Leer el blog" },
};

export default async function NotFound() {
  const lang = await getLang();

  return (
    <>
      <Header lang={lang} />
      <main>
        <section
          className="relative isolate overflow-hidden min-h-[80vh] flex items-center"
          aria-label="Page not found"
        >
          {/* Background image — same rally photo used as the default hero
              elsewhere, so the page reads as part of the site even on a
              dead URL. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/photos/francisco-singing-protest.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
            loading="eager"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/55" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 [background:linear-gradient(to_right,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.30)_15%,rgba(0,0,0,0.10)_38%,rgba(0,0,0,0.05)_62%,rgba(0,0,0,0.25)_88%,rgba(0,0,0,0.50)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 [background:radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.22)_55%,transparent_85%)]"
          />

          {/* Faint signature watermark in the top-right corner — matches the
              other dark hero pages on the site. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-6 lg:right-12 lg:top-10 z-0 select-none"
          >
            <p className="font-signature text-7xl lg:text-9xl text-[var(--color-accent-brand)]/35 -rotate-12 leading-none [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              404
            </p>
          </div>

          <div className="relative z-10 mx-auto max-w-[var(--container-content)] px-6 text-center">
            <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-white mb-4 inline-block">
              {t(COPY.eyebrow, lang)}
            </span>
            <h1 className="font-signature text-5xl sm:text-6xl lg:text-7xl text-[var(--color-accent-brand)] mb-6 leading-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
              {t(COPY.title, lang)}
            </h1>
            <p className="text-white/85 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-10 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
              {t(COPY.body, lang)}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <NextLink
                href="/"
                className="inline-flex items-center gap-2 font-ui font-semibold text-xs uppercase tracking-[0.2em] bg-[var(--color-accent-brand)] text-[var(--color-bg)] hover:bg-[var(--color-fg)] transition-colors px-7 py-3"
              >
                {t(COPY.home, lang)}
              </NextLink>
              <NextLink
                href="/blog/song-of-liberation"
                className="inline-flex items-center gap-2 font-ui font-semibold text-xs uppercase tracking-[0.2em] border border-[var(--color-accent-brand)]/60 text-white hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent-brand)] transition-colors px-7 py-3"
              >
                {t(COPY.blog, lang)}
              </NextLink>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
