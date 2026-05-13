import Link from "next/link";
import type { MyInviteRow } from "@/lib/viewer-my-invites";
import type { RsvpStatus } from "@/generated/prisma/enums";

function statusLabel(status: RsvpStatus): string {
  switch (status) {
    case "ATTENDING":
      return "Attending";
    case "DECLINED":
      return "Declined";
    case "MAYBE":
      return "Maybe";
    default:
      return "Pending";
  }
}

export type ViewerAccountViewProps = {
  name: string;
  isAdmin: boolean;
  accountEmail: string | null;
  invites: MyInviteRow[];
  /** Set when URL is `/invite/{slug}/viewer` — highlights this wedding and adjusts links. */
  inviteContext?: { slug: string; coupleNames: string; title: string } | null;
};

function sortInvitesForContext(invites: MyInviteRow[], focusSlug: string | undefined) {
  if (!focusSlug) return invites;
  return [...invites].sort((a, b) => {
    const aHere = a.event.slug === focusSlug ? 0 : 1;
    const bHere = b.event.slug === focusSlug ? 0 : 1;
    return aHere - bHere;
  });
}

export function ViewerAccountView({
  name,
  isAdmin,
  accountEmail,
  invites,
  inviteContext,
}: ViewerAccountViewProps) {
  const focusSlug = inviteContext?.slug;
  const myInvites = sortInvitesForContext(invites, focusSlug);
  const inviteBase = focusSlug ? `/invite/${focusSlug}` : null;

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-8 px-5 py-14">
      {inviteContext ? (
        <p className="rounded-2xl border border-rose-100 bg-rose-50/80 px-4 py-3 text-center text-sm text-stone-700">
          Guest hub for{" "}
          <Link href={inviteBase!} className="font-semibold text-rose-950 underline">
            {inviteContext.coupleNames}
          </Link>
          <span className="block text-xs text-stone-500">{inviteContext.title}</span>
        </p>
      ) : null}

      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-800/80">View only</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-rose-950">Hello, {name}</h1>
        <p className="mt-3 text-stone-600">
          Your account can open invitations and RSVP, but it cannot create or edit events. Ask an organizer to upgrade
          you to admin if you need the dashboard.
        </p>
      </div>

      <section className="rounded-2xl border border-rose-100 bg-white/90 p-6 shadow-sm">
        <h2 className="font-serif text-xl font-semibold text-rose-950">Your invitations</h2>
        <p className="mt-2 text-sm text-stone-600">
          Events where you RSVP&apos;d using this account&apos;s email ({accountEmail ?? "—"}) show here with the
          couple&apos;s name and invite link.
        </p>
        {myInvites.length === 0 ? (
          <p className="mt-6 rounded-xl border border-dashed border-stone-200 bg-cream/60 px-4 py-5 text-center text-sm text-stone-600">
            No RSVPs linked to this email yet.
            {inviteBase ? (
              <>
                {" "}
                Open{" "}
                <Link href={inviteBase} className="font-semibold text-rose-900 underline">
                  this invitation
                </Link>{" "}
                and include your email on the RSVP form.
              </>
            ) : (
              <>
                {" "}
                Open the <strong>invitation link</strong> you were sent (it looks like{" "}
                <code className="text-rose-900">/invite/…</code>
                ), then include your email on the RSVP form so we can list it here next time.
              </>
            )}
          </p>
        ) : (
          <ul className="mt-5 space-y-3">
            {myInvites.map(({ event, status }) => (
              <li key={event.slug}>
                <Link
                  href={`/invite/${event.slug}`}
                  className={`block rounded-2xl border px-4 py-4 transition hover:border-rose-200 hover:bg-white ${
                    focusSlug === event.slug
                      ? "border-rose-300/90 bg-rose-50/50 ring-1 ring-rose-200/60"
                      : "border-stone-200/80 bg-cream/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="min-w-0 flex-1">
                      <span className="font-serif text-lg font-semibold text-rose-950">{event.coupleNames}</span>
                      <span className="mt-0.5 block text-sm text-stone-600">{event.title}</span>
                      <span className="mt-1 block text-xs text-stone-500">
                        {event.eventDate.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-full bg-rose-100 px-2.5 py-1 text-xs font-medium text-rose-900">
                      {statusLabel(status)}
                    </span>
                  </div>
                  <span className="mt-2 block font-mono text-xs text-rose-800/80">/invite/{event.slug}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="rounded-2xl border border-rose-100 bg-white/90 p-6 shadow-sm">
        <h2 className="font-medium text-stone-900">How to use</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-stone-600">
          <li>Open the invite link you were sent (for example <code className="text-rose-900">/invite/your-slug</code>).</li>
          <li>RSVP and add a message on the invitation page.</li>
          <li>Anyone can view an invite without logging in; signing in is optional for guests.</li>
        </ul>
      </div>

      {isAdmin ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-center text-sm text-emerald-900">
          You are signed in as an <strong>admin</strong>.{" "}
          <Link href="/dashboard" className="font-semibold underline">
            Go to dashboard
          </Link>{" "}
          to manage invitations.
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        {inviteBase ? (
          <Link
            href={inviteBase}
            className="inline-flex justify-center rounded-full bg-rose-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-800"
          >
            Back to invitation
          </Link>
        ) : null}
      </div>
    </main>
  );
}
