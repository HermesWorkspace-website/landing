import { Suspense } from 'react';
import type { Tag } from '@/payload-types';
import HeroSection from '@/components/blogs/Bloghero';
import { FeaturedPost } from '@/components/blogs/FeaturedPost';
import CategoryBar from '@/components/blogs/CategoryBar';
import { LatestPosts } from '@/components/blogs/LatestPosts';
import CTA from '@/components/blogs/CTA';
import type { Article, BlogTag } from '@/components/blogs/types';

type BlogSearchParams = { category?: string; search?: string; tag?: string };

interface PostsResult {
  docs: any[];
  totalDocs: number;
}

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

export default async function MobileBlogPage({
  searchParams,
  initialPosts,
  initialTags,
}: {
  searchParams: Promise<BlogSearchParams>;
  initialPosts?: PostsResult;
  initialTags?: Tag[];
}) {
  const params = await searchParams;
  const postsResult = initialPosts ?? { docs: [], totalDocs: 0 };
  const tags = initialTags ?? [];
  const totalPosts = postsResult.totalDocs;
  const totalCategories = tags.length;

  const articles: Article[] = postsResult.docs.map((post: any) => {
    const resolvedTags: BlogTag[] = (post.tags ?? []).flatMap((t: any) =>
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
      date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
      cover: typeof post.coverImage === 'object' && post.coverImage !== null ? (post.coverImage as { url?: string }).url || '' : '',
      author: typeof post.author === 'object' && post.author !== null ? {
        name: (post.author as { name?: string }).name ?? 'HermesWorkspace',
        avatar: (post.author as { avatar?: { url?: string } }).avatar?.url ?? '',
      } : { name: 'HermesWorkspace', avatar: '' },
    };
  });

  const featuredPinned = articles.filter((a) => a.featured);
  const nonFeatured = articles.filter((a) => !a.featured);
  const carouselPosts = [...featuredPinned, ...nonFeatured].slice(0, 6);
  const carouselSlugs = new Set(carouselPosts.map((p) => p.slug));

  const latestArticles = articles.filter((a) => !carouselSlugs.has(a.slug));

  const categories = ['All Posts', ...tags.flatMap((t) => t.name ? [t.name] : []).sort()];

  return (
    <>
      {/* Mobile layout – stacked single column */}
      <HeroSection totalPosts={totalPosts} totalCategories={totalCategories} />

      <div id="blog-posts">
        {/* Featured carousel */}
        {carouselPosts.length > 0 && (
          <FeaturedPost posts={carouselPosts} />
        )}

        {/* Category filter */}
        <Suspense fallback={<div className="h-11 bg-white" />}>
          <CategoryBar categories={categories} id="mobile" />
        </Suspense>

        {/* Latest posts */}
        <Suspense fallback={<LatestPostsSkeleton />}>
          <LatestPosts post={latestArticles} />
        </Suspense>
      </div>

      <CTA/>
    </>
  );
}