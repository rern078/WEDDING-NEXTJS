import { InviteReveal } from "@/components/invite/InviteReveal";
import { InviteBankQrSection } from "../InviteBankQrSection";
import { InviteGallerySection } from "../InviteGallerySection";
import { InviteMusicSection } from "../InviteMusicSection";
import { InviteQrSection } from "../InviteQrSection";
import { InviteRsvpForm } from "../InviteRsvpForm";
import type { InvitePageViewModel } from "../invite-page-types";

/** Layout 4 — red fresh: crisp reds, white cards, energetic gradients. */
export function InviteLayout4(p: InvitePageViewModel) {
  let di = 0;
  const hasGallery = p.galleryUrls.length > 0;
  return (
    <main className="relative flex min-h-0 flex-1 flex-col bg-gradient-to-b from-white via-red-50/35 to-orange-50/25">
      {p.coverUrl ? (
        <InviteReveal className="shrink-0" delayIndex={di++}>
          <div className="relative h-56 w-full overflow-hidden sm:h-72">
            {/* eslint-disable-next-line @next/next/no-img-element -- guest-provided URLs */}
            <img src={p.coverUrl} alt="" className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-red-50/95 via-white/25 to-transparent" />
          </div>
        </InviteReveal>
      ) : null}
      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col gap-8 px-5 pb-16 pt-8 sm:pt-10">
        <InviteReveal delayIndex={di++}>
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-600">Together we celebrate</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-red-800 sm:text-5xl">{p.coupleNames}</h1>
            <p className="mt-2 text-lg font-medium text-red-900/75">{p.title}</p>
          </header>
        </InviteReveal>
        <InviteReveal delayIndex={di++}>
          <section className="rounded-2xl border border-red-200 bg-white/95 px-5 py-6 text-center shadow-lg shadow-red-900/10 ring-1 ring-red-100/60 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-red-700">When</p>
            <p className="mt-1 font-medium text-stone-900">{p.when}</p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-red-700">Where</p>
            <p className="mt-1 text-stone-800">{p.venue}</p>
          </section>
        </InviteReveal>
        {p.description ? (
          <InviteReveal delayIndex={di++}>
            <p className="whitespace-pre-wrap text-center text-lg leading-relaxed text-stone-700">{p.description}</p>
          </InviteReveal>
        ) : null}
        {hasGallery ? (
          <InviteReveal delayIndex={di++}>
            <InviteGallerySection urls={p.galleryUrls} layout={p.layout} />
          </InviteReveal>
        ) : null}
        <InviteReveal delayIndex={di++}>
          <InviteMusicSection musicUrl={p.musicUrl} layout={p.layout} />
        </InviteReveal>
        <InviteReveal delayIndex={di++}>
          <InviteRsvpForm slug={p.slug} layout={p.layout} />
        </InviteReveal>
        {p.qrCodeBank ? (
          <InviteReveal delayIndex={di++}>
            <InviteBankQrSection src={p.qrCodeBank} layout={p.layout} />
          </InviteReveal>
        ) : null}
        <InviteReveal delayIndex={di++}>
          <InviteQrSection dataUrl={p.qrDataUrl} invitePath={p.invitePath} layout={p.layout} />
        </InviteReveal>
      </div>
    </main>
  );
}
