import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const role = session?.user?.role;
  const isAdmin = role === "ADMIN";

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-10 px-5 py-12 sm:py-16">
      <header className="text-center">
        <h1 className="font-serif text-4xl font-semibold leading-tight text-rose-950 sm:text-5xl">Vows &amp; Violets</h1>
        <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-rose-800/80">Wedding invitations</p>
        <p className="mt-4 text-lg leading-relaxed text-stone-600">
          Each celebration has its own page at <code className="text-rose-900">/invite/your-slug</code>. Open the link
          you were sent to see that couple&apos;s invitation, RSVP, and details — there is no public directory here.
        </p>
      </header>

      {isAdmin ? (
        <div className="flex flex-col items-stretch gap-3 rounded-2xl border border-rose-200/80 bg-white/90 px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-stone-700">
            You&apos;re signed in as an <strong>organizer</strong>. Create and edit invitations in the dashboard.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-rose-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-800"
          >
            Go to dashboard
          </Link>
        </div>
      ) : null}

      {!session?.user ? (
        <>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-rose-900 px-8 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-rose-800 active:scale-[0.99]"
            >
              Create an account
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-8 py-3.5 text-base font-semibold text-stone-800 transition hover:bg-stone-50"
            >
              Sign in
            </Link>
          </div>
          <p className="text-center text-xs text-stone-500">
            Guests use the unique invite URL from the couple. Organizers sign in to manage events in the dashboard.
          </p>
        </>
      ) : !isAdmin ? (
        <p className="text-center text-sm text-stone-600">
          Signed in as a guest. Use <strong>My account</strong> in the header after you open an invite from your link,
          or sign out and open the invitation URL you were given.
        </p>
      ) : null}
    </main>
  );
}
