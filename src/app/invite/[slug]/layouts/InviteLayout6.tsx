import { InviteReveal } from "@/components/invite/InviteReveal";
import { InviteBankQrSection } from "../InviteBankQrSection";
import { InviteGallerySection } from "../InviteGallerySection";
import { InviteMapSection } from "../InviteMapSection";
import { InviteMusicSection } from "../InviteMusicSection";
import { InviteQrSection } from "../InviteQrSection";
import { InviteRsvpForm } from "../InviteRsvpForm";
import type { InvitePageViewModel } from "../invite-page-types";

/** Layout 6 — pink classic: blush tones, soft borders, timeless romance. */
export function InviteLayout6(p: InvitePageViewModel) {
  let di = 0;
  const hasGallery = p.galleryUrls.length > 0;
  return (
    <main id="invite-top" className="relative flex min-h-0 flex-1 flex-col bg-[#fdf7f9]">
      {p.coverUrl ? (
        <InviteReveal className="shrink-0" delayIndex={di++}>
          <div className="relative h-56 w-full overflow-hidden sm:h-72">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.coverUrl} alt="" className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#fdf7f9]/95 via-[#fdf7f9]/15 to-transparent" />
          </div>
        </InviteReveal>
      ) : null}
      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col gap-8 px-5 pb-16 pt-8 sm:pt-10">
        <InviteReveal delayIndex={di++}>
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-800/85">Together with their families</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-pink-950 sm:text-5xl">{p.coupleNames}</h1>
            <p className="mt-2 text-lg text-stone-600">{p.title}</p>
          </header>
        </InviteReveal>
        <InviteReveal delayIndex={di++}>
          <section className="rounded-3xl border border-pink-100 bg-white/85 px-5 py-6 text-center shadow-sm backdrop-blur-md">
            <p className="text-sm font-medium text-pink-900/90">When</p>
            <p className="mt-1 font-medium text-stone-900">{p.when}</p>
            <p className="mt-4 text-sm font-medium text-pink-900/90">Where</p>
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
        {p.qrCodeBanks.length > 0 ? (
          <InviteReveal delayIndex={di++}>
            <InviteBankQrSection srcs={p.qrCodeBanks} layout={p.layout} />
          </InviteReveal>
        ) : null}
        <InviteReveal delayIndex={di++}>
          <InviteQrSection dataUrl={p.qrDataUrl} invitePath={p.invitePath} layout={p.layout} />
        </InviteReveal>
        <InviteReveal delayIndex={di++}>
          <InviteMapSection venue={p.venue} mapQuery={p.mapQuery} mapEnabled={p.mapEnabled} layout={p.layout} />
        </InviteReveal>
      </div>
    </main>
  );
}
