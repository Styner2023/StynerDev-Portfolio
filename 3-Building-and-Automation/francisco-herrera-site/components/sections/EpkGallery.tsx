import * as React from "react";
import type { Lang } from "@/lib/i18n";

/**
 * Press-photography gallery — adaptive flex layout (CSS-Tricks pattern,
 * https://css-tricks.com/adaptive-photo-layout-with-flexbox/).
 *
 * Replaces the previous westones-mined fixed 2/3/2/2/1 grid. Each cell
 * keeps its image's natural aspect ratio; `flex-grow: 1` auto-distributes
 * any leftover row width so rows fill cleanly without cropping or per-cell
 * aspect-ratio / object-position tuning. The last item gets `flex-grow: 10`
 * so an orphan tail item expands gracefully to fill its row.
 *
 * Mechanic:
 *   - row height is fixed (320px desktop, 200px ≤768px)
 *   - <img> has `max-height: 100%` + `min-width: 100%` + `object-fit: cover`
 *   - each <li> grows from its image's natural width-at-fixed-height baseline
 *   - flexbox fills remaining row space proportionally
 *
 * Net effect: no more head-clipping, no more per-cell crop bias, every image
 * displays at its native ratio. Title overlay ("Galería / Canto, comunidad,
 * presencia.") rides on cell 2 as a brand anchor. Fade-up reveal animations
 * (from app/epk/page.tsx) apply to each <li>.
 */

export type Bilingual = { en: string; es: string };

export type GalleryCellData = {
  src: string;
  alt: Bilingual;
  /** True on the single cell that carries the gold title overlay
   *  (text supplied via the section-level `overlay` prop). */
  withOverlay?: boolean;
  /** Optional per-image `object-position` override (default "center").
   *  Use sparingly when the flex-cover crop clips a subject — e.g.
   *  a head touching the top of the source. Common values: "center 20%"
   *  (bias up), "center 75%" (bias down). */
  objectPosition?: string;
  /** When true, the cell does not stretch beyond its natural width
   *  (`flex-grow: 0`). The image renders at its source aspect at full
   *  row height, with no top/bottom cropping. Use for tall subjects
   *  whose head/feet would otherwise get clipped when the flex layout
   *  stretches the cell wide. */
  noStretch?: boolean;
  /** Optional per-cell height override (default 320px desktop / 200px
   *  mobile, from .photogallery > li). Use to give a specific cell more
   *  vertical room so the flex-cover crop doesn't clip a subject. CSS
   *  height value, e.g. "460px". */
  height?: string;
};

// Default cell set — press photography gallery (six-album studio /
// festival / venue catch-all). Exported so the consuming page can pass
// it explicitly to <EpkGallery cells={…} /> alongside its own data.
export const PRESS_PHOTO_CELLS: GalleryCellData[] = [
  {
    src: "/images/photos/francisco-portrait-guitar.webp",
    alt: {
      en: "Francisco J. Herrera portrait with classical guitar",
      es: "Retrato de Francisco J. Herrera con guitarra clásica",
    },
  },
  {
    src: "/images/gallery/wide.png",
    alt: {
      en: "Francisco performing with full band on a concert stage",
      es: "Francisco actuando con banda completa en escenario",
    },
    withOverlay: true,
  },
  {
    // 414×414 square — head touches the top edge of the source. When
    // flex stretches the cell wider than 320 (natural width at row
    // height 320 for a 1:1 source), the cover-crop hides the top of
    // the source. Bias up with center 15% so the head sits lower in
    // the visible frame (very little top crop).
    src: "/images/facebook/471278450_10162550647985119_4767484647779335697_n.jpg",
    alt: {
      en: "Francisco J. Herrera performing at an intimate brick-wall venue",
      es: "Francisco J. Herrera actuando en un local íntimo de pared de ladrillo",
    },
    objectPosition: "center 15%",
  },
  {
    src: "/images/photos/francisco-festival-performance.webp",
    alt: {
      en: "Francisco J. Herrera in performance at a festival",
      es: "Francisco J. Herrera en presentación en un festival",
    },
  },
  {
    src: "/images/Previous_events/image_f0cb2b2c.png",
    alt: {
      en: "Francisco performing with classical guitar in a chapel",
      es: "Francisco actuando con guitarra clásica en una capilla",
    },
  },
  {
    src: "/images/facebook/488006864_18386482891113352_8570978093327498432_n.jpg",
    alt: {
      en: "Francisco performing in front of a vibrant Aztec mural",
      es: "Francisco tocando frente a un mural azteca vibrante",
    },
  },
  {
    src: "/images/facebook/508396447_1320591080073606_4039395702692812573_n.jpg",
    alt: {
      en: "Francisco's band on tour in traditional Oaxacan attire",
      es: "La banda de Francisco en gira con vestimenta tradicional oaxaqueña",
    },
  },
  {
    src: "/images/gallery/portrait.png",
    alt: {
      en: "Francisco mid-song with steel-string acoustic guitar at an intimate venue",
      es: "Francisco cantando con guitarra acústica en un local íntimo",
    },
  },
  {
    src: "/images/facebook/492450869_1225361482923004_7199824605230553525_n.jpg",
    alt: {
      en: "Francisco on stage with electric guitar before an organize-educate-mobilize backdrop",
      es: "Francisco en escena con guitarra eléctrica frente a un fondo de organizar-educar-movilizar",
    },
  },
  {
    src: "/images/photos/meta_eyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ==.webp",
    alt: {
      en: "Francisco J. Herrera playing classical guitar for a group of children sitting on the floor in a community room",
      es: "Francisco J. Herrera tocando guitarra clásica para un grupo de niños sentados en el suelo de un salón comunitario",
    },
  },
];

