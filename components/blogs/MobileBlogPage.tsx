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

  const activeCategory = params.category || 'All Posts';
  const searchQuery = (params.search || '').trim().toLowerCase();

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

  const filteredLatest = articles.filter((article) => {
    if (carouselSlugs.has(article.slug)) return false;
    const categoryMatch = activeCategory.toLowerCase() === 'all posts' || article.category.toLowerCase() === activeCategory.toLowerCase();
    const searchMatch = !searchQuery || article.title.toLowerCase().includes(searchQuery) || article.excerpt.toLowerCase().includes(searchQuery) || article.category.toLowerCase().includes(searchQuery);
    return categoryMatch && searchMatch;
  });

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
        <LatestPosts post={filteredLatest} />
      </div>

      <CTA/>
    </>
  );
}