 "use client";

import { useRef } from "react";
import { gallerySectionClasses, parseInviteLayout, type InviteLayoutKey } from "@/lib/invite-layout-theme";

export function InviteGallerySection({
  urls,
  layout = "layout1",
}: {
  urls: string[];
  layout?: InviteLayoutKey | string;
}) {
  if (!urls.length) return null;
  const L = parseInviteLayout(layout);
  const c = gallerySectionClasses(L);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = 260;

  function scroll(dir: -1 | 1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * scrollByAmount, behavior: "smooth" });
  }

  return (
    <section className={c.section} aria-label="Photo gallery">
      <p className={c.title}>Gallery</p>
      <div ref={trackRef} className={c.track}>
        {urls.map((src, i) => (
          <figure key={i} className={c.item}>
            {/* eslint-disable-next-line @next/next/no-img-element -- data URLs + external URLs from admin */}
            <img src={src} alt={`Gallery photo ${i + 1}`} className={c.img} loading="lazy" />
          </figure>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => scroll(-1)}
          className="inline-flex items-center rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 shadow-sm hover:bg-stone-50"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          className="inline-flex items-center rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 shadow-sm hover:bg-stone-50"
        >
          Next
        </button>
      </div>
    </section>
  );
}