// "Moments" gallery — curated from /public/images/client-sent-images.
// Filtered for correct orientation (skips IMG_0058, IMG_8033, IMG_0139
// which have unhandled EXIF rotation) and freshness (skips 4.png /
// 5.png / 10.png / Francisco-J._Herrera.png which already appear as
// cinematic banners on /about, /store, and /epk).
export const MOMENTS_CELLS: GalleryCellData[] = [
  // PUBLIC LANDS rally — Francisco singing/laughing with classical guitar.
  // Source is 4419×6250 portrait — much taller than wide. In a landscape
  // flex cell, the cover-crop hides the top + bottom equally; centering
  // shows the middle. Bias up with center 25% so the head sits lower in
  // the frame (more visible) and the bottom of the source gets cropped
  // instead of the top.
  {
    src: "/images/client-sent-images/1.png",
    alt: {
      en: "Francisco singing with classical guitar at a Public Lands rally",
      es: "Francisco cantando con guitarra clásica en un mitin por las tierras públicas",
    },
    withOverlay: true,
    objectPosition: "center 25%",
  },
  // School/library performance for children
  {
    src: "/images/client-sent-images/11.png",
    alt: {
      en: "Francisco performing classical guitar for children in a school library",
      es: "Francisco tocando guitarra clásica para niños en una biblioteca escolar",
    },
  },
  // Studio recording session with full band
  {
    src: "/images/client-sent-images/69846564008__2864B8A4-74A6-440A-B1A2-60F232DAC2AA.jpeg",
    alt: {
      en: "Francisco and full band in a recording-studio live room with wood-acoustic panels",
      es: "Francisco y la banda completa en una sala de grabación con paneles acústicos de madera",
    },
  },
  // Outdoor protest stage, acoustic guitar
  {
    src: "/images/client-sent-images/IMG_0420.jpeg",
    alt: {
      en: "Francisco performing on an outdoor protest stage with acoustic guitar",
      es: "Francisco actuando en un escenario al aire libre con guitarra acústica",
    },
  },
  // Indoor venue / fellow musician moment
  {
    src: "/images/client-sent-images/IMG_0628.jpeg",
    alt: {
      en: "Francisco with a fellow musician inside a warm theater",
      es: "Francisco con otro músico dentro de un teatro cálido",
    },
  },
  // Concert stage with magenta backlight — classical guitar at the mic.
  // The 1206×685 source has Francisco's head near the top with little
  // breathing room. Two fixes compose: (a) `height: 460px` gives the
  // cell more vertical room than the default 320, reducing the amount
  // of overflow when flex stretches the cell wide; (b) `objectPosition:
  // center 25%` biases the cover-crop window upward through the source
  // so the head sits lower in the visible frame (less clipped on top,
  // more clipped on bottom).
  {
    src: "/images/client-sent-images/IMG_1053.jpeg",
    alt: {
      en: "Francisco singing with classical guitar at the microphone, magenta concert lighting",
      es: "Francisco cantando con guitarra clásica al micrófono, iluminación magenta de concierto",
    },
    height: "460px",
    objectPosition: "center 25%",
  },
];

