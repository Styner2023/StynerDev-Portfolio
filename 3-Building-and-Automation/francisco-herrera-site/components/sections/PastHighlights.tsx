import * as React from "react";
import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import { EventCard } from "@/components/sections/EventCard";
import type { Lang } from "@/lib/i18n";
import type { PastEvent } from "@/lib/content/shows";

type Props = {
  highlights: PastEvent[];
  totalCount: number;
  lang?: Lang;
};

export function PastHighlights({ highlights, totalCount, lang = "en" }: Props) {
  return (
    <section
      className="relative isolate bg-[var(--color-bg)] section-atmospheric py-24 lg:py-32 overflow-hidden border-t border-black"
      aria-label={lang === "en" ? "Past Highlights" : "Momentos Destacados"}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/Solo-Portraits/3.Solo-Portraits-Vertical.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: "center 30%" }}
        loading="lazy"
      />
      {/* Black-tobacco scrim — mirrors /epk Recent Performances section. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#0f0f0f]/80" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-6 lg:left-12 lg:top-10 z-0 select-none"
      >
        <p className="font-signature text-8xl lg:text-[10rem] text-[var(--color-muted-brand)]/30 -rotate-12 leading-none">
          {lang === "en" ? "Stage" : "Escena"}
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-[var(--container-content)] px-6">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-3 inline-block">
            {lang === "en"
              ? "PAST HIGHLIGHTS / MOMENTOS DESTACADOS"
              : "MOMENTOS DESTACADOS / PAST HIGHLIGHTS"}
          </span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] mb-5 uppercase tracking-tight leading-[0.95]">
            {lang === "en" ? "On stage" : "En escena"}
            <br />
            <span className="italic font-light text-[var(--color-accent-brand)]">
              {lang === "en" ? "through the years." : "por los años."}
            </span>
          </h2>
          <p className="text-[var(--color-muted-brand)] text-base lg:text-lg leading-relaxed">
            {lang === "en"
              ? `A few moments from over ${totalCount} concerts, vigils, and community gatherings since 2010.`
              : `Algunos momentos de más de ${totalCount} conciertos, vigilias y reuniones comunitarias desde 2010.`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {highlights.map((event) => (
            <EventCard key={event.id} event={event} lang={lang} />
          ))}
        </div>

        <div className="flex justify-center">
          <NextLink
            href="/shows"
            className="inline-flex items-center gap-2 border border-[var(--color-accent-brand)] px-8 py-3.5 font-heading text-xs uppercase tracking-[0.25em] text-[var(--color-fg)] hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] transition-colors"
          >
            {lang === "en" ? "View All Past Events / Ver Todos los Eventos" : "Ver Todos los Eventos / View All Past Events"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </NextLink>
        </div>
      </div>
    </section>
  );
}
