import NextLink from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { blogPosts, type BlogPost } from "@/lib/content/blog";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";

// Per-post crop-anchor for card thumbnails. Solo Portraits are vertical
// with the subject's head at varying y-positions in the source, so the
// default `object-cover` crop hides the face on landscape cards. Each
// override below is a one-off based on the actual source framing.
function postImagePosClass(p: BlogPost): string {
  if (p.slug === "the-washing-machine") return "object-[center_20%]";
  if (p.image?.includes("/Solo-Portraits/")) return "object-top";
  return "";
}

// Stats derived from the data so the magazine credibility row stays in
// sync as posts are added.
const POST_COUNT = blogPosts.length;
const AUDIO_COUNT = blogPosts.filter((p) => p.hasAudio || p.hasPodcast).length;
const FIRST_YEAR = blogPosts.reduce(
  (min, p) => Math.min(min, Number(p.date.slice(0, 4))),
  9999,
);
const LATEST_YEAR = blogPosts.reduce(
  (max, p) => Math.max(max, Number(p.date.slice(0, 4))),
  0,
);
const YEAR_SPAN = LATEST_YEAR - FIRST_YEAR;

// Latest three posts surfaced as the "Where to start" curated row —
// mirrors the /store STARTING_PICKS pattern. The full grid below shows
// every post; this row is just the editorial first read.
const STARTING_PICKS = blogPosts.slice(0, 3);

