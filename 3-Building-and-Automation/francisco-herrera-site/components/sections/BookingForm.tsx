"use client";

import * as React from "react";
import { Mail, Send } from "lucide-react";
import type { Lang } from "@/lib/i18n";

type Props = {
  lang?: Lang;
};

type FormState = {
  name: string;
  email: string;
  eventType: string;
  date: string;
  location: string;
  audience: string;
  format: string;
  message: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  eventType: "",
  date: "",
  location: "",
  audience: "",
  format: "",
  message: "",
};

const COPY = {
  en: {
    eyebrow: "SEND A MESSAGE",
    title: "Booking inquiry",
    intro:
      "Fill in what you can — Francisco reads every message and will respond within a few days.",
    name: "Your name",
    namePlaceholder: "Maria Hernández",
    email: "Email",
    emailPlaceholder: "you@example.com",
    eventType: "Event type",
    eventTypeOptions: [
      { value: "", label: "Choose one…" },
      { value: "Concert / Festival", label: "Concert / Festival" },
      { value: "School / Classroom", label: "School / Classroom" },
      { value: "Community / Sanctuary / Vigil", label: "Community / Sanctuary / Vigil" },
      { value: "Other", label: "Other" },
    ],
    date: "Date or window",
    datePlaceholder: "e.g. Saturday 6 June 2026",
    location: "Location",
    locationPlaceholder: "Venue, city, state",
    audience: "Audience",
    audiencePlaceholder: "Approx. size + age range",
    format: "Format",
    formatPlaceholder: "Solo, duo, full band, workshop…",
    message: "Anything else",
    messagePlaceholder:
      "Budget range, accessibility needs, the spirit of the gathering, anything Francisco should know…",
    required: "required",
    submit: "Open email to send",
    submitNote: "This opens your default email client with everything pre-filled.",
    successTitle: "Email opened",
    successBody: "Hit send in your email client and Francisco will receive your inquiry.",
    successAction: "Send another",
    fallbackLabel: "Or email directly:",
    fallbackEmail: "info@franciscoherrera.com",
  },
  es: {
    eyebrow: "ENVIAR UN MENSAJE",
    title: "Consulta de contratación",
    intro:
      "Completen lo que puedan — Francisco lee todos los mensajes y responderá en unos días.",
    name: "Su nombre",
    namePlaceholder: "María Hernández",
    email: "Correo",
    emailPlaceholder: "tu@ejemplo.com",
    eventType: "Tipo de evento",
    eventTypeOptions: [
      { value: "", label: "Elijan uno…" },
      { value: "Concierto / Festival", label: "Concierto / Festival" },
      { value: "Escuela / Aula", label: "Escuela / Aula" },
      { value: "Comunidad / Santuario / Vigilia", label: "Comunidad / Santuario / Vigilia" },
      { value: "Otro", label: "Otro" },
    ],
    date: "Fecha o rango",
    datePlaceholder: "p.ej. sábado 6 de junio de 2026",
    location: "Lugar",
    locationPlaceholder: "Local, ciudad, estado",
    audience: "Audiencia",
    audiencePlaceholder: "Tamaño aprox. + rango de edad",
    format: "Formato",
    formatPlaceholder: "Solo, dúo, banda, taller…",
    message: "Algo más",
    messagePlaceholder:
      "Rango de presupuesto, necesidades de accesibilidad, el espíritu de la reunión, lo que sea importante…",
    required: "obligatorio",
    submit: "Abrir correo para enviar",
    submitNote: "Esto abre el cliente de correo predeterminado con todo pre-completado.",
    successTitle: "Correo abierto",
    successBody:
      "Presionen enviar en su cliente de correo y Francisco recibirá la consulta.",
    successAction: "Enviar otro",
    fallbackLabel: "O escribir directamente:",
    fallbackEmail: "info@franciscoherrera.com",
  },
};

