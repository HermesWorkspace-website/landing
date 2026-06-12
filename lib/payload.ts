import { getPayload } from 'payload';
import config from '@/payload.config';
import { unstable_cache } from 'next/cache';
import type { Post, Tag } from '@/payload-types';

let _payload: Awaited<ReturnType<typeof getPayload>> | null = null;

export async function getPayloadClient() {
  if (_payload) return _payload;
  _payload = await getPayload({ config });
  return _payload;
}

export const getCachedPost = unstable_cache(
  async (slug: string) => {
    try {
      const payload = await getPayloadClient();
      const { docs } = await payload.find({
        collection: 'posts',
        where: { slug: { equals: slug }, status: { equals: 'published' } },
        depth: 3,
        limit: 1,
      });
      return docs[0] as Post | undefined;
    } catch {
      return undefined;
    }
  },
  ['blog-post'],
  { revalidate: 300, tags: ['blog-post'] }
);

export const getCachedRelatedPosts = unstable_cache(
  async (tagIds: string[], currentSlug: string) => {
    if (!tagIds.length) return [];
    try {
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
    } catch {
      return [];
    }
  },
  ['blog-related'],
  { revalidate: 300, tags: ['blog-related'] }
);
