import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Post } from '@/payload-types'
import { ReadingProgress } from '@/components/blogs/Readingprogress'
import { ShareBar } from '@/components/blogs/ShareBar'
import { AuthorHoverCard } from '@/components/blogs/AuthorHoverCard'
import { IconArrowLeft, IconTag, IconClock, IconCalendar } from '@tabler/icons-react'
import { RelatedPosts } from '@/components/blogs/Relatedposts'
import { RichText } from '@payloadcms/richtext-lexical/react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface PageProps {
  params: Promise<{ slug: string }>
}

interface ResolvedAuthor {
  name: string
  avatar?: { url?: string | null; alt?: string | null } | null
  bio?: string | null
  twitter?: string | null
  linkedin?: string | null
}
interface ResolvedTag {
  id: string
  name: string
  slug: string
}
interface ResolvedCoverImage {
  url?: string | null
  alt?: string | null
}

// ---------------------------------------------------------------------------
// Data helpers
// ---------------------------------------------------------------------------
async function getPost(slug: string) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    depth: 3,
    limit: 1,
  })
  return docs[0] as Post | undefined
}

async function getRelatedPosts(tagIds: string[], currentSlug: string) {
  if (!tagIds.length) return []
  const payload = await getPayload({ config })
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
  })
  return docs as Post[]
}

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    limit: 200,
    depth: 0,
  })
  return docs.map(post => ({ slug: post.slug }))
}

// ---------------------------------------------------------------------------
// Category colour map
// ---------------------------------------------------------------------------
const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  Infrastructure:      { bg: 'bg-purple-500/10', text: 'text-purple-600', dot: 'bg-purple-500' },
  Technology:          { bg: 'bg-brand/10',       text: 'text-brand',      dot: 'bg-brand'      },
  Operations:          { bg: 'bg-amber-500/10',   text: 'text-amber-600',  dot: 'bg-amber-500'  },
  Communication:       { bg: 'bg-green-500/10',   text: 'text-green-600',  dot: 'bg-green-500'  },
  'Parent Engagement': { bg: 'bg-red-500/10',     text: 'text-red-600',    dot: 'bg-red-500'    },
  'Product Updates':   { bg: 'bg-orange-500/10',  text: 'text-orange-600', dot: 'bg-orange-500' },
}
const DEFAULT_CATEGORY = { bg: 'bg-brand/10', text: 'text-brand', dot: 'bg-brand' }

