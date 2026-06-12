import Image from 'next/image'
import Link from 'next/link'
import { IconArrowRight, IconClock, IconCalendar } from '@tabler/icons-react'

interface RelatedPost {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  publishedAt?: string | null
  readTime: number
  coverImage?: { url?: string | null; alt?: string | null } | null
  author?: { name?: string | null } | null
  tags?: { id: string; name: string }[]
}

interface RelatedPostsProps {
  posts: RelatedPost[]
  categoryName: string
}

export function RelatedPosts({ posts, categoryName }: RelatedPostsProps) {
  if (!posts.length) return null

  // Cap at maximum of 6 posts as requested
  const displayPosts = posts.slice(0, 6)

  return (
    <section className="mt-16">
      {/* ── Section header ── */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          {/* Accent line */}
          <div className="w-[3px] h-5 rounded-full bg-brand" />
          <div>
            <h2 className="text-[20px] md:text-[24px] font-bold tracking-[-0.025em] text-brand-ink font-display leading-none">
              More from {categoryName}
            </h2>
          </div>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-[12px] font-semibold text-brand hover:text-brand-dark transition-colors"
        >
          All articles
          <IconArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid: 3 columns on desktop, 2 on tablet, 1 on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPosts.map((post) => (
          <RelatedCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}

// ── Compact, standard card with fixed aspect-ratio to prevent image crushing ──
function RelatedCard({ post }: { post: RelatedPost }) {
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="flex flex-col h-full bg-transparent">
        
        {/* Aspect-ratio wrapper prevents crushing of the cover image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-brand-ink/[0.03] mb-4 shrink-0">
          {post.coverImage?.url ? (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt ?? post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-[1.025] transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand/10 to-brand-purple/10 flex items-center justify-center">
              <span className="text-brand/35 text-3xl font-bold font-display">
                {post.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="flex flex-col flex-1">
          {/* Category Tag + Line + Date */}
          <div className="flex items-center gap-2 mb-3 text-[11px] font-body">
            {post.tags && post.tags[0] && (
              <span className="inline-flex items-center h-[18px] px-2.5 rounded-full bg-brand/[0.08] text-brand text-[9.5px] font-bold uppercase tracking-wider w-fit">
                {post.tags[0].name}
              </span>
            )}
            <span className="w-3.5 h-px bg-brand-ink/20" />
            <span className="text-brand-muted font-medium">
              {publishedDate}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-[15px] font-extrabold leading-[1.35] tracking-[-0.015em] text-brand-ink group-hover:underline group-hover:text-brand decoration-brand/60 decoration-1 underline-offset-4 transition-colors duration-200 line-clamp-2 font-display mb-2">
            {post.title}
          </h3>

          {/* Excerpt preview if available */}
          {post.excerpt && (
            <p className="text-[12.5px] text-brand-muted leading-relaxed line-clamp-2 font-body">
              {post.excerpt}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}