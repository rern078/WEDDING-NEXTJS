"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { parseInviteLayout, siteFooterInviteTheme, type InviteLayoutKey } from "@/lib/invite-layout-theme";

/** First path segment after /invite/ — aligned with `SiteHeader`. */
function inviteSlugFromPath(pathname: string | null): string | null {
  if (!pathname?.startsWith("/invite/")) return null;
  const rest = pathname.slice("/invite/".length);
  const seg = rest.split("/")[0];
  return seg && seg !== "login" && seg !== "register" ? seg : null;
}

type ResolvedInviteFooter = { slug: string; layout: InviteLayoutKey; gallery: string[] };

export function SiteFooter() {
  const pathname = usePathname();
  const slug = inviteSlugFromPath(pathname);
  const [resolved, setResolved] = useState<ResolvedInviteFooter | null>(null);

  const footerLayout = useMemo<InviteLayoutKey>(() => {
    if (!slug) return "layout1";
    if (resolved?.slug === slug) return resolved.layout;
    return "layout1";
  }, [slug, resolved]);

  const footerGallery = useMemo<string[]>(() => {
    if (!slug) return [];
    if (resolved?.slug === slug) return resolved.gallery;
    return [];
  }, [slug, resolved]);

  const t = useMemo(() => siteFooterInviteTheme(footerLayout), [footerLayout]);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    fetch(`/api/public/events/${encodeURIComponent(slug)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(
        (data: { event?: { inviteLayout?: string | null; galleryUrls?: unknown } } | null) => {
          if (cancelled || !data?.event) return;
          const layout = parseInviteLayout(data.event.inviteLayout ?? undefined);
          const rawGallery = data.event.galleryUrls;
          const gallery =
            Array.isArray(rawGallery) && rawGallery.length
              ? rawGallery.filter((x): x is string => typeof x === "string").slice(0, 8)
              : [];
          setResolved({ slug, layout, gallery });
        },
      );
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const year = new Date().getFullYear();

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {slug ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-3 z-50 flex justify-center px-3">
          <div className="pointer-events-auto flex flex-wrap justify-center gap-2 rounded-full border border-black/5 bg-white/90 px-2 py-2 shadow-lg shadow-black/10 backdrop-blur">
            <button
              type="button"
              onClick={() => scrollTo("invite-join")}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100"
            >
              Join
            </button>
            <button
              type="button"
              onClick={() => scrollTo("invite-gallery")}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100"
            >
              Gallery
            </button>
            <button
              type="button"
              onClick={() => scrollTo("invite-rsvp")}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100"
            >
              RSVP
            </button>
            <button
              type="button"
              onClick={() => scrollTo("invite-qr")}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100"
            >
              QR code
            </button>
            <button
              type="button"
              onClick={() => scrollTo("invite-top")}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100"
            >
              Invite
            </button>
          </div>
        </div>
      ) : null}
      <footer className={`shrink-0 ${t.shell}`}>
      <div className="mx-auto max-w-3xl px-4 py-8 text-center sm:py-10">
        {footerGallery.length > 0 ? (
          <div className="mb-5 flex justify-center">
            <div className="grid grid-cols-4 gap-4 sm:gap-5">
              {footerGallery.map((src, i) => (
                <div key={i} className="flex items-center justify-center">
                  <div className="h-14 w-14 rotate-45 overflow-hidden rounded-[1.1rem] bg-stone-200/40 shadow-md sm:h-16 sm:w-16">
                    {/* eslint-disable-next-line @next/next/no-img-element -- gallery images from admin */}
                    <img src={src} alt="" className="-rotate-45 h-full w-full object-cover" loading="lazy" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center">
          <span className={`text-sm ${t.brand}`}>Vows &amp; Violets</span>
          <span className={`text-xs ${t.muted}`} aria-hidden>
            ·
          </span>
          <span className={`text-xs ${t.muted}`}>Wedding invitations &amp; RSVPs</span>
        </p>
        <p className={`mt-2 text-xs ${t.muted}`}>© {year} Vows &amp; Violets</p>
        <nav className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs" aria-label="Footer">
          <Link href="/" className={t.link}>
            Home
          </Link>
          {slug ? (
            <Link href={`/invite/${slug}`} className={t.link}>
              This invitation
            </Link>
          ) : null}
        </nav>
      </div>
      </footer>
    </>
  );
}
