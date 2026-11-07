import * as React from "react";
import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Force the narrower 960px tablet width regardless of viewport. */
  width?: "content" | "tablet";
};

/**
 * Centers content with the Guitare container width (1230px desktop / 960px tablet),
 * applying the Guitare gutter (30px) on both sides. All values come from tokens —
 * see settings_data.container_width / tab_container_width / gutter_width.
 */
export function Container({
  className,
  width = "content",
  ...props
}: ContainerProps) {
  const widthClass =
    width === "tablet"
      ? "max-w-[var(--container-tablet-w)]"
      : "max-w-[var(--container-width)]";
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--gutter)]",
        widthClass,
        className,
      )}
      {...props}
    />
  );
}
