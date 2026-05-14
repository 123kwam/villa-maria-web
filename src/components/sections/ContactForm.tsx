"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full border border-vm-black/15 bg-transparent px-4 py-3 font-display text-base text-vm-black placeholder-vm-smoke/50 transition-colors focus:border-vm-black focus:outline-none disabled:opacity-60";

export function ContactForm() {
  const t = useTranslations("ContactPage.form");
  const [status, setStatus] = useState<Status>("idle");

  const schema = z.object({
    firstName: z
      .string()
      .trim()
      .min(1, t("errors.firstNameRequired"))
      .max(80, t("errors.tooLong")),
    lastName: z
      .string()
      .trim()
      .min(1, t("errors.lastNameRequired"))
      .max(80, t("errors.tooLong")),
    email: z
      .string()
      .trim()
      .min(1, t("errors.emailRequired"))
      .email(t("errors.emailInvalid"))
      .max(200, t("errors.tooLong")),
    phone: z
      .string()
      .trim()
      .min(5, t("errors.phoneRequired"))
      .max(30, t("errors.tooLong")),
    message: z.string().trim().max(2000, t("errors.tooLong")).optional(),
    website: z.string().max(0).optional(),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      website: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-vm-black/15 px-6 py-10 md:px-10 md:py-14">
        <p className="text-[11px] uppercase tracking-[0.35em] text-vm-red">
          {t("successEyebrow")}
        </p>
        <h3 className="mt-4 font-display text-4xl leading-tight tracking-tight md:text-5xl">
          {t("successTitle")}
        </h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-vm-black/80 md:text-lg">
          {t("successBody")}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="group mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-vm-smoke hover:text-vm-red"
        >
          <span>{t("sendAnother")}</span>
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={t("firstName")} error={errors.firstName?.message}>
          <input
            type="text"
            autoComplete="given-name"
            disabled={submitting}
            className={inputClass}
            {...register("firstName")}
          />
        </Field>
        <Field label={t("lastName")} error={errors.lastName?.message}>
          <input
            type="text"
            autoComplete="family-name"
            disabled={submitting}
            className={inputClass}
            {...register("lastName")}
          />
        </Field>
      </div>

      <Field label={t("email")} error={errors.email?.message}>
        <input
          type="email"
          autoComplete="email"
          inputMode="email"
          disabled={submitting}
          className={inputClass}
          {...register("email")}
        />
      </Field>

      <Field label={t("phone")} error={errors.phone?.message}>
        <input
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          disabled={submitting}
          className={inputClass}
          {...register("phone")}
        />
      </Field>

      <Field
        label={t("message")}
        hint={t("messageHint")}
        error={errors.message?.message}
      >
        <textarea
          rows={5}
          disabled={submitting}
          className={`${inputClass} resize-y`}
          {...register("message")}
        />
      </Field>

      <div aria-hidden className="hidden">
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </label>
      </div>

      <div className="flex flex-col items-stretch gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p
          className={`text-xs ${status === "error" ? "text-vm-red" : "text-vm-smoke"}`}
          role={status === "error" ? "alert" : undefined}
        >
          {status === "error" ? t("errorBody") : t("disclaimer")}
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex items-center justify-between gap-4 bg-vm-black px-7 py-4 text-xs uppercase tracking-[0.3em] text-vm-cream transition-colors hover:bg-vm-red disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{submitting ? t("sending") : t("submit")}</span>
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="flex items-baseline justify-between gap-3 text-[10px] uppercase tracking-[0.3em] text-vm-smoke">
        <span>{label}</span>
        {hint ? (
          <span className="normal-case tracking-normal text-vm-smoke/60">
            {hint}
          </span>
        ) : null}
      </span>
      {children}
      {error ? <span className="block text-xs text-vm-red">{error}</span> : null}
    </label>
  );
}
