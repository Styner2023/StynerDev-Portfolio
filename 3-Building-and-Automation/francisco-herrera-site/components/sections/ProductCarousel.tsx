"use client";

// Guitare source: sections/home-product-carousel.liquid
// - Wrapper + ".grouped-content" flex (lines 1-294)
// - Section heading + sub-heading + description rendered via section-heading snippet (line 46)
// - Demo (templates/index.json): grid 4-up, padding "120,115" (top/bottom),
//   sub-heading color #e2a53f (gold), heading color #ffffff,
//   description color #9a9a9a, dark bg, arrows nav
// - Schema: heading default "Product Carousel" (line 747), 4-col default (line 1032),
//   arrows default false (line 1107)

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import NextLink from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";
import type { ProductCarouselContent } from "@/lib/content/home";

// Same vocabulary used by HeroSlideshow — keep in sync if either grows.
const OBJECT_POSITION_CLASSES: Record<string, string> = {
  top: "object-top",
  bottom: "object-bottom",
  left: "object-left",
  right: "object-right",
  center: "object-center",
  "top-25": "object-[center_25%]",
  "top-30": "object-[center_30%]",
  "top-35": "object-[center_35%]",
  "top-40": "object-[center_40%]",
  "bottom-60": "object-[center_60%]",
  "bottom-65": "object-[center_65%]",
  "bottom-70": "object-[center_70%]",
  "bottom-75": "object-[center_75%]",
};

type Props = {
  content: ProductCarouselContent;
  lang?: Lang;
};

export function ProductCarousel({ content, lang = "en" }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", update);
    emblaApi.on("reInit", () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      update();
    });
    update();
    return () => {
      emblaApi.off("select", update);
    };
  }, [emblaApi]);

  const scrollTo = React.useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <section
      // 120/115px vertical padding from templates/index.json "padding":"120,115"
      className="relative isolate bg-[var(--color-bg-warm)] section-atmospheric pt-[120px] pb-[115px] overflow-hidden border-t border-black"
      aria-label={t(content.title, lang)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/facebook/488006864_18386482891113352_8570978093327498432_n.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: "center 40%" }}
        loading="lazy"
      />
      {/* Warm-tobacco scrim — same recipe as /epk Bio section. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#2a2318]/85" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-6 lg:left-12 lg:top-10 z-0 select-none"
      >
        <p className="font-signature text-8xl lg:text-[10rem] text-[var(--color-muted-brand)]/30 -rotate-12 leading-none">
          {t(content.watermark, lang)}
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-[var(--container-content)] px-6">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-3 inline-block">
            {t(content.eyebrow, lang)}
          </span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] mb-5 uppercase tracking-tight leading-[0.95] text-balance">
            {lang === "en" ? "Concert" : "Carteles de"}
            <br />
            <span className="italic font-light text-[var(--color-accent-brand)]">
              {lang === "en" ? "posters." : "conciertos."}
            </span>
          </h2>
          <p className="text-[var(--color-muted-brand)] text-base lg:text-lg leading-relaxed">
            {t(content.description, lang)}
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -mx-3">
              {content.items.map((item) => (
                <div
                  key={item.id}
                  className="shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 px-3"
                >
                  <NextLink
                    href={item.href}
                    className="group block bg-[var(--color-card-bg)] border border-[var(--color-border-brand)] hover:border-[var(--color-accent-brand)] transition-colors"
                  >
                    <div className="relative aspect-square overflow-hidden bg-black">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={t(item.title, lang)}
                        className={[
                          "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110",
                          OBJECT_POSITION_CLASSES[item.imagePosition ?? ""] ?? "",
                        ].join(" ")}
                        loading="lazy"
                      />
                      <span className="absolute inset-x-0 bottom-0 bg-[var(--color-button-bg)] text-[var(--color-button-fg)] group-hover:bg-[var(--color-button-hover-bg)] group-hover:text-[var(--color-button-hover-fg)] transition-colors text-center font-heading uppercase tracking-[0.18em] text-xs py-3 translate-y-full group-hover:translate-y-0 duration-300">
                        {t(content.ctaLabel, lang)}
                      </span>
                    </div>
                    <div className="p-5 text-center">
                      <h3 className="font-heading text-base !text-[var(--color-fg)] mb-1 group-hover:text-[var(--color-accent-brand)] transition-colors">
                        {t(item.title, lang)}
                      </h3>
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-brand)]">
                        {t(item.theme, lang)}
                      </p>
                    </div>
                  </NextLink>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            aria-label={lang === "en" ? "Previous" : "Anterior"}
            className="absolute left-0 -translate-x-1/2 top-1/3 hidden lg:inline-flex h-11 w-11 items-center justify-center bg-[var(--color-button-bg)] text-[var(--color-fg)] border border-[var(--color-border-brand)] hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent-brand)] transition-colors disabled:opacity-40 disabled:pointer-events-none"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            aria-label={lang === "en" ? "Next" : "Siguiente"}
            className="absolute right-0 translate-x-1/2 top-1/3 hidden lg:inline-flex h-11 w-11 items-center justify-center bg-[var(--color-button-bg)] text-[var(--color-fg)] border border-[var(--color-border-brand)] hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent-brand)] transition-colors disabled:opacity-40 disabled:pointer-events-none"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Dot indicators — one per scroll snap, signaling progress */}
        {scrollSnaps.length > 1 && (
          <div className="flex items-center justify-center gap-2.5 mt-10">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`${lang === "en" ? "Go to slide" : "Ir a diapositiva"} ${i + 1}`}
                aria-current={i === selectedIndex ? "true" : undefined}
                className={[
                  "h-2.5 w-2.5 rounded-full border transition-all",
                  i === selectedIndex
                    ? "bg-[var(--color-accent-brand)] border-[var(--color-accent-brand)] scale-110"
                    : "bg-transparent border-[var(--color-fg)]/50 hover:border-[var(--color-accent-brand)]",
                ].join(" ")}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
