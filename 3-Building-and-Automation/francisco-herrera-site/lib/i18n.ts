/**
 * Tiny in-repo bilingual helper. No next-intl, no routed locales.
 *
 * The active language lives in a cookie (see LANG_COOKIE) rather than in
 * the URL, so every route keeps a single canonical path. Pages read it on
 * the server via `getLang()` in lib/i18n-server.ts; the header toggle
 * writes the cookie and calls router.refresh() so the server re-renders
 * the whole tree in the new language.
 */
export type Localized = { en: string; es: string };
export type Lang = "en" | "es";

export const LANGS = ["en", "es"] as const;
export const DEFAULT_LANG: Lang = "en";

/** Cookie that carries the visitor's language across requests. */
export const LANG_COOKIE = "fjh_lang";

/** One year — the choice should stick between visits. */
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isLang(value: unknown): value is Lang {
  return value === "en" || value === "es";
}

export function t(value: Localized, lang: Lang = DEFAULT_LANG): string {
  return value[lang];
}
