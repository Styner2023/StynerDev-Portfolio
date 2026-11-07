import * as React from "react";
import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";
import type { CompanerosContent } from "@/lib/content/home";

type Props = {
  content: CompanerosContent;
  lang?: Lang;
};

/**
 * Renders a bio with the first occurrence of `label` turned into an
 * outbound link. Falls back to plain text when the label isn't present,
 * so a translation that phrases the name differently can't break the copy.
 */
function BioWithLink({
  bio,
  label,
  href,
}: {
  bio: string;
  label: string;
  href: string;
}) {
  const at = bio.indexOf(label);
  if (at === -1) return <>{bio}</>;

  return (
    <>
      {bio.slice(0, at)}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--color-accent-brand)] underline underline-offset-2 hover:text-[var(--color-fg)] transition-colors"
      >
        {label}
      </a>
      {bio.slice(at + label.length)}
    </>
  );
}

export function Companeros({ content, lang = "en" }: Props) {
  return (
    <section
      className="relative bg-[var(--color-bg-deeper)] section-atmospheric py-28 lg:py-32 overflow-hidden border-t border-black"
      aria-label={t(content.title, lang)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-8 lg:left-12 lg:top-12 z-0 select-none"
      >
        <p className="font-signature text-8xl lg:text-[10rem] text-[var(--color-muted-brand)]/30 -rotate-12 leading-none">
          {t(content.watermark, lang)}
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-[var(--container-content)] px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-3 inline-block">
            {t(content.eyebrow, lang)}
          </span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] mb-5 uppercase tracking-tight leading-[0.95]">
            {t(content.title, lang)}
            <span className="italic font-light text-[var(--color-accent-brand)]">.</span>
          </h2>
          <p className="text-[var(--color-muted-brand)] text-base lg:text-lg leading-relaxed">
            {t(content.description, lang)}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {content.members.map((m) => (
            <article
              key={m.id}
              className="group flex flex-col transition-transform duration-300 hover:scale-[1.03]"
            >
              <div className="relative overflow-hidden border border-[var(--color-accent-brand)]/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.image}
                  alt={t(m.imageAlt, lang)}
                  className="w-full h-80 object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_center,rgba(226,165,63,0.25)_0%,transparent_70%)] transition-opacity duration-500"
                />
              </div>
              <div className="p-5 border-b border-[var(--color-accent-brand)]/30">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-brand)] mb-2">
                  {t(m.role, lang)}
                </p>
                <h3 className="font-heading text-xl text-[var(--color-fg)] group-hover:text-[var(--color-accent-brand)] transition-colors mb-3">
                  {t(m.name, lang)}
                </h3>
                <p className="text-[var(--color-muted-brand)] text-sm leading-relaxed">
                  {m.bioLink ? (
                    <BioWithLink
                      bio={t(m.bio, lang)}
                      label={t(m.bioLink.label, lang)}
                      href={m.bioLink.href}
                    />
                  ) : (
                    t(m.bio, lang)
                  )}
                </p>
                <NextLink
                  href={m.cta.href}
                  className="mt-4 inline-flex items-center gap-1 text-[var(--color-accent-brand)] hover:text-[var(--color-fg)] font-heading text-xs uppercase tracking-[0.18em] transition-colors"
                >
                  {t(m.cta.label, lang)}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </NextLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
