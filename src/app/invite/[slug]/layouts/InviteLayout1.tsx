import { InviteReveal } from "@/components/invite/InviteReveal";
import { InviteBankQrSection } from "../InviteBankQrSection";
import { InviteMusicSection } from "../InviteMusicSection";
import { InviteQrSection } from "../InviteQrSection";
import { InviteRsvpForm } from "../InviteRsvpForm";
import type { InvitePageViewModel } from "../invite-page-types";

export function InviteLayout1(p: InvitePageViewModel) {
  return (
    <main className="relative flex min-h-0 flex-1 flex-col">
      {p.coverUrl ? (
        <InviteReveal className="shrink-0" delayIndex={0}>
          <div className="relative h-56 w-full overflow-hidden sm:h-72">
            {/* eslint-disable-next-line @next/next/no-img-element -- guest-provided URLs */}
            <img src={p.coverUrl} alt="" className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream/95 via-cream/20 to-transparent" />
          </div>
        </InviteReveal>
      ) : null}
      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col gap-8 px-5 pb-16 pt-8 sm:pt-10">
        <InviteReveal delayIndex={1}>
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-800/80">Together with their families</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-rose-950 sm:text-5xl">{p.coupleNames}</h1>
            <p className="mt-2 text-lg text-stone-600">{p.title}</p>
          </header>
        </InviteReveal>
        <InviteReveal delayIndex={2}>
          <section className="rounded-3xl border border-rose-100 bg-white/70 px-5 py-6 text-center shadow-sm backdrop-blur-md">
            <p className="text-sm font-medium text-rose-900/90">When</p>
            <p className="mt-1 font-medium text-stone-900">{p.when}</p>
            <p className="mt-4 text-sm font-medium text-rose-900/90">Where</p>
            <p className="mt-1 text-stone-800">{p.venue}</p>
          </section>
        </InviteReveal>
        {p.description ? (
          <InviteReveal delayIndex={3}>
            <p className="whitespace-pre-wrap text-center text-lg leading-relaxed text-stone-700">{p.description}</p>
          </InviteReveal>
        ) : null}
        <InviteReveal delayIndex={4}>
          <InviteMusicSection musicUrl={p.musicUrl} layout={p.layout} />
        </InviteReveal>
        <InviteReveal delayIndex={5}>
          <InviteRsvpForm slug={p.slug} layout={p.layout} />
        </InviteReveal>
        {p.qrCodeBank ? (
          <InviteReveal delayIndex={6}>
            <InviteBankQrSection src={p.qrCodeBank} layout={p.layout} />
          </InviteReveal>
        ) : null}
        <InviteReveal delayIndex={p.qrCodeBank ? 7 : 6}>
          <InviteQrSection dataUrl={p.qrDataUrl} invitePath={p.invitePath} layout={p.layout} />
        </InviteReveal>
      </div>
    </main>
  );
}
