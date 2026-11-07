import type { Localized } from "@/lib/i18n";

export type NavItem = {
  href: string;
  label: Localized;
  /** Optional sub-items shown in a hover dropdown on desktop and as
   *  indented children in the mobile drawer. The parent itself stays a
   *  navigable link — clicking the parent goes to its `href`. */
  children?: NavItem[];
};

/**
 * Primary navigation. Standard artist-site flow:
 *   Home   → orient (primary landing, also the music page)
 *   About  → meet  (who is Francisco)
 *   Shows  → see   (when / where to catch him live)
 *   Blog   → engage (his writing) — also parents EPK as a sub-item so
 *                    industry visitors can find the press kit without
 *                    crowding the top nav with a dedicated tab
 *   Store  → buy   (CDs, downloads)
 *   Contact → reach (booking + general contact, single page)
 *
 * Both EN/ES labels supplied; language switching is visual-only for now.
 */
export const primaryNav: NavItem[] = [
  // Home routes to the homepage (the music page on this site).
  { href: "/", label: { en: "Home", es: "Inicio" } },
  { href: "/about", label: { en: "About", es: "Acerca" } },
  { href: "/shows", label: { en: "Shows", es: "Presentaciones" } },
  { href: "/store", label: { en: "Store", es: "Tienda" } },
  {
    href: "/blog",
    label: { en: "Blog", es: "Blog" },
    children: [
      { href: "/blog", label: { en: "Blog", es: "Blog" } },
      { href: "/epk", label: { en: "EPK — Press Kit", es: "EPK — Kit de Prensa" } },
    ],
  },
  // Single tab for both contact and booking — both inquiries are handled
  // on the /booking page. /contact still works via redirect for any old
  // links pointing at it.
  { href: "/booking", label: { en: "Contact", es: "Contacto" } },
];

// Footer keeps everything flat and includes EPK + Pensamientos + Donate
// directly so press, Spanish-readers, and supporters can find them
// without going through the dropdown.
export const footerNav: NavItem[] = [
  { href: "/", label: { en: "Home", es: "Inicio" } },
  { href: "/about", label: { en: "About", es: "Acerca" } },
  { href: "/shows", label: { en: "Shows", es: "Presentaciones" } },
  { href: "/store", label: { en: "Store", es: "Tienda" } },
  { href: "/blog", label: { en: "Blog", es: "Blog" } },
  { href: "/booking", label: { en: "Contact", es: "Contacto" } },
  { href: "/epk", label: { en: "EPK", es: "EPK" } },
  { href: "/pensamientos", label: { en: "Pensamientos", es: "Pensamientos" } },
  { href: "/donate", label: { en: "Donate", es: "Donar" } },
];
