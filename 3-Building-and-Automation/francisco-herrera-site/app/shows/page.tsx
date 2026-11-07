import * as React from "react";
import NextLink from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EventsArchive } from "@/components/sections/EventsArchive";
import { EpkGallery, type GalleryCellData } from "@/components/sections/EpkGallery";
import { pastEvents, EVENTS_PER_PAGE } from "@/lib/content/shows";
import { getLang } from "@/lib/i18n-server";

// Career-spanning stats anchor — sourced from the /about page highlights
// so the numbers stay consistent across the site. The "events archived"
// number is derived from pastEvents at render time.
const CAREER_STATS: { n: string; label: { en: string; es: string } }[] = [
  { n: "40+", label: { en: "Years on stage", es: "Años en escena" } },
  { n: "250K", label: { en: "At Battle for Seattle", es: "En Battle for Seattle" } },
  { n: "22K", label: { en: "At SOA Watch vigils", es: "En vigilias de SOA Watch" } },
];

// Curated Moments gallery — six Facebook photos that capture distinct
// facets of Francisco's live work: solo artist, cultural roots, educator,
// band, venue performer, community/activist. Hand-picked from
// /public/images/facebook. Rendered through the shared EpkGallery
// (adaptive flexbox frame, pale-gold hairline border) so the visual
// language matches /epk. Brick-wall venue carries the gold "Momentos"
// overlay; per-cell objectPosition fixes head-clipping where the
// cover-crop bites into a subject.
// Archive gallery — six Previous_events PNGs (skipping image_f0cb2b2c.png
// which already rides in the /epk press grid). Mix of 1024×1024 squares
// and 896×1200 portraits so the adaptive flexbox row breaks naturally.
// Cell 2 carries the gold "Archivo" overlay (mirrors the /epk press grid
// pattern). Placed after the historic-stages strip as a visual proof
// break before the "From the Stage" cinematic banner.
const ARCHIVE_PHOTOS: GalleryCellData[] = [
  {
    // First three cells get extra vertical room (420 vs default 320) so
    // the top row reads as a hero band before the smaller second row.
    src: "/images/Previous_events/image_54aee390.png",
    alt: {
      en: "Francisco J. Herrera at a past concert performance",
      es: "Francisco J. Herrera en una actuación pasada",
    },
    height: "420px",
  },
  {
    src: "/images/Previous_events/image_641f15ba.png",
    alt: {
      en: "Francisco J. Herrera performing on stage at an archived show",
      es: "Francisco J. Herrera actuando en un concierto del archivo",
    },
    withOverlay: true,
    height: "420px",
  },
  {
    src: "/images/Previous_events/image_59b0e891.png",
    alt: {
      en: "Francisco J. Herrera mid-song at a past gathering — portrait frame",
      es: "Francisco J. Herrera cantando en un encuentro pasado — formato vertical",
    },
    height: "420px",
  },
  {
    src: "/images/Previous_events/image_66e49c63.png",
    alt: {
      en: "Francisco J. Herrera with guitar at a past community event",
      es: "Francisco J. Herrera con guitarra en un evento comunitario pasado",
    },
  },
  {
    src: "/images/Previous_events/image_83633699.png",
    alt: {
      en: "Francisco J. Herrera in performance — archived portrait frame",
      es: "Francisco J. Herrera en presentación — retrato del archivo",
    },
  },
  {
    src: "/images/Previous_events/image_e05aa7d0.png",
    alt: {
      en: "Francisco J. Herrera on stage at a past performance",
      es: "Francisco J. Herrera en escenario en una actuación pasada",
    },
  },
];

