import * as React from "react";
import NextLink from "next/link";
import { Calendar, GraduationCap, Flame, Mail } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingForm } from "@/components/sections/BookingForm";
import { getLang } from "@/lib/i18n-server";

// Three event-type doors. Each is a real path forward — the visitor
// picks the type that fits their gathering, and the CTA opens an email
// pre-titled with that type so Francisco knows the context immediately.
const EVENT_TYPES: {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: { en: string; es: string };
  title: { en: string; es: string };
  description: { en: string; es: string };
  ctaSubject: string;
  cta: { en: string; es: string };
}[] = [
  {
    icon: Calendar,
    eyebrow: { en: "Concerts & festivals", es: "Conciertos y festivales" },
    title: { en: "On the stage", es: "En el escenario" },
    description: {
      en: "Concert halls, theaters, festivals, public stages — solo voice and guitar, full band, or duets with collaborators.",
      es: "Salas de concierto, teatros, festivales, escenarios públicos — voz y guitarra solos, banda completa, o dúos con colaboradores.",
    },
    ctaSubject: "Booking inquiry — Concert / Festival",
    cta: { en: "Inquire about a concert", es: "Consultar un concierto" },
  },
  {
    icon: GraduationCap,
    eyebrow: { en: "Schools & classrooms", es: "Escuelas y aulas" },
    title: { en: "In the classroom", es: "En el aula" },
    description: {
      en: "Bilingual children's music for K–12, libraries, family events, and educator workshops — songs that teach Spanish through play.",
      es: "Música infantil bilingüe para K–12, bibliotecas, eventos familiares y talleres docentes — canciones que enseñan español jugando.",
    },
    ctaSubject: "Booking inquiry — School / Classroom",
    cta: { en: "Inquire about a school visit", es: "Consultar visita escolar" },
  },
  {
    icon: Flame,
    eyebrow: { en: "Community, sanctuary, vigils", es: "Comunidad, santuario, vigilias" },
    title: { en: "With the people", es: "Con el pueblo" },
    description: {
      en: "Churches, union halls, sanctuary spaces, vigils, marches — music for movements, where the song does the work of gathering.",
      es: "Iglesias, salones sindicales, santuarios, vigilias, marchas — música para los movimientos, donde el canto hace el trabajo de reunir.",
    },
    ctaSubject: "Booking inquiry — Community / Sanctuary",
    cta: { en: "Inquire about a community event", es: "Consultar un evento comunitario" },
  },
];

// Bilingual checklist for what to include in the inquiry email — saves
// a back-and-forth and helps Francisco respond quickly.
const INQUIRY_CHECKLIST: { en: string; es: string }[] = [
  {
    en: "Date and time of the event (or window of dates)",
    es: "Fecha y hora del evento (o rango de fechas)",
  },
  {
    en: "Location — venue name, city, and state",
    es: "Lugar — nombre del local, ciudad y estado",
  },
  {
    en: "Audience — size, age range, and language preferences",
    es: "Audiencia — tamaño, rango de edad y preferencias de idioma",
  },
  {
    en: "Format — solo, duo, full band, or workshop",
    es: "Formato — solo, dúo, banda completa o taller",
  },
  {
    en: "Budget range and any logistical constraints",
    es: "Rango de presupuesto y limitaciones logísticas",
  },
];

