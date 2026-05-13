/** Turn a Spotify share or embed link into an embed iframe `src`. */
export function spotifyEmbedSrc(input: string | null | undefined): string | null {
  if (!input?.trim()) return null;
  const u = input.trim();
  const embed = u.match(/open\.spotify\.com\/embed\/(track|playlist|album)\/([a-zA-Z0-9]+)/);
  if (embed) {
    return `https://open.spotify.com/embed/${embed[1]}/${embed[2]}?utm_source=generator`;
  }
  const share = u.match(/open\.spotify\.com\/(track|playlist|album)\/([a-zA-Z0-9]+)/);
  if (share) {
    return `https://open.spotify.com/embed/${share[1]}/${share[2]}?utm_source=generator`;
  }
  return null;
}

export function isLikelyMusicUrl(u: string): boolean {
  return /^https?:\/\//i.test(u.trim());
}
