"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { INVITE_LAYOUT_OPTIONS, type InviteLayoutKey } from "@/lib/invite-layout-theme";
import { MAX_GALLERY_IMAGE_BYTES, MAX_GALLERY_IMAGES } from "@/lib/gallery-urls";
import { DEFAULT_MAP_LAT_LNG_HINT } from "@/lib/map-defaults";
import { AdminGoogleMapPreview } from "@/components/admin/AdminGoogleMapPreview";

type RsvpRow = {
  id: string;
  guestName: string;
  email: string | null;
  status: string;
  message: string | null;
  dietary: string | null;
  createdAt: string;
};

export type EventManagePayload = {
  id: string;
  slug: string;
  title: string;
  coupleNames: string;
  venue: string;
  description: string;
  coverUrl: string;
  musicUrl: string;
  eventDate: string;
  qrCodeBank: string;
  inviteLayout: InviteLayoutKey;
  /** Origin from request headers on first load — share URL stays SSR/client aligned. */
  publicOrigin: string;
  galleryUrls: string[];
  rsvps: RsvpRow[];
  /** Optional Google Maps search override (empty = use venue on the public map). */
  mapQuery: string;
  mapEnabled: boolean;
};

export function EventManageClient({ initial }: { initial: EventManagePayload }) {
  const router = useRouter();
  const [slug, setSlug] = useState(initial.slug);
  const [title, setTitle] = useState(initial.title);
  const [coupleNames, setCoupleNames] = useState(initial.coupleNames);
  const [venue, setVenue] = useState(initial.venue);
  const [mapQuery, setMapQuery] = useState(initial.mapQuery);
  const [mapEnabled, setMapEnabled] = useState(initial.mapEnabled);
  const [description, setDescription] = useState(initial.description);
  const [coverUrl, setCoverUrl] = useState(initial.coverUrl);
  const [musicUrl, setMusicUrl] = useState(initial.musicUrl);
  const [qrCodeBank, setQrCodeBank] = useState(initial.qrCodeBank ?? "");
  const [galleryUrls, setGalleryUrls] = useState<string[]>(initial.galleryUrls);
  const [eventDate, setEventDate] = useState(initial.eventDate);
  const [inviteLayout, setInviteLayout] = useState<InviteLayoutKey>(initial.inviteLayout);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bankSaving, setBankSaving] = useState(false);
  const [gallerySaving, setGallerySaving] = useState(false);
  const [layoutSaving, setLayoutSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setQrCodeBank(initial.qrCodeBank ?? "");
  }, [initial.qrCodeBank]);

  useEffect(() => {
    setInviteLayout(initial.inviteLayout);
  }, [initial.inviteLayout]);

  useEffect(() => {
    setGalleryUrls(initial.galleryUrls);
  }, [initial.galleryUrls]);

  useEffect(() => {
    setMapQuery(initial.mapQuery);
    setMapEnabled(initial.mapEnabled);
  }, [initial.mapQuery, initial.mapEnabled]);

  const fullInviteShareUrl = `${initial.publicOrigin}/invite/${slug}`;
  const qrDownloadHref = `/api/events/${initial.id}/qr`;

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setLoading(true);
    let eventDateIso: string;
    try {
      eventDateIso = new Date(eventDate).toISOString();
    } catch {
      setLoading(false);
      setError("Invalid date & time. Please check the date field.");
      return;
    }
    const res = await fetch(`/api/events/${initial.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        title,
        coupleNames,
        venue,
        description: description || null,
        coverUrl: coverUrl || null,
        musicUrl: musicUrl || null,
        eventDate: eventDateIso,
        qrCodeBank: qrCodeBank || null,
        inviteLayout,
        galleryUrls,
        mapQuery: mapQuery.trim() || null,
        mapEnabled,
      }),
    });
    setLoading(false);
    const data = (await res.json().catch(() => ({}))) as {
      error?: string;
      issues?: { path: (string | number)[]; message: string }[];
    };
    if (!res.ok) {
      setError(data.error ?? "Could not save.");
      return;
    }
    setSaved(true);
    router.refresh();
  }

  async function saveInviteLayoutOnly() {
    setError(null);
    setSaved(false);
    setLayoutSaving(true);
    const res = await fetch(`/api/events/${initial.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inviteLayout }),
    });
    setLayoutSaving(false);
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      setError(data.error ?? "Could not save theme.");
      return;
    }
    setSaved(true);
    router.refresh();
  }

  async function handleDelete() {
    if (
      !confirm(
        `Delete “${coupleNames}” and all RSVPs and analytics? This cannot be undone.`,
      )
    ) {
      return;
    }
    setDeleting(true);
    setError(null);
    const res = await fetch(`/api/events/${initial.id}`, { method: "DELETE" });
    setDeleting(false);
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      setError(data.error ?? "Could not delete.");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  function onBankQrFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (PNG or JPEG).");
      return;
    }
    const maxBytes = 900_000;
    if (file.size > maxBytes) {
      setError(`Image is too large (max ${Math.round(maxBytes / 1000)}KB). Try a smaller QR export.`);
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const s = reader.result;
      if (typeof s === "string") setQrCodeBank(s);
    };
    reader.readAsDataURL(file);
  }

  async function saveBankQrOnly(clear: boolean) {
    setError(null);
    setSaved(false);
    setBankSaving(true);
    const value = clear ? null : qrCodeBank || null;
    const res = await fetch(`/api/events/${initial.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qrCodeBank: value }),
    });
    setBankSaving(false);
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      setError(data.error ?? "Could not save bank QR.");
      return;
    }
    if (clear) setQrCodeBank("");
    setSaved(true);
    router.refresh();
  }

  function readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => {
        if (typeof r.result === "string") resolve(r.result);
        else reject(new Error("read"));
      };
      r.onerror = () => reject(r.error);
      r.readAsDataURL(file);
    });
  }

  async function onGalleryFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    setError(null);
    let next = [...galleryUrls];
    for (const file of files) {
      if (next.length >= MAX_GALLERY_IMAGES) {
        setError(`Gallery is limited to ${MAX_GALLERY_IMAGES} photos.`);
        break;
      }
      if (!file.type.startsWith("image/")) {
        setError(`"${file.name}" is not an image.`);
        continue;
      }
      if (file.size > MAX_GALLERY_IMAGE_BYTES) {
        setError(`"${file.name}" is too large (max ${Math.round(MAX_GALLERY_IMAGE_BYTES / 1000)}KB).`);
        continue;
      }
      try {
        next.push(await readFileAsDataUrl(file));
      } catch {
        setError(`Could not read "${file.name}".`);
        return;
      }
    }
    setGalleryUrls(next);
  }

  function removeGalleryAt(index: number) {
    setGalleryUrls((prev) => prev.filter((_, i) => i !== index));
  }

  function moveGallery(from: number, dir: -1 | 1) {
    const to = from + dir;
    if (to < 0 || to >= galleryUrls.length) return;
    setGalleryUrls((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(from, 1);
      copy.splice(to, 0, item);
      return copy;
    });
  }

  async function saveGalleryOnly() {
    setError(null);
    setSaved(false);
    setGallerySaving(true);
    const res = await fetch(`/api/events/${initial.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ galleryUrls }),
    });
    setGallerySaving(false);
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      setError(data.error ?? "Could not save gallery.");
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-rose-950">Edit invitation</h1>
        <p className="mt-2 break-all text-sm text-stone-600">
          Public link:{" "}
          <Link href={`/invite/${slug}`} className="font-medium text-rose-900 underline">
            /invite/{slug}
          </Link>
        </p>
        <p className="mt-1 text-xs text-stone-500">Share: {fullInviteShareUrl}</p>
      </div>

      <section className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
        <h2 className="font-serif text-lg font-semibold text-rose-950">Invite page theme</h2>
        <p className="mt-1 text-sm text-stone-600">
          Pick a layout for the public invite. Guests only see content — this changes colors, framing, and typography.
        </p>
        <div className="mt-4 space-y-3">
          {INVITE_LAYOUT_OPTIONS.map((opt) => (
            <label
              key={opt.id}
              className={`flex cursor-pointer gap-3 rounded-2xl border px-4 py-3 transition has-[:checked]:border-rose-400 has-[:checked]:bg-rose-50/60 ${
                inviteLayout === opt.id ? "border-rose-400 bg-rose-50/60" : "border-stone-200 hover:border-rose-200"
              }`}
            >
              <input
                type="radio"
                name="inviteLayout"
                value={opt.id}
                checked={inviteLayout === opt.id}
                onChange={() => setInviteLayout(opt.id)}
                className="mt-1 text-rose-900"
              />
              <span>
                <span className="font-semibold text-stone-900">{opt.label}</span>
                <span className="mt-0.5 block text-xs text-stone-600">{opt.hint}</span>
              </span>
            </label>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={layoutSaving}
            onClick={() => void saveInviteLayoutOnly()}
            className="rounded-full bg-rose-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-800 disabled:opacity-60"
          >
            {layoutSaving ? "Saving theme…" : "Save theme only"}
          </button>
        </div>
        <p className="mt-3 text-xs text-stone-500">
          Use <strong>Save theme only</strong> to apply the layout without saving the rest of the form. Or use{" "}
          <strong>Save changes</strong> at the bottom to save everything at once.
        </p>
      </section>

      <section className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
        <h2 className="font-serif text-lg font-semibold text-rose-950">QR code</h2>
        <p className="mt-1 text-sm text-stone-600">PNG for print — encodes your live invite URL.</p>
        <a
          href={qrDownloadHref}
          download
          className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-rose-200 bg-rose-50/80 py-3 text-sm font-semibold text-rose-950 transition hover:bg-rose-100"
        >
          Download QR (PNG)
        </a>
      </section>

      <section className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
        <h2 className="font-serif text-lg font-semibold text-rose-950">Bank transfer QR (QR_CODE_BANK)</h2>
        <p className="mt-1 text-sm text-stone-600">
          Upload a PNG or JPEG of your bank prompt-pay / account QR. It appears on the public invite above the “scan to
          open this invite” QR. Max ~900KB.
        </p>
        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-medium text-stone-700">Upload image</span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={onBankQrFile}
            className="block w-full text-sm text-stone-600 file:mr-3 file:rounded-full file:border-0 file:bg-rose-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-rose-900 hover:file:bg-rose-200"
          />
        </label>
        {qrCodeBank ? (
          <div className="mt-4 flex flex-col items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- data URL preview */}
            <img src={qrCodeBank} alt="Bank QR preview" width={160} height={160} className="rounded-xl border border-stone-200" />
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
              <button
                type="button"
                disabled={bankSaving}
                onClick={() => void saveBankQrOnly(false)}
                className="rounded-full bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-800 disabled:opacity-60"
              >
                {bankSaving ? "Saving…" : "Save bank QR"}
              </button>
              <button
                type="button"
                disabled={bankSaving}
                onClick={() => void saveBankQrOnly(true)}
                className="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 transition hover:bg-stone-50 disabled:opacity-60"
              >
                Remove bank QR
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-center text-sm text-stone-500">No bank QR yet — choose an image, then save.</p>
        )}
      </section>

      <section className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
        <h2 className="font-serif text-lg font-semibold text-rose-950">Photo gallery</h2>
        <p className="mt-1 text-sm text-stone-600">
          Add several images; they appear on the public invite in a horizontal gallery. Same per-file size limit as the bank
          QR (~900KB), up to {MAX_GALLERY_IMAGES} photos. Reorder with Up/Down, then save.
        </p>
        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-medium text-stone-700">Add images</span>
          <input
            type="file"
            multiple
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={(e) => void onGalleryFiles(e)}
            className="block w-full text-sm text-stone-600 file:mr-3 file:rounded-full file:border-0 file:bg-rose-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-rose-900 hover:file:bg-rose-200"
          />
        </label>
        {galleryUrls.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {galleryUrls.map((src, index) => (
              <li
                key={index}
                className="flex flex-col gap-2 rounded-xl border border-stone-200 bg-stone-50/80 p-3 sm:flex-row sm:items-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- admin data URL preview */}
                <img src={src} alt="" className="h-20 w-28 shrink-0 rounded-lg object-cover" />
                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                  <span className="text-xs text-stone-500">Photo {index + 1}</span>
                  <div className="ml-auto flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveGallery(index, -1)}
                      className="rounded-full border border-stone-300 bg-white px-2.5 py-1 text-xs font-medium text-stone-800 disabled:opacity-40"
                    >
                      Up
                    </button>
                    <button
                      type="button"
                      disabled={index >= galleryUrls.length - 1}
                      onClick={() => moveGallery(index, 1)}
                      className="rounded-full border border-stone-300 bg-white px-2.5 py-1 text-xs font-medium text-stone-800 disabled:opacity-40"
                    >
                      Down
                    </button>
                    <button
                      type="button"
                      onClick={() => removeGalleryAt(index)}
                      className="rounded-full border border-red-200 bg-white px-2.5 py-1 text-xs font-medium text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-center text-sm text-stone-500">No gallery photos yet.</p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={gallerySaving}
            onClick={() => void saveGalleryOnly()}
            className="rounded-full bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-800 disabled:opacity-60"
          >
            {gallerySaving ? "Saving gallery…" : "Save gallery only"}
          </button>
        </div>
        <p className="mt-2 text-xs text-stone-500">
          Or use <strong>Save changes</strong> below to save the gallery with the rest of the form.
        </p>
      </section>

      <form onSubmit={onSave} className="space-y-4 rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-stone-700">URL slug</span>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-300/30"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-stone-700">Couple names</span>
          <input
            required
            value={coupleNames}
            onChange={(e) => setCoupleNames(e.target.value)}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-300/30"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-stone-700">Title</span>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-300/30"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-stone-700">Date & time</span>
          <input
            required
            type="datetime-local"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-300/30"
          />
        </label>
        <div>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-stone-700">Venue</span>
            <input
              required
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-300/30"
            />
          </label>
          <div className="mt-3">
            <span className="text-sm font-medium text-stone-700">Map on public invite</span>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setMapEnabled(true)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  mapEnabled
                    ? "bg-rose-900 text-white shadow-sm"
                    : "border border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
                }`}
              >
                Show map
              </button>
              <button
                type="button"
                onClick={() => setMapEnabled(false)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  !mapEnabled
                    ? "bg-stone-800 text-white shadow-sm"
                    : "border border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
                }`}
              >
                Hide map
              </button>
            </div>
            <p className="mt-1.5 text-xs text-stone-500">When hidden, guests only see the venue line in the “When / Where” block — not the map section.</p>
          </div>
          <label className="mt-3 block space-y-1.5">
            <span className="text-sm font-medium text-stone-700">Map search (optional)</span>
            <input
              value={mapQuery}
              onChange={(e) => setMapQuery(e.target.value)}
              maxLength={500}
              className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-300/30"
              placeholder={`Address, place name, or coordinates — e.g. ${DEFAULT_MAP_LAT_LNG_HINT} (empty = venue)`}
            />
            <span className="text-xs text-stone-500">Leave empty to use the venue line for the map. Use coordinates for an exact pin.</span>
          </label>
          <AdminGoogleMapPreview venue={venue} mapQuery={mapQuery} mapEnabled={mapEnabled} />
        </div>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-stone-700">Message</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-300/30"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-stone-700">Cover image URL</span>
          <input
            type="url"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-300/30"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-stone-700">Music (optional)</span>
          <input
            value={musicUrl}
            onChange={(e) => setMusicUrl(e.target.value)}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-300/30"
            placeholder="https://open.spotify.com/track/… or playlist URL"
          />
          <span className="text-xs text-stone-500">Spotify shows an embedded player; other https links show a “Listen” button.</span>
        </label>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {saved ? <p className="text-sm text-emerald-700">Saved.</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-rose-900 py-3 font-semibold text-white hover:bg-rose-800 disabled:opacity-60"
        >
          {loading ? "Saving…" : "Save changes"}
        </button>
      </form>

      <section>
        <h2 className="font-serif text-xl font-semibold text-rose-950">RSVPs ({initial.rsvps.length})</h2>
        <ul className="mt-3 space-y-2">
          {initial.rsvps.length === 0 ? (
            <li className="text-sm text-stone-500">No responses yet.</li>
          ) : (
            initial.rsvps.map((r) => (
              <li key={r.id} className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm">
                <span className="font-medium text-stone-900">{r.guestName}</span>
                <span className="ml-2 rounded-full bg-rose-50 px-2 py-0.5 text-xs text-rose-900">{r.status}</span>
                {r.email ? <p className="text-xs text-stone-500">{r.email}</p> : null}
                {r.message ? <p className="mt-1 text-stone-600">{r.message}</p> : null}
                {r.dietary ? <p className="text-xs text-stone-500">Dietary: {r.dietary}</p> : null}
              </li>
            ))
          )}
        </ul>
      </section>

      <section className="rounded-2xl border border-red-200/80 bg-red-50/40 p-5">
        <h2 className="font-serif text-lg font-semibold text-red-900">Delete invitation</h2>
        <p className="mt-1 text-sm text-red-900/80">
          Permanently remove this invite, all RSVPs, and page view history. The public link will stop working.
        </p>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="mt-4 w-full rounded-full border border-red-300 bg-white py-3 text-sm font-semibold text-red-800 shadow-sm transition hover:bg-red-50 disabled:opacity-60"
        >
          {deleting ? "Deleting…" : "Delete this invitation"}
        </button>
      </section>
    </div>
  );
}
