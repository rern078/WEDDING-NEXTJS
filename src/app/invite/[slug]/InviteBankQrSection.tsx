import { BankTransferQrDownload } from "@/components/invite/BankTransferQrDownload";
import { bankQrBlockClasses, parseInviteLayout, type InviteLayoutKey } from "@/lib/invite-layout-theme";

/** Bank / transfer QR uploaded by admin (`data:image/...` or https image URL). */
export function InviteBankQrSection({
  src,
  layout = "layout1",
}: {
  src: string;
  layout?: InviteLayoutKey | string;
}) {
  if (!src.startsWith("data:image/") && !src.startsWith("https://")) return null;
  const c = bankQrBlockClasses(parseInviteLayout(layout));
  return (
    <section className={c.section}>
      <p className={c.title}>Bank transfer QR</p>
      <p className={c.sub}>Scan to pay or transfer (QR_CODE_BANK)</p>
      <div className="mt-4 flex flex-col items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element -- data URL or admin-provided https URL */}
        <img src={src} alt="Bank transfer QR code" width={200} height={200} className="rounded-xl" />
        <BankTransferQrDownload src={src} className={c.downloadBtn} />
      </div>
    </section>
  );
}
