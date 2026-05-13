import { InviteReveal } from "@/components/invite/InviteReveal";
import { InviteBankQrSection } from "../InviteBankQrSection";
import { InviteGallerySection } from "../InviteGallerySection";
import { InviteMusicSection } from "../InviteMusicSection";
import { InviteQrSection } from "../InviteQrSection";
import { InviteRsvpForm } from "../InviteRsvpForm";
import type { InvitePageViewModel } from "../invite-page-types";

/** Layout 7 — red classic: deep reds, cream paper feel, formal elegance. */
export function InviteLayout7(p: InvitePageViewModel) {
  let di = 0;
  const hasGallery = p.galleryUrls.length > 0;
  return (
    <main className="relative flex min-h-0 flex-1 flex-col bg-[#faf8f7]">
      {p.coverUrl ? (
        <InviteReveal className="shrink-0" delayIndex={di++}>
          <div className="relative h-56 w-full overflow-hidden sm:h-72">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.coverUrl} alt="" className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#faf8f7]/96 via-stone-100/25 to-transparent" />
          </div>
        </InviteReveal>
      ) : null}
      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col gap-8 px-5 pb-16 pt-8 sm:pt-10">
        <InviteReveal delayIndex={di++}>
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-900/75">Request the honour of your presence</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-red-950 sm:text-5xl">{p.coupleNames}</h1>
            <p className="mt-2 text-lg text-stone-700">{p.title}</p>
          </header>
        </InviteReveal>
        <InviteReveal delayIndex={di++}>
          <section className="rounded-3xl border border-red-200/90 bg-white px-5 py-6 text-center shadow-md backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-red-950/90">When</p>
            <p className="mt-1 font-medium text-stone-900">{p.when}</p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-red-950/90">Where</p>
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
