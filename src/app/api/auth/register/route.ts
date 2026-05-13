import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { normalizeEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  email: z
    .string()
    .transform((s) => normalizeEmail(s))
    .pipe(z.string().email()),
  password: z.string().min(8).max(128),
  name: z.string().min(1).max(120).optional(),
});

export async function POST(req: Request) {
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
  const { email, password, name } = parsed.data;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: { email, passwordHash, name: name ?? null, role: "USER" },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[register]", e);
    return NextResponse.json(
      { error: "Could not create account. Check DATABASE_URL and that the database is reachable." },
      { status: 500 },
    );
  }
}
