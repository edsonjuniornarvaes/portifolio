import "server-only";

/** Feed público do Behold com os posts do Instagram (pode ser trocado pela variável INSTAGRAM_FEED_URL). */
const FEED_URL = process.env.INSTAGRAM_FEED_URL?.trim() || "https://feeds.behold.so/hu2Ju1p4bnj2J2ClC6ZS";

export type InstagramPost = { id: string; permalink: string; imageUrl: string; caption: string; isVideo: boolean };

type Raw = {
  id: string;
  permalink: string;
  caption?: string;
  prunedCaption?: string;
  mediaType?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  sizes?: { medium?: { mediaUrl?: string }; small?: { mediaUrl?: string } };
};

function normalize(r: Raw): InstagramPost | null {
  const isVideo = r.mediaType === "VIDEO";
  const imageUrl = isVideo ? (r.thumbnailUrl ?? r.sizes?.medium?.mediaUrl) : (r.sizes?.medium?.mediaUrl ?? r.mediaUrl);
  if (!imageUrl || !r.permalink) return null;
  return { id: r.id, permalink: r.permalink, imageUrl, caption: (r.prunedCaption ?? r.caption ?? "").trim(), isVideo };
}

/** Últimos posts do Instagram (renovados a cada hora). Se der erro, devolve lista vazia e a seção mostra só o convite para seguir. */
export async function getInstagramPosts(limit = 6): Promise<InstagramPost[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    const list: Raw[] = Array.isArray(json) ? json : (json.posts ?? []);
    return list.map(normalize).filter((p): p is InstagramPost => p !== null).slice(0, limit);
  } catch {
    return [];
  }
}
