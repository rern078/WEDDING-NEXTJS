import { BankQrSlider } from "@/components/invite/BankQrSlider";
import { bankQrBlockClasses, parseInviteLayout, type InviteLayoutKey } from "@/lib/invite-layout-theme";

function isValidBankQrSrc(s: string): boolean {
  return s.startsWith("data:image/") || s.startsWith("https://");
}

/** Bank / transfer QR images uploaded by admin (`data:image/...` or https URLs). */
export function InviteBankQrSection({
  srcs,
  layout = "layout1",
}: {
  srcs: string[];
  layout?: InviteLayoutKey | string;
}) {
  const valid = srcs.filter(isValidBankQrSrc);
  if (valid.length === 0) return null;
  const c = bankQrBlockClasses(parseInviteLayout(layout));
  const slides = valid.map((src, index) => ({ src, index }));

  return (
    <section id="invite-transfer-qr" className={c.section}>
      <p className={c.title}>Bank transfer QR</p>
      <p className={c.sub}>Scan to pay or transfer (QR_CODE_BANK)</p>
      <BankQrSlider slides={slides} downloadBtnClassName={c.downloadBtn} />
    </section>
  );
}