const STYLES = `
.photogallery {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.photogallery > li {
  position: relative;
  flex-grow: 1;
  /* Per-cell height comes from the --cell-height custom property set
     inline by GalleryItem (falls back to 320px). Using a var rather than
     an inline height so the @media queries below can still override for
     tablet/mobile breakpoints. */
  height: var(--cell-height, 320px);
  overflow: hidden;
  border: 1px solid var(--color-border-brand);
  background: #000;
}
.photogallery > li:last-child {
  flex-grow: 10;
}
.photogallery > li > a {
  display: block;
  height: 100%;
  outline-offset: 2px;
}
.photogallery > li > a:focus-visible {
  outline: 2px solid var(--color-accent-brand);
}
.photogallery img {
  max-height: 100%;
  min-width: 100%;
  object-fit: cover;
  vertical-align: bottom;
  display: block;
  transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}
.photogallery > li:hover img {
  transform: scale(1.025);
}
@media (max-width: 1100px) {
  .photogallery > li { height: 260px; }
}
@media (max-width: 767px) {
  .photogallery > li { height: 200px; }
  .photogallery { gap: 0.5rem; }
}

/* Title overlay on the designated hero cell. Same brand recipe as the
   previous grid version — gold Silently script + italic Lora subtitle. */
.gallery-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  padding: 1rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  pointer-events: none;
  text-align: right;
}
.gallery-overlay-title {
  font-family: var(--font-signature);
  color: var(--color-accent-brand);
  font-size: clamp(2.25rem, 5vw, 4rem);
  line-height: 0.95;
  margin: 0;
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.55);
}
.gallery-overlay-subtitle {
  font-family: var(--font-body);
  font-style: italic;
  color: rgba(255, 229, 168, 0.9);
  font-size: clamp(0.8125rem, 1.2vw, 1rem);
  margin: 0.4rem 0 0;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.55);
  letter-spacing: 0.005em;
}
`;

type Props = {
  lang: Lang;
  /** Cells to render. Default exports `PRESS_PHOTO_CELLS` and `MOMENTS_CELLS`. */
  cells: GalleryCellData[];
  /** Section eyebrow (small uppercase tracking line above the lead copy).
   *  Pass a single string already-formatted bilingually, e.g.
   *  "PRESS PHOTOGRAPHY / FOTOGRAFÍA DE PRENSA". */
  eyebrow: string;
  /** Optional headline (e.g. "From the") rendered between the eyebrow
   *  and the lead. Omit to keep the /epk minimal eyebrow + lead
   *  arrangement. Pair with `titleAccent` to get the /epk two-line
   *  split (heavy uppercase head + italic gold tail). */
  title?: string;
  /** Optional italic gold accent rendered on its own line after `title`
   *  (e.g. "rooms."). Mirrors the /epk pattern "Cantos / from the
   *  border." If omitted, the title renders as a single line with a
   *  trailing italic gold period. */
  titleAccent?: string;
  /** Lead paragraph under the eyebrow (small editorial copy). */
  lead: string;
  /** Optional overlay text rendered on the single cell marked
   *  `withOverlay: true`. Two-line: gold Silently script title +
   *  italic Lora subtitle. If omitted, no overlay is rendered even if
   *  a cell carries `withOverlay`. */
  overlay?: { title: string; subtitle: string };
  /** Optional aria-label for the section element. Defaults to
   *  "Photo gallery" (EN) / "Galería de fotos" (ES). */
  ariaLabel?: string;
  /** Optional embedded photo background (mirrors /epk's Bio/Listen/Contact
   *  pattern). When set, the section adds an absolute-positioned `<img>` +
   *  scrim layer behind the content — same recipe as the other photo-bg
   *  sections. */
  backgroundImageSrc?: string;
  /** Optional CSS `object-position` for the background image (default
   *  `center`). Use e.g. `"center 25%"` to bias the cover-crop up. */
  backgroundImagePosition?: string;
  /** Optional tobacco tier override (default `"bg-deeper"`). Switches the
   *  section background AND the photo scrim to match. */
  tier?: "bg" | "bg-warm" | "bg-deeper";
  /** Optional Silently-script side watermark (e.g. "Salas", "Caminos",
   *  "Momentos"). Renders rotated `-12deg` in the top-left corner —
   *  same editorial accent as other section watermarks across the site. */
  sideWatermark?: string;
};

