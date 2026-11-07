"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { LANGS, LANG_COOKIE, LANG_COOKIE_MAX_AGE, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LABELS: Record<Lang, string> = { en: "EN", es: "ES" };

// Full names for assistive tech — "EN" / "ES" alone don't announce well.
const NAMES: Record<Lang, string> = { en: "English", es: "Español" };

type LangToggleProps = {
  lang: Lang;
  className?: string;
};

/**
 * EN | ES switch. Writes the language cookie and asks Next to re-render
 * the server tree, so every section on the page swaps language at once
 * without a full page reload and without changing the URL.
 *
 * Optimistic state keeps the clicked side highlighted during the refresh
 * round-trip; once the server payload lands, the `lang` prop takes over.
 */
export function LangToggle({ lang, className }: LangToggleProps) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();
  const [optimistic, setOptimistic] = React.useState<Lang | null>(null);

  // Server truth wins as soon as the refreshed payload arrives.
  React.useEffect(() => {
    setOptimistic(null);
  }, [lang]);

  const active = optimistic ?? lang;

  function select(next: Lang) {
    if (next === active) return;
    setOptimistic(next);
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; samesite=lax`;
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div
      role="group"
      aria-label="Language / Idioma"
      data-pending={pending ? "" : undefined}
      className={cn(
        "font-ui font-semibold text-sm flex items-center gap-2",
        pending && "opacity-70",
        className,
      )}
    >
      {LANGS.map((code, i) => (
        <React.Fragment key={code}>
          {i > 0 && (
            <span aria-hidden="true" className="text-[var(--color-muted-brand)]/50">
              |
            </span>
          )}
          <button
            type="button"
            lang={code}
            aria-label={NAMES[code]}
            aria-current={active === code ? "true" : undefined}
            onClick={() => select(code)}
            className={[
              "transition-colors cursor-pointer",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-brand)]",
              active === code
                ? "text-[var(--color-accent-brand)]"
                : "text-[var(--color-muted-brand)] hover:text-[var(--color-accent-brand)]",
            ].join(" ")}
          >
            {LABELS[code]}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}
