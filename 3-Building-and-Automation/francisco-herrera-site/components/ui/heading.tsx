import * as React from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingTone = "muted" | "fg" | "accent";

type HeadingProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, "color"> & {
  level?: HeadingLevel;
  /** Render-as a different tag than the semantic level. */
  as?: HeadingLevel;
  tone?: HeadingTone;
};

const toneClass: Record<HeadingTone, string> = {
  muted: "text-[var(--color-muted-brand)]",
  fg: "text-[var(--color-fg)]",
  accent: "text-[var(--color-accent-brand)]",
};

/**
 * Semantic heading. Applies font-heading + the Guitare type scale via the
 * h1..h6 base styles in app/globals.css. Use `as` to override the rendered
 * tag without changing the visual size.
 */
export function Heading({
  level = 2,
  as,
  tone = "muted",
  className,
  ...props
}: HeadingProps) {
  const Tag = `h${as ?? level}` as React.ElementType;
  return (
    <Tag
      className={cn("font-heading", toneClass[tone], className)}
      {...props}
    />
  );
}
