import { INVITE_LAYOUT_VALUES } from "./invite-layout-values";
import type { InviteLayoutKey } from "./invite-layout-values";

/**
 * Validates layout id before Prisma write. Stored as plain string (not DB enum) so
 * Turbopack/Prisma runtime cannot reject newer layouts after schema changes.
 */
export function toDbInviteLayout(value: string): InviteLayoutKey {
  if (!(INVITE_LAYOUT_VALUES as readonly string[]).includes(value)) {
    throw new Error(
      `Unknown inviteLayout "${value}". Allowed: ${INVITE_LAYOUT_VALUES.join(", ")}.`,
    );
  }
  return value as InviteLayoutKey;
}
