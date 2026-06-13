import { getPayloadClient } from "@/lib/payload";
import config from '@/payload.config';
import type { Tag } from '@/payload-types';
import { unstable_cache } from 'next/cache';
import { dbg, perf } from '@/lib/debug-log';

export const getCachedPosts = unstable_cache(
  async ({ tag, page = 1, limit = 100 }: { tag?: string; page?: number; limit?: number }) => {
    dbg('getCachedPosts', 'cache miss - executing query', { tag, page, limit });
    const payloadTimer = perf('getCachedPosts:getPayloadClient');
    const payload = await getPayloadClient();
    payloadTimer.end();
    const queryTimer = perf('getCachedPosts:payload.find');
    const result = await payload.find({
      collection: 'posts',
      where: {
        status: { equals: 'published' },
        ...(tag ? { 'tags.slug': { equals: tag } } : {}),
      },
      sort: '-publishedAt',
      depth: 2,
      limit,
      page,
    });
    queryTimer.end({ docsCount: result.docs.length });
    return result;
  },
  ['blog-posts-v2'],
  { revalidate: 30 }
);

export const getCachedTags = unstable_cache(
  async () => {
    dbg('getCachedTags', 'cache miss - executing query');
    try {
      const payloadTimer = perf('getCachedTags:getPayloadClient');
      const payload = await getPayloadClient();
      payloadTimer.end();
      const queryTimer = perf('getCachedTags:payload.find');
      const { docs } = await payload.find({ collection: 'tags', limit: 50, depth: 0 });
      queryTimer.end({ tagsCount: docs.length });
      return docs as Tag[];
    } catch (err) {
      dbg('getCachedTags', 'query FAILED', { error: String(err) });
      throw err;
    }
  },
  ['blog-tags'],
  { revalidate: 30 }
);
