/** Normalise Prisma Json gallery field to a string array. */
export function parseGalleryUrls(value: unknown): string[] {
  if (value == null) return [];
  if (!Array.isArray(value)) return [];
  return value.filter((x): x is string => typeof x === "string");
}

export const MAX_GALLERY_IMAGES = 15;
export const MAX_GALLERY_IMAGE_BYTES = 900_000;
