// Guitare source: sections/footer.liquid lines 1-161
// Top section ".site-footer__top" lines 14-89 (newsletter/logo/social/menu/address blocks).
// Bottom bar ".site-footer__bottom" lines 90-140 (copyright + menu + payment icons).

import * as React from "react";
import { footerNav } from "@/lib/nav";
import { t, type Lang } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Heading } from "@/components/ui/heading";

type FooterProps = {
  lang?: Lang;
};

const bio: Record<Lang, string> = {
  en: "Francisco J. Herrera — bilingual guitarist and singer-songwriter. Songs of liberation, migration, family, and faith for the communities that sing them.",
  es: "Francisco J. Herrera — guitarrista y cantautor bilingüe. Cantos de liberación, migración, familia y fe para las comunidades que los cantan.",
};

const address: Record<Lang, { line1: string; line2: string; phone: string; email: string }> = {
  en: {
    line1: "Bay Area, California",
    line2: "United States",
    phone: "+1 (555) 555-0114",
    email: "info@franciscoherrera.com",
  },
  es: {
    line1: "Área de la Bahía, California",
    line2: "Estados Unidos",
    phone: "+1 (555) 555-0114",
    email: "info@franciscoherrera.com",
  },
};

const social: { href: string; label: string }[] = [
  { href: "https://www.youtube.com/", label: "YouTube" },
  { href: "https://www.instagram.com/", label: "Instagram" },
  { href: "https://www.facebook.com/franciscoherreramusic", label: "Facebook" },
  { href: "https://www.facebook.com/musicainfantilfranciscoherrera", label: "Facebook · Niñ@s" },
  { href: "https://open.spotify.com/", label: "Spotify" },
  { href: "https://music.apple.com/", label: "Apple" },
  { href: "https://bandcamp.com/", label: "Bandcamp" },
];

const labels: Record<Lang, {
  about: string;
  information: string;
  account: string;
  newsletter: string;
  newsletterCopy: string;
  emailPlaceholder: string;
  subscribe: string;
  copyright: string;
  followUs: string;
  weAccept: string;
}> = {
  en: {
    about: "ABOUT FRANCISCO",
    information: "INFORMATION",
    account: "MY ACCOUNT",
    newsletter: "NEWSLETTER",
    newsletterCopy: "Tour dates, new releases, and notes from the road.",
    emailPlaceholder: "your.email@example.com",
    subscribe: "SUBSCRIBE",
    copyright: "© Francisco J. Herrera. All rights reserved.",
    followUs: "FOLLOW",
    weAccept: "WE ACCEPT",
  },
  es: {
    about: "SOBRE FRANCISCO",
    information: "INFORMACIÓN",
    account: "MI CUENTA",
    newsletter: "BOLETÍN",
    newsletterCopy: "Fechas de gira, nuevos lanzamientos, y notas del camino.",
    emailPlaceholder: "tu.correo@ejemplo.com",
    subscribe: "SUSCRIBIRSE",
    copyright: "© Francisco J. Herrera. Todos los derechos reservados.",
    followUs: "SÍGUENOS",
    weAccept: "ACEPTAMOS",
  },
};

const informationLinks = footerNav.slice(0, 5);
const accountLinks = footerNav.slice(5);

