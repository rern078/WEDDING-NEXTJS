"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  /** From `auth()` in the root layout so the header is not stuck on loading while `/api/auth/session` runs. */
  session: Session | null;
};

export function Providers({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
