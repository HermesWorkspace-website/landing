'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, Variants } from 'framer-motion'
import { IconArrowUpRight } from '@tabler/icons-react'
import type { Article } from '@/components/blogs/types'

interface LatestPostsProps {
  post: Article[]
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Infrastructure:      { bg: 'bg-purple-500/10',  text: 'text-purple-600'  },
  Technology:          { bg: 'bg-brand/10',        text: 'text-brand'       },
  Operations:          { bg: 'bg-amber-500/10',    text: 'text-amber-600'   },
  Communication:       { bg: 'bg-green-500/10',    text: 'text-green-600'   },
  'Parent Engagement': { bg: 'bg-red-500/10',      text: 'text-red-600'     },
  'Product Updates':   { bg: 'bg-orange-500/10',   text: 'text-orange-600'  },
}
const DEFAULT_COLOR = { bg: 'bg-brand/10', text: 'text-brand' }

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.08,
    },
  }),
}

// ── Card matching reference design: large image, category + dash + date, bold title, excerpt ──
function PostCard({ post, index }: { post: Article; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const c = CATEGORY_COLORS[post.category] ?? DEFAULT_COLOR

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <motion.article
          whileHover={{ y: -4 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="h-full flex flex-col"
        >
          {/* ── Cover image ── */}
          <div className="relative w-full rounded-2xl overflow-hidden shrink-0">
            {post.cover ? (
              <img
                src={post.cover}
                alt={post.title}
                loading="lazy"
                decoding="async"
                className="w-full h-auto transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
              />
            ) : (
              <div className="aspect-video bg-gradient-to-br from-brand/15 to-brand/30 flex items-center justify-center">
                <span className="text-brand/40 text-6xl font-bold font-display select-none">
                  {post.title.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* ── Meta row: category pill · dot · date ── */}
          <div className="flex flex-wrap items-center gap-2 mt-4 mb-3">
            <span
              className={`inline-flex items-center px-2.5 py-[3px] rounded-full text-[11px] font-medium border border-current/20 ${c.bg} ${c.text}`}
            >
              {post.category}
            </span>
            <span className="hidden sm:inline-block h-px bg-brand-ink/20 flex-shrink-0" style={{ width: '1.5rem' }} />
            <span className="sm:hidden text-brand-ink/30 text-[11px]">•</span>
            <span className="text-[12px] text-brand-ink/50 font-medium font-body">
              {post.date}
            </span>
          </div>

          {/* ── Title ── */}
          <h3 className="font-display text-[18px] font-bold leading-[1.3] tracking-[-0.02em] text-brand-ink mb-2 group-hover:underline group-hover:text-brand decoration-brand/60 decoration-[1.5px] underline-offset-[3px] transition-colors duration-200 line-clamp-3">
            {post.title}
          </h3>

          {/* ── Excerpt ── */}
          <p className="font-body text-[13.5px] text-brand-muted leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        </motion.article>
      </Link>
    </motion.div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export function LatestPosts({ post }: LatestPostsProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-60px' })

  // Show up to 12 posts (4 full rows of 3)
  const posts = post.slice(0, 12)

  if (!posts.length) return null

  return (
    <section className="px-4 md:px-8 xl:px-16 pt-6 pb-12">
      {/* ── Header ── */}
      <div ref={headerRef} className="flex items-center justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center gap-3 min-w-0"
        >
          <div className="w-[3px] h-5 rounded-full bg-brand shrink-0" />
          <div className="min-w-0">
            <h2 className="text-[22px] md:text-[32px] font-bold tracking-[-0.025em] text-brand-ink leading-tight font-display">
              Latest Perspectives
            </h2>
            <p className="font-mono text-[11px] md:text-[12.5px] text-brand-ink/40 mt-0.5 truncate">
              The pulse of modern workspace management
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="shrink-0"
        >
          <Link href="/blog/archive">
            <motion.span
              whileHover={{ x: 3 }}
              className="font-body inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 rounded-full border border-brand/30 bg-brand/5 text-[11px] sm:text-[12px] font-semibold text-brand hover:bg-brand/10 hover:text-brand-dark transition-colors whitespace-nowrap"
            >
              All archives
              <IconArrowUpRight size={12} />
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* ── Uniform 3-column card grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
        {posts.map((p, i) => (
          <PostCard key={p.slug} post={p} index={i} />
        ))}
      </div>
    </section>
  )
}