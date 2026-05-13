import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { inviteQrDataUrl } from "@/lib/invite-qr";
import { parseInviteLayout } from "@/lib/invite-layout-theme";
import { publicOriginFromHeaders } from "@/lib/public-origin";
import { parseGalleryUrls } from "@/lib/gallery-urls";
import { parseBankQrs } from "@/lib/bank-qrs";
import { prisma } from "@/lib/prisma";
import { InviteViewTracker } from "./InviteViewTracker";
import { InviteThemedPage } from "./layouts/InviteThemedPage";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug },
    select: { title: true, coupleNames: true },
  });
  if (!event) return { title: "Invitation" };
  return {
    title: `${event.coupleNames}`,
    description: event.title,
    openGraph: { title: `${event.coupleNames}`, description: event.title },
  };
}

export default async function InvitePage({ params }: Props) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({ where: { slug } });
  if (!event) notFound();

  const h = await headers();
  const origin = publicOriginFromHeaders(h);
  const invitePath = `${origin}/invite/${slug}`;
  const qrDataUrl = await inviteQrDataUrl(invitePath);

  const when = event.eventDate.toLocaleString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const vm = {
    layout: parseInviteLayout(event.inviteLayout),
    slug,
    coupleNames: event.coupleNames,
    title: event.title,
    when,
    venue: event.venue,
    description: event.description,
    coverUrl: event.coverUrl,
    galleryUrls: parseGalleryUrls(event.galleryUrls),
    musicUrl: event.musicUrl,
    qrCodeBanks: parseBankQrs(event.qrCodeBanks, event.qrCodeBank),
    mapQuery: event.mapQuery,
    mapEnabled: event.mapEnabled,
    qrDataUrl,
    invitePath,
  };

  return (
    <>
      <InviteViewTracker slug={slug} />
      <InviteThemedPage {...vm} />
    </>
  );
}
