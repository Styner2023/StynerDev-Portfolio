import * as React from "react";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Headphones, MessageCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { blogPosts, getPostBySlug } from "@/lib/content/blog";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import type { BlogPost } from "@/lib/content/blog";

// Default featured image used when a post has no `image` field. Falls back
// to the rally photo so every article opens with a visual.
const DEFAULT_HERO = "/images/photos/francisco-singing-protest.webp";

// Each post in the data file is paired with a thumbnail/feature image. When
// a post entry doesn't define `image`, we infer one based on what the post
// is about so the sidebar still renders a visual instead of bare text.
function postImage(post: BlogPost): string {
  if (post.image) return post.image;
  return DEFAULT_HERO;
}

// Per-post crop-anchor override — kept in sync with the same helper on
// the /blog index page so a post's card looks identical in either spot.
function postImagePosClass(p: BlogPost): string {
  if (p.slug === "the-washing-machine") return "object-[center_20%]";
  if (p.image?.includes("/Solo-Portraits/")) return "object-top";
  return "";
}

type Params = Promise<{ slug: string }>;

/** Pre-render every known post slug at build time. */
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

/** Estimate read time from body word count at 200 wpm — same heuristic
 *  Medium uses on its article meta row. */
function readTimeMinutes(post: { body: { en: string; es: string }[] }): number {
  const words = post.body.reduce((n, p) => n + p.en.split(/\s+/).length, 0);
  return Math.max(1, Math.round(words / 200));
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const lang = await getLang();

  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const idx = blogPosts.findIndex((p) => p.slug === post.slug);
  const newerPost = idx > 0 ? blogPosts[idx - 1] : null;
  const olderPost = idx < blogPosts.length - 1 ? blogPosts[idx + 1] : null;

  const heroImage = post.image ?? DEFAULT_HERO;
  const minutes = readTimeMinutes(post);

  return (
    <>
      <Header lang={lang} />

      <main>
        {/* ─── Article masthead ──────────────────────────────────────────
            Cinematic dark hero mirroring /store hero recipe: full-width
            photo bg + dark scrim + bilingual eyebrow + split title +
            "Crónica" signature watermark. Replaces the bare in-column
            H1 so every article opens on the same visual register as the
            rest of the site. The hero image doubles as the post's lead
            visual, so the in-flow figure has been removed. */}
        <section
          className="relative isolate overflow-hidden pt-32 lg:pt-44 pb-20 lg:pb-28 border-b border-(--color-border-brand) bg-(--color-bg)"
          aria-label={t(post.title, lang)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_25%]"
            loading="eager"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/30" />
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
            className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-b from-transparent to-(--color-bg)"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-6 lg:right-12 lg:top-10 z-0 select-none"
          >
            <p className="font-signature text-7xl lg:text-9xl text-(--color-accent-brand)/35 -rotate-12 leading-none [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              Crónica
            </p>
          </div>

          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
            <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-(--color-accent-brand) mb-4 inline-block">
              {post.category
                ? t(post.category, lang)
                : lang === "en"
                  ? "DISPATCH / CRÓNICA"
                  : "CRÓNICA / DISPATCH"}
            </span>
            {(() => {
              const full = t(post.title, lang);
              const idx = full.indexOf(" — ");
              if (idx >= 0) {
                const head = full.slice(0, idx) + " —";
                const tail = full.slice(idx + 3) + ".";
                return (
                  <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-7xl text-(--color-fg) mb-6 uppercase tracking-tight leading-[0.95] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
                    {head}
                    <br />
                    <span className="italic font-light text-(--color-accent-brand)">
                      {tail}
                    </span>
                  </h1>
                );
              }
              return (
                <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-7xl text-(--color-fg) mb-6 uppercase tracking-tight leading-[0.95] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
                  {full}
                  <span className="italic font-light text-(--color-accent-brand)">.</span>
                </h1>
              );
            })()}
            <p className="font-ui text-sm lg:text-base text-white/85 tracking-wider [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
              {t(post.dateDisplay, lang)} · {minutes} {lang === "en" ? "min read" : "min de lectura"}
            </p>
          </div>
        </section>

      {/* Whole reading area sits on the paper texture — sidebar and article
          on the same cream surface, separated by a vertical divider rather
          than a contrasting bg. */}
      <div className="blog-reading-bg">
        <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)] pt-10 lg:pt-14 pb-20 lg:pb-24">
          {/* ─── Left sidebar — Medium-profile-style vertical card list,
              pinned to the far-left edge. Capped to the SIDEBAR_LIMIT
              newest posts so the sidebar never outruns the article. The
              current post is always included even if it's older than the
              cutoff. A right-edge vertical line separates the sidebar
              from the article gutter. */}
          <aside
            aria-label={lang === "en" ? "More posts" : "Más entradas"}
            className="hidden lg:block pl-8 pr-8 blog-sidebar-divider"
          >
            <h2 className="font-ui font-bold text-sm uppercase tracking-[0.2em] blog-reading-muted mb-5">
              {lang === "en" ? "More posts" : "Más entradas"}
            </h2>
            <ul className="space-y-5">
              {(() => {
                const SIDEBAR_LIMIT = 8;
                let visible = blogPosts.slice(0, SIDEBAR_LIMIT);
                // Make sure the current post is always represented in the
                // sidebar so its "you are here" highlight is visible.
                if (!visible.some((p) => p.slug === post.slug)) {
                  visible = [...visible.slice(0, SIDEBAR_LIMIT - 1), post];
                }
                return visible.map((p) => {
                  const isCurrent = p.slug === post.slug;
                  return (
                    <li key={p.id}>
                      <NextLink
                        href={`/blog/${p.slug}`}
                        aria-current={isCurrent ? "page" : undefined}
                        className="group block blog-card"
                        data-current={isCurrent ? "true" : "false"}
                      >
                        <div className="relative aspect-16/10 overflow-hidden bg-(--color-bg)">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={postImage(p)}
                            alt=""
                            aria-hidden="true"
                            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] ${postImagePosClass(p)}`}
                            loading="lazy"
                          />
                          {/* Inner edge gradient — gives the photo a printed-on-paper
                              feel, like the album-cover treatments on the homepage. */}
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 [box-shadow:inset_0_0_0_1px_rgba(0,0,0,0.08),inset_0_-12px_24px_-12px_rgba(0,0,0,0.25)] pointer-events-none"
                          />
                        </div>
                        <div className="px-3 py-3">
                          <h3
                            className={[
                              "font-ui font-semibold text-sm leading-snug mb-1 line-clamp-2",
                              isCurrent ? "text-(--color-accent-brand)" : "blog-reading-heading group-hover:text-(--color-accent-brand) transition-colors",
                            ].join(" ")}
                          >
                            {t(p.title, lang)}
                          </h3>
                          <p className="text-xs blog-reading-muted">
                            {t(p.dateDisplay, lang)}
                          </p>
                        </div>
                      </NextLink>
                    </li>
                  );
                });
              })()}
            </ul>

            {blogPosts.length > 8 && (
              <p className="mt-6 text-xs italic font-body blog-reading-muted">
                {lang === "en"
                  ? `+ ${blogPosts.length - 8} older posts in the archive — find them via the prev / next links below the article.`
                  : `+ ${blogPosts.length - 8} entradas más en el archivo — accédelas con los enlaces anterior / siguiente debajo del artículo.`}
              </p>
            )}
          </aside>

          {/* ─── Article — paper-textured column. The outer page is on the
              flat warm off-white; the texture is reserved for the actual
              reading column so it reads as a distinct material in the
              center. Padding pulls the texture away from the text edges. */}
          <article className="mx-auto w-full max-w-[760px] blog-paper-bg px-6 sm:px-10 lg:px-12 py-10 lg:py-14">
            {/* Title is rendered in the cinematic masthead above. The
                article column opens directly with the author row so the
                visitor isn't reading the headline twice. */}

            {/* Author row — real portrait of Francisco, mirrors the elegant
                portrait treatment used on /epk and /about. */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="relative size-12 rounded-full overflow-hidden shrink-0 ring-1 ring-(--color-accent-brand)/30"
                aria-hidden="true"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/photos/francisco-portrait-guitar.webp"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
                  loading="eager"
                />
              </div>
              <div className="flex flex-col text-sm">
                <span className="blog-reading-heading font-medium">Francisco J. Herrera</span>
                <span className="blog-reading-muted">
                  {minutes} {lang === "en" ? "min read" : "min de lectura"} · {t(post.dateDisplay, lang)}
                </span>
              </div>
            </div>

            {(post.hasAudio || post.hasPodcast || post.commentCount !== undefined) && (
              <div className="flex items-center gap-5 border-y blog-reading-border py-3 mb-12 blog-reading-muted">
                {(post.hasAudio || post.hasPodcast) && (
                  <a
                    href={post.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm hover:blog-reading-text transition-colors"
                    aria-label={lang === "en" ? "Listen to audio on original post" : "Escuchar audio en la entrada original"}
                  >
                    <Headphones className="size-4" aria-hidden="true" />
                  </a>
                )}
                {post.commentCount !== undefined && (
                  <span className="inline-flex items-center gap-1.5 text-sm">
                    <MessageCircle className="size-4" aria-hidden="true" />
                    {post.commentCount}
                  </span>
                )}
              </div>
            )}

            {/* Featured image is now the cinematic masthead above the
                reading column, so the in-flow figure has been removed to
                avoid showing the same image twice. */}

            {/* Dek / pull-quote */}
            <blockquote className="border-l-2 border-(--color-accent-brand) pl-6 mb-10">
              <p className="font-body italic text-lg lg:text-xl blog-reading-heading leading-[1.55]">
                {t(post.excerpt, lang)}
              </p>
            </blockquote>

            {/* "···" section separator */}
            <div aria-hidden="true" className="blog-section-break mb-10">
              <span>·</span>
            </div>

            {/* Body */}
            <div className="space-y-7">
              {post.body.map((para, i) => (
                <p
                  key={i}
                  className="font-body text-lg lg:text-[19px] leading-[1.7] blog-reading-text"
                >
                  {t(para, lang)}
                </p>
              ))}
            </div>

            {(post.hasAudio || post.hasPodcast) && (
              <div className="mt-12 p-5 border blog-reading-border blog-reading-bg-deep">
                <p className="text-sm leading-relaxed mb-3 font-ui blog-reading-text">
                  {lang === "en"
                    ? "This post includes an audio recording on the original site."
                    : "Esta entrada incluye una grabación de audio en el sitio original."}
                </p>
                <a
                  href={post.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-ui font-semibold text-sm text-(--color-accent-brand) hover:underline"
                >
                  <Headphones className="size-4" aria-hidden="true" />
                  {lang === "en" ? "Listen on the original post" : "Escuchar en la entrada original"}
                  <ExternalLink className="size-3" aria-hidden="true" />
                </a>
              </div>
            )}

            {/* Provenance */}
            <div className="mt-14 pt-6 border-t blog-reading-border text-sm font-body italic blog-reading-muted">
              {lang === "en" ? "Originally published on " : "Publicado originalmente en "}
              <a
                href={post.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--color-accent-brand) hover:underline inline-flex items-center gap-1 not-italic"
              >
                franciscoherreramusic.com
                <ExternalLink className="size-3" aria-hidden="true" />
              </a>
              {" — "}
              {t(post.dateDisplay, lang)}
            </div>

            {/* Comments */}
            {post.comments && post.comments.length > 0 && (
              <section className="mt-20 lg:mt-24" aria-label={lang === "en" ? "Responses" : "Respuestas"}>
                <header className="mb-8 border-b blog-reading-border pb-4">
                  <h2 className="font-ui font-bold text-2xl blog-reading-heading">
                    {lang === "en" ? "Responses" : "Respuestas"}
                    {post.commentCount !== undefined && (
                      <span className="ml-2 blog-reading-muted font-medium">
                        ({post.commentCount})
                      </span>
                    )}
                  </h2>
                  {post.commentCount !== undefined && post.commentCount > post.comments.length && (
                    <p className="text-sm font-body italic blog-reading-muted mt-2">
                      {lang === "en"
                        ? `${post.comments.length} captured from the original post.`
                        : `${post.comments.length} capturados de la entrada original.`}
                    </p>
                  )}
                </header>

                <ul className="space-y-8">
                  {post.comments.map((c, i) => (
                    <li key={i} className="border-b blog-reading-border pb-7 last:border-b-0">
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className="flex items-center justify-center size-9 rounded-full bg-(--color-accent-brand)/15 text-(--color-accent-brand) font-ui font-semibold text-sm shrink-0"
                          aria-hidden="true"
                        >
                          {c.author.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col text-sm">
                          <span className="font-ui font-semibold blog-reading-heading">
                            {c.author}
                            {c.location && (
                              <span className="font-normal blog-reading-muted ml-2">{c.location}</span>
                            )}
                          </span>
                          <span className="text-xs blog-reading-muted">{c.date}</span>
                        </div>
                      </div>
                      <p className="font-body text-base leading-[1.65] blog-reading-text pl-12">
                        {c.body}
                      </p>
                    </li>
                  ))}
                </ul>

                {post.commentCount !== undefined && post.commentCount > post.comments.length && (
                  <p className="text-sm font-body italic blog-reading-muted mt-10 text-center">
                    {lang === "en"
                      ? `+ ${post.commentCount - post.comments.length} more responses on the `
                      : `+ ${post.commentCount - post.comments.length} respuestas más en la `}
                    <a
                      href={post.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-(--color-accent-brand) hover:underline not-italic"
                    >
                      {lang === "en" ? "original post" : "entrada original"}
                    </a>
                  </p>
                )}
              </section>
            )}
          </article>
        </div>

        {/* Mobile-only: horizontal-scroll rail of other posts at the bottom
            of the article, since the sidebar is hidden below lg. Keeps the
            same "always know what else exists" affordance Medium readers
            expect from the desktop sidebar. */}
        <section
          aria-label={lang === "en" ? "More posts" : "Más entradas"}
          className="lg:hidden border-t blog-reading-border pt-10 pb-12 px-4"
        >
          <h2 className="font-ui font-bold text-sm uppercase tracking-[0.2em] blog-reading-muted mb-5">
            {lang === "en" ? "More posts" : "Más entradas"}
          </h2>
          <ul className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory">
            {blogPosts
              .filter((p) => p.slug !== post.slug)
              .map((p) => (
                <li key={p.id} className="shrink-0 w-56 snap-start">
                  <NextLink href={`/blog/${p.slug}`} className="block">
                    <div className="relative aspect-16/10 overflow-hidden bg-(--color-bg) mb-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={postImage(p)}
                        alt=""
                        aria-hidden="true"
                        className={`absolute inset-0 h-full w-full object-cover ${postImagePosClass(p)}`}
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-ui font-semibold text-sm leading-snug mb-1 line-clamp-2 blog-reading-heading">
                      {t(p.title, lang)}
                    </h3>
                    <p className="text-xs blog-reading-muted">{t(p.dateDisplay, lang)}</p>
                  </NextLink>
                </li>
              ))}
          </ul>
        </section>
        </div>
      </main>

      {/* ─── Sigue cinematic banner ──────────────────────────────────────
          Magazine-style breath between the article and the close. Same
          12/5 → 16/6 → 24/10 aspect rotation as /store's Aulas and
          Disfrútalos banners. The "Sigue" cursive watermark mirrors
          /epk's Caminos pattern — a single word in the signature script
          that frames what comes next. */}
      <section
        className="relative w-full overflow-hidden bg-black aspect-12/5 sm:aspect-16/6 lg:aspect-24/10"
        aria-label={lang === "en" ? "Continue the journey" : "Sigue el camino"}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/photos/streetlights-sunset.png"
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
          className="absolute inset-x-0 top-0 h-24 bg-linear-to-t from-transparent to-(--color-bg)"
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
            Sigue
          </p>
        </div>
      </section>

      {/* ─── Magazine close — "Keep reading / Sigue leyendo" ─────────────
          Same warm-tobacco scrim + photo bg pattern as /store's "From
          Francisco" letter. Closes the article with prev/next and the
          provenance link, on a tier-matched warm-tobacco surface so the
          visitor lands somewhere on-brand instead of bouncing into the
          footer. */}
      <section className="relative isolate overflow-hidden bg-(--color-bg-warm) section-atmospheric py-20 lg:py-28 border-t border-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/photos/francisco-portrait-guitar.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_30%]"
          loading="lazy"
        />
        {/* Warm-tobacco scrim — matches /store letter recipe. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#2a2318]/90" />

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-(--color-accent-brand) mb-4 inline-block">
              {lang === "en"
                ? "KEEP READING / SIGUE LEYENDO"
                : "SIGUE LEYENDO / KEEP READING"}
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-(--color-fg) uppercase tracking-tight leading-[0.95]">
              {lang === "en" ? "The journey" : "El camino"}
              <br />
              <span className="italic font-light text-(--color-accent-brand)">
                {lang === "en" ? "continues." : "sigue."}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {newerPost ? (
              <NextLink
                href={`/blog/${newerPost.slug}`}
                className="group block p-6 border border-(--color-accent-brand)/40 hover:border-(--color-accent-brand) bg-black/30 hover:bg-black/50 transition-colors"
              >
                <div className="inline-flex items-center gap-2 font-ui font-semibold text-xs uppercase tracking-[0.2em] text-(--color-accent-brand) mb-3">
                  <ArrowLeft className="size-3.5" aria-hidden="true" />
                  {lang === "en" ? "Newer post" : "Entrada más nueva"}
                </div>
                <p className="font-heading text-base lg:text-lg text-white group-hover:text-(--color-accent-brand) transition-colors leading-snug">
                  {t(newerPost.title, lang)}
                </p>
              </NextLink>
            ) : (
              <div />
            )}
            {olderPost ? (
              <NextLink
                href={`/blog/${olderPost.slug}`}
                className="group block p-6 border border-(--color-accent-brand)/40 hover:border-(--color-accent-brand) bg-black/30 hover:bg-black/50 transition-colors text-right"
              >
                <div className="inline-flex items-center gap-2 font-ui font-semibold text-xs uppercase tracking-[0.2em] text-(--color-accent-brand) mb-3 justify-end w-full">
                  {lang === "en" ? "Older post" : "Entrada anterior"}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </div>
                <p className="font-heading text-base lg:text-lg text-white group-hover:text-(--color-accent-brand) transition-colors leading-snug">
                  {t(olderPost.title, lang)}
                </p>
              </NextLink>
            ) : (
              <div />
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={post.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-ui font-semibold text-xs uppercase tracking-[0.2em] border border-(--color-accent-brand)/60 text-white hover:bg-(--color-accent-brand) hover:text-(--color-bg) hover:border-(--color-accent-brand) transition-colors px-7 py-3"
            >
              {lang === "en" ? "Read on the original site" : "Leer en el sitio original"}
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
            <NextLink
              href="/store"
              className="inline-flex items-center gap-2 font-ui font-semibold text-xs uppercase tracking-[0.2em] bg-(--color-accent-brand) text-(--color-bg) hover:bg-(--color-fg) transition-colors px-7 py-3"
            >
              {lang === "en" ? "Hear the music" : "Escuchar la música"}
            </NextLink>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </>
  );
}
