import { NextResponse } from "next/server";
import { z } from "zod";
import type { RsvpStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  guestName: z.string().min(1).max(120),
  email: z.string().email().optional().nullable(),
  status: z.enum(["ATTENDING", "DECLINED", "MAYBE", "PENDING"]),
  message: z.string().max(2000).optional().nullable(),
  dietary: z.string().max(500).optional().nullable(),
});

export async function POST(req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const event = await prisma.event.findUnique({ where: { slug }, select: { id: true } });
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }
  const d = parsed.data;
  const rsvp = await prisma.rsvp.create({
    data: {
      eventId: event.id,
      guestName: d.guestName,
      email: d.email ?? null,
      status: d.status as RsvpStatus,
      message: d.message ?? null,
      dietary: d.dietary ?? null,
    },
  });
  return NextResponse.json({ rsvp });
}
