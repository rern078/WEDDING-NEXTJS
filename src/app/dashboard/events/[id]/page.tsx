import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { publicOriginFromHeaders } from "@/lib/public-origin";
import { EventAnalyticsSection } from "./EventAnalyticsSection";
import { parseGalleryUrls } from "@/lib/gallery-urls";
import { parseBankQrs } from "@/lib/bank-qrs";
import { parseInviteLayout } from "@/lib/invite-layout-theme";
import { EventManageClient } from "./EventManageClient";

function toDatetimeLocalInput(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

type Props = { params: Promise<{ id: string }> };

export default async function ManageEventPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) return null;
  const { id } = await params;
  const event = await prisma.event.findFirst({
    where: { id, ownerId: session.user.id },
    include: { rsvps: { orderBy: { createdAt: "desc" } } },
  });
  if (!event) notFound();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const [totalViews, viewsLast7Days, recentViews] = await Promise.all([
    prisma.invitePageView.count({ where: { eventId: event.id } }),
    prisma.invitePageView.count({
      where: { eventId: event.id, createdAt: { gte: sevenDaysAgo } },
    }),
    prisma.invitePageView.findMany({
      where: { eventId: event.id },
      orderBy: { createdAt: "desc" },
      take: 8,
      select: { id: true, createdAt: true },
    }),
  ]);

  const h = await headers();
  const publicOrigin = publicOriginFromHeaders(h);

  const payload = {
    id: event.id,
    slug: event.slug,
    title: event.title,
    coupleNames: event.coupleNames,
    venue: event.venue,
    description: event.description ?? "",
    coverUrl: event.coverUrl ?? "",
    musicUrl: event.musicUrl ?? "",
    qrCodeBanks: parseBankQrs(event.qrCodeBanks, event.qrCodeBank),
    inviteLayout: parseInviteLayout(event.inviteLayout),
    eventDate: toDatetimeLocalInput(event.eventDate),
    publicOrigin,
    galleryUrls: parseGalleryUrls(event.galleryUrls),
    mapQuery: event.mapQuery ?? "",
    mapEnabled: event.mapEnabled ?? true,
    rsvps: event.rsvps.map((r) => ({
      id: r.id,
      guestName: r.guestName,
      email: r.email,
      status: r.status,
      message: r.message,
      dietary: r.dietary,
      createdAt: r.createdAt.toISOString(),
    })),
  };

  return (
    <main className="mx-auto w-full max-w-lg flex-1 px-5 py-10">
      <Link href="/dashboard" className="text-sm font-medium text-rose-900 hover:underline">
        ← Back to events
      </Link>
      <div className="mt-6 space-y-10">
        <EventAnalyticsSection
          totalViews={totalViews}
          viewsLast7Days={viewsLast7Days}
          recentViews={recentViews.map((v) => ({ id: v.id, at: v.createdAt.toISOString() }))}
        />
        <EventManageClient initial={payload} />
      </div>
    </main>
  );
}
