import { isLikelyMusicUrl, spotifyEmbedSrc } from "@/lib/spotify-embed";
import { musicSectionClasses, parseInviteLayout, type InviteLayoutKey } from "@/lib/invite-layout-theme";

export function InviteMusicSection({
  musicUrl,
  layout = "layout1",
}: {
  musicUrl: string | null;
  layout?: InviteLayoutKey | string;
}) {
  if (!musicUrl?.trim()) return null;
  const trimmed = musicUrl.trim();
  const embed = spotifyEmbedSrc(trimmed);
  const L = parseInviteLayout(layout);
  const c = musicSectionClasses(L);

  if (embed) {
    return (
      <section className={c.wrap}>
        <p className={c.header}>Our music</p>
        <iframe
          title="Spotify"
          src={embed}
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="min-h-[152px] w-full border-0 sm:min-h-[352px]"
        />
      </section>
    );
  }

  if (isLikelyMusicUrl(trimmed)) {
    return (
      <section className={c.listenWrap}>
        <p className={c.listenEyebrow}>Our music</p>
        <a
          href={trimmed}
          target="_blank"
          rel="noopener noreferrer"
          className={c.listenBtn}
        >
          Open playlist
        </a>
      </section>
    );
  }

  return null;
}
