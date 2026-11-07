import * as React from "react";
import NextLink from "next/link";
import { Ticket, MapPin } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";
import type { PastEvent } from "@/lib/content/shows";

type Props = {
  event: PastEvent;
  lang?: Lang;
};

/** Format an ISO date string into split-display parts: "21" / "JUN" / "2025". */
function splitDate(iso: string, lang: Lang) {
  const d = new Date(`${iso}T00:00:00`);
  const day = String(d.getDate()).padStart(2, "0");
  const monthFmt = new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "en-US", {
    month: "short",
  });
  const month = monthFmt.format(d).replace(".", "").toUpperCase();
  const year = String(d.getFullYear());
  return { day, month, year };
}

export function EventCard({ event, lang = "en" }: Props) {
  const { day, month, year } = splitDate(event.date, lang);

  return (
    <article className="group relative bg-[var(--color-card-bg)]/80 backdrop-blur-sm border border-[var(--color-border-brand)] hover:border-[var(--color-accent-brand)]/60 transition-colors p-6 lg:p-8 h-full">
      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6">
        {/* Date column — prominent, gold-bordered */}
        <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0 sm:w-[88px] shrink-0">
          <div className="border border-[var(--color-accent-brand)]/40 group-hover:border-[var(--color-accent-brand)] transition-colors px-3 py-2 sm:px-4 sm:py-3 text-center min-w-[72px]">
            <div className="font-heading text-3xl sm:text-4xl text-[var(--color-fg)] leading-none tabular-nums">
              {day}
            </div>
            <div className="font-heading text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[var(--color-accent-brand)] mt-1">
              {month}
            </div>
          </div>
          <div className="font-heading text-xs uppercase tracking-[0.2em] text-[var(--color-muted-brand)] sm:mt-2">
            {year}
          </div>
        </div>

        {/* Content column */}
        <div className="min-w-0">
          <h3 className="font-heading text-lg lg:text-xl text-[var(--color-fg)] mb-2 leading-snug">
            {t(event.title, lang)}
          </h3>
          {(event.venue || event.address) && (
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-brand)] mb-3">
              {[event.venue, event.address].filter(Boolean).join(" · ")}
              {event.time ? ` · ${event.time}` : ""}
            </p>
          )}
          <p className="text-[var(--color-fg)]/75 text-sm leading-relaxed mb-5 line-clamp-4">
            {t(event.description, lang)}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
            {event.ticketUrl && (
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-heading uppercase tracking-[0.18em] text-[var(--color-accent-brand)] hover:text-[var(--color-fg)] transition-colors"
              >
                <Ticket className="size-3.5" aria-hidden="true" />
                {lang === "en" ? "Tickets" : "Boletos"}
              </a>
            )}
            {event.mapsUrl && (
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-heading uppercase tracking-[0.18em] text-[var(--color-muted-brand)] hover:text-[var(--color-accent-brand)] transition-colors"
              >
                <MapPin className="size-3.5" aria-hidden="true" />
                {lang === "en" ? "Map" : "Mapa"}
              </a>
            )}
            {event.free && (
              <span className="font-heading uppercase tracking-[0.18em] text-[var(--color-accent-brand)] border border-[var(--color-accent-brand)]/40 px-2 py-1">
                {lang === "en" ? "Free" : "Gratis"}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
