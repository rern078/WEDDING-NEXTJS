/** Default map center when venue & map search are empty (admin preview). Easy to spot on the map. */
export const DEFAULT_MAP_LAT_LNG = "12.013609,104.941686";

/** Display hint for admins (spaces after comma). */
export const DEFAULT_MAP_LAT_LNG_HINT = "12.013609, 104.941686";

/** Trim; if the whole string looks like `lat,lng`, collapse spaces around the comma. */
export function normalizeMapSearchQuery(s: string): string {
  const t = s.trim();
  const m = t.match(/^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/);
  if (m) return `${m[1]},${m[2]}`;
  return t;
}
