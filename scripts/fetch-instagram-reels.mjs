#!/usr/bin/env node
/**
 * Pulls the latest reels from @ai.with.bala via the official Instagram API and writes
 * public/reels.json, which the "AI in 90 Seconds" section reads at runtime.
 *
 * Runs in the deploy workflow (on every push + every 6 hours), so new reels show up on the
 * site automatically. Needs the INSTAGRAM_ACCESS_TOKEN secret (a long-lived Instagram User
 * token for the Business/Creator account). Without a token, or if Instagram is unreachable,
 * the existing public/reels.json is left untouched - the site never breaks.
 */
import { readFile, writeFile } from 'node:fs/promises';

const OUT = new URL('../public/reels.json', import.meta.url);
const MAX_REELS = 12;
const token = process.env.INSTAGRAM_ACCESS_TOKEN;

const keep = (why) => {
  console.log(`[reels] ${why} - keeping existing public/reels.json`);
  process.exit(0);
};

if (!token) keep('INSTAGRAM_ACCESS_TOKEN not set');

const api = 'https://graph.instagram.com';
const get = async (url) => {
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body?.error?.message || `HTTP ${res.status}`);
  return body;
};

try {
  // Long-lived tokens expire after 60 days unless refreshed; refreshing on every run keeps it alive.
  await get(`${api}/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(token)}`).catch((e) =>
    console.warn(`[reels] token refresh skipped: ${e.message}`),
  );

  const reels = [];
  let url = `${api}/me/media?fields=id,media_type,media_product_type,permalink,timestamp&limit=50&access_token=${encodeURIComponent(token)}`;
  while (url && reels.length < MAX_REELS) {
    const page = await get(url);
    for (const m of page.data ?? []) {
      const code = /\/(?:reel|p)\/([A-Za-z0-9_-]+)/.exec(m.permalink ?? '')?.[1];
      const isReel = m.media_type === 'VIDEO' || m.media_product_type === 'REELS';
      if (code && isReel) reels.push(code);
      if (reels.length >= MAX_REELS) break;
    }
    url = page.paging?.next;
  }
  if (!reels.length) keep('no reels returned');

  const previous = await readFile(OUT, 'utf8').then(JSON.parse).catch(() => null);
  if (previous && JSON.stringify(previous.reels) === JSON.stringify(reels)) keep('no new reels');

  await writeFile(OUT, JSON.stringify({ updatedAt: new Date().toISOString(), reels }, null, 2) + '\n');
  console.log(`[reels] wrote ${reels.length} reels: ${reels.join(', ')}`);
} catch (e) {
  keep(`Instagram API error: ${e.message}`);
}
