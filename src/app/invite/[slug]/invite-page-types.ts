import type { InviteLayoutKey } from "@/lib/invite-layout-theme";

export type InvitePageViewModel = {
  layout: InviteLayoutKey;
  slug: string;
  coupleNames: string;
  title: string;
  when: string;
  venue: string;
  description: string | null;
  coverUrl: string | null;
  musicUrl: string | null;
  qrCodeBank: string | null;
  qrDataUrl: string;
  invitePath: string;
};
