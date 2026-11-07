import NextLink from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FeaturedReleases } from "@/components/sections/FeaturedReleases";
import { StoreVideo } from "@/components/sections/StoreVideo";
import { StoreCatalog } from "@/components/sections/StoreCatalog";
import { storeContent } from "@/lib/content/store";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";

// Counts derived from the store data so the stats stay in sync as
// content changes. "Free" includes tracks priced kind:"free" — every
// "your-price" track is honored separately on the card itself.
const FREE_TRACK_COUNT = storeContent.featured.releases.reduce(
  (n, r) => n + (r.tracks?.filter((t) => t.price.kind === "free").length ?? 0),
  0,
);
const ALBUM_COUNT = storeContent.catalog.items.length;

// Curated "Where to start" picks — one album per audience archetype.
// Pulls the album image + title from storeContent.catalog so titles and
// covers stay in sync with whatever the catalog says.
const STARTING_PICKS: {
  audienceLabel: { en: string; es: string };
  slug: string;
  pitch: { en: string; es: string };
}[] = [
  {
    audienceLabel: { en: "For families & classrooms", es: "Para familias y aulas" },
    slug: "canta-y-juega",
    pitch: {
      en: "Bilingual children's music to learn Spanish through play. The best record to put on while the kids are awake — and afterwards.",
      es: "Música infantil bilingüe para aprender español jugando. El mejor disco para poner mientras los niños están despiertos — y después.",
    },
  },
  {
    audienceLabel: { en: "For the journey", es: "Para el camino" },
    slug: "honor-migrante",
    pitch: {
      en: "The migrant journey set to the guitar — and Saber ante la Migra, the song that walks you through your rights when ICE knocks.",
      es: "El camino migrante puesto en la guitarra — y Saber ante la Migra, la canción que te acompaña ante la migra.",
    },
  },
  {
    audienceLabel: { en: "For deep listening", es: "Para escuchar profundo" },
    slug: "fuerza-de-la-raiz",
    pitch: {
      en: "Voice and guitar across folk, blues, nueva canción, and electrónica — the whole musical inheritance of the Latin American journey, sixteen tracks deep.",
      es: "Voz y guitarra entre folk, blues, nueva canción, y electrónica — toda la herencia musical del camino latinoamericano, en dieciséis pistas.",
    },
  },
];

// Lookup helper for the picks above so the JSX stays small and the
// album cover + display title come straight from the catalog of record.
function pickFromCatalog(slug: string) {
  return storeContent.catalog.items.find((i) => i.slug === slug);
}

