"use client";

import { useState, FormEvent } from "react";
import { services } from "@/lib/services";

type Status = "idle" | "submitting" | "success" | "error";

export default function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      applianceType: formData.get("applianceType"),
      issue: formData.get("issue"),
      preferredDate: formData.get("preferredDate"),
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border border-brass p-8">
        <h2 className="font-display text-2xl text-paper">Request received</h2>
        <p className="mt-3 font-body text-sm leading-relaxed text-muted">
          Thanks — we&apos;ll call you shortly to confirm a time. If your
          issue is urgent, calling us directly will always be faster than
          the form.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-body text-sm text-brass underline underline-offset-4"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Full name" htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-white/10 bg-[#0b0c0d] px-4 py-3 font-body text-sm text-paper placeholder:text-muted/50 transition focus:border-brass"
            placeholder="Jane Alvarez"
          />
        </Field>

        <Field label="Phone number" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="w-full rounded-xl border border-white/10 bg-[#0b0c0d] px-4 py-3 font-body text-sm text-paper placeholder:text-muted/50 transition focus:border-brass"
            placeholder="(831) 555-0100"
          />
        </Field>
      </div>

      <Field label="Service address" htmlFor="address">
        <input
          id="address"
          name="address"
          type="text"
          required
          className="w-full rounded-xl border border-white/10 bg-[#0b0c0d] px-4 py-3 font-body text-sm text-paper placeholder:text-muted/50 transition focus:border-brass"
          placeholder="Street address, Watsonville, CA"
        />
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Appliance" htmlFor="applianceType">
          <select
            id="applianceType"
            name="applianceType"
            required
            defaultValue=""
            className="w-full rounded-xl border border-white/10 bg-[#0b0c0d] px-4 py-3 font-body text-sm text-paper"
          >
            <option value="" disabled>
              Select an appliance
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </Field>

        <Field label="Preferred day (optional)" htmlFor="preferredDate">
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            className="w-full rounded-xl border border-white/10 bg-[#0b0c0d] px-4 py-3 font-body text-sm text-paper"
          />
        </Field>
      </div>

      <Field label="What's going on?" htmlFor="issue">
        <textarea
          id="issue"
          name="issue"
          required
          rows={4}
          className="w-full rounded-xl border border-white/10 bg-[#0b0c0d] px-4 py-3 font-body text-sm text-paper placeholder:text-muted/50 transition focus:border-brass"
          placeholder="e.g. Washer fills but won't spin, started yesterday."
        />
      </Field>

      {status === "error" && (
        <p className="font-body text-sm text-rust">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-shine rounded-full bg-brass px-8 py-3.5 font-body text-sm font-medium text-ink transition-colors hover:bg-brassLight disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Request repair"}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block font-body text-xs uppercase tracking-wide text-muted"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
