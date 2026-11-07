"use client";

// Guitare source: sections/slideshow.liquid
// - Wrapper "dt-sc-swiper-slider swiper-container" lines 1-38
// - Per-slide structure via slider-data snippet, lines 12-23
// - Schema defaults — autoplay off (line 463), dots on (line 483), arrows configurable
//   (demo: arrows off, dots on per templates/index.json)
// - Heights: desktop 1750 / laptop 700 / tablet 600 / mobile 350 (index.json)
// CSS reference: dt-framework.css swiper styles + dt-custom.css overrides.

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import NextLink from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";
import { buttonVariants } from "@/components/ui/button";
import type { HeroSlide } from "@/lib/content/home";

type Props = {
  slides: HeroSlide[];
  lang?: Lang;
  autoplay?: boolean;
};

// Maps the optional HeroSlide.imagePosition to a Tailwind utility class.
// Tailwind v4 JIT only generates classes that appear as literal strings in
// source, so each value is hard-coded here rather than templated.
const OBJECT_POSITION_CLASSES: Record<string, string> = {
  top: "object-top",
  bottom: "object-bottom",
  left: "object-left",
  right: "object-right",
  center: "object-center",
  // Softer alternatives between center and top — useful when subjects sit
  // in the upper third of a tall photo.
  "top-25": "object-[center_25%]",
  "top-30": "object-[center_30%]",
  "top-35": "object-[center_35%]",
  "top-40": "object-[center_40%]",
  // Mirror set toward the bottom — useful when subjects' lower half (hands,
  // instruments) needs to stay in frame on a horizontal photo.
  "bottom-60": "object-[center_60%]",
  "bottom-65": "object-[center_65%]",
  "bottom-70": "object-[center_70%]",
  "bottom-75": "object-[center_75%]",
};

// Tailwind classes for the optional uniform `tint` overlay on a slide,
// independent of the gradient `overlay`. Useful when overlay is off but the
// image still needs a slight darkening for contrast.
const TINT_CLASSES = {
  light: "bg-black/15",
  medium: "bg-black/30",
  heavy: "bg-black/55",
} as const;

