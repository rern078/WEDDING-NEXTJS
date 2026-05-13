import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { toDbInviteLayout } from "@/lib/prisma-invite-layout";
import { requireAdminApi } from "@/lib/require-admin";
import { uniqueEventSlug } from "@/lib/slug";

const musicUrlField = z
  .union([z.literal(""), z.string().trim().max(2000)])
  .optional()
  .nullable()
  .transform((v) => (v === undefined || v === null || v === "" ? null : v));

const createSchema = z.object({
  title: z.string().min(1).max(200),
  coupleNames: z.string().min(1).max(200),
  eventDate: z.string().min(1),
  venue: z.string().min(1).max(300),
  description: z.string().max(5000).optional(),
  coverUrl: z
    .union([z.string().url().max(2000), z.literal("")])
    .optional()
    .nullable()
    .transform((v) => (v === "" || v === undefined ? null : v)),
  musicUrl: musicUrlField,
  inviteLayout: z
    .enum(["layout1", "layout2", "layout3", "layout4", "layout5", "layout6", "layout7"])
    .optional(),
});

export async function GET() {
  const gate = await requireAdminApi();
  if (!gate.allowed) return gate.response;
  const { session } = gate;
  const events = await prisma.event.findMany({
    where: { ownerId: session.user.id },
    orderBy: { eventDate: "asc" },
    include: { _count: { select: { rsvps: true, pageViews: true } } },
  });
  return NextResponse.json({ events });
}

export async function POST(req: Request) {
  const gate = await requireAdminApi();
  if (!gate.allowed) return gate.response;
  const { session } = gate;
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;
  const when = new Date(data.eventDate);
  if (Number.isNaN(when.getTime())) {
    return NextResponse.json({ error: "Invalid eventDate" }, { status: 400 });
  }
  const slug = await uniqueEventSlug(`${data.coupleNames}-${data.title}`);
  const event = await prisma.event.create({
    data: {
      slug,
      title: data.title,
      coupleNames: data.coupleNames,
      eventDate: when,
      venue: data.venue,
      description: data.description ?? null,
      coverUrl: data.coverUrl ?? null,
      musicUrl: data.musicUrl ?? null,
      ownerId: session.user.id,
      ...(data.inviteLayout !== undefined ? { inviteLayout: toDbInviteLayout(data.inviteLayout) } : {}),
    },
  });
  return NextResponse.json({ event });
}
