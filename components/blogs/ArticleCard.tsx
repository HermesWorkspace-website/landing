'use client'

import Image from 'next/image'
import Link from 'next/link'
import { m } from 'framer-motion'

export interface ArchiveArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: number
  date: string
  cover: string
  coverAlt: string
  authorName: string
  authorAvatar: string
  featured?: boolean
}

const CATEGORY_COLORS: Record<string, { pill: string; bg: string; text: string; accent: string }> = {
  "Educational Technology": { pill: 'bg-teal-500/10 text-teal-700', bg: 'bg-teal-500/10', text: 'text-teal-700', accent: '#14B8A6' },
  "School Communication":   { pill: 'bg-brand/10 text-brand',       bg: 'bg-brand/10',       text: 'text-brand',       accent: '#6063EE' },
  "Academic Management":    { pill: 'bg-red-700/10 text-red-700',   bg: 'bg-red-700/10',      text: 'text-red-700',      accent: '#DC2626' },
  "Resources":              { pill: 'bg-green-500/10 text-green-600', bg: 'bg-green-500/10', text: 'text-green-600',   accent: '#6063EE' },
  "Parent Engagement":      { pill: 'bg-red-500/10 text-red-600',   bg: 'bg-red-500/10',      text: 'text-red-600',      accent: '#EF4444' },
  "School Operations":      { pill: 'bg-orange-500/10 text-orange-600', bg: 'bg-orange-500/10', text: 'text-orange-600', accent: '#EA580C' },
  General:                  { pill: 'bg-brand/10 text-brand',       bg: 'bg-brand/10',       text: 'text-brand',       accent: '#6063EE' },
}

function getColors(cat: string) {
  return CATEGORY_COLORS[cat] ?? { pill: 'bg-neutral-100 text-neutral-600', bg: 'bg-neutral-100', text: 'text-neutral-600', accent: '#6063EE' }
}

export { getColors }

export function ArticleCard({ article }: { article: ArchiveArticle }) {
  const c = getColors(article.category)

  return (
    <Link href={`/blog/${article.slug}`} className="block group">
      <m.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="h-full flex flex-col"
      >
        <div className="relative w-full rounded-2xl overflow-hidden">
          {article.cover ? (
            <Image
              src={article.cover}
              alt={article.coverAlt}
              width={800}
              height={450}
              className="w-full h-auto transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
            />
          ) : (
            <div className="aspect-video bg-gradient-to-br from-brand/15 to-brand/30 flex items-center justify-center">
              <span className="text-brand/40 text-6xl font-bold font-display select-none">
                {article.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4 mb-3">
          <span className={`inline-flex items-center px-2.5 py-[3px] rounded-full text-[11px] font-medium border border-current/20 ${c.pill}`}>
            {article.category}
          </span>
          <span className="hidden sm:inline-block h-px bg-brand-ink/20 flex-shrink-0" style={{ width: '1.5rem' }} />
          <span className="sm:hidden text-brand-ink/30 text-[11px]">•</span>
          <span className="text-[12px] text-brand-ink/50 font-medium font-body">
            {article.date}
          </span>
        </div>

        <h3 className="font-display text-[18px] font-bold leading-[1.3] tracking-[-0.02em] text-brand-ink mb-2 group-hover:underline group-hover:text-brand decoration-brand/60 decoration-[1.5px] underline-offset-[3px] transition-colors duration-200 line-clamp-3">
          {article.title}
        </h3>

        <p className="font-body text-[13.5px] text-brand-muted leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>
      </m.article>
    </Link>
  )
}
