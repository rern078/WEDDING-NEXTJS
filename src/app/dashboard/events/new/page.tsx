"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewEventPage() {
  const router = useRouter();
  const [title, setTitle] = useState("Our wedding");
  const [coupleNames, setCoupleNames] = useState("");
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [musicUrl, setMusicUrl] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        coupleNames,
        venue,
        description: description || undefined,
        coverUrl: coverUrl || undefined,
        musicUrl: musicUrl || undefined,
        eventDate: eventDate || new Date().toISOString(),
      }),
    });
    setLoading(false);
    const data = (await res.json().catch(() => ({}))) as { event?: { id: string }; error?: string };
    if (!res.ok) {
      setError(data.error ?? "Could not create event.");
      return;
    }
    if (data.event?.id) router.push(`/dashboard/events/${data.event.id}`);
  }

  return (
    <main className="mx-auto w-full max-w-lg flex-1 px-5 py-10">
      <h1 className="font-serif text-3xl font-semibold text-rose-950">New invitation</h1>
      <p className="mt-1 text-stone-600">Guests will see this on your public invite page.</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-stone-700">Couple or celebration names</span>
          <input
            required
            value={coupleNames}
            onChange={(e) => setCoupleNames(e.target.value)}
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none ring-rose-300/30 focus:border-rose-300 focus:ring-4"
            placeholder="Alex & Jordan"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-stone-700">Short title</span>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none ring-rose-300/30 focus:border-rose-300 focus:ring-4"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-stone-700">Date & time</span>
          <input
            required
            type="datetime-local"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none ring-rose-300/30 focus:border-rose-300 focus:ring-4"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-stone-700">Venue</span>
          <input
            required
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none ring-rose-300/30 focus:border-rose-300 focus:ring-4"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-stone-700">Message (optional)</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full resize-y rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none ring-rose-300/30 focus:border-rose-300 focus:ring-4"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-stone-700">Music URL (optional)</span>
          <input
            value={musicUrl}
            onChange={(e) => setMusicUrl(e.target.value)}
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none ring-rose-300/30 focus:border-rose-300 focus:ring-4"
            placeholder="Spotify track or playlist link"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-stone-700">Cover image URL (optional)</span>
          <input
            type="url"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none ring-rose-300/30 focus:border-rose-300 focus:ring-4"
            placeholder="https://…"
          />
        </label>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-rose-900 py-3.5 font-semibold text-white shadow-md hover:bg-rose-800 disabled:opacity-60"
        >
          {loading ? "Saving…" : "Create invitation"}
        </button>
      </form>
    </main>
  );
}
