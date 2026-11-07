import * as React from "react";
import NextLink from "next/link";
import { Headphones, Info, Play } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  EpkGallery,
  PRESS_PHOTO_CELLS,
  MOMENTS_CELLS,
} from "@/components/sections/EpkGallery";
import { homepageHighlights } from "@/lib/content/shows";
import { getLang } from "@/lib/i18n-server";

/**
 * EPK page — full structural clone of the Wes Webflow template
 * (~/Downloads/Projects/westones/, read-only). Eight sections:
 *   1. Hero            — sticky photo + tagline
 *   2. Bio             — photo bg + dark scrim, right-aligned editorial copy
 *   3. Recent Performances ("Live Dates") — date / city / venue list with dotted dividers
 *   4. Discography     — 6-album grid on warm tobacco
 *   5. Listen          — audio-player UI tied to franciscoherreramusic.com
 *   6. Gallery         — `<EpkGallery>` (already ported separately)
 *   7. CTA             — "Let's bring these songs to your stage."
 *   8. Contact         — three-column footer-style block
 *
 * Re-skinned in Francisco design tokens: gold #E2A53F, 3-tier dark
 * tobacco rotation, Silently script accents, Lora body, Manrope UI,
 * pale-gold hairline borders, zero border-radius.
 */

// Albums list mirrors /about discography for cross-page consistency.
const ALBUMS: { id: string; title: string; image: string }[] = [
  { id: "honor-migrante", title: "Honor Migrante", image: "/images/albums/Honor-Migrante.png" },
  { id: "fuerza-de-la-raiz", title: "Fuerza de la Raíz", image: "/images/albums/Fuerza-de-la-Raíz.png" },
  { id: "francisco-y-los-ninos", title: "Francisco y Los Niños", image: "/images/albums/Francisco-y-L@s-NIñ@s.png" },
  { id: "canta-y-juega", title: "Canta y Juega", image: "/images/albums/Canta-y-Juega.png" },
  { id: "nuestros-ninos-son-sagrado", title: "Nuestros Niños Son Sagrado", image: "/images/albums/Nuestros-Niños-Son-Sagrado.png" },
  { id: "posada-sin-fronteras", title: "Posada Sin Fronteras", image: "/images/albums/Posada-Sin-Fronteras.png" },
];

// Top 6 highlighted past events from the shared /lib/content/shows.ts
// data. Section is "Recent Performances" not "Upcoming" because the
// codebase has no upcoming-events array — this honors the absence-
// evidence rule. Date format mirrors westones: DD.MM.YYYY.
const RECENT_PERFORMANCES = homepageHighlights.slice(0, 6).map((e) => {
  const [y, m, d] = e.date.split("-");
  return {
    dateLabel: `${d}.${m}.${y}`,
    city:
      e.address?.split(",").slice(-2, -1)[0]?.trim() ||
      e.venue ||
      "—",
    venue: e.venue || "—",
    href: e.ticketUrl || "/shows",
  };
});

// "Featured: Amor Sin Papeles" track listing — mirrors the player UI
// on the /about page. Click-throughs go to franciscoherreramusic.com
// since the audio assets aren't migrated yet.
const FEATURED_TRACKS: { n: number; title: string; duration: string; price: string }[] = [
  { n: 1, title: "Amor Sin Papeles", duration: "4:14", price: "$0.75" },
  { n: 2, title: "Tambor", duration: "1:25", price: "$0.55" },
  { n: 3, title: "Madre Madre", duration: "4:23", price: "$0.50" },
  { n: 4, title: "Dicen Que", duration: "3:16", price: "$0.55" },
];

const LISTEN_HREF =
  "https://franciscoherreramusic.com/blog/blog/4229141/amor-sin-papeles--2";

