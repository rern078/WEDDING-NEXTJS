import QRCode from "qrcode";

export async function inviteQrDataUrl(absoluteInviteUrl: string): Promise<string> {
  return QRCode.toDataURL(absoluteInviteUrl, {
    errorCorrectionLevel: "M",
    margin: 2,
    width: 280,
    color: { dark: "#881337", light: "#ffffff" },
  });
}

export async function inviteQrPngBuffer(absoluteInviteUrl: string): Promise<Buffer> {
  return QRCode.toBuffer(absoluteInviteUrl, {
    type: "png",
    errorCorrectionLevel: "M",
    margin: 2,
    width: 640,
    color: { dark: "#1c1917", light: "#ffffff" },
  });
}
