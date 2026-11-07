import * as React from "react";
import { t, type Lang, type Localized } from "@/lib/i18n";

type Props = {
  lang?: Lang;
  image?: string;
  imageAlt?: Localized;
  watermark?: Localized;
};

const FACEBOOK_HREF = "https://www.facebook.com/franciscoherreramusic";

const defaultAlt: Localized = {
  en: "Francisco J. Herrera and his band on stage at Caminante Cultural Foundation",
  es: "Francisco J. Herrera y su banda en escena en Caminante Cultural Foundation",
};
const caption: Localized = {
  en: "Follow Francisco on Facebook",
  es: "Síguenos en Facebook",
};
const defaultWatermark: Localized = {
  en: "Bienvenida",
  es: "Bienvenida",
};

export function StageBanner({
  lang = "en",
  image = "/images/facebook/1.png",
  imageAlt = defaultAlt,
  watermark = defaultWatermark,
}: Props) {
  const altText = imageAlt;
  return (
    <section
      aria-label={t(altText, lang)}
      className="relative w-full bg-(--color-bg)"
    >
      <a
        href={FACEBOOK_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t(caption, lang)}
        className="group relative block w-full overflow-hidden bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent-brand)"
      >
        <div className="relative w-full aspect-4/3 sm:aspect-16/6 lg:aspect-24/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={t(altText, lang)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.015]"
            loading="lazy"
          />

          {/* Soft side-vignette — frames the image without darkening the
              center where the band and projection are. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 [background:linear-gradient(to_right,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.10)_18%,rgba(0,0,0,0)_42%,rgba(0,0,0,0)_58%,rgba(0,0,0,0.10)_82%,rgba(0,0,0,0.45)_100%)]"
          />

          {/* Bottom fade into the next section — atmospheric continuity. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-(--color-bg)"
          />

          {/* Cursive watermark — corner only, doesn't compete with the
              "Les da la bienvenida" projection in the image itself. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-4 lg:right-12 lg:top-8 z-10 select-none"
          >
            <p className="font-signature text-5xl lg:text-7xl text-(--color-accent-brand)/45 -rotate-12 leading-none [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              {t(watermark, lang)}
            </p>
          </div>
        </div>
      </a>

      {/* Quiet caption — invitation, not intrusion. */}
      <div className="mx-auto max-w-(--container-content) px-6 py-6 text-center">
        <a
          href={FACEBOOK_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-ui font-semibold text-xs uppercase tracking-[0.25em] text-(--color-muted-brand) hover:text-(--color-accent-brand) transition-colors"
        >
          {t(caption, lang)}
          <span aria-hidden="true" className="text-(--color-accent-brand)">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
