"use client";

import { signOut } from "next-auth/react";

type Props = {
  /** Where to send the browser after sign-out (default: site home). */
  callbackUrl?: string;
  /** Extra classes (e.g. invite layout header tone). */
  className?: string;
};

export function SignOutButton({ callbackUrl = "/", className = "" }: Props) {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl })}
      className={`rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition active:scale-[0.98] ${className}`.trim()}
    >
      Sign out
    </button>
  );
}
