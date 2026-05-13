"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { SignOutButton } from "@/components/SignOutButton";
import { parseInviteLayout, siteHeaderInviteTheme, type InviteLayoutKey } from "@/lib/invite-layout-theme";

/** First path segment after /invite/ — works for /invite/x, /invite/x/login, etc. */
function inviteSlugFromPath(pathname: string | null): string | null {
  if (!pathname?.startsWith("/invite/")) return null;
  const rest = pathname.slice("/invite/".length);
  const seg = rest.split("/")[0];
  return seg && seg !== "login" && seg !== "register" ? seg : null;
}

type InviteHeaderEvent = {
  coupleNames: string;
  title: string;
  layout: InviteLayoutKey;
};

export function SiteHeader() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const role = session?.user?.role;
  const slug = inviteSlugFromPath(pathname);
  const loginHref = slug ? `/invite/${slug}/login` : "/login";
  const registerHref = slug ? `/invite/${slug}/register` : "/register";
  const inviteHref = slug ? `/invite/${slug}` : "/";
  const viewerHref = slug ? `/invite/${slug}/viewer` : "/viewer";
  /** After sign-out: non-admins on an invite return to that invite; admins (or anyone off-invite) go home. */
  const signOutCallbackUrl = role !== "ADMIN" && slug ? `/invite/${slug}` : "/";

  const [inviteEvent, setInviteEvent] = useState<InviteHeaderEvent | null>(null);
  const [inviteLoading, setInviteLoading] = useState(false);

  const headerLayout = useMemo<InviteLayoutKey>(() => {
    if (!slug) return "layout1";
    return inviteEvent?.layout ?? "layout1";
  }, [slug, inviteEvent?.layout]);

  const t = useMemo(() => siteHeaderInviteTheme(headerLayout), [headerLayout]);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const threshold = 16;
    const onScroll = () => {
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!slug) {
      setInviteEvent(null);
      setInviteLoading(false);
      return;
    }
    let cancelled = false;
    setInviteEvent(null);
    setInviteLoading(true);
    fetch(`/api/public/events/${encodeURIComponent(slug)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(
        (
          data: {
            event?: {
              coupleNames: string;
              title: string;
              inviteLayout?: string;
            };
          } | null,
        ) => {
          if (cancelled || !data?.event) return;
          setInviteEvent({
            coupleNames: data.event.coupleNames,
            title: data.event.title,
            layout: parseInviteLayout(data.event.inviteLayout),
          });
        },
      )
      .finally(() => {
        if (!cancelled) setInviteLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const scrollShadow =
    headerLayout === "layout3"
      ? "shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)]"
      : headerLayout === "layout2"
        ? "shadow-md shadow-emerald-900/18"
        : "shadow-md shadow-rose-900/12";

  return (
    <header
      className={`sticky top-0 z-40 transition-[box-shadow] duration-300 ease-out motion-reduce:duration-150 ${t.shell} ${
        scrolled ? scrollShadow : "shadow-none"
      }`}
    >
      <div
        className={`mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 transition-[padding] duration-300 ease-out motion-reduce:duration-150 ${
          scrolled ? "py-2.5" : "py-3"
        }`}
      >
        <Link
          href={inviteHref}
          className="min-w-0 max-w-[min(100%,14rem)] flex-1 sm:max-w-md"
          title={
            slug && inviteEvent ? `${inviteEvent.coupleNames} — ${inviteEvent.title}` : "Vows & Violets — home"
          }
        >
          {slug ? (
            inviteLoading && !inviteEvent ? (
              <span className={`block h-10 w-40 animate-pulse rounded-lg ${t.brandSkeleton}`} aria-hidden />
            ) : inviteEvent ? (
              <span className="flex min-w-0 flex-col leading-tight">
                <span className={`truncate font-serif text-lg font-semibold tracking-tight ${t.couple}`}>
                  {inviteEvent.coupleNames}
                </span>
                <span className={`truncate text-xs font-normal ${t.subtitle}`}>{inviteEvent.title}</span>
              </span>
            ) : (
              <span className={`font-serif text-lg font-semibold tracking-tight ${t.invitationFallback}`}>
                Invitation
              </span>
            )
          ) : (
            <span className={`font-serif text-lg font-semibold tracking-tight ${t.couple}`}>Vows &amp; Violets</span>
          )}
        </Link>
        <nav className="flex shrink-0 items-center gap-2 text-sm" aria-label="Account">
          {status === "loading" ? (
            <span className="flex gap-2" aria-hidden>
              <span className={`h-8 w-16 animate-pulse rounded-full ${t.navSkeleton}`} />
              <span className={`h-8 w-20 animate-pulse rounded-full ${t.navSkeleton}`} />
            </span>
          ) : session?.user ? (
            <>
              {role === "ADMIN" ? (
                <Link
                  href="/dashboard"
                  aria-current={pathname.startsWith("/dashboard") ? "page" : undefined}
                  className={`rounded-full px-3 py-1.5 font-medium transition ${
                    pathname.startsWith("/dashboard") ? t.navLinkActive : t.navLinkIdle
                  }`}
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href={viewerHref}
                  aria-current={pathname === viewerHref ? "page" : undefined}
                  className={`rounded-full px-3 py-1.5 font-medium transition ${
                    pathname === viewerHref ? t.navLinkActive : t.navLinkIdle
                  }`}
                >
                  My account
                </Link>
              )}
              <SignOutButton callbackUrl={signOutCallbackUrl} className={t.signOut} />
            </>
          ) : (
            <>
              <Link
                href={loginHref}
                aria-current={pathname === loginHref ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 font-medium transition ${
                  pathname === loginHref ? t.navLinkActive : t.navLinkIdle
                }`}
              >
                Log in
              </Link>
              <Link
                href={registerHref}
                aria-current={pathname === registerHref ? "page" : undefined}
                className={`rounded-full px-4 py-2 font-medium shadow-sm transition active:scale-[0.98] ${
                  pathname === registerHref ? t.registerBtnActive : t.registerBtn
                }`}
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
