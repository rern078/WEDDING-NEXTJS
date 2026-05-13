import type { RsvpStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export type MyInviteRow = {
  event: { slug: string; title: string; coupleNames: string; eventDate: Date };
  status: RsvpStatus;
};

export async function getMyInvitesForEmail(accountEmail: string | null | undefined): Promise<MyInviteRow[]> {
  const email = accountEmail?.trim();
  if (!email) return [];

  const rsvps = await prisma.rsvp.findMany({
    where: {
      email: { equals: email, mode: "insensitive" },
    },
    orderBy: { createdAt: "desc" },
    select: {
      status: true,
      event: {
        select: { id: true, slug: true, title: true, coupleNames: true, eventDate: true },
      },
    },
  });

  const seen = new Set<string>();
  const rows: MyInviteRow[] = [];
  for (const r of rsvps) {
    if (seen.has(r.event.id)) continue;
    seen.add(r.event.id);
    rows.push({ event: r.event, status: r.status });
  }
  return rows;
}
