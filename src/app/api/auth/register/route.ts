import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { normalizeEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

function isPrismaKnownRequest(e: unknown): e is { code: string; meta?: unknown } {
  return typeof e === "object" && e !== null && "code" in e && typeof (e as { code: unknown }).code === "string";
}

/** User-facing message; never leak stack traces in production. */
function registerFailureMessage(e: unknown): string {
  if (e instanceof Error && e.message.includes("DATABASE_URL is not set")) {
    return e.message;
  }
  if (isPrismaKnownRequest(e) && e.code === "P2002") {
    return "Email already registered";
  }
  const msg =
    typeof e === "object" && e !== null && "message" in e && typeof (e as { message: unknown }).message === "string"
      ? (e as { message: string }).message
      : String(e);
  const lower = msg.toLowerCase();
  if (
    lower.includes("econnrefused") ||
    lower.includes("enotfound") ||
    lower.includes("etimedout") ||
    lower.includes("timeout") ||
    (lower.includes("connect") && lower.includes("refused"))
  ) {
    return "Cannot reach the database. Check DATABASE_URL (host, port) and that Neon/your host allows connections from this network.";
  }
  if (lower.includes("password authentication failed") || lower.includes("28p01") || lower.includes("sasl")) {
    return "Database login failed: wrong user or password in DATABASE_URL.";
  }
  if (lower.includes("ssl") || lower.includes("certificate")) {
    return "Database SSL error. For Neon, use a connection string with ?sslmode=require.";
  }
  if (process.env.NODE_ENV === "development") {
    return `Registration failed: ${msg}`;
  }
  return "Could not create account. Check DATABASE_URL and that the database is reachable.";
}

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
    const message = registerFailureMessage(e);
    const status = isPrismaKnownRequest(e) && e.code === "P2002" ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
