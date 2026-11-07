"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EventCard } from "@/components/sections/EventCard";
import type { Lang } from "@/lib/i18n";
import type { PastEvent } from "@/lib/content/shows";

type Props = {
  events: PastEvent[];
  eventsPerPage: number;
  initialPage: number;
  lang?: Lang;
};

const TRANSITION_MS = 200;

export function EventsArchive({ events, eventsPerPage, initialPage, lang = "en" }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.max(1, Math.ceil(events.length / eventsPerPage));

  // `displayPage` drives what's rendered; `targetPage` is what the user just
  // clicked. We delay swapping displayPage until the fade-out completes so
  // the grid never flickers between two states.
  const [displayPage, setDisplayPage] = React.useState(initialPage);
  const [targetPage, setTargetPage] = React.useState(initialPage);
  const [visible, setVisible] = React.useState(true);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const isFirstRender = React.useRef(true);

  const start = (displayPage - 1) * eventsPerPage;
  const pageEvents = events.slice(start, start + eventsPerPage);

  const goToPage = React.useCallback(
    (n: number) => {
      const next = Math.min(Math.max(1, n), totalPages);
      if (next === targetPage) return;
      setTargetPage(next);

      // Smooth-scroll to the top of the page immediately on click so the
      // scroll runs in parallel with the fade — by the time the new
      // content fades in, the visitor is at the page header and can read
      // their way back down.
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Update URL without auto-scrolling or full navigation.
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      if (next === 1) params.delete("page");
      else params.set("page", String(next));
      const query = params.toString();
      router.replace(query ? `/shows?${query}` : "/shows", { scroll: false });
    },
    [router, searchParams, targetPage, totalPages],
  );

  // When `targetPage` changes (user clicked), fade out → swap → fade in.
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (targetPage === displayPage) return;

    setVisible(false);
    const fadeOut = window.setTimeout(() => {
      setDisplayPage(targetPage);
      requestAnimationFrame(() => setVisible(true));
    }, TRANSITION_MS);

    return () => window.clearTimeout(fadeOut);
  }, [targetPage, displayPage]);

  return (
    <div
      ref={gridRef}
      className="relative z-10 mx-auto max-w-[var(--container-content)] px-6 scroll-mt-24"
    >
      <div
        className={[
          "grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-14",
          "transition-[opacity,transform] duration-200 ease-out",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        ].join(" ")}
      >
        {pageEvents.map((event) => (
          <EventCard key={event.id} event={event} lang={lang} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav
          aria-label={lang === "en" ? "Pagination" : "Paginación"}
          className="flex flex-col items-center gap-4"
        >
          <p className="font-heading text-xs uppercase tracking-[0.2em] text-[var(--color-muted-brand)]">
            {lang === "en" ? "Page" : "Página"} {targetPage} {lang === "en" ? "of" : "de"} {totalPages}
          </p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <PageButton
              onClick={() => goToPage(targetPage - 1)}
              disabled={targetPage === 1}
              label={lang === "en" ? "Previous" : "Anterior"}
              icon={<ChevronLeft className="size-4" aria-hidden="true" />}
            />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <PageNumber
                key={n}
                n={n}
                active={n === targetPage}
                onClick={() => goToPage(n)}
              />
            ))}
            <PageButton
              onClick={() => goToPage(targetPage + 1)}
              disabled={targetPage === totalPages}
              label={lang === "en" ? "Next" : "Siguiente"}
              iconAfter={<ChevronRight className="size-4" aria-hidden="true" />}
            />
          </div>
        </nav>
      )}
    </div>
  );
}

function PageNumber({
  n,
  active,
  onClick,
}: {
  n: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={[
        "inline-flex h-10 w-10 items-center justify-center font-heading text-sm uppercase tracking-[0.2em] border transition-colors",
        active
          ? "bg-[var(--color-accent-brand)] text-[var(--color-bg)] border-[var(--color-accent-brand)]"
          : "text-[var(--color-fg)] border-[var(--color-accent-brand)]/40 hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent-brand)]",
      ].join(" ")}
    >
      {n}
    </button>
  );
}

function PageButton({
  onClick,
  disabled,
  label,
  icon,
  iconAfter,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  icon?: React.ReactNode;
  iconAfter?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "inline-flex items-center gap-1.5 px-4 h-10 font-heading text-xs uppercase tracking-[0.2em] border transition-colors",
        disabled
          ? "text-[var(--color-muted-brand)]/50 border-[var(--color-border-brand)] cursor-not-allowed"
          : "text-[var(--color-fg)] border-[var(--color-accent-brand)]/40 hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent-brand)]",
      ].join(" ")}
    >
      {icon}
      {label}
      {iconAfter}
    </button>
  );
}