export default async function BookingPage() {
  const lang = await getLang();

  return (
    <>
      <Header lang={lang} />
      <main>
        {/* ─── Hero ─────────────────────────────────────────────────────
            Magenta concert hero — same image as the StubPage that lived
            here previously, now wrapped in a real bilingual hero with
            full overlays and the "En Vivo" cursive watermark. */}
        <section
          className="relative isolate overflow-hidden pt-24 sm:pt-32 lg:pt-44 pb-14 sm:pb-20 lg:pb-28 min-h-[44vh] sm:min-h-[55vh] lg:min-h-[60vh] flex items-end"
          aria-label={
            lang === "en"
              ? "Contact and book Francisco J. Herrera"
              : "Contacta y contrata a Francisco J. Herrera"
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero/1.booking.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            style={{ objectPosition: "center 25%" }}
            loading="eager"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/15" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 [background:linear-gradient(to_right,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.30)_15%,rgba(0,0,0,0.10)_38%,rgba(0,0,0,0.05)_62%,rgba(0,0,0,0.25)_88%,rgba(0,0,0,0.50)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 [background:radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.22)_55%,transparent_85%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-[var(--color-bg)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-6 lg:right-12 lg:top-10 z-0 select-none"
          >
            <p className="font-signature text-7xl lg:text-9xl text-[var(--color-accent-brand)]/35 -rotate-12 leading-none [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              En Vivo
            </p>
          </div>

          <div className="relative z-10 mx-auto max-w-[var(--container-content)] px-6 text-center w-full">
            <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-3 inline-block">
              {lang === "en" ? "CONTACT & BOOK" : "CONTACTO Y CONTRATACIÓN"}
            </span>
            <h1 className="font-heading font-black text-5xl sm:text-6xl lg:text-8xl text-[var(--color-fg)] mb-5 uppercase tracking-tight leading-[0.95] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
              {lang === "en" ? "Bring Francisco" : "Lleva a Francisco"}
              <br />
              <span className="italic font-light text-[var(--color-accent-brand)]">
                {lang === "en" ? "to your stage." : "a tu escenario."}
              </span>
            </h1>
            <p className="text-white/90 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
              {lang === "en"
                ? "Reach out about a show, a school visit, a vigil, a song, or simply to say hello — music for movements, churches, schools, festivals, and family events."
                : "Escríbenos sobre un concierto, una visita escolar, una vigilia, una canción, o simplemente para saludar — música para movimientos, iglesias, escuelas, festivales y eventos familiares."}
            </p>
          </div>
        </section>

        {/* ─── Three event types ────────────────────────────────────────
            What kind of gathering is the visitor planning? Each card
            opens an email pre-titled so Francisco knows the context the
            moment he sees the inquiry. */}
        <section className="bg-[var(--color-bg-warm)] section-atmospheric py-24 lg:py-32 border-t border-black">
          {/* Warm-tobacco band in the 3-tier dark rotation (Wes pattern). */}
          <div className="mx-auto max-w-[var(--container-content)] px-6">
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-3 inline-block">
                {lang === "en"
                  ? "WHAT KIND OF EVENT"
                  : "QUÉ TIPO DE EVENTO"}
              </span>
              <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] mb-5 uppercase tracking-tight leading-[0.95]">
                {lang === "en" ? "Three kinds" : "Tres tipos"}
                <br />
                <span className="italic font-light text-[var(--color-accent-brand)]">
                  {lang === "en" ? "of rooms." : "de salas."}
                </span>
              </h2>
              <p className="text-[var(--color-fg)]/85 text-base lg:text-lg leading-relaxed">
                {lang === "en"
                  ? "Pick the one closest to your gathering — the link opens a pre-titled email so Francisco knows the context immediately."
                  : "Elijan la más parecida a su reunión — el enlace abre un correo pre-titulado para que Francisco conozca el contexto al instante."}
              </p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {EVENT_TYPES.map((type, i) => {
                const Icon = type.icon;
                const mailto = `mailto:info@franciscoherrera.com?subject=${encodeURIComponent(type.ctaSubject)}`;
                return (
                  <li key={i}>
                    <a
                      href={mailto}
                      className="group flex flex-col h-full bg-[var(--color-card-warm)] border border-[var(--color-border-warm)] hover:border-[var(--color-accent-brand)]/60 transition-colors p-7 lg:p-8 [box-shadow:0_18px_42px_-18px_rgba(0,0,0,0.7)]"
                    >
                      <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-full border border-[var(--color-accent-brand)]/50 text-[var(--color-accent-brand)] group-hover:bg-[var(--color-accent-brand)] group-hover:text-[var(--color-bg)] transition-colors">
                        <Icon className="size-6" aria-hidden="true" />
                      </div>
                      <p className="font-ui font-semibold text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[var(--color-accent-brand)] mb-3">
                        {type.eyebrow[lang]}
                      </p>
                      <h3 className="font-heading text-xl lg:text-2xl text-white leading-snug mb-4 group-hover:text-[var(--color-accent-brand)] transition-colors">
                        {type.title[lang]}
                      </h3>
                      <p className="font-body text-sm lg:text-base leading-relaxed text-[var(--color-fg)]/85 mb-6">
                        {type.description[lang]}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-2 font-ui font-semibold text-[11px] uppercase tracking-[0.25em] text-[var(--color-accent-brand)] group-hover:text-white transition-colors">
                        {type.cta[lang]}
                        <span aria-hidden="true">→</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <BookingForm lang={lang} />

        {/* ─── Encuentro cinematic banner ───────────────────────────────
            Francisco at a city-square rally — real performance context,
            audience and protest signs visible. The gathering is what
            booking him creates, shown literally. Sits AFTER the form so
            it functions as the emotional payoff ("this is what you're
            booking"), not a gate before the action. "Encuentro" cursive
            watermark — the meeting, the gathering. */}
        <section
          className="relative w-full overflow-hidden bg-black aspect-[12/5] sm:aspect-[16/6] lg:aspect-[24/10]"
          aria-label={lang === "en" ? "The gathering" : "El encuentro"}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/photos/city-square.png"
            alt={
              lang === "en"
                ? "Francisco J. Herrera performing on guitar at a city-square rally with audience and protest signs"
                : "Francisco J. Herrera tocando la guitarra en un mitin en la plaza con público y carteles de protesta"
            }
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 45%" }}
            loading="lazy"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 [background:linear-gradient(to_right,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.10)_18%,rgba(0,0,0,0)_42%,rgba(0,0,0,0)_58%,rgba(0,0,0,0.10)_82%,rgba(0,0,0,0.45)_100%)]"
          />

          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-24 bg-gradient-to-t from-transparent to-[var(--color-bg)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[var(--color-bg)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-6 lg:right-20 lg:top-10 z-10 select-none"
          >
            <p className="font-signature text-7xl lg:text-9xl text-[var(--color-accent-brand)]/55 -rotate-12 leading-none [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              Encuentro
            </p>
          </div>
        </section>

        {/* ─── What to include ──────────────────────────────────────────
            Inquiry checklist so the first email isn't a back-and-forth.
            Single-column centered layout — five numbered items. */}
        <section className="bg-[var(--color-bg)] section-atmospheric py-24 lg:py-32 border-t border-[var(--color-border-brand)]">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center mb-12">
              <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-4 inline-block">
                {lang === "en"
                  ? "WHAT TO INCLUDE"
                  : "QUÉ INCLUIR"}
              </span>
              <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] mb-4 uppercase tracking-tight leading-[0.95]">
                {lang === "en" ? "Five lines," : "Cinco líneas,"}
                <br />
                <span className="italic font-light text-[var(--color-accent-brand)]">
                  {lang === "en" ? "one email." : "un correo."}
                </span>
              </h2>
              <p className="font-body text-base lg:text-lg text-[var(--color-fg)]/80 leading-relaxed max-w-2xl mx-auto">
                {lang === "en"
                  ? "A few details up front mean Francisco can answer thoughtfully on the first reply."
                  : "Unos detalles al principio permiten que Francisco responda con cuidado en la primera respuesta."}
              </p>
            </div>
            <ol className="space-y-4">
              {INQUIRY_CHECKLIST.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-5 border-b border-[var(--color-border-brand)] pb-4"
                >
                  <span className="font-heading font-black text-2xl text-[var(--color-accent-brand)] leading-none w-8 shrink-0 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-body text-base lg:text-lg leading-relaxed text-[var(--color-fg)]/90">
                    {item[lang]}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── Direct contact + press kit pointer ───────────────────────
            Closing block — a one-click email path for visitors who don't
            fit any of the three event-type cards above, plus a quiet
            pointer to the press kit for journalists who landed here by
            mistake.

            Deeper-tobacco band — tertiary-dark anchor for the closing
            direct-contact moment (Wes uses tertiary for its CTA section). */}
        <section className="relative isolate overflow-hidden bg-[var(--color-bg-deeper)] section-atmospheric py-24 lg:py-32 border-t border-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/photos/4.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            style={{ objectPosition: "center 35%" }}
            loading="lazy"
          />
          {/* Deeper-tobacco scrim — mirrors /epk Contact section. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#1f1b10]/85" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-4 inline-block">
              {lang === "en" ? "DIRECT" : "DIRECTO"}
            </span>
            <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] mb-8 uppercase tracking-tight leading-[0.95]">
              {lang === "en" ? "Or write" : "O escriban"}
              <br />
              <span className="italic font-light text-[var(--color-accent-brand)]">
                {lang === "en" ? "directly." : "directamente."}
              </span>
            </h2>

            <ul className="flex flex-col items-center gap-4 mb-12 font-body text-base lg:text-lg text-[var(--color-fg)]/90">
              <li>
                <a
                  href="mailto:info@franciscoherrera.com"
                  className="inline-flex items-center gap-3 hover:text-[var(--color-accent-brand)] transition-colors"
                >
                  <Mail className="size-4 text-[var(--color-accent-brand)]" aria-hidden="true" />
                  info@franciscoherrera.com
                </a>
              </li>
              <li className="text-sm text-[var(--color-muted-brand)]">
                {lang === "en" ? "Bay Area, California" : "Área de la Bahía, California"}
              </li>
            </ul>

            <p className="font-body italic text-sm lg:text-base text-[var(--color-muted-brand)] leading-relaxed mb-10">
              {lang === "en"
                ? "Press, journalists, and presenters — the EPK has bio, photography, and recordings ready for download."
                : "Prensa, periodistas y presentadores — el EPK tiene biografía, fotografía y grabaciones listas para descargar."}
            </p>

            <NextLink
              href="/epk"
              className="inline-flex items-center gap-2 font-ui font-semibold text-xs uppercase tracking-[0.2em] border border-[var(--color-accent-brand)]/60 text-white hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent-brand)] transition-colors px-7 py-3"
            >
              {lang === "en" ? "View press kit" : "Ver kit de prensa"}
            </NextLink>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
