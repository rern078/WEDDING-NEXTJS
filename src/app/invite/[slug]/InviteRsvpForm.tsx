"use client";

import { useState } from "react";
import { parseInviteLayout, rsvpFormClasses, type InviteLayoutKey } from "@/lib/invite-layout-theme";

const statuses = [
  { value: "ATTENDING", label: "Joyfully accepts" },
  { value: "DECLINED", label: "Regretfully declines" },
  { value: "MAYBE", label: "Not sure yet" },
] as const;

export function InviteRsvpForm({
  slug,
  layout = "layout1",
}: {
  slug: string;
  layout?: InviteLayoutKey | string;
}) {
  const L = parseInviteLayout(layout);
  const t = rsvpFormClasses(L);
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string>("ATTENDING");
  const [message, setMessage] = useState("");
  const [dietary, setDietary] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch(`/api/public/events/${slug}/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guestName,
        email: email || null,
        status,
        message: message || null,
        dietary: dietary || null,
      }),
    });
    setLoading(false);
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      setError(data.error ?? "Could not send RSVP.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-emerald-900">
        Thank you — your response was recorded.
      </p>
    );
  }

  return (
    <form id="invite-rsvp" onSubmit={onSubmit} className={t.form}>
      <h2 className={t.h2}>RSVP</h2>
      <label className="block space-y-1.5">
        <span className={t.label}>Your name</span>
        <input
          required
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          className={t.input}
        />
      </label>
      <label className="block space-y-1.5">
        <span className={t.label}>Email (optional)</span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={t.input} />
      </label>
      <fieldset className="space-y-2">
        <legend className={t.label}>Your reply</legend>
        {statuses.map((s) => (
          <label key={s.value} className={t.radioRow}>
            <input
              type="radio"
              name="status"
              value={s.value}
              checked={status === s.value}
              onChange={() => setStatus(s.value)}
              className={t.radioDot}
            />
            <span className={t.span}>{s.label}</span>
          </label>
        ))}
      </fieldset>
      <label className="block space-y-1.5">
        <span className={t.label}>Message (optional)</span>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={2} className={t.input} />
      </label>
      <label className="block space-y-1.5">
        <span className={t.label}>Dietary notes (optional)</span>
        <input value={dietary} onChange={(e) => setDietary(e.target.value)} className={t.input} />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button type="submit" disabled={loading} className={t.btn}>
        {loading ? "Sending…" : "Send RSVP"}
      </button>
    </form>
  );
}