export function EpkGallery({
  lang,
  cells,
  eyebrow,
  title,
  titleAccent,
  lead,
  overlay,
  ariaLabel,
  backgroundImageSrc,
  backgroundImagePosition,
  tier = "bg-deeper",
  sideWatermark,
}: Props) {
  const sectionLabel =
    ariaLabel ?? (lang === "en" ? "Photo gallery" : "Galería de fotos");
  // Per-tier section bg + matching scrim color for the photo bg layer.
  const tierBgClass =
    tier === "bg"
      ? "bg-[var(--color-bg)]"
      : tier === "bg-warm"
        ? "bg-[var(--color-bg-warm)]"
        : "bg-[var(--color-bg-deeper)]";
  const scrimColor =
    tier === "bg" ? "#0f0f0f" : tier === "bg-warm" ? "#2a2318" : "#1f1b10";
  const scrimOpacity = tier === "bg" ? 80 : 85;
  return (
    <section
      aria-label={sectionLabel}
      className={`relative ${backgroundImageSrc ? "isolate overflow-hidden " : ""}${tierBgClass} section-atmospheric border-t border-black py-20 lg:py-28`}
    >
      {backgroundImageSrc && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={backgroundImageSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            style={
              backgroundImagePosition
                ? { objectPosition: backgroundImagePosition }
                : undefined
            }
            loading="lazy"
          />
          {/* Tier-matched tobacco scrim — same recipe as /epk's photo-bg sections. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{ backgroundColor: `${scrimColor}${scrimOpacity === 80 ? "cc" : "d9"}` }}
          />
        </>
      )}
      {sideWatermark && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-4 sm:left-4 sm:top-6 lg:left-12 lg:top-10 z-0 select-none"
        >
          <p className="font-signature text-6xl sm:text-8xl lg:text-[10rem] text-[var(--color-accent-brand)]/25 -rotate-12 leading-none [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
            {sideWatermark}
          </p>
        </div>
      )}
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="relative mx-auto max-w-[var(--container-content)] px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10 lg:mb-14 max-w-3xl mx-auto epk-fade-up">
          <span className="font-ui font-semibold text-[11px] sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.4em] text-[var(--color-accent-brand)] mb-3 inline-block">
            {eyebrow}
          </span>
          {title && (
            <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] mb-5 uppercase tracking-tight leading-[0.95]">
              {title}
              {titleAccent ? (
                <>
                  <br />
                  <span className="italic font-light text-[var(--color-accent-brand)]">
                    {titleAccent}
                  </span>
                </>
              ) : (
                <span className="italic font-light text-[var(--color-accent-brand)]">.</span>
              )}
            </h2>
          )}
          <p className="text-[var(--color-fg)]/85 text-sm sm:text-base lg:text-lg leading-relaxed">
            {lead}
          </p>
        </div>
        <ul className="photogallery">
          {cells.map((cell) => (
            <GalleryItem
              key={cell.src}
              cell={cell}
              lang={lang}
              overlay={overlay}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function GalleryItem({
  cell,
  lang,
  overlay,
}: {
  cell: GalleryCellData;
  lang: Lang;
  overlay?: { title: string; subtitle: string };
}) {
  const altText = cell.alt[lang];
  const linkLabel =
    lang === "en"
      ? `Open ${altText} in a new tab`
      : `Abrir ${altText} en una pestaña nueva`;

  // We expose `cell.height` as a CSS custom property rather than an inline
  // `height` so the mobile media query (.photogallery > li { height: 200px })
  // can still override the per-cell value. Inline styles otherwise win and
  // produced 200px+ of empty black space below the IMG_1053 cell on mobile.
  const liStyle: React.CSSProperties & Record<string, string | number> = {};
  if (cell.noStretch) liStyle.flexGrow = 0;
  if (cell.height) liStyle["--cell-height"] = cell.height;
  const hasLiStyle = cell.noStretch || cell.height;

  return (
    <li
      className="epk-fade-up"
      style={hasLiStyle ? liStyle : undefined}
    >
      <a
        href={cell.src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={linkLabel}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cell.src}
          alt={altText}
          loading="lazy"
          style={
            cell.objectPosition ? { objectPosition: cell.objectPosition } : undefined
          }
        />
      </a>
      {cell.withOverlay && overlay && (
        <div className="gallery-overlay" aria-hidden="true">
          <h2 className="gallery-overlay-title">{overlay.title}</h2>
          <p className="gallery-overlay-subtitle">{overlay.subtitle}</p>
        </div>
      )}
    </li>
  );
}