export function BookingForm({ lang = "en" }: Props) {
  const [data, setData] = React.useState<FormState>(INITIAL_STATE);
  const [submitted, setSubmitted] = React.useState(false);
  const t = COPY[lang];

  const update = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setData((d) => ({ ...d, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Booking inquiry — ${data.eventType || "General"}`;
    const lines = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      ``,
      `Event type: ${data.eventType || "—"}`,
      `Date: ${data.date || "—"}`,
      `Location: ${data.location || "—"}`,
      `Audience: ${data.audience || "—"}`,
      `Format: ${data.format || "—"}`,
      ``,
      `Message:`,
      data.message,
    ];
    const mailto = `mailto:info@franciscoherrera.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  const reset = () => {
    setData(INITIAL_STATE);
    setSubmitted(false);
  };

  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-bg-deeper)] section-atmospheric py-24 lg:py-32 border-y border-[var(--color-accent-brand)]/30">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/photos/1.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: "center 35%" }}
        loading="lazy"
      />
      {/* Deeper-tobacco scrim — mirrors /epk Contact section. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#1f1b10]/85" />
      <div className="relative mx-auto max-w-3xl px-6">
        <div className="text-center mb-12">
          <span className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-brand)] mb-4 inline-block">
            {t.eyebrow}
          </span>
          <h2 className="font-signature text-4xl sm:text-5xl lg:text-6xl text-[var(--color-fg)] leading-tight mb-4">
            {t.title}
          </h2>
          <p className="font-body text-base lg:text-lg text-[var(--color-fg)]/80 leading-relaxed max-w-2xl mx-auto">
            {t.intro}
          </p>
        </div>

        {submitted ? (
          <div
            role="status"
            aria-live="polite"
            className="border border-[var(--color-accent-brand)]/50 p-8 text-center"
          >
            <h3 className="font-signature text-3xl text-[var(--color-accent-brand)] mb-3">
              {t.successTitle}
            </h3>
            <p className="font-body text-base text-[var(--color-fg)]/85 mb-6 max-w-md mx-auto leading-relaxed">
              {t.successBody}
            </p>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 font-ui font-semibold text-xs uppercase tracking-[0.2em] border border-[var(--color-accent-brand)]/60 text-white hover:bg-[var(--color-accent-brand)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent-brand)] transition-colors px-7 py-3"
            >
              {t.successAction}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field
              id="name"
              label={t.name}
              required
              requiredLabel={t.required}
              value={data.name}
              onChange={update("name")}
              placeholder={t.namePlaceholder}
            />
            <Field
              id="email"
              type="email"
              label={t.email}
              required
              requiredLabel={t.required}
              value={data.email}
              onChange={update("email")}
              placeholder={t.emailPlaceholder}
            />

            <SelectField
              id="eventType"
              label={t.eventType}
              value={data.eventType}
              onChange={update("eventType")}
              options={t.eventTypeOptions}
              wide
            />

            <Field
              id="date"
              label={t.date}
              value={data.date}
              onChange={update("date")}
              placeholder={t.datePlaceholder}
            />
            <Field
              id="location"
              label={t.location}
              value={data.location}
              onChange={update("location")}
              placeholder={t.locationPlaceholder}
            />

            <Field
              id="audience"
              label={t.audience}
              value={data.audience}
              onChange={update("audience")}
              placeholder={t.audiencePlaceholder}
            />
            <Field
              id="format"
              label={t.format}
              value={data.format}
              onChange={update("format")}
              placeholder={t.formatPlaceholder}
            />

            <TextArea
              id="message"
              label={t.message}
              value={data.message}
              onChange={update("message")}
              placeholder={t.messagePlaceholder}
              required
              requiredLabel={t.required}
            />

            <div className="sm:col-span-2 flex flex-col items-center mt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 font-ui font-semibold text-xs uppercase tracking-[0.2em] bg-[var(--color-accent-brand)] text-[var(--color-bg)] hover:bg-[var(--color-fg)] transition-colors px-8 py-3.5"
              >
                <Send className="size-4" aria-hidden="true" />
                {t.submit}
              </button>
              <p className="mt-3 text-xs font-body italic text-[var(--color-muted-brand)] text-center">
                {t.submitNote}
              </p>
            </div>
          </form>
        )}

        {/* Always-visible direct email fallback so visitors who can't
            use the form can still reach Francisco. */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border-brand)] text-center">
          <p className="font-body text-sm text-[var(--color-muted-brand)] mb-3">
            {t.fallbackLabel}
          </p>
          <a
            href={`mailto:${t.fallbackEmail}`}
            className="inline-flex items-center gap-3 font-body text-base lg:text-lg text-[var(--color-fg)]/90 hover:text-[var(--color-accent-brand)] transition-colors"
          >
            <Mail className="size-4 text-[var(--color-accent-brand)]" aria-hidden="true" />
            {t.fallbackEmail}
          </a>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  requiredLabel?: string;
  type?: string;
};

function Field({ id, label, value, onChange, placeholder, required, requiredLabel, type = "text" }: FieldProps) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="font-ui font-semibold text-[10px] uppercase tracking-[0.25em] text-[var(--color-accent-brand)] mb-2"
      >
        {label}
        {required && (
          <span className="text-[var(--color-muted-brand)]/70 normal-case font-normal tracking-normal ml-2">
            ({requiredLabel})
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="bg-[#f5efe2] border border-[var(--color-accent-brand)]/30 text-[#1a1a1a] placeholder:text-[#1a1a1a]/45 focus:border-[var(--color-accent-brand)] focus:ring-2 focus:ring-[var(--color-accent-brand)]/40 focus:outline-none px-4 py-3 font-body text-base shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
      />
    </div>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  wide?: boolean;
};

function SelectField({ id, label, value, onChange, options, wide }: SelectFieldProps) {
  return (
    <div className={`flex flex-col ${wide ? "sm:col-span-2" : ""}`}>
      <label
        htmlFor={id}
        className="font-ui font-semibold text-[10px] uppercase tracking-[0.25em] text-[var(--color-accent-brand)] mb-2"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="bg-[#f5efe2] border border-[var(--color-accent-brand)]/30 text-[#1a1a1a] focus:border-[var(--color-accent-brand)] focus:ring-2 focus:ring-[var(--color-accent-brand)]/40 focus:outline-none px-4 py-3 font-body text-base shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#f5efe2] text-[#1a1a1a]">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

type TextAreaProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  requiredLabel?: string;
};

function TextArea({ id, label, value, onChange, placeholder, required, requiredLabel }: TextAreaProps) {
  return (
    <div className="sm:col-span-2 flex flex-col">
      <label
        htmlFor={id}
        className="font-ui font-semibold text-[10px] uppercase tracking-[0.25em] text-[var(--color-accent-brand)] mb-2"
      >
        {label}
        {required && (
          <span className="text-[var(--color-muted-brand)]/70 normal-case font-normal tracking-normal ml-2">
            ({requiredLabel})
          </span>
        )}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={6}
        className="bg-[#f5efe2] border border-[var(--color-accent-brand)]/30 text-[#1a1a1a] placeholder:text-[#1a1a1a]/45 focus:border-[var(--color-accent-brand)] focus:ring-2 focus:ring-[var(--color-accent-brand)]/40 focus:outline-none px-4 py-3 font-body text-base resize-y shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
      />
    </div>
  );
}
