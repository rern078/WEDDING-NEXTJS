"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export function InviteSlugNav({ slug }: { slug: string }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const base = `/invite/${slug}`;
  const onInvitePage = pathname === base;
  const onAuthPage = pathname === `${base}/login` || pathname === `${base}/register`;
  const onViewerPage = pathname === `${base}/viewer`;

  return (
    <nav className="border-b border-rose-100/70 bg-white/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 text-sm">
        <Link
          href={base}
          className={`font-medium underline-offset-2 hover:underline ${
            onInvitePage ? "text-rose-900" : "text-stone-700 hover:text-rose-900"
          }`}
        >
          Home
        </Link>
        {!session?.user ? (
          <>
            <span className="text-stone-300">|</span>
            <Link
              href={`${base}/login`}
              className={`font-medium underline-offset-2 hover:underline ${pathname === `${base}/login` ? "text-rose-900" : "text-stone-700 hover:text-rose-900"}`}
            >
              Log in
            </Link>
            <Link
              href={`${base}/register`}
              className={`rounded-full px-3 py-1 font-medium transition ${pathname === `${base}/register` ? "bg-rose-100 text-rose-950" : "bg-rose-900 text-white hover:bg-rose-800"}`}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="text-stone-300">|</span>
            <Link
              href={`${base}/viewer`}
              className={`font-medium underline-offset-2 hover:underline ${onViewerPage ? "text-rose-900" : "text-stone-700 hover:text-rose-900"}`}
            >
              My account
            </Link>
          </>
        )}
        {onAuthPage ? (
          <span className="ml-auto text-xs text-stone-500">You can return to the invite anytime from the links above.</span>
        ) : onViewerPage ? (
          <span className="ml-auto text-xs text-stone-500">Guest hub for this invitation — browse all your RSVPs below.</span>
        ) : null}
      </div>
    </nav>
  );
}
