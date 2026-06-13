import { getPayload } from 'payload';
import config from '@/payload.config';
import { unstable_cache } from 'next/cache';
import type { Post, Tag } from '@/payload-types';
import { dbg, perf } from './debug-log';

let _payload: Awaited<ReturnType<typeof getPayload>> | null = null;
let _payloadPromise: Promise<Awaited<ReturnType<typeof getPayload>>> | null = null;

export async function getPayloadClient(): Promise<Awaited<ReturnType<typeof getPayload>>> {
  if (_payload) {
    dbg('getPayloadClient', 'returning existing instance (warm)');
    return _payload;
  }
  if (_payloadPromise) {
    dbg('getPayloadClient', 'awaiting in-flight initialization (warm)');
    return _payloadPromise;
  }

  const timer = perf('getPayloadClient');
  const initTimer = perf('getPayload({ config })');

  _payloadPromise = getPayload({ config })
    .then((p) => {
      _payload = p;
      initTimer.end();
      timer.end();
      return p;
    })
    .catch((err) => {
      _payloadPromise = null;
      initTimer.end({ error: String(err) });
      timer.end({ error: String(err) });
      throw err;
    });

  return _payloadPromise!;
}

export const getCachedPost = unstable_cache(
  async (slug: string) => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug }, status: { equals: 'published' } },
      depth: 3,
      limit: 1,
    });
    return docs[0] as Post | undefined;
  },
  ['blog-post'],
  { revalidate: 300, tags: ['blog-post'] }
);

export const getCachedRelatedPosts = unstable_cache(
  async (tagIds: string[], currentSlug: string) => {
    if (!tagIds.length) return [];
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'posts',
      where: {
        status: { equals: 'published' },
        slug: { not_equals: currentSlug },
        'tags.id': { in: tagIds },
      },
      depth: 2,
      limit: 6,
      sort: '-publishedAt',
    });
    return docs as Post[];
  },
  ['blog-related'],
  { revalidate: 300, tags: ['blog-related'] }
);
