import { parseGalleryUrls } from "@/lib/gallery-urls";

/** Same per-file cap as admin copy (~900KB data URLs). */
export const MAX_BANK_QR_IMAGE_BYTES = 900_000;

/** Max bank / transfer QR images per event. */
export const MAX_BANK_QR_IMAGES = 5;

/**
 * Normalise bank QR list from DB: prefers `qrCodeBanks` JSON array, falls back to legacy `qrCodeBank` text.
 */
export function parseBankQrs(qrCodeBanks: unknown, qrCodeBankLegacy: string | null | undefined): string[] {
  const fromJson = parseGalleryUrls(qrCodeBanks).slice(0, MAX_BANK_QR_IMAGES);
  if (fromJson.length > 0) return fromJson;
  const legacy = qrCodeBankLegacy?.trim();
  if (legacy) return [legacy];
  return [];
}
