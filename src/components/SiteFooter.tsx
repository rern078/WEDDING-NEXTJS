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

type ResolvedInviteFooter = { slug: string; layout: InviteLayoutKey };

export function SiteFooter() {
  const pathname = usePathname();
  const slug = inviteSlugFromPath(pathname);
  const [resolved, setResolved] = useState<ResolvedInviteFooter | null>(null);

  const footerLayout = useMemo<InviteLayoutKey>(() => {
    if (!slug) return "layout1";
    if (resolved?.slug === slug) return resolved.layout;
    return "layout1";
  }, [slug, resolved]);

  const t = useMemo(() => siteFooterInviteTheme(footerLayout), [footerLayout]);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    fetch(`/api/public/events/${encodeURIComponent(slug)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { event?: { inviteLayout?: string } } | null) => {
        if (cancelled || !data?.event) return;
        setResolved({ slug, layout: parseInviteLayout(data.event.inviteLayout) });
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const year = new Date().getFullYear();

  return (
    <footer className={`shrink-0 ${t.shell}`}>
      <div className="mx-auto max-w-3xl px-4 py-8 text-center sm:py-10">
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
  );
}
