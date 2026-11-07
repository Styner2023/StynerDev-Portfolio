import type { Metadata } from "next";
import { Lora, Manrope, Playfair_Display } from "next/font/google";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { getLang } from "@/lib/i18n-server";
import "./globals.css";

// Three-tier typography:
//   Hero / section headlines → Playfair Display (editorial display serif)
//   Body paragraphs           → Lora (humanist serif, very readable)
//   Navbar / UI chrome / CTAs → Manrope (modern sans, solid at small caps)
//   Signature                 → Silently (in globals.css)
// Envato display faces in public/fonts/fonts-envato/ are reserved for
// future accent use only — never body.
const lora = Lora({
  variable: "--font-body-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-ui-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Francisco J. Herrera",
    template: "%s — Francisco J. Herrera",
  },
  description:
    "Bilingual guitarist and singer-songwriter — songs of liberation, migration, family, and faith.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLang();

  return (
    <html lang={lang} className={`${lora.variable} ${playfair.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
