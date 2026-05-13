"use client";

import { useCallback, useState } from "react";

function suggestedExtension(src: string): string {
  if (src.startsWith("data:")) {
    const semi = src.indexOf(";");
    const mime = semi > 5 ? src.slice(5, semi).toLowerCase() : "";
    if (mime === "image/jpeg") return "jpg";
    if (mime === "image/png" || mime === "image/webp" || mime === "image/gif") {
      return mime.replace("image/", "");
    }
    return "png";
  }
  try {
    const { pathname } = new URL(src);
    const m = pathname.match(/\.(png|jpe?g|webp|gif)$/i);
    if (m) return m[1].toLowerCase().replace("jpeg", "jpg");
  } catch {
    /* ignore */
  }
  return "png";
}

function triggerAnchorDownload(href: string, filename: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

type Props = {
  src: string;
  className: string;
  /** 1-based index for download filename when multiple bank QRs exist. */
  downloadIndex?: number;
};

export function BankTransferQrDownload({ src, className, downloadIndex }: Props) {
  const [busy, setBusy] = useState(false);

  const onDownload = useCallback(async () => {
    setBusy(true);
    const ext = suggestedExtension(src);
    const baseName =
      downloadIndex !== undefined && downloadIndex > 1
        ? `bank-transfer-qr-${downloadIndex}.${ext}`
        : `bank-transfer-qr.${ext}`;

    try {
      if (src.startsWith("data:")) {
        triggerAnchorDownload(src, baseName);
        return;
      }

      const res = await fetch(src, { mode: "cors" });
      if (!res.ok) throw new Error("fetch failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      try {
        triggerAnchorDownload(url, baseName);
      } finally {
        URL.revokeObjectURL(url);
      }
    } catch {
      window.open(src, "_blank", "noopener,noreferrer");
    } finally {
      setBusy(false);
    }
  }, [src, downloadIndex]);

  return (
    <button type="button" onClick={onDownload} disabled={busy} className={className}>
      {busy ? "Preparing…" : "Download QR"}
    </button>
  );
}