function CategoryPill({ category }: { category: string }) {
  const c = CATEGORY_COLORS[category] ?? DEFAULT_CATEGORY
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {category}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const author: ResolvedAuthor =
    typeof post.author === 'object' && post.author !== null
      ? {
          name: (post.author as any).name ?? 'HermesWorkspace',
          avatar: (post.author as any).avatar ?? null,
          bio: (post.author as any).bio ?? null,
          twitter: (post.author as any).twitter ?? null,
          linkedin: (post.author as any).linkedin ?? null,
        }
      : { name: 'HermesWorkspace' }

  const tags: ResolvedTag[] = (post.tags ?? [])
    .filter(t => typeof t === 'object')
    .map(t => ({ id: String((t as any).id), name: (t as any).name, slug: (t as any).slug }))

  const coverImage: ResolvedCoverImage | null =
    typeof post.coverImage === 'object' && post.coverImage !== null
      ? (post.coverImage as any)
      : null

  const primaryCategory = tags[0]?.name ?? 'General'
  const readTime: number = (post as any).readTime ?? 5
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  const relatedRaw = await getRelatedPosts(tags.map(t => t.id), post.slug ?? '')
  const relatedPosts = relatedRaw.map(rp => ({
    id: String(rp.id),
    title: rp.title,
    slug: rp.slug ?? '',
    excerpt: rp.excerpt ?? null,
    publishedAt: rp.publishedAt ?? null,
    readTime: (rp as any).readTime ?? 5,
    coverImage: typeof rp.coverImage === 'object' ? (rp.coverImage as any) : null,
    author: typeof rp.author === 'object' ? { name: (rp.author as any).name } : null,
    tags: ((rp.tags ?? []) as any[])
      .filter(t => typeof t === 'object')
      .map(t => ({ id: String(t.id), name: t.name })),
  }))

  return (
    <div className="min-h-screen bg-brand-bg pt-16">
      <ReadingProgress />

      <div className="mx-auto w-full max-w-[1400px] px-6 py-6 md:px-10 xl:px-12">
        {/* Back Link */}
        <Link
          href="/blog"
          className="group mb-8 inline-flex items-center gap-1.5 text-[12px] font-medium text-brand-muted transition-colors hover:text-brand-ink"
        >
          <IconArrowLeft size={13} className="mr-1 inline-block transition-transform group-hover:-translate-x-0.5" />
          Back to Blog
        </Link>

        {/* Unified 2-Column Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-14">

          {/* ── Left Area: Blog Content ── */}
          <article className="min-w-0">
            {/* Category + Meta Row */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <CategoryPill category={primaryCategory} />
              <span className="hidden sm:inline-block h-4 w-px bg-brand-ink/10" />
              <span className="flex items-center gap-1.5 text-[12px] text-brand-muted">
                <IconClock size={13} />
                {readTime} min read
              </span>
              <span className="hidden sm:inline-block h-4 w-px bg-brand-ink/10" />
              <span className="flex items-center gap-1.5 text-[12px] text-brand-muted">
                <IconCalendar size={13} />
                {publishedDate}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-brand-ink mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-[17px] leading-[1.8] text-brand-muted md:text-[18px] mb-8 font-body">
                {post.excerpt}
              </p>
            )}

            {/* Cover Image */}
            {coverImage?.url && (
              <div className="mb-10 w-full overflow-hidden rounded-3xl border border-brand-ink/[0.06] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                <img
                  src={coverImage.url}
                  alt={coverImage.alt ?? post.title}
                  className="w-full h-auto block"
                />
              </div>
            )}

            {/* ── Lexical Rich Text Content ── */}
            <div className="
              prose prose-lg max-w-none
              prose-headings:font-display prose-headings:text-brand-ink prose-headings:tracking-tight
              prose-h1:text-[2rem] prose-h1:font-extrabold prose-h1:leading-[1.1] prose-h1:mb-4 prose-h1:mt-10
              prose-h2:text-[1.5rem] prose-h2:font-bold prose-h2:leading-[1.2] prose-h2:mb-3 prose-h2:mt-8
              prose-h3:text-[1.2rem] prose-h3:font-bold prose-h3:leading-[1.3] prose-h3:mb-2 prose-h3:mt-6
              prose-p:text-[#374151] prose-p:leading-[1.85] prose-p:text-[18px] prose-p:font-body prose-p:mb-5
              prose-a:text-brand prose-a:no-underline prose-a:font-medium hover:prose-a:underline prose-a:underline-offset-2
              prose-strong:text-brand-ink prose-strong:font-bold
              prose-em:text-brand-muted
              prose-blockquote:border-l-[3px] prose-blockquote:border-brand prose-blockquote:pl-5 prose-blockquote:py-1 prose-blockquote:not-italic prose-blockquote:bg-brand/[0.03] prose-blockquote:rounded-r-lg prose-blockquote:text-brand-muted
              prose-code:text-brand prose-code:bg-brand/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[0.875em] prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-brand-ink prose-pre:text-white/80 prose-pre:rounded-2xl prose-pre:border prose-pre:border-white/[0.06] prose-pre:shadow-xl
              prose-ul:text-[#374151] prose-ul:font-body prose-ul:leading-[1.8]
              prose-ol:text-[#374151] prose-ol:font-body prose-ol:leading-[1.8]
              prose-li:mb-1.5 prose-li:text-[#374151]
              prose-img:rounded-2xl prose-img:border prose-img:border-brand-ink/[0.07] prose-img:shadow-lg
              prose-hr:border-brand-ink/[0.08]
              prose-table:text-[14px] prose-table:font-body
              prose-th:text-brand-ink prose-th:font-semibold prose-th:bg-brand-ink/[0.04]
              prose-td:text-brand-muted
              prose-li:marker:text-brand prose-ul:list-disc prose-ol:list-decimal
              prose-h2:mt-12
              prose-h2:mb-5
            ">
              <RichText data={post.content} />
            </div>

            {/* Mobile author + share block */}
            <div className="mt-10 lg:hidden rounded-2xl border border-brand-ink/[0.08] bg-white overflow-hidden">
              {/* Author section */}
              <div className="px-5 py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-ink/40 mb-3">Written by</p>
                <AuthorHoverCard author={author} sidebar />
              </div>
              {/* Divider */}
              <div className="h-px bg-brand-ink/[0.06] mx-5" />
              {/* Share section */}
              <div className="px-5 py-4 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-ink/40">Share</p>
                <ShareBar title={post.title} compact />
              </div>
            </div>

            {/* Tags (bottom of article) */}
            {tags.length > 0 && (
              <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-brand-ink/[0.08] pt-8">
                <span className="mr-2 text-[11px] font-semibold uppercase tracking-wider text-brand-ink/40">
                  Tags
                </span>
                {tags.map(tag => (
                  <Link
                    key={tag.id}
                    href={`/blog?category=${encodeURIComponent(tag.name)}`}
                    className="inline-flex items-center gap-1 rounded-full border border-brand-ink/[0.08] bg-white px-3 py-1 text-[12px] text-brand-muted transition-all hover:border-brand/30 hover:bg-brand/5 hover:text-brand"
                  >
                    # {tag.name}
                  </Link>
                ))}
              </div>
            )}
          </article>

          {/* ── Right Area: Sidebar ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-5">

              {/* Author Info */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg text-slate-600">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-900 font-semibold">
                  Written by
                </p>
                <AuthorHoverCard author={author} sidebar />
              </div>

              {/* Share + Metadata */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg space-y-6">
                <div>
                  <p className="mb-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-700
hover:text-slate-900">
                    Share article
                  </p>
                  <ShareBar title={post.title} vertical />
                </div>

                <div className="border-t border-brand-ink/[0.06] pt-5 space-y-3.5 text-slate-700">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] ">
                    Article info
                  </p>

                  <div className="flex items-center gap-2.5 text-[12.5px] text-brand-muted">
                    <IconCalendar size={14} className="shrink-0 text-brand-ink/30" />
                    <span>Published on {publishedDate}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-[12.5px] text-brand-muted">
                    <IconClock size={14} className="shrink-0 text-brand-ink/30" />
                    <span>{readTime} min read</span>
                  </div>

                  {tags.length > 0 && (
                    <div className="flex items-start gap-2.5 text-[12.5px] text-brand-muted">
                      <IconTag size={14} className="mt-0.5 shrink-0 text-brand-ink/30" />
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map(tag => (
                          <Link
                            key={tag.id}
                            href={`/blog?category=${encodeURIComponent(tag.name)}`}
                            className="rounded-full bg-brand-ink/[0.04] px-2.5 py-0.5 text-[11px] text-brand-muted transition-colors hover:bg-brand/10 hover:text-brand"
                          >
                            {tag.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Browse CTA */}
              <div className="rounded-2xl border border-brand-ink/[0.06] bg-brand/5 p-6 space-y-3.5">
                <p className="text-[13px] font-bold text-brand-ink">Enjoying this article?</p>
                <p className="text-[12px] leading-relaxed text-brand-muted">
                  Explore more insights on school operations, community building, and digital infrastructure.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-brand hover:text-brand-dark transition-colors"
                >
                  Browse all posts
                  <IconArrowLeft size={12} className="rotate-180" />
                </Link>
              </div>

            </div>
          </aside>

        </div>

        {/* ── Related Posts ── */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 border-t border-brand-ink/[0.08] pt-14">
            <RelatedPosts posts={relatedPosts} categoryName={primaryCategory} />
          </div>
        )}
      </div>
    </div>
  )
}