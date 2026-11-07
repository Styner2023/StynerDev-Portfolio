import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { t, type Lang, type Localized } from "@/lib/i18n";

const COMING_SOON: Localized = {
  en: "Coming soon",
  es: "Próximamente",
};

type StubPageProps = {
  title: Localized;
  /** Optional second-line context (e.g. "Album: honor-migrante"). */
  detail?: string;
  lang?: Lang;
  /** Optional hero image — when present, renders a full hero section
   *  above the stub body (signature title + side-vignette + atmospheric
   *  overlay). Falls back to the title-only stub layout when omitted. */
  heroImage?: string;
  /** Optional bilingual page intro shown beneath the hero title. */
  intro?: Localized;
  /** Optional decorative cursive watermark word for the hero corner. */
  watermark?: Localized;
  /** Optional `object-position` keyword to anchor the hero image
   *  (e.g. "top", "center 30%"). Defaults to "center". */
  imagePosition?: string;
};

/**
 * Shared placeholder body for every non-home route in this foundation pass.
 * Renders Header + Footer + (optionally) a hero with image + signature
 * title + the page name + "Coming soon / Próximamente" via t().
 */
export function StubPage({
  title,
  detail,
  lang = "en",
  heroImage,
  intro,
  watermark,
  imagePosition = "center",
}: StubPageProps) {
  return (
    <>
      <Header lang={lang} />
      <main>
        {heroImage ? (
          // Full hero treatment — image with side-vignette + atmospheric
          // overlays + signature title + bilingual eyebrow.
          <section
            className="relative isolate overflow-hidden pt-32 lg:pt-44 pb-20 lg:pb-28 min-h-[55vh] lg:min-h-[60vh] flex items-center"
            aria-label={t(title, lang)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 -z-10 h-full w-full object-cover"
              style={{ objectPosition: imagePosition }}
              loading="eager"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/15" />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 [background:linear-gradient(to_right,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.30)_15%,rgba(0,0,0,0.10)_38%,rgba(0,0,0,0.05)_62%,rgba(0,0,0,0.25)_88%,rgba(0,0,0,0.50)_100%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 [background:radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.22)_55%,transparent_85%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-[var(--color-bg)]"
            />

            {watermark && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-6 lg:right-12 lg:top-10 z-0 select-none"
              >
                <p className="font-signature text-7xl lg:text-9xl text-[var(--color-accent-brand)]/35 -rotate-12 leading-none [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
                  {t(watermark, lang)}
                </p>
              </div>
            )}

            <div className="relative z-10 mx-auto max-w-[var(--container-content)] px-6 text-center w-full">
              <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-white mb-3 inline-block">
                {t(title, "en")}
                {t(title, "en") !== t(title, "es") ? ` / ${t(title, "es")}` : ""}
              </span>
              <h1 className="font-signature text-5xl sm:text-6xl lg:text-7xl text-[var(--color-accent-brand)] mb-5 leading-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
                {t(title, lang)}
              </h1>
              {intro && (
                <p className="text-white/90 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
                  {t(intro, lang)}
                </p>
              )}
            </div>
          </section>
        ) : null}

        <Section className={[heroImage ? "min-h-[40vh]" : "min-h-[60vh]", "section-atmospheric"].join(" ")}>
          <div className="flex flex-col items-start max-w-2xl">
            {!heroImage && (
              <>
                <span className="font-heading text-xs uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-6">
                  {t(title, "en")}
                  {t(title, "en") !== t(title, "es") ? ` / ${t(title, "es")}` : ""}
                </span>
                <Heading level={1} tone="fg" className="!text-4xl md:!text-5xl mb-6 font-light">
                  {t(title, lang)}
                </Heading>
              </>
            )}
            {detail ? (
              <p className="text-[var(--color-muted-brand)] mb-4 font-mono text-sm">{detail}</p>
            ) : null}
            <p className="text-[var(--color-fg)]/80">
              {t(COMING_SOON, lang)} / {t(COMING_SOON, lang === "en" ? "es" : "en")}
            </p>
          </div>
        </Section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
