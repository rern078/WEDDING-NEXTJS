import { normalizeMapSearchQuery } from "@/lib/map-defaults";
import { mapSectionClasses, parseInviteLayout, type InviteLayoutKey } from "@/lib/invite-layout-theme";

export function InviteMapSection({
  venue,
  mapQuery,
  mapEnabled,
  layout = "layout1",
}: {
  venue: string;
  mapQuery: string | null;
  mapEnabled: boolean;
  layout?: InviteLayoutKey | string;
}) {
  if (!mapEnabled) return null;
  const trimmed = normalizeMapSearchQuery(mapQuery?.trim() || venue.trim());
  if (!trimmed) return null;
  const c = mapSectionClasses(parseInviteLayout(layout));
  const q = encodeURIComponent(trimmed);
  const google = `https://www.google.com/maps/search/?api=1&query=${q}`;
  const apple = `https://maps.apple.com/?q=${q}`;
  const embedSrc = `https://maps.google.com/maps?q=${q}&z=15&output=embed&hl=en`;

  return (
    <section id="invite-join" className={c.section} aria-label="Location">
      <p className={c.eyebrow}>Location</p>
      <p className={c.venue}>{venue.trim() || trimmed}</p>
      <div className="mt-4 overflow-hidden rounded-xl border border-black/5 bg-stone-100/80 shadow-inner">
        <iframe
          title="Venue on Google Maps"
          src={embedSrc}
          className="h-52 w-full border-0 sm:h-56"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="mt-3 flex flex-col items-center justify-center gap-2 sm:flex-row">
        <a href={google} target="_blank" rel="noopener noreferrer" className={c.btn}>
          Open in Google Maps
        </a>
        <a href={apple} target="_blank" rel="noopener noreferrer" className={c.btnSecondary}>
          Open in Apple Maps
        </a>
      </div>
    </section>
  );
}
