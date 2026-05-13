import { InviteReveal } from "@/components/invite/InviteReveal";
import { InviteBankQrSection } from "../InviteBankQrSection";
import { InviteGallerySection } from "../InviteGallerySection";
import { InviteMapSection } from "../InviteMapSection";
import { InviteMusicSection } from "../InviteMusicSection";
import { InviteQrSection } from "../InviteQrSection";
import { InviteRsvpForm } from "../InviteRsvpForm";
import type { InvitePageViewModel } from "../invite-page-types";

export function InviteLayout3(p: InvitePageViewModel) {
  let di = 0;
  const hasGallery = p.galleryUrls.length > 0;
  return (
    <main id="invite-top" className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-zinc-950 text-stone-200">
      {/* Warm spotlight + deep base */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-10%,rgba(212,175,55,0.14),transparent_50%),radial-gradient(ellipse_90%_55%_at_50%_110%,rgba(9,9,11,0.95),rgb(9,9,11))]"
        aria-hidden
      />

      {p.coverUrl ? (
        <InviteReveal className="relative z-[1] shrink-0" delayIndex={di++}>
          <div className="relative h-52 w-full overflow-hidden sm:h-72">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.coverUrl} alt="" className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/65 to-zinc-900/15" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
          </div>
        </InviteReveal>
      ) : (
        <InviteReveal className="relative z-[1] shrink-0" delayIndex={di++}>
          <div className="relative h-32 w-full overflow-hidden sm:h-40" aria-hidden>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-950/50 via-zinc-900 to-zinc-950" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(251,191,36,0.15),transparent_55%)]" />
            <div className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-amber-500/35 to-transparent" />
          </div>
        </InviteReveal>
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col gap-10 px-5 pb-20 pt-6 sm:gap-12 sm:pt-8">
        <InviteReveal delayIndex={di++}>
          <header className="text-center">
            <div className="mx-auto mb-5 flex max-w-xs items-center justify-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/40" />
              <span className="shrink-0 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-amber-200/90">
                With love
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/40" />
            </div>
            <h1 className="font-serif text-[2.15rem] font-semibold leading-[1.12] tracking-tight text-amber-50 sm:text-5xl sm:leading-tight">
              {p.coupleNames}
            </h1>
            <p className="mt-3 text-lg font-light text-amber-100/80 sm:text-xl">{p.title}</p>
          </header>
        </InviteReveal>

        <InviteReveal delayIndex={di++}>
          <section className="rounded-2xl border border-amber-500/15 bg-zinc-900/70 p-6 shadow-2xl shadow-black/35 ring-1 ring-inset ring-white/[0.06] backdrop-blur-md sm:p-7">
            <div className="grid gap-8 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-amber-500/15">
              <div className="text-center sm:px-3">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-amber-400/90">When</p>
                <p className="mt-2 text-base font-medium leading-snug text-stone-100">{p.when}</p>
              </div>
              <div className="text-center sm:px-3">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-amber-400/90">Where</p>
                <p className="mt-2 text-base leading-snug text-stone-200">{p.venue}</p>
              </div>
            </div>
          </section>
        </InviteReveal>

        

        {p.description ? (
          <InviteReveal delayIndex={di++}>
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-900/40 px-5 py-6 ring-1 ring-inset ring-amber-500/[0.07] sm:px-7">
              <p className="whitespace-pre-wrap text-center text-base leading-relaxed text-stone-300 sm:text-lg">
                {p.description}
              </p>
            </div>
          </InviteReveal>
        ) : null}

        {hasGallery ? (
          <InviteReveal delayIndex={di++}>
            <InviteGallerySection urls={p.galleryUrls} layout={p.layout} />
          </InviteReveal>
        ) : null}

        <div className="flex flex-col gap-10 sm:gap-12">
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
          <InviteReveal delayIndex={di++}>
          <InviteMapSection venue={p.venue} mapQuery={p.mapQuery} mapEnabled={p.mapEnabled} layout={p.layout} />
        </InviteReveal>
        </div>
      </div>
    </main>
  );
}
