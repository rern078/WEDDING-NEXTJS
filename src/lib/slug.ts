import { prisma } from "@/lib/prisma";

export function slugify(input: string) {
  const base = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return base || "wedding";
}

export async function uniqueEventSlug(seed: string) {
  const slug = slugify(seed);
  let suffix = 0;
  for (;;) {
    const candidate = suffix === 0 ? slug : `${slug}-${suffix}`;
    const taken = await prisma.event.findUnique({ where: { slug: candidate }, select: { id: true } });
    if (!taken) return candidate;
    suffix += 1;
  }
}
