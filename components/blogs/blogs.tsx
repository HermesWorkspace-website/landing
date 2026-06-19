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
import type { Tag } from '@/payload-types';
import HeroSection from '@/components/blogs/Bloghero';
import { FeaturedPost } from '@/components/blogs/FeaturedPost';
import CategoryBar from '@/components/blogs/CategoryBar';
import { LatestPosts } from '@/components/blogs/LatestPosts';
import CTA from '@/components/blogs/CTA';
import type { Article, BlogAuthor, BlogTag } from '@/components/blogs/types';
import MobileBlogPage from '@/components/blogs/MobileBlogPage';

import { getCachedPosts, getCachedTags } from '@/components/blogs/cache';
import { dbg, perf, resetRequestId, getRequestId } from '@/lib/debug-log';

type BlogSearchParams = {
  category?: string;
  search?: string;
  tag?: string;
};

function LatestPostsSkeleton() {
  return (
    <section className="px-4 md:px-8 xl:px-16 pt-6 pb-12">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-[3px] h-5 rounded-full bg-brand shrink-0" />
          <div>
            <div className="h-8 w-48 bg-brand-ink/5 rounded-lg animate-pulse" />
            <div className="h-3 w-64 bg-brand-ink/5 rounded mt-2 animate-pulse" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-video bg-brand-ink/5 rounded-2xl" />
            <div className="mt-4 h-4 w-20 bg-brand-ink/5 rounded" />
            <div className="mt-3 h-5 w-full bg-brand-ink/5 rounded" />
            <div className="mt-2 h-4 w-3/4 bg-brand-ink/5 rounded" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<BlogSearchParams>;
}) {
  resetRequestId();
  const pageTimer = perf('BlogPage:total');
  dbg('BlogPage', 'render start');

  const fetchTimer = perf('BlogPage:Promise.all(fetch)');
  const [params, [postsResult, tags]] = await Promise.all([
    searchParams,
    Promise.all([getCachedPosts({}), getCachedTags()]),
  ]);
  fetchTimer.end({ totalPosts: postsResult.totalDocs, tagsCount: Array.isArray(tags) ? tags.length : 0 });

  const totalPosts      = postsResult.totalDocs
const safeTags = Array.isArray(tags) ? tags : [];
const totalCategories = safeTags.length

  dbg('BlogPage', 'search params', { category: params.category || 'All Posts', search: params.search || '' });

  const processTimer = perf('BlogPage:processArticles');
  const articles: Article[] = postsResult.docs.map((post) => {
    const resolvedTags: BlogTag[] = (post.tags ?? []).flatMap((t) =>
      typeof t === 'object' && t !== null
        ? [{ id: String((t as Tag).id), name: (t as Tag).name, slug: (t as Tag).slug ?? '' }]
        : []
    );

    return {
      id: String(post.id),
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt ?? '',
      featured: (post as any).featured ?? false,
      category: resolvedTags[0]?.name ?? 'General',
      tags: resolvedTags,
      readTime: (post as { readTime?: number }).readTime ?? 5,
      date: post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
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

  const latestArticles = articles.filter((a) => !carouselSlugs.has(a.slug));
  processTimer.end({ articlesCount: articles.length, latestCount: latestArticles.length });

  const categories = [
    'All Posts',
    ...safeTags.flatMap((t) => t.name ? [t.name] : []).sort(),
  ]

  dbg('BlogPage', 'before render', {
    categoriesCount: categories.length,
    categoriesList: categories,
    latestCount: latestArticles.length,
    totalPosts,
  });

  pageTimer.end();

  const requestId = getRequestId();

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
              <Suspense fallback={<div className="h-11 bg-white" />}>
                <CategoryBar categories={categories} id="desktop" requestId={requestId} />
              </Suspense>

              {/* 4. Section heading */}
              <div className="px-4 md:px-8 xl:px-16 pt-6 pb-2">
                <h2 className="font-display text-[1.5rem] font-bold text-brand-ink tracking-tight">
                  School Communication Insights & Guides
                </h2>
              </div>

              {/* 5. Latest posts */}
              <Suspense fallback={<LatestPostsSkeleton />}>
                <LatestPosts post={latestArticles} />
              </Suspense>
            </div>

          {/* 6. Newsletter */}
          <CTA/>
        </main>
        {/* Mobile layout */}
        <div className="block md:hidden">
          <MobileBlogPage searchParams={searchParams} initialPosts={postsResult} initialTags={safeTags} />
        </div>
      </>
  );
}