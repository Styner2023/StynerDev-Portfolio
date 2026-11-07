import * as React from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

type LinkProps = React.ComponentProps<typeof NextLink> & {
  /** When true, drops the muted→accent hover treatment (e.g. for nav links you style separately). */
  unstyled?: boolean;
};

/**
 * Site link. Defaults to the Guitare hover treatment:
 * text-muted (#7e7e7e) → text-accent (#e2a53f) on hover, with the
 * --transition-base ease applied via the global `a` rule in globals.css.
 */
export function Link({ className, unstyled = false, ...props }: LinkProps) {
  return (
    <NextLink
      className={cn(
        !unstyled &&
          "text-[var(--color-muted-brand)] hover:text-[var(--color-accent-brand)]",
        className,
      )}
      {...props}
    />
  );
}
