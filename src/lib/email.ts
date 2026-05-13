/** Normalize login/register email so storage and lookup always match. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