const MOMENTS: GalleryCellData[] = [
  {
    src: "/images/facebook/471278450_10162550647985119_4767484647779335697_n.jpg",
    alt: {
      en: "Francisco J. Herrera singing with classical guitar at an intimate brick-wall venue",
      es: "Francisco J. Herrera cantando con guitarra clásica en un local íntimo de pared de ladrillo",
    },
    withOverlay: true,
    objectPosition: "center 15%",
  },
  {
    src: "/images/facebook/488006864_18386482891113352_8570978093327498432_n.jpg",
    alt: {
      en: "Francisco performing in front of a vibrant Aztec mural",
      es: "Francisco tocando frente a un mural azteca vibrante",
    },
  },
  {
    src: "/images/facebook/503739513_9816273528428394_8754046913923291138_n.jpg",
    alt: {
      en: "Francisco surrounded by smiling children with his guitar at a school gathering",
      es: "Francisco rodeado de niños sonrientes con su guitarra en una reunión escolar",
    },
  },
  {
    src: "/images/facebook/508396447_1320591080073606_4039395702692812573_n.jpg",
    alt: {
      en: "Francisco's band in traditional Oaxacan attire on tour",
      es: "La banda de Francisco con vestimenta tradicional oaxaqueña en gira",
    },
  },
  {
    src: "/images/facebook/492450869_1225361482923004_7199824605230553525_n.jpg",
    alt: {
      en: "Francisco on stage with an electric guitar before an organize-educate-mobilize backdrop",
      es: "Francisco en escena con guitarra eléctrica frente a un fondo de organizar-educar-movilizar",
    },
  },
  {
    src: "/images/facebook/517397728_10163405938360119_7125448423102167384_n.jpg",
    alt: {
      en: "Francisco at a community rally outside San Francisco City Hall",
      es: "Francisco en una manifestación comunitaria frente al Ayuntamiento de San Francisco",
    },
  },
];