export default async function BlogIndex() {
  const lang = await getLang();

  return (
    <>
      <Header lang={lang} />
      <main>
        {/* ─── Hero masthead ─────────────────────────────────────────────
            Same cinematic pattern as /store hero — full-width photo bg,
            multi-layer dark scrim, signature script watermark, bilingual
            eyebrow + split title. Frames the blog as Francisco's
            dispatches from the road, not a chronological archive. */}
        <section
          className="relative isolate overflow-hidden pt-32 lg:pt-44 pb-20 lg:pb-28 border-b border-(--color-border-brand)"
          aria-label={lang === "en" ? "Dispatches" : "Crónicas"}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/photos/francisco-singing-protest.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_30%]"
            loading="eager"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/25" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 [background:linear-gradient(to_right,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.30)_15%,rgba(0,0,0,0.10)_38%,rgba(0,0,0,0.05)_62%,rgba(0,0,0,0.25)_88%,rgba(0,0,0,0.50)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 [background:radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(0,0,0,0.40)_0%,rgba(0,0,0,0.20)_55%,transparent_85%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-b from-transparent to-(--color-bg)"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-6 lg:right-12 lg:top-10 z-0 select-none"
          >
            <p className="font-signature text-7xl lg:text-9xl text-(--color-accent-brand)/35 -rotate-12 leading-none [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              Crónicas
            </p>
          </div>

          <div className="relative z-10 mx-auto max-w-(--container-content) px-6 text-center">
            <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-(--color-accent-brand) mb-4 inline-block">
              {lang === "en"
                ? "DISPATCHES / CRÓNICAS"
                : "CRÓNICAS / DISPATCHES"}
            </span>
            <h1 className="font-heading font-black text-5xl sm:text-6xl lg:text-8xl text-(--color-fg) mb-6 uppercase tracking-tight leading-[0.95] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
              {lang === "en" ? "Stories from" : "Cuentos del"}
              <br />
              <span className="italic font-light text-(--color-accent-brand)">
                {lang === "en" ? "the road." : "camino."}
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/90 text-base lg:text-lg leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
              {lang === "en"
                ? "Reflections, sermons, and notes Francisco has been publishing since 2010 — on the migrant journey, on the songs, on the people he meets along the way."
                : "Reflexiones, sermones y apuntes que Francisco ha venido publicando desde 2010 — sobre el camino migrante, sobre las canciones, sobre la gente que encuentra en el camino."}
            </p>
          </div>
        </section>

        {/* ─── Stats / trust row ────────────────────────────────────────
            Quick credibility anchor before the post grid. Four numbers
            derived from the blog data + a qualitative chip. Same /store
            stats pattern. */}
        <section className="bg-(--color-bg) section-atmospheric py-16 lg:py-20 border-b border-(--color-border-brand)">
          <div className="mx-auto max-w-(--container-content) px-6">
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 text-center">
              <li>
                <p className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl text-gold-3d leading-none mb-3">
                  {POST_COUNT}
                </p>
                <p className="font-ui font-semibold text-[10px] sm:text-xs uppercase tracking-[0.25em] text-(--color-fg)/80">
                  {lang === "en" ? "Dispatches in the archive" : "Crónicas en el archivo"}
                </p>
              </li>
              <li>
                <p className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl text-gold-3d leading-none mb-3">
                  {YEAR_SPAN}+
                </p>
                <p className="font-ui font-semibold text-[10px] sm:text-xs uppercase tracking-[0.25em] text-(--color-fg)/80">
                  {lang === "en" ? "Years of writing" : "Años escribiendo"}
                </p>
              </li>
              <li>
                <p className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-gold-3d leading-none mb-3">
                  EN/ES
                </p>
                <p className="font-ui font-semibold text-[10px] sm:text-xs uppercase tracking-[0.25em] text-(--color-fg)/80">
                  {lang === "en" ? "Bilingual every post" : "Bilingüe cada entrada"}
                </p>
              </li>
              <li>
                <p className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl text-gold-3d leading-none mb-3">
                  {AUDIO_COUNT}
                </p>
                <p className="font-ui font-semibold text-[10px] sm:text-xs uppercase tracking-[0.25em] text-(--color-fg)/80">
                  {lang === "en" ? "Posts with audio" : "Entradas con audio"}
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── Where to start — three latest dispatches ────────────────
            Decision helper before the deep archive. Three newest posts,
            with cover image + title + excerpt. Cards link to the article
            page. Same warm-tobacco band as /store's "Where to start". */}
        <section className="relative isolate overflow-hidden bg-(--color-bg-warm) section-atmospheric py-24 lg:py-32 border-t border-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/photos/streetlights-sunset.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_50%]"
            loading="lazy"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#2a2318]/85" />

          <div className="relative mx-auto max-w-(--container-content) px-6">
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-(--color-accent-brand) mb-3 inline-block">
                {lang === "en"
                  ? "WHERE TO START / POR DÓNDE EMPEZAR"
                  : "POR DÓNDE EMPEZAR / WHERE TO START"}
              </span>
              <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-(--color-fg) mb-5 uppercase tracking-tight leading-[0.95]">
                {lang === "en" ? "The three latest" : "Las tres más recientes"}
                <br />
                <span className="italic font-light text-(--color-accent-brand)">
                  {lang === "en" ? "dispatches." : "crónicas."}
                </span>
              </h2>
              <p className="text-(--color-fg)/85 text-base lg:text-lg leading-relaxed">
                {lang === "en"
                  ? `${POST_COUNT} dispatches in the archive below — these three are where Francisco's voice is most recent.`
                  : `${POST_COUNT} crónicas en el archivo abajo — estas tres son donde la voz de Francisco está más reciente.`}
              </p>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
              {STARTING_PICKS.map((post) => (
                <li key={post.id} className="flex flex-col">
                  <NextLink href={`/blog/${post.slug}`} className="group block">
                    <div className="aspect-4/3 mb-5 bg-black border border-(--color-accent-brand)/40 [filter:drop-shadow(0_24px_32px_rgba(0,0,0,0.6))_drop-shadow(0_8px_12px_rgba(0,0,0,0.45))] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.image ?? "/images/photos/francisco-singing-protest.webp"}
                        alt=""
                        aria-hidden="true"
                        className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${postImagePosClass(post)}`}
                        loading="lazy"
                      />
                    </div>
                    {post.category && (
                      <p className="font-ui font-semibold text-[10px] sm:text-xs uppercase tracking-[0.3em] text-(--color-accent-brand) mb-3">
                        {t(post.category, lang)}
                      </p>
                    )}
                    <h3 className="font-heading text-xl lg:text-2xl text-white leading-snug mb-3 group-hover:text-(--color-accent-brand) transition-colors">
                      {t(post.title, lang)}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-4">
                      {t(post.dateDisplay, lang)}
                    </p>
                  </NextLink>
                  <p className="font-body text-sm lg:text-base leading-relaxed text-(--color-fg)/80 mb-5">
                    {t(post.excerpt, lang)}
                  </p>
                  <NextLink
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 font-ui font-semibold text-[11px] uppercase tracking-[0.25em] text-(--color-accent-brand) hover:text-white transition-colors mt-auto"
                  >
                    {lang === "en" ? "Read dispatch" : "Leer crónica"}
                    <span aria-hidden="true">→</span>
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ─── Aulas-style cinematic banner ─────────────────────────────
            Editorial breath between curated picks and the archive grid.
            Same 12/5 → 16/6 → 24/10 aspect rotation as /store and /epk
            banners. The "Archivo" cursive watermark frames what
            follows. */}
        <section
          className="relative w-full overflow-hidden bg-black aspect-12/5 sm:aspect-16/6 lg:aspect-24/10"
          aria-label={lang === "en" ? "The archive" : "El archivo"}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero/1.about.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 [background:linear-gradient(to_right,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.10)_18%,rgba(0,0,0,0)_42%,rgba(0,0,0,0)_58%,rgba(0,0,0,0.10)_82%,rgba(0,0,0,0.45)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-24 bg-linear-to-t from-transparent to-(--color-bg-warm)"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-(--color-bg-warm)"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-6 lg:right-20 lg:top-10 z-10 select-none"
          >
            <p className="font-signature text-7xl lg:text-9xl text-(--color-accent-brand)/55 -rotate-12 leading-none [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              Archivo
            </p>
          </div>
        </section>

        {/* ─── Full archive grid ────────────────────────────────────────
            Every post in reverse chronological order. Each card opens
            the article. Mirrors /store's catalog grid. The section is
            the standard --color-bg black, framed top + bottom with
            warm-tobacco gradient halos so it stands out from the
            sections on either side without changing the section color
            itself. */}
        <section className="relative bg-(--color-bg) section-atmospheric py-20 lg:py-28">
          {/* Warm-tobacco halo at the top edge — receives the cinematic
              banner's brown fade and feathers it into the dark section. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-(--color-bg-warm) to-transparent"
          />
          {/* Warm-tobacco halo at the bottom edge — leads the eye into
              the warm-tobacco "Letter from Francisco" section below. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-(--color-bg-warm) to-transparent"
          />

          <div className="relative mx-auto max-w-(--container-content) px-6">
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-(--color-accent-brand) mb-3 inline-block">
                {lang === "en"
                  ? "THE ARCHIVE / EL ARCHIVO"
                  : "EL ARCHIVO / THE ARCHIVE"}
              </span>
              <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-(--color-fg) uppercase tracking-tight leading-[0.95]">
                {lang === "en" ? "Every dispatch," : "Cada crónica,"}
                <br />
                <span className="italic font-light text-(--color-accent-brand)">
                  {lang === "en" ? "newest first." : "lo más nuevo primero."}
                </span>
              </h2>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {blogPosts.map((post) => (
                <li key={post.id}>
                  <NextLink
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <div className="aspect-4/3 mb-5 bg-black border border-(--color-border-brand) group-hover:border-(--color-accent-brand)/60 transition-colors overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.image ?? "/images/photos/francisco-singing-protest.webp"}
                        alt=""
                        aria-hidden="true"
                        className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${postImagePosClass(post)}`}
                        loading="lazy"
                      />
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      {post.category && (
                        <p className="font-ui font-semibold text-[10px] uppercase tracking-[0.25em] text-(--color-accent-brand)">
                          {t(post.category, lang)}
                        </p>
                      )}
                      <p className="text-[10px] uppercase tracking-[0.2em] text-(--color-muted-brand)">
                        {t(post.dateDisplay, lang)}
                      </p>
                    </div>
                    <h3 className="font-heading text-lg lg:text-xl text-white leading-snug mb-2 group-hover:text-(--color-accent-brand) transition-colors">
                      {t(post.title, lang)}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-(--color-fg)/75 line-clamp-3">
                      {t(post.excerpt, lang)}
                    </p>
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ─── Letter from Francisco ────────────────────────────────────
            Warm-tobacco band — same "From Francisco" pattern as /store.
            Signature script in cursive, italic counter-language line,
            "Comparte" watermark. Personal frame for why he writes. */}
        <section className="bg-(--color-bg-warm) section-atmospheric py-24 lg:py-32 relative isolate overflow-hidden border-t border-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/photos/francisco-festival-performance.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_30%]"
            loading="lazy"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#2a2318]/85" />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-12 top-4 lg:right-24 lg:top-6 z-0 select-none"
          >
            <p className="font-signature text-[8rem] lg:text-[14rem] text-(--color-accent-brand)/15 -rotate-12 leading-none">
              Comparte
            </p>
          </div>

          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
            <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-white mb-6 inline-block">
              {lang === "en" ? "From Francisco / De Francisco" : "De Francisco / From Francisco"}
            </span>

            <p className="font-signature text-3xl sm:text-4xl lg:text-5xl text-(--color-accent-brand) leading-[1.4] mb-8 [text-shadow:0_2px_18px_rgba(0,0,0,0.45)]">
              {lang === "en"
                ? "I write the way I sing — slowly, honestly, in two languages, for whoever is on the road tonight."
                : "Escribo como canto — despacio, con honestidad, en dos idiomas, para quien va de camino esta noche."}
            </p>

            <p className="font-body italic text-base lg:text-lg text-(--color-fg)/85 leading-relaxed mb-10">
              {lang === "en"
                ? "Escribo como canto — despacio, con honestidad, en dos idiomas, para quien va de camino esta noche."
                : "I write the way I sing — slowly, honestly, in two languages, for whoever is on the road tonight."}
            </p>

            <p className="font-signature text-3xl sm:text-4xl text-white leading-none [-webkit-text-stroke:0.4px_currentColor]">
              — Francisco
            </p>
          </div>
        </section>

        {/* ─── Closing supporting CTA ───────────────────────────────────
            Two follow-on links so visitors who close the archive without
            picking a post still have paths into About / Store. Same
            pattern as /store's "What you're supporting" close. */}
        <section className="relative isolate overflow-hidden bg-(--color-bg) section-atmospheric py-24 lg:py-32 border-t border-(--color-border-brand)">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/photos/francisco-city-hall-rally.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_40%]"
            loading="lazy"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#0f0f0f]/80" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-(--color-accent-brand) mb-4 inline-block">
              {lang === "en"
                ? "WHAT YOU'RE READING / LO QUE LEEN"
                : "LO QUE LEEN / WHAT YOU'RE READING"}
            </span>
            <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-(--color-fg) mb-7 uppercase tracking-tight leading-[0.95]">
              {lang === "en" ? "Not a blog —" : "No es un blog —"}
              <br />
              <span className="italic font-light text-(--color-accent-brand)">
                {lang === "en" ? "a letter." : "una carta."}
              </span>
            </h2>
            <p className="font-body text-base lg:text-lg text-(--color-fg)/85 leading-[1.8] mb-10">
              {lang === "en"
                ? "Every dispatch is a letter from the road — to families, to organizers, to teachers, to anyone trying to make sense of the journey. Read one. Share it. Pass the road forward."
                : "Cada crónica es una carta del camino — a familias, a organizadores, a maestras, a cualquiera que intente entender el camino. Lee una. Compártela. Pasa el camino adelante."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <NextLink
                href="/about"
                className="inline-flex items-center gap-2 font-ui font-semibold text-xs uppercase tracking-[0.2em] bg-(--color-accent-brand) text-(--color-bg) hover:bg-(--color-fg) transition-colors px-7 py-3"
              >
                {lang === "en" ? "About Francisco" : "Sobre Francisco"}
              </NextLink>
              <NextLink
                href="/store"
                className="inline-flex items-center gap-2 font-ui font-semibold text-xs uppercase tracking-[0.2em] border border-(--color-accent-brand)/60 text-white hover:bg-(--color-accent-brand) hover:text-(--color-bg) hover:border-(--color-accent-brand) transition-colors px-7 py-3"
              >
                {lang === "en" ? "Hear the music" : "Escuchar la música"}
              </NextLink>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
