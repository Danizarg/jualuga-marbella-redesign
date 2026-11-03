"use client";

import { useId, useState } from "react";

import { PROPERTIES } from "@/data/properties";
import { EMAIL } from "@/data/site";

interface Fields {
  nombre: string;
  email: string;
  telefono: string;
  propiedad: string;
  mensaje: string;
}

const EMPTY: Fields = {
  nombre: "",
  email: "",
  telefono: "",
  propiedad: "",
  mensaje: "",
};

/**
 * Enquiry form.
 *
 * There is no server or mail service behind this site, so rather than pretend
 * to send a message the form composes one and hands it to the visitor's own
 * mail client. That is stated plainly next to the button, and the phone and
 * WhatsApp routes sit alongside for anyone who would rather not use email.
 */
export function EnquiryForm() {
  const id = useId();
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [touched, setTouched] = useState(false);

  const missing = {
    nombre: fields.nombre.trim().length === 0,
    email: !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fields.email.trim()),
    mensaje: fields.mensaje.trim().length === 0,
  };
  const hasErrors = missing.nombre || missing.email || missing.mensaje;

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (hasErrors) return;

    const subject = fields.propiedad
      ? `Consulta: ${fields.propiedad}`
      : "Consulta desde la web";

    const body = [
      `Nombre: ${fields.nombre}`,
      `E-mail: ${fields.email}`,
      fields.telefono ? `Teléfono: ${fields.telefono}` : null,
      fields.propiedad ? `Propiedad: ${fields.propiedad}` : null,
      "",
      fields.mensaje,
    ]
      .filter((l) => l !== null)
      .join("\n");

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  const fieldClass =
    "w-full border border-charcoal/18 bg-paper px-4 py-3.5 text-[0.9375rem] font-light text-charcoal transition-colors duration-500 placeholder:text-stone/60 hover:border-charcoal/35 focus-visible:border-terracotta";

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-nombre`} className="label block text-stone">
            Nombre <span aria-hidden className="text-terracotta">*</span>
          </label>
          <input
            id={`${id}-nombre`}
            name="nombre"
            type="text"
            autoComplete="name"
            required
            value={fields.nombre}
            onChange={set("nombre")}
            aria-invalid={touched && missing.nombre}
            aria-describedby={touched && missing.nombre ? `${id}-nombre-err` : undefined}
            className={`mt-3 ${fieldClass}`}
          />
          {touched && missing.nombre ? (
            <p id={`${id}-nombre-err`} className="label mt-2 text-terracotta">
              Indíquenos su nombre
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${id}-email`} className="label block text-stone">
            E-mail <span aria-hidden className="text-terracotta">*</span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={fields.email}
            onChange={set("email")}
            aria-invalid={touched && missing.email}
            aria-describedby={touched && missing.email ? `${id}-email-err` : undefined}
            className={`mt-3 ${fieldClass}`}
          />
          {touched && missing.email ? (
            <p id={`${id}-email-err`} className="label mt-2 text-terracotta">
              Revise la dirección de correo
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${id}-tel`} className="label block text-stone">
            Teléfono
          </label>
          <input
            id={`${id}-tel`}
            name="telefono"
            type="tel"
            autoComplete="tel"
            value={fields.telefono}
            onChange={set("telefono")}
            className={`mt-3 ${fieldClass}`}
          />
        </div>

        <div>
          <label htmlFor={`${id}-prop`} className="label block text-stone">
            Propiedad de interés
          </label>
          <select
            id={`${id}-prop`}
            name="propiedad"
            value={fields.propiedad}
            onChange={set("propiedad")}
            className={`mt-3 appearance-none ${fieldClass}`}
          >
            <option value="">Consulta general</option>
            {PROPERTIES.map((p) => (
              <option key={p.slug} value={`${p.title} — ${p.kicker}`}>
                {p.title} — {p.kicker}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-msg`} className="label block text-stone">
          Mensaje <span aria-hidden className="text-terracotta">*</span>
        </label>
        <textarea
          id={`${id}-msg`}
          name="mensaje"
          rows={6}
          required
          value={fields.mensaje}
          onChange={set("mensaje")}
          aria-invalid={touched && missing.mensaje}
          aria-describedby={touched && missing.mensaje ? `${id}-msg-err` : undefined}
          className={`mt-3 resize-y ${fieldClass}`}
        />
        {touched && missing.mensaje ? (
          <p id={`${id}-msg-err`} className="label mt-2 text-terracotta">
            Escríbanos unas líneas
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="label group/s flex items-center justify-center gap-3 bg-charcoal px-7 py-4 text-paper transition-colors duration-500 hover:bg-terracotta"
        >
          Preparar consulta
          <svg
            aria-hidden
            viewBox="0 0 24 10"
            className="h-2 w-5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/s:translate-x-1.5 motion-reduce:transition-none"
            fill="none"
          >
            <path d="M0 5h22M17.5 0.5 22 5l-4.5 4.5" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>
        <p className="label max-w-xs text-stone/80">
          Se abrirá su programa de correo con el mensaje ya redactado
        </p>
      </div>
    </form>
  );
}