export function HeroSlideshow({ slides, lang = "en", autoplay = false }: Props) {
  const plugins = React.useMemo(
    () => (autoplay ? [Autoplay({ delay: 5000, stopOnInteraction: false })] : []),
    [autoplay],
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, plugins);
  const [selected, setSelected] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = React.useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={lang === "en" ? "Hero slideshow" : "Carrusel principal"}
      className="relative w-full bg-[var(--color-bg)]"
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => {
            const overlay = slide.overlay ?? true;
            const centerBelow = slide.align === "center-below";
            const rightBelow = slide.align === "right-below";
            return (
            <div
              key={slide.id}
              className="relative shrink-0 grow-0 basis-full"
              role="group"
              aria-roledescription="slide"
            >
              <div
                className={[
                  "relative bg-black",
                  // Honor Migrante slide gets a taller mobile crop only;
                  // every other slide keeps the original 350px mobile height.
                  slide.id === "honor-migrante" ? "h-[460px]" : "h-[350px]",
                  "sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[780px]",
                ].join(" ")}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image}
                  alt={t(slide.imageAlt, lang)}
                  className={[
                    "absolute inset-0 h-full w-full",
                    slide.imageFit === "contain" ? "object-contain scale-[1.08]" : "object-cover",
                    OBJECT_POSITION_CLASSES[slide.imagePosition ?? ""] ?? "",
                  ].join(" ")}
                  loading="eager"
                />
                {overlay && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10"
                  />
                )}
                {slide.tint && (
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 ${TINT_CLASSES[slide.tint]}`}
                  />
                )}
                {slide.sideVignette && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 [background:linear-gradient(to_right,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.30)_15%,rgba(0,0,0,0.10)_38%,rgba(0,0,0,0.05)_62%,rgba(0,0,0,0.25)_88%,rgba(0,0,0,0.50)_100%)]"
                  />
                )}
                {centerBelow || rightBelow ? (
                  <div
                    className={[
                      "relative h-full mx-auto max-w-[var(--container-content)] px-5 sm:px-10 flex items-end pb-12 sm:pb-20 md:pb-24 lg:pb-32",
                      rightBelow ? "justify-end" : "justify-center",
                    ].join(" ")}
                  >
                    <div className="max-w-3xl text-center">
                      {slide.decorTitle && (
                        <p className="font-heading font-black uppercase tracking-wide text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-gold-3d leading-none mb-3 sm:mb-4">
                          {t(slide.decorTitle, lang)}
                        </p>
                      )}
                      <span className="font-heading text-[10px] sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.4em] text-white mb-3 sm:mb-4 inline-block max-w-full break-words">
                        {t(slide.eyebrow, lang)}
                      </span>
                      <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[var(--color-fg)] !leading-[1.1] mb-4 sm:mb-5 font-light break-words">
                        {t(slide.title, lang)}
                      </h2>
                      <p className="text-[var(--color-fg)]/85 text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed">
                        {t(slide.tagline, lang)}
                      </p>
                      <NextLink
                        href={slide.cta.href}
                        // Allow long bilingual labels (e.g. "ABOUT FRANCISCO
                        // / SOBRE FRANCISCO") to wrap on mobile so they
                        // don't overflow the slide's right edge. The
                        // button keeps single-line behavior at sm+ where
                        // it has room.
                        className={`${buttonVariants({ variant: "primary", size: "md" })} max-w-full whitespace-normal text-center leading-tight text-[11px] sm:text-sm sm:whitespace-nowrap`}
                      >
                        {t(slide.cta.label, lang)}
                      </NextLink>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-full mx-auto max-w-[var(--container-content)] px-5 sm:px-10 flex items-center">
                    <div className="max-w-2xl">
                      {slide.decorTitle && (
                        <p className="font-heading font-black uppercase tracking-wide text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-gold-3d leading-none mb-3 sm:mb-4">
                          {t(slide.decorTitle, lang)}
                        </p>
                      )}
                      <span className="font-heading text-[10px] sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.4em] text-white mb-3 sm:mb-4 inline-block max-w-full break-words">
                        {t(slide.eyebrow, lang)}
                      </span>
                      <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[var(--color-fg)] !leading-[1.1] mb-4 sm:mb-5 font-light break-words">
                        {t(slide.title, lang)}
                      </h2>
                      <p className="text-[var(--color-fg)]/85 text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed">
                        {t(slide.tagline, lang)}
                      </p>
                      <NextLink
                        href={slide.cta.href}
                        // Allow long bilingual labels (e.g. "ABOUT FRANCISCO
                        // / SOBRE FRANCISCO") to wrap on mobile so they
                        // don't overflow the slide's right edge. The
                        // button keeps single-line behavior at sm+ where
                        // it has room.
                        className={`${buttonVariants({ variant: "primary", size: "md" })} max-w-full whitespace-normal text-center leading-tight text-[11px] sm:text-sm sm:whitespace-nowrap`}
                      >
                        {t(slide.cta.label, lang)}
                      </NextLink>
                    </div>
                  </div>
                )}
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* Prev/Next — hidden by default per Guitare demo, shown ≥md as accessibility aid */}
      <button
        type="button"
        onClick={scrollPrev}
        aria-label={lang === "en" ? "Previous slide" : "Anterior"}
        className="hidden md:inline-flex absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center bg-[var(--color-bg)]/40 text-[var(--color-fg)] hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] transition-colors"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        aria-label={lang === "en" ? "Next slide" : "Siguiente"}
        className="hidden md:inline-flex absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center bg-[var(--color-bg)]/40 text-[var(--color-fg)] hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] transition-colors"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>

      {/* Dots — Guitare demo default */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${lang === "en" ? "Slide" : "Diapositiva"} ${i + 1}`}
            aria-current={selected === i}
            onClick={() => scrollTo(i)}
            className={[
              "h-2.5 w-2.5 rounded-full border transition-all",
              selected === i
                ? "bg-[var(--color-accent-brand)] border-[var(--color-accent-brand)] scale-110"
                : "bg-transparent border-[var(--color-fg)]/60 hover:border-[var(--color-accent-brand)]",
            ].join(" ")}
          />
        ))}
      </div>
    </section>
  );
}