// Marquee historic shows — the apex moments before this archive begins.
// Sourced from the /about page's "Notable Moments" highlights list.
const NOTABLE_SHOWS: {
  year: string;
  audience: string;
  title: { en: string; es: string };
  description: { en: string; es: string };
}[] = [
  {
    year: "1999",
    audience: "250,000",
    title: {
      en: "Battle for Seattle",
      es: "Battle for Seattle",
    },
    description: {
      en: "On stage as 250,000 people shut down the WTO ministerial. The largest documented audience in Francisco's career — a turning point for the global justice movement.",
      es: "En escena mientras 250,000 personas pararon la conferencia de la OMC. La audiencia más grande documentada de la carrera de Francisco — un punto de inflexión para el movimiento global por la justicia.",
    },
  },
  {
    year: "1987",
    audience: "10,000",
    title: {
      en: "Joan Baez & Jesse Jackson Stage",
      es: "Escenario con Joan Baez y Jesse Jackson",
    },
    description: {
      en: "Shared the stage with Joan Baez and Jesse Jackson before 10,000 people for a benefit honoring Brian S. Willson, the Vietnam veteran maimed by a U.S. munitions train.",
      es: "Compartió el escenario con Joan Baez y Jesse Jackson ante 10,000 personas en un beneficio por Brian S. Willson, veterano de Vietnam herido por un tren de municiones de EE.UU.",
    },
  },
  {
    year: "Annual",
    audience: "22,000",
    title: {
      en: "SOA Watch Vigils",
      es: "Vigilias de SOA Watch",
    },
    description: {
      en: "Years of vigils outside Fort Benning calling to close the U.S. Army's School of the Americas — up to 22,000 people gathered each November to remember the assassinated and demand accountability.",
      es: "Años de vigilias fuera de Fort Benning para cerrar la Escuela de las Américas del Ejército estadounidense — hasta 22,000 personas reunidas cada noviembre para recordar a los asesinados y exigir cuentas.",
    },
  },
];

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function ShowsPage({ searchParams }: PageProps) {
  const lang = await getLang();

  const params = await searchParams;
  const totalPages = Math.max(1, Math.ceil(pastEvents.length / EVENTS_PER_PAGE));
  const requested = Number(params.page) || 1;
  const initialPage = Math.min(Math.max(1, requested), totalPages);

  return (
    <>
      <Header lang={lang} />
      <main>
        <section
          className="relative isolate overflow-hidden pt-24 sm:pt-32 lg:pt-44 pb-14 sm:pb-20 lg:pb-28"
          aria-label={lang === "en" ? "Past Events" : "Eventos Pasados"}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero/1.shows.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_25%]"
            loading="eager"
          />
          {/* Match homepage hero treatment: light uniform tint + symmetric side-vignette */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/15" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 [background:linear-gradient(to_right,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.30)_15%,rgba(0,0,0,0.10)_38%,rgba(0,0,0,0.05)_62%,rgba(0,0,0,0.25)_88%,rgba(0,0,0,0.50)_100%)]"
          />
          {/* Bottom fade into page bg so the section blends into the events grid */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-[var(--color-bg)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-6 lg:right-12 lg:top-10 z-0 select-none"
          >
            <p className="font-signature text-8xl lg:text-[10rem] text-[var(--color-muted-brand)]/25 -rotate-12 leading-none">
              {lang === "en" ? "Stage" : "Escena"}
            </p>
          </div>

          <div className="relative z-10 mx-auto max-w-[var(--container-content)] px-6 text-center">
            <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-3 inline-block">
              {lang === "en"
                ? "PAST EVENTS / EVENTOS PASADOS"
                : "EVENTOS PASADOS / PAST EVENTS"}
            </span>
            <h1 className="font-heading font-black text-5xl sm:text-6xl lg:text-8xl text-[var(--color-fg)] mb-5 uppercase tracking-tight leading-[0.95] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
              {lang === "en" ? "On stage" : "En escena"}
              <br />
              <span className="italic font-light text-[var(--color-accent-brand)]">
                {lang === "en" ? "through the years." : "por los años."}
              </span>
            </h1>
            <p className="text-[var(--color-fg)]/90 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
              {lang === "en"
                ? `Over ${pastEvents.length} concerts, vigils, and community gatherings since 2010 — across the Bay Area, Fresno, Riverside, Columbus, and beyond.`
                : `Más de ${pastEvents.length} conciertos, vigilias y reuniones comunitarias desde 2010 — del Área de la Bahía a Fresno, Riverside, Columbus y más allá.`}
            </p>
          </div>
        </section>

        {/* ─── Stats row ────────────────────────────────────────────────
            Career-spanning anchor before the events archive. Three lifetime
            numbers from /about + one archive-specific figure derived from
            pastEvents. Frames this archive as one chapter in a 40+ year
            career on stages and at vigils. */}
        <section className="bg-[var(--color-bg)] section-atmospheric py-16 lg:py-20 border-y border-[var(--color-border-brand)]">
          <div className="mx-auto max-w-[var(--container-content)] px-6">
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 text-center">
              {CAREER_STATS.map((stat, i) => (
                <li key={i}>
                  <p className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl text-gold-3d leading-none mb-3">
                    {stat.n}
                  </p>
                  <p className="font-ui font-semibold text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[var(--color-fg)]/80">
                    {stat.label[lang]}
                  </p>
                </li>
              ))}
              {/* Archive-specific stat derived from the data file. */}
              <li>
                <p className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl text-gold-3d leading-none mb-3">
                  {pastEvents.length}
                </p>
                <p className="font-ui font-semibold text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[var(--color-fg)]/80">
                  {lang === "en"
                    ? "Events archived since 2010"
                    : "Eventos archivados desde 2010"}
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section
          className="relative isolate overflow-hidden bg-[var(--color-bg)] section-atmospheric pb-24 pt-20 lg:pt-24"
          aria-label={lang === "en" ? "Full performance archive" : "Archivo completo de presentaciones"}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Solo-Portraits/4.Solo-Portraits-Vertical.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            style={{ objectPosition: "center 30%" }}
            loading="lazy"
          />
          {/* Black-tobacco scrim — mirrors /epk Recent Performances. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#0f0f0f]/80" />
          <div className="relative mx-auto max-w-[var(--container-content)] px-6">
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-3 inline-block">
                {lang === "en"
                  ? "FULL ARCHIVE / ARCHIVO COMPLETO"
                  : "ARCHIVO COMPLETO / FULL ARCHIVE"}
              </span>
              <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] mb-5 uppercase tracking-tight leading-[0.95]">
                {lang === "en" ? "Every show" : "Cada show"}
                <br />
                <span className="italic font-light text-[var(--color-accent-brand)]">
                  {lang === "en" ? "since 2010." : "desde 2010."}
                </span>
              </h2>
              <p className="text-[var(--color-fg)]/85 text-base lg:text-lg leading-relaxed">
                {lang === "en"
                  ? "Concerts, vigils, classrooms, sanctuaries — every public stage Francisco has played, newest first."
                  : "Conciertos, vigilias, aulas, santuarios — cada escenario público de Francisco, los más recientes primero."}
              </p>
            </div>
          </div>
          <EventsArchive
            events={pastEvents}
            eventsPerPage={EVENTS_PER_PAGE}
            initialPage={initialPage}
            lang={lang}
          />
        </section>

        {/* ─── Moments gallery ─────────────────────────────────────────
            Six Facebook photos rendered through the shared EpkGallery
            (adaptive flexbox, pale-gold hairline border) so the image-
            frame language matches /epk. Each photo captures a distinct
            facet — solo artist, cultural roots, educator, band, venue
            performer, community/activist. */}
        <EpkGallery
          lang={lang}
          cells={MOMENTS}
          eyebrow={
            lang === "en"
              ? "MOMENTS / MOMENTOS"
              : "MOMENTOS / MOMENTS"
          }
          title={lang === "en" ? "From the" : "Desde las"}
          titleAccent={lang === "en" ? "rooms." : "salas."}
          tier="bg"
          sideWatermark="Salas"
          lead={
            lang === "en"
              ? "Six moments from the work — a brick-wall venue, a school gathering, a city-hall rally, the band on tour."
              : "Seis momentos del trabajo — un local íntimo, una reunión escolar, una manifestación frente al ayuntamiento, la banda en gira."
          }
          overlay={{
            title: lang === "en" ? "Momentos" : "Momentos",
            subtitle:
              lang === "en"
                ? "Solo, school, sanctuary, street."
                : "Solo, escuela, santuario, calle.",
          }}
          ariaLabel={lang === "en" ? "Moments" : "Momentos"}
        />

        {/* ─── Pueblo cinematic banner ───────────────────────────────────
            Francisco singing at a protest alongside community members
            holding "no prisons, no jails, no detention centers" signs.
            Cursive "Pueblo" watermark — the people he sings for. Bridges
            the events archive into the historic-shows strip below. */}
        <section
          className="relative w-full overflow-hidden bg-black aspect-[12/5] sm:aspect-[16/6] lg:aspect-[24/10]"
          aria-label={lang === "en" ? "Singing at a protest" : "Cantando en una protesta"}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/photos/francisco-singing-protest.webp"
            alt={
              lang === "en"
                ? "Francisco J. Herrera singing with classical guitar at a community protest"
                : "Francisco J. Herrera cantando con guitarra clásica en una protesta comunitaria"
            }
            className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
            loading="lazy"
          />

          {/* Soft side-vignette — keeps Francisco and the singer beside him bright. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 [background:linear-gradient(to_right,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.10)_18%,rgba(0,0,0,0)_42%,rgba(0,0,0,0)_58%,rgba(0,0,0,0.10)_82%,rgba(0,0,0,0.45)_100%)]"
          />

          {/* Top + bottom fades for seamless section transitions. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-24 bg-gradient-to-t from-transparent to-[var(--color-bg)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[var(--color-bg)]"
          />

          {/* Cursive "Pueblo" watermark — the people he sings for. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-6 lg:right-20 lg:top-10 z-10 select-none"
          >
            <p className="font-signature text-8xl lg:text-[10rem] text-[var(--color-accent-brand)]/55 -rotate-12 leading-none [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              {lang === "en" ? "Pueblo" : "Pueblo"}
            </p>
          </div>
        </section>

        {/* ─── Notable Performances strip ────────────────────────────────
            Marquee historic shows from before this archive begins (which
            starts in 2010). Sourced from the /about page's "Notable
            Moments" highlights so the lifetime numbers stay consistent.
            Each card: massive year + audience size + event title +
            description. Three apex moments in a 1-col → 3-col grid. */}
        <section className="relative isolate overflow-hidden bg-[var(--color-bg-warm)] section-atmospheric py-24 lg:py-32 border-t border-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/photos/1.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            style={{ objectPosition: "center 35%" }}
            loading="lazy"
          />
          {/* Warm-tobacco scrim — same recipe as /epk Bio section. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#2a2318]/85" />
          {/* Silently-script side watermark in the corner — same recipe as
              the other section watermarks across the site. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-6 lg:left-12 lg:top-10 z-0 select-none"
          >
            <p className="font-signature text-8xl lg:text-[10rem] text-[var(--color-accent-brand)]/25 -rotate-12 leading-none [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              Escenarios
            </p>
          </div>
          {/* Warm-tobacco band in the 3-tier dark rotation (Wes pattern). */}
          <div className="relative mx-auto max-w-[var(--container-content)] px-6">
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-3 inline-block">
                {lang === "en"
                  ? "MARQUEE MOMENTS / MOMENTOS DESTACADOS"
                  : "MOMENTOS DESTACADOS / MARQUEE MOMENTS"}
              </span>
              <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] mb-5 uppercase tracking-tight leading-[0.95]">
                {lang === "en" ? "The historic" : "Los escenarios"}
                <br />
                <span className="italic font-light text-[var(--color-accent-brand)]">
                  {lang === "en" ? "stages." : "históricos."}
                </span>
              </h2>
              <p className="text-[var(--color-fg)]/85 text-base lg:text-lg leading-relaxed">
                {lang === "en"
                  ? "Before the archive below began in 2010, four decades of stages — including the moments that drew tens of thousands."
                  : "Antes de que comenzara este archivo en 2010, cuatro décadas de escenarios — incluyendo los momentos que reunieron a decenas de miles."}
              </p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {NOTABLE_SHOWS.map((show, i) => (
                <li
                  key={i}
                  className="bg-[var(--color-card-warm)] border border-[var(--color-border-warm)] hover:border-[var(--color-accent-brand)]/60 transition-colors p-7 lg:p-8 flex flex-col [box-shadow:0_18px_42px_-18px_rgba(0,0,0,0.7)]"
                >
                  <p className="font-heading font-black text-5xl lg:text-6xl text-gold-3d leading-none mb-4">
                    {show.year}
                  </p>
                  <p className="font-ui font-semibold text-xs uppercase tracking-[0.25em] text-[var(--color-accent-brand)] mb-5">
                    {show.audience}{" "}
                    {lang === "en" ? "people" : "personas"}
                  </p>
                  <h3 className="font-heading text-xl lg:text-2xl text-white leading-snug mb-4">
                    {show.title[lang]}
                  </h3>
                  <p className="font-body text-sm lg:text-base leading-relaxed text-[var(--color-fg)]/85">
                    {show.description[lang]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ─── Archive gallery (adaptive flex) ───────────────────────────
            Second EpkGallery — six Previous_events photos. Sits after the
            historic-stages strip as a visual proof break before the "From
            the Stage" cinematic banner. Same frame language as /epk so
            the page reads cohesively across galleries. */}
        <EpkGallery
          lang={lang}
          cells={ARCHIVE_PHOTOS}
          eyebrow={
            lang === "en"
              ? "ARCHIVE / ARCHIVO"
              : "ARCHIVO / ARCHIVE"
          }
          title={lang === "en" ? "From the" : "Desde el"}
          titleAccent={lang === "en" ? "archive." : "archivo."}
          tier="bg"
          sideWatermark="Archivo"
          lead={
            lang === "en"
              ? "Snapshots from past stages — chapels, plazas, festivals, halls."
              : "Imágenes de escenarios pasados — capillas, plazas, festivales, salas."
          }
          overlay={{
            title: lang === "en" ? "Archivo" : "Archivo",
            subtitle:
              lang === "en"
                ? "Years on the road."
                : "Años en el camino.",
          }}
          ariaLabel={lang === "en" ? "Archive gallery" : "Galería del archivo"}
        />

        <section
          className="relative isolate overflow-hidden flex items-center min-h-[55vh] lg:min-h-[60vh] bg-[var(--color-bg-warm)] section-atmospheric border-t border-black"
          aria-label={lang === "en" ? "From the Stage" : "Desde el Escenario"}
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
          {/* Warm-tobacco scrim — same recipe as /epk Bio section. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#2a2318]/85" />
          {/* Silently-script side watermark — positioned top-left above
              the eyebrow + content column, same recipe as other section
              watermarks across the site. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-6 lg:left-12 lg:top-10 z-0 select-none"
          >
            <p className="font-signature text-8xl lg:text-[10rem] text-[var(--color-accent-brand)]/25 -rotate-12 leading-none [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              Canto
            </p>
          </div>

          <div className="relative z-10 mx-auto max-w-[var(--container-content)] px-6 py-20 lg:py-28 w-full">
            <div className="max-w-2xl">
              <span className="font-heading text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-4 inline-block">
                {lang === "en" ? "FROM THE STAGE / DESDE EL ESCENARIO" : "DESDE EL ESCENARIO / FROM THE STAGE"}
              </span>
              <p className="font-signature text-4xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] leading-tight mb-6 [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
                {lang === "en"
                  ? "The song belongs to whoever sings it back."
                  : "La canción es de quien la canta de regreso."}
              </p>
              <p className="text-[var(--color-fg)]/85 text-base lg:text-lg leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
                {lang === "en"
                  ? "Fifteen years of stages, vigils, and rooms full of people. The archive lives because the songs kept being sung."
                  : "Quince años de escenarios, vigilias y salas llenas. El archivo vive porque los cantos siguen cantándose."}
              </p>
            </div>
          </div>
        </section>

        {/* ─── Book Francisco CTA ────────────────────────────────────────
            Closing conversion section. After fifteen years of archived
            shows + the marquee historic moments, invite the visitor to
            bring these songs to their own stage. Two paths: book Francisco
            directly, or get the press kit first.

            Deeper-tobacco band — tertiary-dark anchor for the closing CTA
            (Wes uses `--colors--tertiarydark` for its CTA section). */}
        <section className="relative bg-[var(--color-bg)] section-atmospheric py-24 lg:py-32 border-t border-black">
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-4 inline-block">
              {lang === "en" ? "BOOK / CONTRATAR" : "CONTRATAR / BOOK"}
            </span>
            <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] mb-6 uppercase tracking-tight leading-[0.95]">
              {lang === "en" ? "Bring these songs" : "Traigan estas canciones"}
              <br />
              <span className="italic font-light text-[var(--color-accent-brand)]">
                {lang === "en" ? "to your stage." : "a su escenario."}
              </span>
            </h2>
            <p className="font-body text-base lg:text-lg text-[var(--color-fg)]/80 leading-relaxed mb-10 max-w-2xl mx-auto">
              {lang === "en"
                ? "Concert halls, sanctuaries, vigils, classrooms, union meetings — Francisco brings forty years of bilingual songcraft to gatherings of every size and shape."
                : "Salas de concierto, santuarios, vigilias, aulas, reuniones sindicales — Francisco lleva cuarenta años de canción bilingüe a reuniones de todo tamaño y forma."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <NextLink
                href="/booking"
                className="inline-flex items-center gap-2 font-ui font-semibold text-xs uppercase tracking-[0.2em] bg-[var(--color-accent-brand)] text-[var(--color-bg)] hover:bg-[var(--color-fg)] transition-colors px-7 py-3"
              >
                {lang === "en" ? "Book Francisco" : "Contratar"}
              </NextLink>
              <NextLink
                href="/epk"
                className="inline-flex items-center gap-2 font-ui font-semibold text-xs uppercase tracking-[0.2em] border border-[var(--color-accent-brand)]/60 text-white hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent-brand)] transition-colors px-7 py-3"
              >
                {lang === "en" ? "See the press kit" : "Ver el press kit"}
              </NextLink>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
