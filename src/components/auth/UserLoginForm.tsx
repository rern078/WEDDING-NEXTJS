"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Suspense, useState } from "react";

type Props = {
  /** When set, auth is scoped under `/invite/{slug}/…` and post-login defaults back to the invite. */
  inviteSlug?: string;
  showDevHint?: boolean;
};

function LoginFormInner({ inviteSlug, showDevHint }: Props) {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fallback = inviteSlug ? `/invite/${inviteSlug}` : "/dashboard";
  const registerHref = inviteSlug ? `/invite/${inviteSlug}/register` : "/register";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const explicitRaw = searchParams.get("callbackUrl")?.trim();
    const explicit =
      explicitRaw &&
      explicitRaw.startsWith("/") &&
      !explicitRaw.startsWith("//") &&
      (explicitRaw.startsWith("/dashboard") ||
        explicitRaw.startsWith("/invite/") ||
        explicitRaw.startsWith("/viewer"))
        ? explicitRaw
        : undefined;
    const targetPath = explicit || fallback;
    const callbackUrl = new URL(targetPath, window.location.origin).href;
    const res = await signIn("credentials", {
      email: email.trim(),
      password,
      redirect: false,
      callbackUrl,
    });
    setLoading(false);
    if (!res?.ok || res.error) {
      setError("Invalid email or password.");
      return;
    }
    const cbPath = targetPath;
    const safeInternal =
      cbPath.startsWith("/") &&
      !cbPath.startsWith("//") &&
      (cbPath.startsWith("/dashboard") || cbPath.startsWith("/invite/") || cbPath.startsWith("/viewer"));
    window.location.href = safeInternal ? cbPath : fallback;
  }

  return (
    <div className="rounded-3xl border border-rose-100 bg-white/80 p-8 shadow-sm backdrop-blur">
      <h1 className="text-center font-serif text-3xl font-semibold text-rose-950">Welcome back</h1>
      {inviteSlug ? (
        <p className="mt-2 text-center text-sm text-stone-600">
          Signing in for this invitation. After login you&apos;ll return to{" "}
          <Link href={`/invite/${inviteSlug}`} className="font-medium text-rose-900 underline">
            /invite/{inviteSlug}
          </Link>
          .
        </p>
      ) : (
        <p className="mt-2 text-center text-sm text-stone-600">
          Admins go to the dashboard; standard accounts use view-only mode.
        </p>
      )}
      {showDevHint && process.env.NODE_ENV === "development" ? (
        <p className="mt-4 rounded-2xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-left text-sm text-amber-950">
          <span className="font-semibold">Test admin</span> (after{" "}
          <code className="rounded bg-amber-100/80 px-1 py-0.5 text-xs">npm run db:seed</code>):<br />
          <span className="mt-1 block font-mono text-xs">test@example.com</span>
          <span className="mt-0.5 block font-mono text-xs">testpassword123</span>
        </p>
      ) : null}
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
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
            autoComplete="current-password"
            required
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
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-stone-600">
        No account?{" "}
        <Link href={registerHref} className="font-semibold text-rose-900 underline-offset-2 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}

export function UserLoginForm(props: Props) {
  return (
    <Suspense fallback={<div className="h-48 animate-pulse rounded-3xl bg-rose-50/50" />}>
      <LoginFormInner {...props} />
    </Suspense>
  );
}
