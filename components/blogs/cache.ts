import { getPayloadClient } from "@/lib/payload";
import config from '@/payload.config';
import type { Tag } from '@/payload-types';
import { unstable_cache } from 'next/cache';
import { dbg } from '@/lib/debug-log';

export const getCachedPosts = unstable_cache(
  async ({ tag, page = 1, limit = 100 }: { tag?: string; page?: number; limit?: number }) => {
    dbg('getCachedPosts', 'cache miss - executing query', { tag, page, limit });
    const start = Date.now();
    const payload = await getPayloadClient();
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
    dbg('getCachedPosts', 'query complete', { docsCount: result.docs.length, duration: Date.now() - start });
    return result;
  },
  ['blog-posts-v2'],
  { revalidate: 30 }
);

export const getCachedTags = unstable_cache(
  async () => {
    dbg('getCachedTags', 'cache miss - executing query');
    const start = Date.now();
    try {
      const payload = await getPayloadClient();
      const { docs } = await payload.find({ collection: 'tags', limit: 50, depth: 0 });
      dbg('getCachedTags', 'query complete', { tagsCount: docs.length, duration: Date.now() - start });
      return docs as Tag[];
    } catch (err) {
      dbg('getCachedTags', 'query FAILED', { error: String(err), duration: Date.now() - start });
      throw err;
    }
  },
  ['blog-tags'],
  { revalidate: 30 }
);
