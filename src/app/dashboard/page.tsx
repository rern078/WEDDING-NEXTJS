import Link from "next/link";
import { auth } from "@/auth";
import { DashboardEventRow } from "@/components/DashboardEventRow";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const events = await prisma.event.findMany({
    where: { ownerId: session.user.id },
    orderBy: { eventDate: "asc" },
    include: { _count: { select: { rsvps: true, pageViews: true } } },
  });

  return (
    <main className="mx-auto w-full max-w-lg flex-1 px-5 py-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-rose-950">Your events</h1>
          <p className="mt-1 text-stone-600">
            You see only invitations you created ({events.length}). Other rows in the database belong to other
            organizer accounts.
          </p>
        </div>
        <Link
          href="/dashboard/events/new"
          className="shrink-0 rounded-full bg-rose-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-800"
        >
          New
        </Link>
      </div>
      <ul className="mt-8 space-y-3">
        {events.length === 0 ? (
          <li className="rounded-2xl border border-dashed border-rose-200 bg-white/60 p-8 text-center text-stone-600">
            No invitations yet. Create your first event.
          </li>
        ) : (
          events.map((ev) => (
            <DashboardEventRow
              key={ev.id}
              id={ev.id}
              slug={ev.slug}
              coupleNames={ev.coupleNames}
              title={ev.title}
              dateLabel={ev.eventDate.toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
              rsvpCount={ev._count.rsvps}
              viewCount={ev._count.pageViews}
            />
          ))
        )}
      </ul>
    </main>
  );
}
