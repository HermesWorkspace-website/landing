import { getPayloadClient } from "@/lib/payload";
import config from '@/payload.config';
import type { Tag } from '@/payload-types';
import { unstable_cache } from 'next/cache';

export const getCachedPosts = unstable_cache(
  async ({ tag, page = 1, limit = 100 }: { tag?: string; page?: number; limit?: number }) => {
    try {
      const payload = await getPayloadClient();
      return payload.find({
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
    } catch {
      return { docs: [], totalDocs: 0, totalPages: 0, page: 1, pagingCounter: 1, hasPrevPage: false, hasNextPage: false, prevPage: null, nextPage: null };
    }
  },
  ['blog-posts-v2'],
  { revalidate: 30 }
);

export const getCachedTags = unstable_cache(
  async () => {
    try {
      const payload = await getPayloadClient();
      const { docs } = await payload.find({ collection: 'tags', limit: 50, depth: 0 });
      return docs as Tag[];
    } catch {
      return [] as Tag[];
    }
  },
  ['blog-tags'],
  { revalidate: 30 }
);
