/**
 * blogs.tsx (updated)
 * ────────────────────
 * Renders the full desktop layout on md+ screens,
 * and the lightweight MobileBlogPage on mobile.
 *
 * The only change from the original: wrap desktop in "hidden md:block"
 * and add the mobile component in "md:hidden". All data-fetching stays the same.
 */

import { Suspense } from 'react';
import { getPayload } from 'payload';

import config from '@/payload.config';
import type { Tag } from '@/payload-types';
import HeroSection from '@/components/blogs/Bloghero';
import { FeaturedPost } from '@/components/blogs/FeaturedPost';
import CategoryBar from '@/components/blogs/CategoryBar';
import { LatestPosts } from '@/components/blogs/LatestPosts';
import CTA from '@/components/blogs/CTA';
import type { Article, BlogAuthor, BlogTag } from '@/components/blogs/types';
import MobileBlogPage from '@/components/blogs/MobileBlogPage';

import { unstable_cache } from 'next/cache';
const payload = await getPayload({ config })

const [posts, tags] = await Promise.all([
  payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: 0,
  }),
  payload.find({
    collection: 'tags',
    limit: 0,
  }),
])


export const getCachedPosts = unstable_cache(
  async ({ tag, page = 1, limit = 100 }: { tag?: string; page?: number; limit?: number }) => {
    try {
      const payload = await getPayload({ config });
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
      const payload = await getPayload({ config });
      const { docs } = await payload.find({
        collection: 'tags',
        limit: 50,
        depth: 0,
      });
      return docs as Tag[];
    } catch {
      return [] as Tag[];
    }
  },
  ['blog-tags'],
  { revalidate: 30 }
);

type BlogSearchParams = {
  category?: string;
  search?: string;
  tag?: string;
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<BlogSearchParams>;
}) {
  const params = await searchParams;
  const [postsResult, tags] = await Promise.all([getCachedPosts({}), getCachedTags()]);
  const totalPosts      = postsResult.totalDocs
const totalCategories = tags.length

  const activeCategory = params.category || 'All Posts';
  const searchQuery = (params.search || '').trim().toLowerCase();

  const articles: Article[] = postsResult.docs.map((post) => {
    const resolvedTags: BlogTag[] = (post.tags ?? [])
      .filter((t): t is Tag => typeof t === 'object' && t !== null)
      .map((t) => ({
        id: String(t.id),
        name: t.name,
        slug: t.slug ?? '',
      }));

    return {
      id: String(post.id),
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt ?? '',
      featured: post.featured ?? false,
      category: resolvedTags[0]?.name ?? 'General',
      tags: resolvedTags,
      readTime: (post as { readTime?: number }).readTime ?? 5,
      date: post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('en-IN')
        : '',
      cover:
        typeof post.coverImage === 'object' && post.coverImage !== null
          ? (post.coverImage as { url?: string }).url || ''
          : '',
      author:
        typeof post.author === 'object' && post.author !== null
          ? {
              name: (post.author as { name?: string }).name ?? 'HermesWorkspace',
              avatar:
                (post.author as { avatar?: { url?: string } }).avatar?.url ?? '',
            }
          : { name: 'HermesWorkspace', avatar: '' },
    };
  });

  // Featured carousel: always all articles, unaffected by category/search filter
  const featuredPinned = articles.filter((a) => a.featured);
  const nonFeatured = articles.filter((a) => !a.featured);
  const carouselPosts = [...featuredPinned, ...nonFeatured].slice(0, 6);

  const carouselSlugs = new Set(carouselPosts.map((p) => p.slug));

  const filteredLatest = articles.filter((article) => {
    if (carouselSlugs.has(article.slug)) return false;
    const categoryMatch =
      activeCategory.toLowerCase() === 'all posts' ||
      article.category.toLowerCase() === activeCategory.toLowerCase();
    const searchMatch =
      !searchQuery ||
      article.title.toLowerCase().includes(searchQuery) ||
      article.excerpt.toLowerCase().includes(searchQuery) ||
      article.category.toLowerCase().includes(searchQuery);
    return categoryMatch && searchMatch;
  });

 const categories = [
  'All Posts',
  ...tags.map((t) => t.name).filter(Boolean).sort(),
]

  return (
    <>           {/* ── Desktop layout (original, unchanged) ── */}
        <main className=" hidden md:block min-h-screen bg-brand-bg overflow-x-hidden">
          {/* 1. Hero */}
          
            <HeroSection totalPosts={totalPosts} totalCategories={totalCategories} />

          
            <div id="blog-posts">
              {/* 2. Featured carousel */}
              {carouselPosts.length > 0 && (
                <FeaturedPost posts={carouselPosts} />
              )}

              {/* 3. Category filter */}
              <Suspense fallback={null}>
                <CategoryBar categories={categories} id="desktop" />
              </Suspense>

              {/* 4. Latest posts */}
              <LatestPosts post={filteredLatest} />
            </div>

          {/* 6. Newsletter */}
          <CTA/>
        </main>
        {/* Mobile layout */}
        <div className="block md:hidden">
          <MobileBlogPage searchParams={searchParams} />
        </div>
      </>
  );
}