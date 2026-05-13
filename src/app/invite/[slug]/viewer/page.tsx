import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { ViewerAccountView } from "@/components/viewer/ViewerAccountView";
import { prisma } from "@/lib/prisma";
import { getMyInvitesForEmail } from "@/lib/viewer-my-invites";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug },
    select: { coupleNames: true },
  });
  return {
    title: event ? `My account — ${event.coupleNames}` : "My account",
  };
}

export default async function InviteScopedViewerPage({ params }: Props) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug },
    select: { slug: true, title: true, coupleNames: true },
  });
  if (!event) notFound();

  const session = await auth();
  const name = session?.user?.name ?? session?.user?.email ?? "Guest";
  const isAdmin = session?.user?.role === "ADMIN";
  const accountEmail = session?.user?.email ?? null;
  const myInvites = await getMyInvitesForEmail(accountEmail);

  return (
    <ViewerAccountView
      name={name}
      isAdmin={isAdmin}
      accountEmail={accountEmail}
      invites={myInvites}
      inviteContext={{ slug: event.slug, title: event.title, coupleNames: event.coupleNames }}
    />
  );
}
