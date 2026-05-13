import { parseInviteLayout, qrBlockClasses, type InviteLayoutKey } from "@/lib/invite-layout-theme";

export function InviteQrSection({
  dataUrl,
  invitePath,
  layout = "layout1",
}: {
  dataUrl: string;
  invitePath: string;
  layout?: InviteLayoutKey | string;
}) {
  const c = qrBlockClasses(parseInviteLayout(layout));
  return (
    <section className={c.section}>
      <p className={c.eyebrow}>Scan to open this invite</p>
      <div className="mt-4 flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element -- data URL from QR */}
        <img src={dataUrl} alt="QR code linking to this invitation" width={200} height={200} className="rounded-xl" />
      </div>
      <p className={c.path}>{invitePath}</p>
    </section>
  );
}
