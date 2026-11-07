import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  /** Use the narrower tablet container width. */
  width?: "content" | "tablet";
  /** Skip the inner Container for full-bleed layouts. */
  bleed?: boolean;
};

/**
 * Vertical-rhythm wrapper for page sections.
 * Applies py-16 lg:py-24 (Guitare-feel breathing room) and wraps children
 * in a Container unless `bleed` is true.
 */
export function Section({
  className,
  children,
  width = "content",
  bleed = false,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-16 lg:py-24", className)} {...props}>
      {bleed ? children : <Container width={width}>{children}</Container>}
    </section>
  );
}
