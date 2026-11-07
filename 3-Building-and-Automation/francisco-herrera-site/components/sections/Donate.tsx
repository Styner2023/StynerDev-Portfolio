"use client";

import * as React from "react";
import NextLink from "next/link";
import { Heart } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";
import type { DonateContent } from "@/lib/content/home";

type Props = {
  content: DonateContent;
  lang?: Lang;
};

export function Donate({ content, lang = "en" }: Props) {
  const [selected, setSelected] = React.useState<number | "custom">(content.presetAmounts[1] ?? content.presetAmounts[0]);
  const [custom, setCustom] = React.useState("");

  const finalAmount = selected === "custom" ? Number(custom) || 0 : selected;
  const donateHref =
    finalAmount > 0 ? `${content.primaryCta.href}?amount=${finalAmount}` : content.primaryCta.href;

  return (
    <section
      className="relative bg-[var(--color-bg)] section-atmospheric py-28 lg:py-32 overflow-hidden"
      aria-label={t(content.title, lang)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-6 lg:left-12 lg:top-10 z-0 select-none"
      >
        <p className="font-signature text-8xl lg:text-[10rem] text-[var(--color-muted-brand)]/30 -rotate-12 leading-none">
          {t(content.watermark, lang)}
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-4 inline-block">
          {t(content.eyebrow, lang)}
        </span>
        <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] mb-6 uppercase tracking-tight leading-[0.95]">
          {lang === "en" ? "Support social change" : "Apoya el cambio social"}
          <br />
          <span className="italic font-light text-[var(--color-accent-brand)]">
            {lang === "en" ? "through music." : "a través de la música."}
          </span>
        </h2>
        <p className="text-[var(--color-fg)]/85 text-base lg:text-lg leading-relaxed mb-3">
          {t(content.body, lang)}
        </p>
        <p className="font-heading text-xs uppercase tracking-[0.25em] text-[var(--color-accent-brand)] mb-10">
          {t(content.campaignTag, lang)}
        </p>

        <fieldset className="mb-8">
          <legend className="sr-only">
            {lang === "en" ? "Choose donation amount" : "Elige la cantidad"}
          </legend>
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {content.presetAmounts.map((amount) => {
              const active = selected === amount;
              return (
                <button
                  key={amount}
                  type="button"
                  onClick={() => {
                    setSelected(amount);
                    setCustom("");
                  }}
                  aria-pressed={active}
                  className={[
                    "px-6 py-3 font-heading text-sm uppercase tracking-[0.18em] border transition-colors min-w-[90px]",
                    active
                      ? "bg-[var(--color-accent-brand)] text-[var(--color-bg)] border-[var(--color-accent-brand)]"
                      : "bg-transparent text-[var(--color-fg)] border-[var(--color-border-brand)] hover:border-[var(--color-accent-brand)]",
                  ].join(" ")}
                >
                  ${amount}
                </button>
              );
            })}
            <label
              className={[
                "flex items-center gap-2 px-4 py-3 border transition-colors",
                selected === "custom"
                  ? "border-[var(--color-accent-brand)]"
                  : "border-[var(--color-border-brand)] hover:border-[var(--color-accent-brand)]",
              ].join(" ")}
            >
              <span aria-hidden="true" className="text-[var(--color-muted-brand)]">$</span>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                placeholder={lang === "en" ? "Other" : "Otra"}
                value={custom}
                onChange={(e) => {
                  setCustom(e.target.value);
                  setSelected("custom");
                }}
                aria-label={lang === "en" ? "Custom amount" : "Cantidad personalizada"}
                className="bg-transparent border-0 outline-none text-[var(--color-fg)] font-heading text-sm w-24 placeholder:text-[var(--color-muted-brand)]"
              />
            </label>
          </div>
        </fieldset>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NextLink
            href={donateHref}
            className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent-brand)] text-[var(--color-bg)] hover:bg-[var(--color-fg)] transition-colors px-8 py-3.5 font-heading text-sm uppercase tracking-[0.2em]"
          >
            <Heart className="size-4" aria-hidden="true" fill="currentColor" />
            {t(content.primaryCta.label, lang)}
          </NextLink>
          <NextLink
            href={content.secondaryCta.href}
            className="inline-flex items-center justify-center border border-[var(--color-accent-brand)] text-[var(--color-fg)] hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] transition-colors px-8 py-3.5 font-heading text-sm uppercase tracking-[0.2em]"
          >
            {t(content.secondaryCta.label, lang)}
          </NextLink>
        </div>
      </div>
    </section>
  );
}
