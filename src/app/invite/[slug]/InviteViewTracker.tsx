"use client";

import { useEffect, useRef } from "react";

/** Records one page view per browser session (client mount). */
export function InviteViewTracker({ slug }: { slug: string }) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    const url = `/api/public/events/${encodeURIComponent(slug)}/view`;
    const body = JSON.stringify({});
    void fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  }, [slug]);

  return null;
}
