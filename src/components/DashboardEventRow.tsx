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
        <Link href={`/dashboard/events/${id}`} className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-serif text-lg font-semibold text-rose-950">{coupleNames}</p>
              <p className="text-sm text-stone-600">{title}</p>
              <p className="mt-1 text-xs text-stone-500">{dateLabel}</p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-900">
                {rsvpCount} {rsvpCount === 1 ? "response" : "responses"}
              </span>
              <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700">
                {viewCount} {viewCount === 1 ? "view" : "views"}
              </span>
            </div>
          </div>
          <p className="mt-2 truncate text-xs text-rose-800/80">/invite/{slug}</p>
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
