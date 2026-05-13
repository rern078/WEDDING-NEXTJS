"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { inviteSlugNavTheme, parseInviteLayout, type InviteLayoutKey } from "@/lib/invite-layout-theme";

export function InviteSlugNav({
  slug,
  layout = "layout1",
}: {
  slug: string;
  layout?: InviteLayoutKey | string;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const base = `/invite/${slug}`;
  const onInvitePage = pathname === base;
  const onAuthPage = pathname === `${base}/login` || pathname === `${base}/register`;
  const onViewerPage = pathname === `${base}/viewer`;
  const onLogin = pathname === `${base}/login`;
  const onRegister = pathname === `${base}/register`;

  const t = useMemo(() => inviteSlugNavTheme(parseInviteLayout(layout)), [layout]);

  const linkBase = "font-medium underline-offset-2 hover:underline";

  return (
    <nav className={t.shell}>
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 text-sm">
        <Link
          href={base}
          className={`${linkBase} ${onInvitePage ? t.linkActive : t.linkIdle}`}
        >
          Home
        </Link>
        {!session?.user ? (
          <>
            <span className={t.divider}>|</span>
            <Link
              href={`${base}/login`}
              className={`${linkBase} ${onLogin ? t.linkActive : t.linkIdle}`}
            >
              Log in
            </Link>
            <Link
              href={`${base}/register`}
              className={`rounded-full px-3 py-1 font-medium transition ${onRegister ? t.registerActive : t.registerIdle}`}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className={t.divider}>|</span>
            <Link
              href={`${base}/viewer`}
              className={`${linkBase} ${onViewerPage ? t.linkActive : t.linkIdle}`}
            >
              My account
            </Link>
          </>
        )}
        {onAuthPage ? (
          <span className={`ml-auto text-xs ${t.hint}`}>
            You can return to the invite anytime from the links above.
          </span>
        ) : onViewerPage ? (
          <span className={`ml-auto text-xs ${t.hint}`}>
            Guest hub for this invitation — browse all your RSVPs below.
          </span>
        ) : null}
      </div>
    </nav>
  );
}
