import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { normalizeEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

const credentialsSchema = z.object({
  email: z
    .string()
    .transform((s) => normalizeEmail(s))
    .pipe(z.string().email()),
  password: z.string().min(8),
});

function resolveAuthSecret(): string {
  const fromEnv = (process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? "").trim();
  if (fromEnv.length > 0) return fromEnv;

  // During `next build`, Next sets NEXT_PHASE so auth can initialize without deployment secrets.
  // Runtime (Vercel/server) must still set AUTH_SECRET — sessions will fail without it.
  const isNextProductionBuild =
    process.env.NODE_ENV === "production" && process.env.NEXT_PHASE === "phase-production-build";

  if (isNextProductionBuild) {
    return "__build_time_placeholder_set_AUTH_SECRET_on_the_host__";
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Set AUTH_SECRET or NEXTAUTH_SECRET in the environment for NextAuth.");
  }
  // Dev fallback so auth routes work if .env was copied from the example placeholder by mistake.
  return "dev-only-insecure-secret-set-AUTH_SECRET-in-your-env-file";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Use the incoming Host (localhost, LAN IP, or real domain). If AUTH_URL / NEXTAUTH_URL
  // are set in .env, they must match that same origin or sign-in breaks.
  trustHost: true,
  secret: resolveAuthSecret(),
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (raw) => {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          image: user.image ?? undefined,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.sub = user.id;
      if (user && "role" in user && typeof (user as { role?: string }).role === "string") {
        token.role = (user as { role: string }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) session.user.id = token.sub;
      if (session.user) {
        session.user.role = (token.role === "ADMIN" ? "ADMIN" : "USER") as "ADMIN" | "USER";
      }
      return session;
    },
  },
});
