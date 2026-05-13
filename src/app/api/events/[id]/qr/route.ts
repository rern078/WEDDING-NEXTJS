import { NextResponse } from "next/server";
import { inviteQrPngBuffer } from "@/lib/invite-qr";
import { prisma } from "@/lib/prisma";
import { publicOriginFromRequest } from "@/lib/public-origin";
import { requireAdminApi } from "@/lib/require-admin";

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const gate = await requireAdminApi();
  if (!gate.allowed) return gate.response;
  const { session } = gate;
  const { id } = await ctx.params;
  const event = await prisma.event.findFirst({
    where: { id, ownerId: session.user.id },
    select: { slug: true },
  });
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const origin = publicOriginFromRequest(req);
  const inviteUrl = `${origin}/invite/${event.slug}`;
  const png = await inviteQrPngBuffer(inviteUrl);

  return new NextResponse(new Uint8Array(png), {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename="invite-${event.slug}.png"`,
      "Cache-Control": "private, no-store",
    },
  });
}
