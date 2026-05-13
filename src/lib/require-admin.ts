import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function requireAdminApi() {
  const session = await auth();
  if (!session?.user?.id) {
    return { allowed: false as const, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  if (session.user.role !== "ADMIN") {
    return { allowed: false as const, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { allowed: true as const, session };
}