export function Footer({ lang = "en" }: FooterProps) {
  const L = labels[lang];
  const a = address[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-[var(--color-bg)]">
      {/* Top — 4 columns (Guitare site-footer__top) */}
      <div className="border-t border-[var(--color-border-brand)]">
        <Container>
          <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* About column with logo + bio + address */}
            <div>
              <Link
                href="/"
                unstyled
                className="font-signature text-3xl leading-none whitespace-nowrap text-[var(--color-accent-brand)] [-webkit-text-stroke:0.75px_currentColor] hover:opacity-80 transition-opacity inline-block mb-5"
              >
                Francisco J. Herrera
              </Link>
              <p className="text-white font-medium leading-relaxed text-sm mb-5">
                {bio[lang]}
              </p>
              <address className="not-italic text-sm font-medium text-white space-y-1">
                <div>{a.line1}</div>
                <div>{a.line2}</div>
                <div>
                  <Link href={`tel:${a.phone}`} className="text-white">{a.phone}</Link>
                </div>
                <div>
                  <Link href={`mailto:${a.email}`} className="text-white">{a.email}</Link>
                </div>
              </address>
            </div>

            {/* Information links */}
            <nav aria-label="Information">
              <h3 className="font-ui font-semibold uppercase tracking-[0.2em] text-sm text-[var(--color-fg)] mb-4">
                {L.information}
              </h3>
              <ul className="space-y-2 text-sm font-ui font-medium">
                {informationLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-white">{t(item.label, lang)}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Account links */}
            <nav aria-label="Account">
              <h3 className="font-ui font-semibold uppercase tracking-[0.2em] text-sm text-[var(--color-fg)] mb-4">
                {L.account}
              </h3>
              <ul className="space-y-2 text-sm font-ui font-medium">
                {accountLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-white">{t(item.label, lang)}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Newsletter */}
            <div>
              <h3 className="font-ui font-semibold uppercase tracking-[0.2em] text-sm text-[var(--color-fg)] mb-4">
                {L.newsletter}
              </h3>
              <p className="text-white font-medium text-sm mb-4">{L.newsletterCopy}</p>
              <form className="flex flex-col gap-3">
                <input
                  type="email"
                  disabled
                  placeholder={L.emailPlaceholder}
                  aria-label={L.newsletter}
                  className="border border-white/35 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/55 focus:border-[var(--color-accent-brand)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-80"
                />
                <button
                  type="submit"
                  disabled
                  className="font-ui font-semibold uppercase tracking-[0.18em] border border-[var(--color-button-border)] bg-[var(--color-button-bg)] text-[var(--color-button-fg)] px-[var(--button-padding-x)] py-[var(--button-padding-y)] text-xs hover:bg-[var(--color-button-hover-bg)] hover:text-[var(--color-button-hover-fg)] transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {L.subscribe}
                </button>
              </form>

              <div className="mt-6">
                <div className="font-ui font-semibold text-[10px] uppercase tracking-[0.2em] text-white mb-2">
                  {L.followUs}
                </div>
                <ul className="flex flex-wrap gap-x-3 gap-y-2 text-xs font-ui font-medium">
                  {social.map((s) => (
                    <li key={s.href}>
                      <Link href={s.href} target="_blank" rel="noreferrer" className="text-white">
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom bar — Guitare site-footer__bottom (lines 90-140) */}
      <div className="border-t border-[var(--color-border-brand)]">
        <Container>
          <div className="flex flex-col items-start justify-between gap-4 py-6 text-xs font-ui font-medium text-white md:flex-row md:items-center">
            <span className="flex flex-col sm:flex-row sm:items-center sm:gap-x-3 sm:gap-y-0 gap-y-1">
              <span>
                {L.copyright} <span className="opacity-70">— {year}</span>
              </span>
              <span className="hidden sm:inline opacity-50" aria-hidden="true">·</span>
              <span>
                {lang === "en" ? "Designed & developed by " : "Diseñado y desarrollado por "}
                <a
                  href="https://www.stynerdev.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-accent-brand)] hover:underline"
                >
                  stynerdev
                </a>
              </span>
            </span>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline font-ui font-semibold text-[10px] uppercase tracking-[0.2em] opacity-70">
                {L.weAccept}
              </span>
              <ul className="flex items-center gap-2" aria-label="Payment methods">
                {["VISA", "MC", "AMEX", "PAYPAL"].map((method) => (
                  <li
                    key={method}
                    className="border border-[var(--color-border-brand)] px-2 py-1 text-[10px] tracking-[0.15em] font-ui font-semibold uppercase"
                  >
                    {method}
                  </li>
                ))}
              </ul>
              <span className="font-ui font-semibold uppercase tracking-[0.2em] flex items-center gap-2 ml-2 pl-4 border-l border-[var(--color-border-brand)]">
                <span className={lang === "en" ? "text-[var(--color-accent-brand)]" : ""}>EN</span>
                <span className="opacity-50">|</span>
                <span className={lang === "es" ? "text-[var(--color-accent-brand)]" : ""}>ES</span>
              </span>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