export default async function StorePage() {
  const lang = await getLang();

  return (
    <>
      <Header lang={lang} />
      <main>
        <section
          className="relative isolate overflow-hidden pt-24 sm:pt-32 lg:pt-44 pb-14 sm:pb-20 lg:pb-28 border-b border-[var(--color-border-brand)]"
          aria-label={t(storeContent.hero.title, lang)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero/1.store.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            style={{ objectPosition: "center 25%" }}
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

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-6 lg:right-12 lg:top-10 z-0 select-none"
          >
            <p className="font-signature text-7xl lg:text-9xl text-[var(--color-accent-brand)]/35 -rotate-12 leading-none [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              Tienda
            </p>
          </div>

          <div className="relative z-10 mx-auto max-w-[var(--container-content)] px-6 text-center">
            <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-4 inline-block">
              {t(storeContent.hero.eyebrow, lang)}
            </span>
            <h1 className="font-heading font-black text-5xl sm:text-6xl lg:text-8xl text-[var(--color-fg)] mb-6 uppercase tracking-tight leading-[0.95] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
              {lang === "en" ? "Music for the" : "Música para el"}
              <br />
              <span className="italic font-light text-[var(--color-accent-brand)]">
                {lang === "en" ? "journey." : "camino."}
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/90 text-base lg:text-lg leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
              {t(storeContent.hero.description, lang)}
            </p>
          </div>
        </section>

        {/* ─── Stats / trust row ────────────────────────────────────────
            Quick credibility anchor before the records appear. Three
            numbers derived from the store data + one qualitative chip
            that frames the catalog as bilingual, multi-generational, and
            educator-ready. Mirrors the about/shows stats pattern. */}
        <section className="bg-[var(--color-bg)] section-atmospheric py-16 lg:py-20 border-b border-[var(--color-border-brand)]">
          <div className="mx-auto max-w-[var(--container-content)] px-6">
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 text-center">
              <li>
                <p className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl text-gold-3d leading-none mb-3">
                  {ALBUM_COUNT}
                </p>
                <p className="font-ui font-semibold text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[var(--color-fg)]/80">
                  {lang === "en" ? "Albums in the catalog" : "Álbumes en el catálogo"}
                </p>
              </li>
              <li>
                <p className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl text-gold-3d leading-none mb-3">
                  {FREE_TRACK_COUNT}+
                </p>
                <p className="font-ui font-semibold text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[var(--color-fg)]/80">
                  {lang === "en" ? "Free songs to download" : "Canciones gratis para descargar"}
                </p>
              </li>
              <li>
                <p className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-gold-3d leading-none mb-3">
                  EN/ES
                </p>
                <p className="font-ui font-semibold text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[var(--color-fg)]/80">
                  {lang === "en" ? "Bilingual every album" : "Bilingüe cada álbum"}
                </p>
              </li>
              <li>
                <p className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-gold-3d leading-none mb-3">
                  {lang === "en" ? "All ages" : "Todas las edades"}
                </p>
                <p className="font-ui font-semibold text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[var(--color-fg)]/80">
                  {lang === "en" ? "Family + classroom safe" : "Para familias y aulas"}
                </p>
              </li>
            </ul>
          </div>
        </section>

        <FeaturedReleases content={storeContent.featured} lang={lang} />
        <StoreVideo lang={lang} />

        {/* ─── Aulas cinematic banner ────────────────────────────────────
            Classroom session — Francisco playing classical guitar for
            children in a school library. Reinforces the "All ages /
            Family + classroom safe" stat and visualizes the audience
            for the children's albums (Canta y Juega, Francisco y Las
            Niñas, Nuestros Niños Son Sagrado) before the curated picks. */}
        <section
          className="relative w-full overflow-hidden bg-black aspect-[12/5] sm:aspect-[16/6] lg:aspect-[24/10]"
          aria-label={lang === "en" ? "Music in the classroom" : "Música en el aula"}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/client-sent-images/11.png"
            alt={
              lang === "en"
                ? "Francisco J. Herrera playing classical guitar for children in a school library"
                : "Francisco J. Herrera tocando guitarra clásica para niños en una biblioteca escolar"
            }
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 [background:linear-gradient(to_right,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.10)_18%,rgba(0,0,0,0)_42%,rgba(0,0,0,0)_58%,rgba(0,0,0,0.10)_82%,rgba(0,0,0,0.45)_100%)]"
          />

          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-24 bg-gradient-to-t from-transparent to-[var(--color-bg)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[var(--color-bg)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-6 lg:right-20 lg:top-10 z-10 select-none"
          >
            <p className="font-signature text-7xl lg:text-9xl text-[var(--color-accent-brand)]/55 -rotate-12 leading-none [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              Aulas
            </p>
          </div>
        </section>

        {/* ─── Where to start / curated picks ──────────────────────────
            Decision helper before the deep catalog browse. Three albums,
            one per audience archetype, with bilingual pitches. Cards pull
            cover + title from storeContent.catalog so they stay in sync. */}
        <section className="relative isolate overflow-hidden bg-[var(--color-bg-warm)] section-atmospheric py-24 lg:py-32 border-t border-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/photos/streetlights-sunset.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            style={{ objectPosition: "center 50%" }}
            loading="lazy"
          />
          {/* Warm-tobacco scrim — same recipe as /epk Bio section. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#2a2318]/85" />
          {/* Warm-tobacco band in the 3-tier dark rotation (Wes pattern). */}
          <div className="relative mx-auto max-w-[var(--container-content)] px-6">
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-3 inline-block">
                {lang === "en"
                  ? "WHERE TO START / POR DÓNDE EMPEZAR"
                  : "POR DÓNDE EMPEZAR / WHERE TO START"}
              </span>
              <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] mb-5 uppercase tracking-tight leading-[0.95]">
                {lang === "en" ? "Three places" : "Tres lugares"}
                <br />
                <span className="italic font-light text-[var(--color-accent-brand)]">
                  {lang === "en" ? "to begin." : "para empezar."}
                </span>
              </h2>
              <p className="text-[var(--color-fg)]/85 text-base lg:text-lg leading-relaxed">
                {lang === "en"
                  ? "Six albums in the catalog below — but if you're new to the music, these three are the doors."
                  : "Seis álbumes en el catálogo abajo — pero si la música es nueva para ustedes, estas tres son las puertas."}
              </p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
              {STARTING_PICKS.map((pick) => {
                const album = pickFromCatalog(pick.slug);
                if (!album) return null;
                return (
                  <li key={pick.slug} className="flex flex-col text-center">
                    <NextLink
                      href={`/store/${pick.slug}`}
                      className="group block"
                    >
                      <div className="aspect-square mb-5 bg-black border border-[var(--color-accent-brand)]/40 [filter:drop-shadow(0_24px_32px_rgba(0,0,0,0.6))_drop-shadow(0_8px_12px_rgba(0,0,0,0.45))] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={album.image}
                          alt={t(album.imageAlt, lang)}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      </div>
                      <p className="font-ui font-semibold text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[var(--color-accent-brand)] mb-3">
                        {pick.audienceLabel[lang]}
                      </p>
                      <h3 className="font-heading text-xl lg:text-2xl text-white leading-snug mb-4 group-hover:text-[var(--color-accent-brand)] transition-colors">
                        {t(album.title, lang)}
                      </h3>
                    </NextLink>
                    <p className="font-body text-sm lg:text-base leading-relaxed text-[var(--color-fg)]/80 mb-5">
                      {pick.pitch[lang]}
                    </p>
                    <NextLink
                      href={`/store/${pick.slug}`}
                      className="inline-flex items-center justify-center gap-2 font-ui font-semibold text-[11px] uppercase tracking-[0.25em] text-[var(--color-accent-brand)] hover:text-white transition-colors mt-auto"
                    >
                      {lang === "en" ? "View album" : "Ver álbum"}
                      <span aria-hidden="true">→</span>
                    </NextLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <StoreCatalog content={storeContent.catalog} lang={lang} />

        {/* ─── Letter from Francisco ────────────────────────────────────
            Personal voice in the Silently signature script — same
            magazine-style "from the artist" pattern as /about, written
            specifically for the music in this store. Sits between the
            catalog grid and the Disfrútalos cinematic banner so the
            visitor hears Francisco's voice before the editorial product
            still and closing mission. "Comparte" cursive watermark —
            the gift logic ("take them, sing them, share them").

            Warm-tobacco band in the 3-tier dark rotation — first-person
            voice earns the warmth (mirrors the About page Letter). */}
        <section className="bg-[var(--color-bg-warm)] section-atmospheric py-24 lg:py-32 relative isolate overflow-hidden border-t border-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/facebook/471278450_10162550647985119_4767484647779335697_n.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            style={{ objectPosition: "center 25%" }}
            loading="lazy"
          />
          {/* Warm-tobacco scrim — same recipe as /epk Bio section. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#2a2318]/85" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-12 top-4 lg:right-24 lg:top-6 z-0 select-none"
          >
            <p className="font-signature text-[8rem] lg:text-[14rem] text-[var(--color-accent-brand)]/15 -rotate-12 leading-none">
              Comparte
            </p>
          </div>

          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
            <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-white mb-6 inline-block">
              {lang === "en" ? "From Francisco / De Francisco" : "De Francisco / From Francisco"}
            </span>

            <p className="font-signature text-3xl sm:text-4xl lg:text-5xl text-[var(--color-accent-brand)] leading-[1.4] mb-10 [text-shadow:0_2px_18px_rgba(0,0,0,0.45)]">
              {lang === "en"
                ? "These songs are not for shelves. They are for car rides, kitchen tables, classrooms, vigils, and quiet evenings. Take them. Sing them. Share them — they belong to you the moment you press play."
                : "Estos cantos no son para las repisas. Son para los viajes en carro, las mesas de la cocina, las aulas, las vigilias y las noches tranquilas. Tómenlos. Cántenlos. Compártanlos — son suyos desde el momento en que aprietan reproducir."}
            </p>

            <p className="font-signature text-3xl sm:text-4xl text-white leading-none [-webkit-text-stroke:0.4px_currentColor]">
              — Francisco
            </p>
          </div>
        </section>

        {/* ─── Disfrútalos cinematic banner ─────────────────────────────
            Editorial product still — classical guitar on the sand at
            sunset (5.png, 7500×3125 ≈ 2.4:1, perfect for the cinematic
            slot). "Disfrútalos" cursive watermark mirrors Francisco's
            own bilingual phrase from the Honor Migrante description —
            "Disfrútalos. Enjoy it." Sits below the Letter so the
            visitor pauses on Francisco's words first, then breathes on
            the guitar-on-sand still before the closing mission. */}
        <section
          className="relative w-full overflow-hidden bg-black aspect-[12/5] sm:aspect-[16/6] lg:aspect-[24/10]"
          aria-label={lang === "en" ? "Enjoy the music" : "Disfruten la música"}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/client-sent-images/5.png"
            alt={
              lang === "en"
                ? "A classical guitar resting on the sand"
                : "Una guitarra clásica sobre la arena"
            }
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 [background:linear-gradient(to_right,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.10)_18%,rgba(0,0,0,0)_42%,rgba(0,0,0,0)_58%,rgba(0,0,0,0.10)_82%,rgba(0,0,0,0.45)_100%)]"
          />

          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-24 bg-gradient-to-t from-transparent to-[var(--color-bg)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[var(--color-bg)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-6 lg:right-20 lg:top-10 z-10 select-none"
          >
            <p className="font-signature text-7xl lg:text-9xl text-[var(--color-accent-brand)]/55 -rotate-12 leading-none [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              Disfrútalos
            </p>
          </div>
        </section>

        {/* ─── What you're supporting ───────────────────────────────────
            Closing emotional anchor. Reframes the buying choice — not
            a CD, an underwriting of the cultural work that takes these
            songs into churches, union halls, sanctuaries, and classrooms.
            Two follow-on links so visitors who don't buy now still have
            paths into the rest of the site. */}
        <section className="relative isolate overflow-hidden bg-[var(--color-bg)] section-atmospheric py-24 lg:py-32 border-t border-[var(--color-border-brand)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/photos/francisco-city-hall-rally.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            style={{ objectPosition: "center 40%" }}
            loading="lazy"
          />
          {/* Black-tobacco scrim — mirrors /epk Recent Performances. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#0f0f0f]/80" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-4 inline-block">
              {lang === "en"
                ? "WHAT YOU'RE SUPPORTING / LO QUE APOYAN"
                : "LO QUE APOYAN / WHAT YOU'RE SUPPORTING"}
            </span>
            <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] mb-7 uppercase tracking-tight leading-[0.95]">
              {lang === "en" ? "Not a CD —" : "No es un CD —"}
              <br />
              <span className="italic font-light text-[var(--color-accent-brand)]">
                {lang === "en" ? "the journey." : "el camino."}
              </span>
            </h2>
            <p className="font-body text-base lg:text-lg text-[var(--color-fg)]/85 leading-[1.8] mb-5">
              {lang === "en"
                ? "Every album sold underwrites Francisco's cultural work — songs that travel into churches, union halls, sanctuaries, vigils, and classrooms. Forty years of the migrant journey, set to the guitar."
                : "Cada álbum vendido sostiene el trabajo cultural de Francisco — canciones que viajan a iglesias, salones sindicales, santuarios, vigilias y aulas. Cuarenta años del camino migrante, puestos en la guitarra."}
            </p>
            <p className="font-body italic text-sm lg:text-base text-[var(--color-muted-brand)] leading-relaxed mb-10">
              {lang === "en"
                ? "Disfrútalos. Compártelos con amistades y familia. — Enjoy them. Share them with friends and family."
                : "Disfrútalos. Compártelos con amistades y familia."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <NextLink
                href="/about"
                className="inline-flex items-center gap-2 font-ui font-semibold text-xs uppercase tracking-[0.2em] bg-[var(--color-accent-brand)] text-[var(--color-bg)] hover:bg-[var(--color-fg)] transition-colors px-7 py-3"
              >
                {lang === "en" ? "About Francisco" : "Sobre Francisco"}
              </NextLink>
              <NextLink
                href="/shows"
                className="inline-flex items-center gap-2 font-ui font-semibold text-xs uppercase tracking-[0.2em] border border-[var(--color-accent-brand)]/60 text-white hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent-brand)] transition-colors px-7 py-3"
              >
                {lang === "en" ? "See past shows" : "Ver eventos pasados"}
              </NextLink>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
