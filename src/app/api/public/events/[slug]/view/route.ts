import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const event = await prisma.event.findUnique({ where: { slug }, select: { id: true } });
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const userAgent = req.headers.get("user-agent")?.slice(0, 512) ?? null;
  const referrer = req.headers.get("referer")?.slice(0, 2048) ?? null;

  await prisma.invitePageView.create({
    data: {
      eventId: event.id,
      userAgent,
      referrer,
    },
  });

  return NextResponse.json({ ok: true });
}
