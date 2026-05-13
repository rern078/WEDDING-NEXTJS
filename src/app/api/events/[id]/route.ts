import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/require-admin";

const patchSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  coupleNames: z.string().min(1).max(200).optional(),
  eventDate: z.string().min(1).optional(),
  venue: z.string().min(1).max(300).optional(),
  description: z.string().max(5000).optional().nullable(),
  /** Lenient: allow any trimmed string so layout-only saves are not blocked by a non-URL cover field. */
  coverUrl: z
    .union([z.null(), z.literal(""), z.string().max(2000)])
    .optional()
    .transform((v) => {
      if (v === undefined) return undefined;
      if (v === null || v === "") return null;
      const t = String(v).trim();
      return t === "" ? null : t;
    }),
  slug: z.string().min(2).max(80).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  musicUrl: z
    .union([z.literal(""), z.string().trim().max(2000)])
    .optional()
    .nullable()
    .transform((v) => (v === undefined || v === null || v === "" ? null : v)),
  qrCodeBank: z
    .union([z.null(), z.literal(""), z.string().max(2_500_000)])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "" || v === null ? null : v))
    .refine(
      (v) =>
        v === undefined ||
        v === null ||
        (typeof v === "string" &&
          (v.startsWith("data:image/") || (v.startsWith("https://") && v.length < 2001))),
      { message: "qrCodeBank must be a data:image URL or short https image URL" },
    ),
  inviteLayout: z.enum(["layout1", "layout2", "layout3"]).optional(),
});

async function assertOwner(eventId: string, userId: string) {
  const event = await prisma.event.findFirst({
    where: { id: eventId, ownerId: userId },
  });
  return event;
}

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const gate = await requireAdminApi();
  if (!gate.allowed) return gate.response;
  const { session } = gate;
  const { id } = await ctx.params;
  const event = await assertOwner(id, session.user.id);
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const rsvps = await prisma.rsvp.findMany({
    where: { eventId: id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ event, rsvps });
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const gate = await requireAdminApi();
  if (!gate.allowed) return gate.response;
  const { session } = gate;
  const { id } = await ctx.params;
  const existing = await assertOwner(id, session.user.id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = patchSchema.safeParse(json);
  if (!parsed.success) {
    const msg =
      parsed.error.issues.map((i) => `${i.path.length ? i.path.join(".") + ": " : ""}${i.message}`).join(" · ") ||
      "Invalid input";
    return NextResponse.json({ error: msg, issues: parsed.error.issues }, { status: 400 });
  }
  const data = parsed.data;
  if (data.slug !== undefined && data.slug !== existing.slug) {
    const clash = await prisma.event.findFirst({ where: { slug: data.slug, NOT: { id } } });
    if (clash) {
      return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
    }
  }
  if (data.eventDate !== undefined) {
    const when = new Date(data.eventDate);
    if (Number.isNaN(when.getTime())) {
      return NextResponse.json({ error: "Invalid eventDate" }, { status: 400 });
    }
  }

  try {
    const event = await prisma.event.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.coupleNames !== undefined && { coupleNames: data.coupleNames }),
        ...(data.eventDate !== undefined && { eventDate: new Date(data.eventDate) }),
        ...(data.venue !== undefined && { venue: data.venue }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.coverUrl !== undefined && { coverUrl: data.coverUrl }),
        ...(data.musicUrl !== undefined && { musicUrl: data.musicUrl }),
        ...(data.slug !== undefined && { slug: data.slug }),
        ...(data.qrCodeBank !== undefined && { qrCodeBank: data.qrCodeBank }),
        ...(data.inviteLayout !== undefined && { inviteLayout: data.inviteLayout }),
      },
    });
    return NextResponse.json({ event });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Database update failed";
    console.error("[PATCH /api/events/:id]", e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const gate = await requireAdminApi();
  if (!gate.allowed) return gate.response;
  const { session } = gate;
  const { id } = await ctx.params;
  const existing = await assertOwner(id, session.user.id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await prisma.event.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
