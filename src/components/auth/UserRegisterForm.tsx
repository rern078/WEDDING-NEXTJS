"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

type Props = {
  inviteSlug?: string;
};

export function UserRegisterForm({ inviteSlug }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loginHref = inviteSlug ? `/invite/${inviteSlug}/login` : "/login";
  const afterSignup = inviteSlug ? `/invite/${inviteSlug}` : "/dashboard";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const emailTrimmed = email.trim();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name || undefined, email: emailTrimmed, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "Could not register.");
      return;
    }
    const afterUrl = new URL(afterSignup, window.location.origin).href;
    const sign = await signIn("credentials", {
      email: emailTrimmed,
      password,
      redirect: false,
      callbackUrl: afterUrl,
    });
    if (!sign?.ok || sign.error) {
      setError("Account created but sign-in failed. Try logging in.");
      return;
    }
    window.location.href = afterSignup;
  }

  return (
    <div className="rounded-3xl border border-rose-100 bg-white/80 p-8 shadow-sm backdrop-blur">
      <h1 className="font-serif text-3xl font-semibold text-rose-950">Create your account</h1>
      <p className="mt-2 text-stone-600">
        New sign-ups are <strong>view-only</strong> (open invites &amp; RSVP). Organizers get <strong>admin</strong>{" "}
        access separately (e.g. via database or seed for testing).
      </p>
      {inviteSlug ? (
        <p className="mt-2 text-sm text-rose-800/90">
          You&apos;re registering from{" "}
          <Link href={`/invite/${inviteSlug}`} className="font-medium underline">
            this invitation
          </Link>
          . After sign-up you&apos;ll return there.
        </p>
      ) : null}
      <p className="mt-2 text-sm text-stone-500">Password must be at least 8 characters.</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-stone-700">Display name (optional)</span>
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none ring-rose-300/30 transition focus:border-rose-300 focus:ring-4"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-stone-700">Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none ring-rose-300/30 transition focus:border-rose-300 focus:ring-4"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-stone-700">Password</span>
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none ring-rose-300/30 transition focus:border-rose-300 focus:ring-4"
          />
        </label>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-rose-900 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-rose-800 disabled:opacity-60"
        >
          {loading ? "Creating…" : "Register"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-stone-600">
        Already registered?{" "}
        <Link href={loginHref} className="font-semibold text-rose-900 underline-offset-2 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
