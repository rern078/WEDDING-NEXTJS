/** Allowed invite layout ids — keep in sync with API zod + dashboard options. */
export const INVITE_LAYOUT_VALUES = [
  "layout1",
  "layout2",
  "layout3",
  "layout4",
  "layout5",
  "layout6",
  "layout7",
] as const;

export type InviteLayoutKey = (typeof INVITE_LAYOUT_VALUES)[number];
