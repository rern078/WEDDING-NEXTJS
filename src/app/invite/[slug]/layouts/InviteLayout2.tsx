import { InviteBankQrSection } from "../InviteBankQrSection";
import { InviteMusicSection } from "../InviteMusicSection";
import { InviteQrSection } from "../InviteQrSection";
import { InviteRsvpForm } from "../InviteRsvpForm";
import type { InvitePageViewModel } from "../invite-page-types";

export function InviteLayout2(p: InvitePageViewModel) {
  return (
    <main className="relative flex min-h-0 flex-1 flex-col bg-gradient-to-b from-teal-50/90 via-white to-emerald-50/80">
      {p.coverUrl ? (
        <div className="relative h-52 w-full shrink-0 overflow-hidden sm:h-64">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.coverUrl} alt="" className="h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-teal-50/95 via-white/30 to-transparent" />
        </div>
      ) : null}
      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col gap-8 px-5 pb-16 pt-8 sm:pt-10">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-800/85">A celebration</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-emerald-950 sm:text-5xl">{p.coupleNames}</h1>
          <p className="mt-2 text-lg text-emerald-900/70">{p.title}</p>
        </header>
        <section className="rounded-2xl border border-emerald-200/90 bg-white/90 px-5 py-6 text-center shadow-md shadow-emerald-900/5">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-800/90">When</p>
          <p className="mt-1 font-medium text-stone-900">{p.when}</p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-emerald-800/90">Where</p>
          <p className="mt-1 text-stone-800">{p.venue}</p>
        </section>
        {p.description ? (
          <p className="whitespace-pre-wrap text-center text-lg leading-relaxed text-emerald-950/85">{p.description}</p>
        ) : null}
        <InviteMusicSection musicUrl={p.musicUrl} layout={p.layout} />
        <InviteRsvpForm slug={p.slug} layout={p.layout} />
        {p.qrCodeBank ? <InviteBankQrSection src={p.qrCodeBank} layout={p.layout} /> : null}
        <InviteQrSection dataUrl={p.qrDataUrl} invitePath={p.invitePath} layout={p.layout} />
      </div>
    </main>
  );
}
