"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={handleClick}
      className={[
        "fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full",
        "border border-[var(--color-accent-brand)]/40 bg-[var(--color-bg)]/85 backdrop-blur",
        "text-[var(--color-accent-brand)] shadow-[0_8px_30px_rgb(0_0_0/0.18)]",
        "transition-all duration-500 ease-out",
        "hover:border-[var(--color-accent-brand)] hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-brand)] focus-visible:ring-offset-2",
        "sm:bottom-8 sm:right-8",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      ].join(" ")}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
