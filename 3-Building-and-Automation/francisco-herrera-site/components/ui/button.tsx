import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Guitare-flavored button.
 * Variants:
 *   - primary: bg #0f0f0f, border #e2a53f, text #fff. Hover swap to bg #e2a53f.
 *   - outline: transparent bg, border accent, text accent. Hover fill accent.
 *   - ghost:   no border/bg, text muted, hover text accent.
 *
 * Sizes:
 *   - sm: y=6 x=20
 *   - md: y=10 x=30  (Guitare default — settings_data.button_padding)
 *   - lg: y=14 x=40
 *
 * Radius: 0 (settings_data.button_border_radius). Border width: 1px.
 *
 * All color/spacing references go through tokens defined in app/globals.css.
 */
const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2",
    "font-heading uppercase tracking-wide",
    "border whitespace-nowrap select-none",
    "transition-[background-color,color,border-color] duration-300 ease-in-out",
    "outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent-brand)/60 focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--color-button-bg)] text-[var(--color-button-fg)]",
          "border-[var(--color-button-border)]",
          "hover:bg-[var(--color-button-hover-bg)] hover:text-[var(--color-button-hover-fg)]",
        ].join(" "),
        outline: [
          "bg-transparent text-[var(--color-accent-brand)]",
          "border-[var(--color-accent-brand)]",
          "hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)]",
        ].join(" "),
        ghost: [
          "bg-transparent border-transparent",
          "text-[var(--color-muted-brand)]",
          "hover:text-[var(--color-accent-brand)]",
        ].join(" "),
      },
      size: {
        sm: "py-[var(--button-padding-y-sm)] px-[var(--button-padding-x-sm)] text-xs",
        md: "py-[var(--button-padding-y)] px-[var(--button-padding-x)] text-sm",
        lg: "py-[var(--button-padding-y-lg)] px-[var(--button-padding-x-lg)] text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>;

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