export default async function EpkPage() {
  const lang = await getLang();

  return (
    <>
      <Header lang={lang} />
      <main>
        {/* Westones-style reveal-on-scroll fades. Same native-CSS pattern
            as EpkGallery's parallax: gated behind @supports + prefers-
            reduced-motion. `.epk-fade-up` slides up + fades in as the
            element enters the viewport; default state (no support /
            reduced motion) = static. Multiple ranges so headings reveal
            slightly faster than body. */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .epk-fade-up,
    .epk-fade-up-slow {
      animation-timeline: view();
      animation-fill-mode: both;
      animation-timing-function: linear;
    }
    .epk-fade-up      { animation-name: epk-fade-up; animation-range: entry 5% entry 50%; }
    .epk-fade-up-slow { animation-name: epk-fade-up; animation-range: entry 0% entry 70%; }
  }
}
@keyframes epk-fade-up {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0);   }
}
`,
          }}
        />
        {/* ─── 1. Hero — full-viewport photo + tagline ──────────────────
            Mirrors westones .section.hero in proportions and layering:
            100vh tall (with mobile floor), centered tagline + bilingual
            subtitle, dark warm-tobacco scrim over the photo. Westones'
            actual sticky-curtain reveal isn't ported — our site has a
            global Header that would overlap a sticky hero, and the
            visual impact (fullscreen photo + huge tagline) reads the
            same without the sticky mechanic. */}
        <section
          className="section-atmospheric relative isolate overflow-hidden min-h-[480px] sm:min-h-[640px] h-[72vh] sm:h-screen flex items-end pb-10 sm:pb-16 lg:pb-24 bg-[var(--color-bg-warm)]"
          aria-label="Electronic Press Kit — Francisco J. Herrera"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero/1.epk.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            style={{ objectPosition: "center 25%" }}
            loading="eager"
          />
          {/* Dark warm-tobacco scrim — same recipe as the westones hero. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#2a2318]/60" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 [background:radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.20)_55%,transparent_85%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-[var(--color-bg-warm)]"
          />

          {/* Cursive watermark in the corner (Francisco brand pattern). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-4 sm:right-4 sm:top-6 lg:right-12 lg:top-10 z-0 select-none"
          >
            <p className="font-signature text-5xl sm:text-7xl lg:text-9xl text-[var(--color-accent-brand)]/35 -rotate-12 leading-none [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              Prensa
            </p>
          </div>

          <div className="relative z-10 mx-auto max-w-[var(--container-content)] px-4 sm:px-6 text-center w-full epk-fade-up-slow">
            <span className="font-ui font-semibold text-[11px] sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.4em] text-white mb-3 sm:mb-4 inline-block">
              EPK / FRANCISCO J. HERRERA
            </span>
            <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-8xl text-[var(--color-fg)] mb-5 sm:mb-6 leading-[0.95] tracking-tight uppercase [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
              The migrant journey,
              <br />
              <span className="italic font-light text-[var(--color-accent-brand)]">
                set to the guitar.
              </span>
            </h1>
            <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
              {lang === "en"
                ? "Bilingual guitarist and singer-songwriter. Four decades of cantos for liberation, migration, family, and faith — in churches, union halls, classrooms, and on the streets."
                : "Guitarrista y cantautor bilingüe. Cuatro décadas de cantos de liberación, migración, familia y fe — en iglesias, salones sindicales, aulas y en las calles."}
            </p>
          </div>
        </section>

        {/* ─── 2. Bio — photo bg + dark scrim + right-aligned editorial copy ──
            Westones .section.discography (yes, that's how their template
            classes the Bio block — a CSS quirk we don't need to keep).
            Pattern: photo bg-image-section-wrapper + bio-opacity-layer
            (#2a2318 at ~55%) + bio-text-wrapper (right-aligned). */}
        <section
          className="relative isolate overflow-hidden bg-[var(--color-bg-warm)] section-atmospheric border-t border-black"
          aria-label={lang === "en" ? "Biography" : "Biografía"}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Solo-Portraits/2.Solo-Portraits-Vertical.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            style={{ objectPosition: "center 30%" }}
            loading="lazy"
          />
          {/* bio-opacity-layer — warm-tobacco scrim at 55% per westones. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#2a2318]/85" />

          <div className="relative z-10 mx-auto max-w-[var(--container-content)] px-4 sm:px-6 py-20 sm:py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-8 sm:gap-10 lg:gap-20">
            <div className="lg:text-right epk-fade-up">
              <p className="font-ui font-semibold text-[11px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[var(--color-accent-brand)] mb-3">
                Est. 1975
              </p>
            </div>
            <div className="lg:text-right epk-fade-up-slow">
              <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] uppercase leading-[0.95] mb-6 sm:mb-8 tracking-tight">
                {lang === "en" ? "Cantos" : "Cantos"}
                <br />
                <span className="italic font-light text-[var(--color-accent-brand)]">
                  {lang === "en" ? "from the border." : "de la frontera."}
                </span>
              </h2>
              <p className="font-body text-sm sm:text-base lg:text-lg leading-[1.8] text-[var(--color-fg)]/95 mb-5">
                {lang === "en"
                  ? "Francisco Herrera is a boundary-crossing artist whose music blends cultural pride with a call for justice. Born in Calexico, he began singing rancheras and ballads alongside his siblings at community and political events, then expanded into rhythm and blues, jazz, rock, punk, pop, and gospel — an eclectic style that knows no borders."
                  : "Francisco Herrera es un artista sin fronteras cuya música une el orgullo cultural con un llamado a la justicia. Nacido en Calexico, empezó cantando rancheras y baladas junto a sus hermanos en eventos comunitarios y políticos, y luego se expandió al rhythm and blues, el jazz, el rock, el punk, el pop y el gospel — un estilo ecléctico que no conoce fronteras."}
              </p>
              <p className="font-body text-sm sm:text-base lg:text-lg leading-[1.8] text-[var(--color-fg)]/85">
                {lang === "en"
                  ? "Inspired by Archbishop Óscar Romero and the rise of Base Christian Communities, his music champions human rights and amplifies working people's voices. Live performance is where his songs become tools of empowerment and solidarity — community centers, streets, churches, and union halls."
                  : "Inspirada por Monseñor Óscar Romero y el surgimiento de las Comunidades Eclesiales de Base, su música defiende los derechos humanos y amplifica las voces de la gente trabajadora. La presentación en vivo es donde sus canciones se vuelven herramientas de empoderamiento y solidaridad — centros comunitarios, calles, iglesias y salones sindicales."}
              </p>
            </div>
          </div>
        </section>

        {/* ─── 3. Recent Performances — westones live-dates pattern ──────
            DATE | CITY | VENUE rows with dotted-line dividers between
            columns. Photo bg + dark scrim. Pulled from pastEvents
            (`homepageHighlights`) so the data stays single-source. */}
        <section
          className="relative isolate overflow-hidden bg-[var(--color-bg)] section-atmospheric border-t border-black"
          aria-label={lang === "en" ? "Recent Performances" : "Presentaciones Recientes"}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/photos/francisco-festival-performance.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            style={{ objectPosition: "center" }}
            loading="lazy"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#0f0f0f]/80" />

          <div className="relative z-10 mx-auto max-w-[var(--container-content)] px-4 sm:px-6 py-20 sm:py-24 lg:py-32">
            <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] uppercase tracking-tight leading-[0.95] mb-10 sm:mb-14 epk-fade-up">
              {lang === "en" ? "Recent Performances" : "Presentaciones Recientes"}
            </h2>
            <ul className="flex flex-col gap-0">
              {RECENT_PERFORMANCES.map((e, i) => (
                <li
                  key={`${e.dateLabel}-${i}`}
                  className="grid grid-cols-1 md:grid-cols-[140px_minmax(0,1fr)_minmax(0,1.2fr)] lg:grid-cols-[160px_minmax(0,1fr)_minmax(0,1.2fr)] items-start md:items-center gap-y-1 gap-x-4 md:gap-x-6 py-4 sm:py-5 border-b border-[var(--color-border-brand)] last:border-b-0 epk-fade-up"
                >
                  <span className="font-ui font-semibold text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[var(--color-accent-brand)] tabular-nums">
                    {e.dateLabel}
                  </span>
                  <span className="font-heading text-base sm:text-lg md:text-xl uppercase tracking-wide text-[var(--color-fg)] break-words">
                    {e.city}
                  </span>
                  <span className="font-body text-sm sm:text-base italic text-[var(--color-fg)]/80 md:text-right break-words">
                    {e.venue}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-10 epk-fade-up">
              <NextLink
                href="/shows"
                className="inline-flex items-center gap-2 font-ui font-semibold text-xs uppercase tracking-[0.25em] text-[var(--color-accent-brand)] hover:text-white transition-colors"
              >
                {lang === "en" ? "Full archive" : "Archivo completo"}
                <span aria-hidden="true">→</span>
              </NextLink>
            </div>
          </div>
        </section>

        {/* ─── 4. Discography — warm tobacco band ───────────────────────
            6-album grid, click-through to /store/[slug]. Westones puts
            its discography on cool-neutral dark; we use warm tobacco to
            keep the site's primary tonal partner. */}
        <section
          className="bg-[var(--color-bg-warm)] section-atmospheric py-20 sm:py-24 lg:py-32 border-t border-black"
          aria-label={lang === "en" ? "Discography" : "Discografía"}
        >
          <div className="mx-auto max-w-[var(--container-content)] px-4 sm:px-6">
            <div className="mb-10 sm:mb-14 lg:mb-16 max-w-3xl epk-fade-up">
              <p className="font-ui font-semibold text-[11px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[var(--color-accent-brand)] mb-3">
                {lang === "en" ? "Records / Discos" : "Discos / Records"}
              </p>
              <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] uppercase tracking-tight leading-[0.95]">
                {lang === "en" ? "Six albums" : "Seis álbumes"}
                <span className="italic font-light text-[var(--color-accent-brand)]">.</span>
              </h2>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
              {ALBUMS.map((album) => (
                <li key={album.id} className="text-center epk-fade-up">
                  <NextLink href={`/store/${album.id}`} className="group block">
                    <div className="aspect-square mb-3 bg-black border border-[var(--color-border-brand)] [filter:drop-shadow(0_18px_22px_rgba(0,0,0,0.6))] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={album.image}
                        alt={album.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <p className="font-heading text-sm lg:text-base text-white leading-snug group-hover:text-[var(--color-accent-brand)] transition-colors">
                      {album.title}
                    </p>
                  </NextLink>
                </li>
              ))}
            </ul>
            <div className="mt-12 epk-fade-up">
              <NextLink
                href="/store"
                className="inline-flex items-center gap-2 font-ui font-semibold text-xs uppercase tracking-[0.25em] text-[var(--color-accent-brand)] hover:text-white transition-colors"
              >
                {lang === "en" ? "Visit the store" : "Visita la tienda"}
                <span aria-hidden="true">→</span>
              </NextLink>
            </div>
          </div>
        </section>

        {/* ─── 5. Listen — audio-player UI tied to franciscoherreramusic.com ──
            Mirrors the /about Amor Sin Papeles section but in westones
            framing: photo bg + dark scrim, "Listen" h2, featured-track
            card + track list. No Bandcamp embed (Francisco doesn't have
            one in the codebase yet); play/info CTAs link out to the
            original artist site where the audio actually plays. */}
        <section
          className="relative isolate overflow-hidden bg-[var(--color-bg)] section-atmospheric border-t border-black"
          aria-label="Listen / Escuchar"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/photos/francisco-portrait-guitar.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            style={{ objectPosition: "center 30%" }}
            loading="lazy"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#1f1b10]/85" />

          <div className="relative z-10 mx-auto max-w-[var(--container-content)] px-4 sm:px-6 py-20 sm:py-24 lg:py-32">
            <div className="mb-10 sm:mb-12 lg:mb-14 max-w-3xl epk-fade-up">
              <p className="font-ui font-semibold text-[11px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[var(--color-accent-brand)] mb-3">
                {lang === "en" ? "Listen / Escuchar" : "Escuchar / Listen"}
              </p>
              <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] uppercase tracking-tight leading-[0.95]">
                Amor Sin Papeles
                <span className="italic font-light text-[var(--color-accent-brand)]">.</span>
              </h2>
            </div>

            <div className="max-w-3xl epk-fade-up-slow">
              {/* Featured track player UI — visual play button + track meta. */}
              <div className="border border-[var(--color-border-brand)] bg-[var(--color-bg)]/70 backdrop-blur-sm p-3 sm:p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <a
                    href={LISTEN_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Play Amor Sin Papeles on the original site"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-accent-brand)] text-[var(--color-bg)] hover:bg-[var(--color-fg)] transition-colors shrink-0"
                  >
                    <Play className="size-4 translate-x-[1px]" aria-hidden="true" fill="currentColor" />
                  </a>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading text-sm uppercase tracking-[0.18em] text-white truncate">
                      Amor Sin Papeles
                    </p>
                    <p className="text-xs text-[var(--color-muted-brand)] tabular-nums">
                      0:00 / 4:14
                    </p>
                  </div>
                </div>
                <div className="h-1 bg-[var(--color-border-brand)] relative">
                  <div className="absolute inset-y-0 left-0 w-0 bg-[var(--color-accent-brand)]" />
                </div>
              </div>

              {/* Track listing */}
              <ol className="space-y-0 mb-8">
                {FEATURED_TRACKS.map((track) => (
                  <li
                    key={track.n}
                    className="flex items-center gap-2 sm:gap-4 py-3 border-b border-[var(--color-border-brand)] hover:bg-[var(--color-bg-deeper)]/50 transition-colors"
                  >
                    <span className="font-heading text-sm text-[var(--color-accent-brand)] w-5 sm:w-6 shrink-0 tabular-nums">
                      {track.n}
                    </span>
                    <p className="font-body text-sm lg:text-base text-white flex-1 min-w-0 truncate">
                      {track.title}
                    </p>
                    <span className="text-[11px] sm:text-xs text-[var(--color-muted-brand)] shrink-0 tabular-nums">
                      {track.duration}
                    </span>
                    <a
                      href={LISTEN_HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Info about ${track.title}`}
                      className="inline-flex items-center gap-1 text-xs font-ui uppercase tracking-[0.15em] text-[var(--color-muted-brand)] hover:text-[var(--color-accent-brand)] transition-colors shrink-0"
                    >
                      <Info className="size-3.5" aria-hidden="true" />
                      <span className="hidden sm:inline">Info</span>
                    </a>
                  </li>
                ))}
              </ol>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <a
                  href={LISTEN_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-ui font-semibold text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] bg-[var(--color-accent-brand)] text-[var(--color-bg)] hover:bg-[var(--color-fg)] transition-colors px-5 sm:px-6 py-3 text-center"
                >
                  <Headphones className="size-4 shrink-0" aria-hidden="true" />
                  <span className="break-words">
                    {lang === "en" ? "Listen on franciscoherreramusic.com" : "Escuchar en franciscoherreramusic.com"}
                  </span>
                </a>
                <NextLink
                  href="/store"
                  className="inline-flex items-center justify-center gap-2 font-ui font-semibold text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] border border-[var(--color-accent-brand)]/60 text-white hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent-brand)] transition-colors px-5 sm:px-6 py-3 text-center"
                >
                  {lang === "en" ? "All recordings" : "Todas las grabaciones"}
                </NextLink>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. Press photography gallery (adaptive flex layout) ──────
            See components/sections/EpkGallery.tsx. Hand-picked editorial
            images for media use. Cell 2 carries the "Galería" overlay. */}
        <EpkGallery
          lang={lang}
          cells={PRESS_PHOTO_CELLS}
          eyebrow={
            lang === "en"
              ? "PRESS PHOTOGRAPHY / FOTOGRAFÍA DE PRENSA"
              : "FOTOGRAFÍA DE PRENSA / PRESS PHOTOGRAPHY"
          }
          lead={
            lang === "en"
              ? "Hand-picked images for media use. Click any photo to enlarge — please credit Francisco J. Herrera."
              : "Imágenes seleccionadas para uso editorial. Haz clic en cualquiera para ampliar — atribuir a Francisco J. Herrera."
          }
          overlay={{ title: "Galería", subtitle: "Canto, comunidad, presencia." }}
          ariaLabel={lang === "en" ? "Press photography" : "Fotografía de prensa"}
          tier="bg"
          sideWatermark="Prensa"
          backgroundImageSrc="/images/photos/4.png"
          backgroundImagePosition="center 30%"
        />

        {/* ─── 7. CTA — small centered call ─────────────────────────────
            Westones .section.cta pattern: centered h2 + button on
            tertiary-dark. Brief, declarative, single-purpose. */}
        <section
          className="bg-[var(--color-bg-deeper)] section-atmospheric py-20 sm:py-24 lg:py-32 border-t border-black"
          aria-label={lang === "en" ? "Book Francisco" : "Contratar a Francisco"}
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center epk-fade-up-slow">
            <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] uppercase tracking-tight leading-[0.95] mb-4">
              {lang === "en" ? "Let's bring these songs" : "Traigamos estos cantos"}
              <br />
              <span className="italic font-light text-[var(--color-accent-brand)]">
                {lang === "en" ? "to your stage." : "a su escenario."}
              </span>
            </h2>
            <p className="font-body text-sm sm:text-base lg:text-lg text-[var(--color-fg)]/80 leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto">
              {lang === "en"
                ? "Concert halls, schools, churches, festivals, community gatherings. Solo voice and guitar, full band, or duets with collaborators."
                : "Salas de concierto, escuelas, iglesias, festivales, encuentros comunitarios. Voz y guitarra solo, banda completa, o dúos con colaboradores."}
            </p>
            <NextLink
              href="/booking"
              className="inline-flex items-center justify-center gap-2 font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] bg-[var(--color-accent-brand)] text-[var(--color-bg)] hover:bg-[var(--color-fg)] transition-colors px-6 sm:px-8 py-3 sm:py-4"
            >
              {lang === "en" ? "Book Francisco" : "Contratar"}
            </NextLink>
          </div>
        </section>

        {/* ─── 7b. Moments gallery — from client-sent-images ─────────────
            Second adaptive flex gallery, sits between the CTA and the
            Contact close. Same EpkGallery component as the press grid
            above but with a fresh image set: rallies, schools, studio
            sessions, theater greenrooms, magenta concert stages. Cell 1
            carries the gold "Caminos" overlay. */}
        <EpkGallery
          lang={lang}
          cells={MOMENTS_CELLS}
          eyebrow={
            lang === "en"
              ? "MOMENTS / MOMENTOS"
              : "MOMENTOS / MOMENTS"
          }
          lead={
            lang === "en"
              ? "On the road, on the stage, in the studio, in the schoolroom. Where the songs live."
              : "En el camino, en el escenario, en el estudio, en el aula. Donde viven los cantos."
          }
          overlay={{ title: "Caminos", subtitle: "Where the songs live." }}
          ariaLabel={lang === "en" ? "Moments" : "Momentos"}
          tier="bg"
          sideWatermark="Momentos"
          backgroundImageSrc="/images/photos/1.png"
          backgroundImagePosition="center 35%"
        />

        {/* ─── 8. Contact — three-column footer-style block ─────────────
            Westones .section.footer pattern: photo bg + dark scrim,
            centered "Let's Make Music Together" h2, three email columns
            (Contact / Booking / Session), credits paragraph below. We
            adapt to the Francisco context: Booking / Press / General.
            The site-wide <Footer/> handles nav links separately. */}
        <section
          className="relative isolate overflow-hidden bg-[var(--color-bg-deeper)] section-atmospheric border-t border-black"
          aria-label={lang === "en" ? "Get in touch" : "Contáctenos"}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/client-sent-images/10.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            style={{ objectPosition: "center 60%" }}
            loading="lazy"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#1f1b10]/85" />

          <div className="relative z-10 mx-auto max-w-[var(--container-content)] px-4 sm:px-6 py-20 sm:py-24 lg:py-32 text-center">
            <p className="font-ui font-semibold text-[11px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[var(--color-accent-brand)] mb-3 epk-fade-up">
              {lang === "en" ? "Contact / Contáctenos" : "Contáctenos / Contact"}
            </p>
            <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] uppercase tracking-tight leading-[0.95] mb-10 sm:mb-14 lg:mb-16 epk-fade-up">
              {lang === "en" ? "Get in touch" : "Pónganse en contacto"}
              <span className="italic font-light text-[var(--color-accent-brand)]">.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16 max-w-4xl mx-auto">
              <div className="epk-fade-up min-w-0">
                <a
                  href="mailto:booking@franciscoherrera.com"
                  className="font-body text-sm sm:text-base lg:text-lg text-white hover:text-[var(--color-accent-brand)] transition-colors block mb-3 break-all sm:break-words"
                >
                  booking@franciscoherrera.com
                </a>
                <p className="font-ui font-semibold text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[var(--color-accent-brand)]">
                  {lang === "en" ? "Booking" : "Contrataciones"}
                </p>
              </div>
              <div className="epk-fade-up min-w-0">
                <a
                  href="mailto:press@franciscoherrera.com"
                  className="font-body text-sm sm:text-base lg:text-lg text-white hover:text-[var(--color-accent-brand)] transition-colors block mb-3 break-all sm:break-words"
                >
                  press@franciscoherrera.com
                </a>
                <p className="font-ui font-semibold text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[var(--color-accent-brand)]">
                  {lang === "en" ? "Press" : "Prensa"}
                </p>
              </div>
              <div className="epk-fade-up min-w-0">
                <a
                  href="mailto:info@franciscoherrera.com"
                  className="font-body text-sm sm:text-base lg:text-lg text-white hover:text-[var(--color-accent-brand)] transition-colors block mb-3 break-all sm:break-words"
                >
                  info@franciscoherrera.com
                </a>
                <p className="font-ui font-semibold text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[var(--color-accent-brand)]">
                  {lang === "en" ? "General" : "General"}
                </p>
              </div>
            </div>

            {/* Credits / starring block — westones convention, in
                Francisco's voice. Honors collaborators. */}
            <div className="max-w-2xl mx-auto epk-fade-up-slow">
              <p className="font-ui font-semibold text-[11px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[var(--color-accent-brand)] mb-5">
                STARRING
              </p>
              <p className="font-body italic text-sm lg:text-base leading-relaxed text-[var(--color-fg)]/80 mb-3">
                {lang === "en"
                  ? "My family — for the love, the patience, and a lifetime of singing at the table."
                  : "Mi familia — por el amor, la paciencia, y una vida cantando en la mesa."}
              </p>
              <p className="font-body italic text-sm lg:text-base leading-relaxed text-[var(--color-fg)]/80 mb-3">
                {lang === "en"
                  ? "Every musician who has shared a stage, a vigil, a march, a movement."
                  : "Cada músico que ha compartido un escenario, una vigilia, una marcha, un movimiento."}
              </p>
              <p className="font-body italic text-sm lg:text-base leading-relaxed text-[var(--color-fg)]/80 mb-8">
                {lang === "en"
                  ? "Archbishop Óscar Romero — for showing what theology of liberation looks like in practice."
                  : "Monseñor Óscar Romero — por mostrar la teología de la liberación en práctica."}
              </p>
              <p className="font-ui font-semibold text-[11px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.4em] text-[var(--color-fg)]/70">
                {lang === "en" ? "Directed by faith. Produced by community." : "Dirigido por la fe. Producido por la comunidad."}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}

