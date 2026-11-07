"use client";

// Guitare source: sections/header.liquid lines 1-211 (top bar + logo + nav + icon row)
// Top bar with contact/social: liquid 137-165. Logo+nav row: 177-211.
// Icon row classes: .CartCount (line 69), account/wishlist/search (42-114).

import * as React from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { primaryNav, type NavItem } from "@/lib/nav";
import { t, type Lang } from "@/lib/i18n";
import { LangToggle } from "@/components/layout/LangToggle";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import NextLink from "next/link";

type HeaderProps = {
  lang?: Lang;
};

const announcementCopy: Record<Lang, string> = {
  en: "Book Francisco for your event",
  es: "Contrata a Francisco para tu evento",
};

const topBarLeft: Record<Lang, string> = {
  en: "info@franciscoherrera.com · Bay Area, California",
  es: "info@franciscoherrera.com · Área de la Bahía, California",
};

export function Header({ lang = "en" }: HeaderProps) {
  const [announcementOpen, setAnnouncementOpen] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="relative z-40 w-full bg-[var(--color-bg)] border-b border-[var(--color-border-brand)]">
      {/* Announcement bar — Guitare ".dt-sc-header-top-bar" (header.liquid 137-165) */}
      {announcementOpen && (
        <div className="bg-[var(--color-button-bg)] border-b border-[var(--color-border-brand)]">
          <Container>
            <div className="flex items-center justify-between gap-4 py-2.5 text-sm">
              <span className="hidden md:inline font-ui font-medium text-[var(--color-fg)]">
                {topBarLeft[lang]}
              </span>
              <span className="font-ui font-medium text-[var(--color-fg)] text-center flex-1 md:flex-none">
                <span className="text-[var(--color-accent-brand)]">★</span>{" "}
                {announcementCopy[lang]}{" "}
                <span className="text-[var(--color-accent-brand)]">★</span>
              </span>
              <button
                type="button"
                aria-label="Dismiss announcement"
                onClick={() => setAnnouncementOpen(false)}
                className="text-[var(--color-muted-brand)] hover:text-[var(--color-accent-brand)] transition-colors shrink-0"
              >
                <X className="size-3.5" aria-hidden="true" />
              </button>
            </div>
          </Container>
        </div>
      )}

      {/* Logo + Nav + Icons — Guitare ".dt-sc-header-logo-sec" + "#AccessibleNav" (header.liquid 177-211) */}
      <Container>
        <div className="flex h-20 items-center justify-between gap-4">
          <NextLink
            href="/"
            aria-label="Francisco J. Herrera — Home"
            className="font-signature text-4xl sm:text-5xl leading-none text-[var(--color-accent-brand)] [-webkit-text-stroke:0.75px_currentColor] hover:opacity-80 transition-opacity shrink-0"
          >
            Francisco<span className="hidden sm:inline"> J. Herrera</span>
          </NextLink>

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-7 flex-1 justify-center"
          >
            {primaryNav.map((item) =>
              item.children?.length ? (
                <NavDropdown key={item.href} item={item} lang={lang} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  unstyled
                  className="font-ui font-medium text-[15px] text-white hover:text-[var(--color-accent-brand)] transition-colors"
                >
                  {t(item.label, lang)}
                </Link>
              ),
            )}
          </nav>

          {/* Right side — language toggle only. The Search / Donate / Cart
              icon trio was removed per client request; if Donate or Cart
              come back, restore them as IconLinks here. */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <LangToggle lang={lang} className="hidden sm:flex" />
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden inline-flex h-9 w-9 items-center justify-center text-[var(--color-fg)] hover:text-[var(--color-accent-brand)] transition-colors"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[var(--color-border-brand)] bg-[var(--color-bg)]">
          <Container>
            <nav aria-label="Mobile" className="flex flex-col py-4">
              {primaryNav.map((item) => (
                <React.Fragment key={item.href}>
                  <Link
                    href={item.href}
                    unstyled
                    className="font-ui font-medium text-base text-white hover:text-[var(--color-accent-brand)] transition-colors py-3 border-b border-[var(--color-border-brand)] last:border-0"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(item.label, lang)}
                  </Link>
                  {/* Indented sub-items rendered inline so the mobile
                      drawer doesn't need its own toggle state. */}
                  {item.children?.map((child) =>
                    child.href === item.href ? null : (
                      <Link
                        key={child.href}
                        href={child.href}
                        unstyled
                        className="font-ui font-medium text-sm text-[var(--color-fg)]/80 hover:text-[var(--color-accent-brand)] transition-colors py-2.5 pl-5 border-b border-[var(--color-border-brand)]"
                        onClick={() => setMobileOpen(false)}
                      >
                        ↳ {t(child.label, lang)}
                      </Link>
                    ),
                  )}
                </React.Fragment>
              ))}
              <div className="pt-4">
                <LangToggle lang={lang} />
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}

// Hover/focus dropdown for primary-nav items that have children. The
// parent label is itself a link to its own href; hovering or focusing
// it reveals the children in an absolutely-positioned panel below.
// Closes on mouse-leave from the wrapper or when focus leaves the panel.
function NavDropdown({ item, lang }: { item: NavItem; lang: Lang }) {
  const [open, setOpen] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  // Close when focus moves out of the wrapper entirely (keyboard users).
  const handleBlur = (e: React.FocusEvent) => {
    if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
      setOpen(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={handleBlur}
    >
      <NextLink
        href={item.href}
        aria-haspopup="true"
        aria-expanded={open}
        className="inline-flex items-center gap-1 font-ui font-medium text-[15px] text-white hover:text-[var(--color-accent-brand)] transition-colors"
      >
        {t(item.label, lang)}
        <ChevronDown
          aria-hidden="true"
          className={[
            "size-3.5 transition-transform duration-200",
            open ? "rotate-180" : "rotate-0",
          ].join(" ")}
        />
      </NextLink>

      {open && (
        <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 z-50 min-w-[14rem]">
          <ul className="bg-[var(--color-card-bg)] border border-[var(--color-accent-brand)]/30 [filter:drop-shadow(0_18px_22px_rgba(0,0,0,0.55))] py-2">
            {item.children?.map((child) => (
              <li key={child.href}>
                <NextLink
                  href={child.href}
                  className="block px-5 py-2.5 font-ui font-medium text-sm text-white hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {t(child.label, lang)}
                </NextLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
