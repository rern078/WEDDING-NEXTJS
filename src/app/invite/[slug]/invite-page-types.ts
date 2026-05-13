import type { InviteLayoutKey } from "@/lib/invite-layout-theme";

export type InvitePageViewModel = {
  layout: InviteLayoutKey;
  slug: string;
  coupleNames: string;
  title: string;
  when: string;
  venue: string;
  /** Maps search override; when null/empty on the server, the invite uses `venue` for the map. */
  mapQuery: string | null;
  /** When false, guests do not see the map section. */
  mapEnabled: boolean;
  description: string | null;
  coverUrl: string | null;
  /** Ordered gallery image URLs (data URLs or https). */
  galleryUrls: string[];
  musicUrl: string | null;
  /** Ordered bank-transfer QR images (data URLs or https), max 5. */
  qrCodeBanks: string[];
  qrDataUrl: string;
  invitePath: string;
};
