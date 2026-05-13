"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: string;
  slug: string;
  coupleNames: string;
  title: string;
  dateLabel: string;
  rsvpCount: number;
  viewCount: number;
};

export function DashboardEventRow({ id, slug, coupleNames, title, dateLabel, rsvpCount, viewCount }: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (
      !confirm(
        `Delete “${coupleNames}” and all RSVPs? This cannot be undone.`,
      )
    ) {
      return;
    }
    setDeleting(true);
    const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
    setDeleting(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      alert(data.error ?? "Could not delete.");
      return;
    }
    router.refresh();
  }

  return (
    <li className="rounded-2xl border border-rose-100 bg-white shadow-sm transition hover:border-rose-200 hover:shadow-md">
      <div className="flex items-stretch gap-2 p-4">
        <Link
          href={`/dashboard/events/${id}`}
          className="group min-w-0 flex-1 rounded-xl outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400/90"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="min-w-0 space-y-1.5">
              <p className="font-serif text-lg font-semibold leading-snug text-rose-950 sm:text-xl">{coupleNames}</p>
              <p className="line-clamp-2 text-sm leading-snug text-stone-600">{title}</p>
              <p className="text-xs font-medium text-stone-500">{dateLabel}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-end">
              <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-900 ring-1 ring-rose-100/80">
                {rsvpCount} {rsvpCount === 1 ? "RSVP" : "RSVPs"}
              </span>
              <span className="inline-flex items-center rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700 ring-1 ring-stone-200/80">
                {viewCount} {viewCount === 1 ? "view" : "views"}
              </span>
            </div>
          </div>
          <div className="mt-3 flex min-w-0 items-center gap-2 rounded-xl border border-rose-100 bg-rose-50/60 px-3 py-2 transition group-hover:border-rose-200 group-hover:bg-rose-50">
            <span className="shrink-0 select-none rounded-md bg-white/90 px-1.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wide text-stone-500">
              Link
            </span>
            <span className="min-w-0 truncate font-mono text-[11px] text-rose-900 sm:text-xs" title={`/invite/${slug}`}>
              /invite/{slug}
            </span>
          </div>
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="shrink-0 self-center rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50"
        >
          {deleting ? "…" : "Delete"}
        </button>
      </div>
    </li>
  );
}
