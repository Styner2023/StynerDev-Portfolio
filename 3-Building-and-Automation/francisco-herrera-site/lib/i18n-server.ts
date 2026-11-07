import { cookies } from "next/headers";
import { DEFAULT_LANG, LANG_COOKIE, isLang, type Lang } from "@/lib/i18n";

/**
 * Active language for the current request, read from the language cookie.
 *
 * Reading cookies opts the route into dynamic rendering — that is the
 * intended trade here: one canonical URL per page that renders in
 * whichever language the visitor picked, instead of /en + /es duplicates.
 */
export async function getLang(): Promise<Lang> {
  const store = await cookies();
  const value = store.get(LANG_COOKIE)?.value;
  return isLang(value) ? value : DEFAULT_LANG;
}
