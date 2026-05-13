/** Build public site origin from Next.js `headers()` (RSC / route handlers). */
export function publicOriginFromHeaders(h: Headers): string {
  const xfHost = h.get("x-forwarded-host");
  const xfProto = h.get("x-forwarded-proto");
  const host = xfHost?.split(",")[0]?.trim() ?? h.get("host") ?? "localhost:3000";
  const proto =
    xfProto?.split(",")[0]?.trim() ??
    (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
  return `${proto}://${host}`;
}

/** Build public site origin from request headers (works behind proxies). */
export function publicOriginFromRequest(req: Request): string {
  const url = new URL(req.url);
  const xfHost = req.headers.get("x-forwarded-host");
  const xfProto = req.headers.get("x-forwarded-proto");
  if (xfHost) {
    return `${xfProto ?? "https"}://${xfHost.split(",")[0].trim()}`;
  }
  return url.origin;
}
