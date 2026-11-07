import * as React from "react";
import { t, type Lang } from "@/lib/i18n";
import type { GalleryContent } from "@/lib/content/home";

type Props = {
  content: GalleryContent;
  lang?: Lang;
};

export function Gallery({ content, lang = "en" }: Props) {
  return (
    <section
      className="relative w-full bg-[var(--color-bg-deeper)] border-t border-black"
      aria-label={lang === "en" ? "Gallery" : "Galería"}
    >
      {/* Full-bleed cinematic banner — same aspect ratios as StageBanner.
          Mobile uses 4/3 (was 12/5) so the studio photo isn't squashed
          into a 133px sliver at 320px width. */}
      <div className="relative w-full overflow-hidden bg-black aspect-square sm:aspect-16/6 lg:aspect-24/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={content.wideImage}
          alt={t(content.wideImageAlt, lang)}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />

        {/* Soft side-vignette — frames the image without darkening the
            center where the band is. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 [background:linear-gradient(to_right,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.10)_18%,rgba(0,0,0,0)_42%,rgba(0,0,0,0)_58%,rgba(0,0,0,0.10)_82%,rgba(0,0,0,0.45)_100%)]"
        />

        {/* Bottom fade into the next section. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[var(--color-bg)]"
        />

        {/* Cursive watermark — corner only. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-4 lg:left-12 lg:top-8 z-10 select-none"
        >
          <p className="font-signature text-5xl lg:text-7xl text-[var(--color-accent-brand)]/45 -rotate-12 leading-none [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
            {t(content.watermark, lang)}
          </p>
        </div>

        {/* Portrait inset (lg+) — small magazine-style cutout pinned to the
            TOP-RIGHT corner. The 24/10 crop of the studio photo puts the
            musicians in the lower band, so the ceiling above them is the
            one area an inset can sit without covering anybody. Kept
            deliberately small for the same reason. Tilt reverts to flat on
            hover for a subtle "lift". */}
        <div className="hidden lg:block absolute right-6 xl:right-10 top-6 xl:top-8 z-20">
          <figure className="group relative border-2 border-[var(--color-accent-brand)]/55 bg-black p-1.5 [filter:drop-shadow(0_18px_26px_rgba(0,0,0,0.7))_drop-shadow(0_6px_12px_rgba(0,0,0,0.5))] -rotate-2 hover:rotate-0 transition-transform duration-[700ms] ease-out">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={content.portraitImage}
              alt={t(content.portraitImageAlt, lang)}
              className="block w-32 xl:w-40 aspect-[3/4] object-cover"
              loading="lazy"
            />
          </figure>
        </div>
      </div>

      {/* Below lg the inset can't sit inside the square crop without
          covering the band, so it rides under the banner instead — pulled
          up so it still overlaps the bottom edge like a magazine inset. */}
      <div className="lg:hidden -mt-16 sm:-mt-20 mx-auto max-w-[11rem] sm:max-w-[13rem] px-6 relative z-10">
        <figure className="border-2 border-[var(--color-accent-brand)]/55 bg-black p-1.5 [filter:drop-shadow(0_20px_30px_rgba(0,0,0,0.6))]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={content.portraitImage}
            alt={t(content.portraitImageAlt, lang)}
            className="block w-full aspect-[3/4] object-cover"
            loading="lazy"
          />
        </figure>
      </div>

      {/* Spacer so the next section doesn't crash into the mobile inset. */}
      <div aria-hidden="true" className="lg:hidden h-12 sm:h-14" />
    </section>
  );
}
