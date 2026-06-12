'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { m, useInView, AnimatePresence } from 'framer-motion'
import { IconClock, IconArrowUpRight, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import type { Article } from '@/components/blogs/types'

interface FeaturedPostProps {
  /** Pass ALL articles (unfiltered). Up to 6 will be shown in the carousel. */
  posts: Article[]
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

const AUTOPLAY_INTERVAL = 5000 // ms

const variants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
}

export function FeaturedPost({ posts }: FeaturedPostProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  // Take up to 6 posts for the carousel
  const slides = posts.slice(0, 6)
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const goTo = useCallback((idx: number, dir: 1 | -1 = 1) => {
    setDirection(dir)
    setActive(idx)
  }, [])

  const prev = useCallback(() => {
    goTo((active - 1 + slides.length) % slides.length, -1)
  }, [active, slides.length, goTo])

  const next = useCallback(() => {
    goTo((active + 1) % slides.length, 1)
  }, [active, slides.length, goTo])

  // Auto-play
  useEffect(() => {
    if (slides.length <= 1) return
    timerRef.current = setInterval(() => {
      setDirection(1)
      setActive((a) => (a + 1) % slides.length)
    }, AUTOPLAY_INTERVAL)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [slides.length])

  // Pause on hover
  const pause = () => { if (timerRef.current) clearInterval(timerRef.current) }
  const resume = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setDirection(1)
      setActive((a) => (a + 1) % slides.length)
    }, AUTOPLAY_INTERVAL)
  }

  if (!slides.length) return null

  const post = slides[active]
  const c = CATEGORY_COLORS[post.category] ?? DEFAULT_COLOR

  return (
    <section
      id="featured-post"
      className="px-4 md:px-8 xl:px-16 pt-2 pb-0 scroll-mt-24 md:scroll-mt-28"
    >
      <m.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        {/* ── Slide ── */}
        <div className="overflow-hidden rounded-2xl">
          <AnimatePresence custom={direction} mode="wait">
            <m.div
              key={post.slug}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-14 items-center">

                  {/* ── Image ── */}
                  <div className="relative w-full aspect-video md:aspect-auto md:min-h-[340px] lg:min-h-[380px] rounded-2xl overflow-hidden bg-brand-ink/[0.04]">
                    {post.cover ? (
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
                        priority={active === 0}
                        loading={active === 0 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand/10 to-brand/20 flex items-center justify-center">
                        <span className="text-brand/30 text-6xl font-bold font-display select-none">
                          {post.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ── Content ── */}
                  <div className="flex flex-col justify-center py-2 md:py-4">
                    {/* Category + dash + date */}
                    <div className="flex items-center gap-2 mb-5">
                      <span className={`inline-flex items-center px-2.5 py-[3px] rounded-full text-[11px] font-medium border border-current/20 ${c.bg} ${c.text}`}>
                        {post.category}
                      </span>
                      <span className="h-px bg-brand-ink/20 flex-shrink-0" style={{ width: '2.5rem' }} />
                      <span className="text-[12px] text-brand-ink/50 font-medium font-body">
                        {post.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-bold leading-[1.15] tracking-[-0.03em] text-brand-ink group-hover:text-brand transition-colors duration-300 mb-4">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="font-body text-[15px] leading-[1.75] text-brand-muted line-clamp-3 max-w-[520px] mb-6">
                      {post.excerpt}
                    </p>

                    {/* Author + read time + arrow */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2.5 text-[12px] text-brand-ink/40 font-body">
                        {post.author.avatar && (
                          <div className="relative w-6 h-6 rounded-full overflow-hidden ring-2 ring-brand/10 shrink-0">
                            <Image src={post.author.avatar} alt={post.author.name} fill sizes="24px" className="object-cover" />
                          </div>
                        )}
                        <span className="font-medium text-brand-ink/60">{post.author.name}</span>
                        <span className="w-1 h-1 rounded-full bg-brand-ink/20" />
                        <span className="flex items-center gap-1">
                          <IconClock size={11} /> {post.readTime} min read
                        </span>
                      </div>

                      <m.div
                        whileHover={{ scale: 1.1, rotate: 8 }}
                        className="w-9 h-9 rounded-full bg-brand-ink/[0.05] group-hover:bg-brand flex items-center justify-center transition-colors duration-300"
                      >
                        <IconArrowUpRight size={16} className="text-brand-ink/40 group-hover:text-white transition-colors duration-300" />
                      </m.div>
                    </div>
                  </div>
                </div>
              </Link>
            </m.div>
          </AnimatePresence>
        </div>

        {/* ── Controls row: prev / dots / next ── */}
        {slides.length > 1 && (
          <div className="flex items-center justify-between mt-6 px-1">
            {/* Prev */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous post"
              className="w-8 h-8 rounded-full border border-brand-ink/10 bg-white hover:border-brand/40 hover:bg-brand/5 flex items-center justify-center text-brand-ink/40 hover:text-brand transition-all duration-200"
            >
              <IconChevronLeft size={15} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {slides.map((slide, i) => (
                <button
                  key={slide.slug}
                  type="button"
                  onClick={() => goTo(i, i > active ? 1 : -1)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="relative h-[6px] rounded-full transition-all duration-300 focus:outline-none"
                  style={{ width: i === active ? 24 : 6, background: i === active ? 'var(--color-brand, #6063EE)' : 'rgba(0,0,0,0.12)' }}
                />
              ))}
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={next}
              aria-label="Next post"
              className="w-8 h-8 rounded-full border border-brand-ink/10 bg-white hover:border-brand/40 hover:bg-brand/5 flex items-center justify-center text-brand-ink/40 hover:text-brand transition-all duration-200"
            >
              <IconChevronRight size={15} />
            </button>
          </div>
        )}
      </m.div>
    </section>
  )
}

// ── TopBlogs kept for backward compat ────────────────────────────────────────
function TopBlogs({ posts }: { posts: Article[] }) {
  if (!posts.length) return null
  return <FeaturedPost posts={posts} />
}

const PILL_COLORS: Record<string, { bg: string; text: string }> = {
  Infrastructure:      { bg: 'bg-purple-500/10', text: 'text-purple-600'  },
  Technology:          { bg: 'bg-brand/10',       text: 'text-brand'       },
  Operations:          { bg: 'bg-amber-500/10',   text: 'text-amber-600'   },
  Communication:       { bg: 'bg-green-500/10',   text: 'text-green-600'   },
  'Parent Engagement': { bg: 'bg-red-500/10',     text: 'text-red-600'     },
  'Product Updates':   { bg: 'bg-orange-500/10',  text: 'text-orange-600'  },
}

// CategoryPill utility
function CategoryPill({ category }: { category: string }) {
  const c = PILL_COLORS[category] ?? { bg: 'bg-brand/10', text: 'text-brand' }
  return (
    <span className={`inline-flex items-center px-2.5 py-[3px] rounded-full text-[11px] font-medium border border-current/20 ${c.bg} ${c.text}`}>
      {category}
    </span>
  )
}

// CompactCard kept for potential future use
function CompactCard({ post, index }: { post: Article; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 + index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <m.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="h-full flex gap-4 p-5 rounded-2xl bg-white border border-brand-ink/[0.06] hover:border-brand/20 hover:shadow-card-hover transition-all duration-300"
        >
          <div className="relative w-[100px] h-[100px] shrink-0 rounded-xl overflow-hidden bg-brand-ink/[0.03]">
            {post.cover ? (
              <Image src={post.cover} alt={post.title} fill sizes="100px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand/10 to-brand/20 flex items-center justify-center">
                <span className="text-brand/40 text-2xl font-bold font-display">{post.title.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between min-w-0 py-0.5">
            <div>
              <CategoryPill category={post.category} />
              <h3 className="mt-2 text-[14px] font-bold leading-[1.25] tracking-[-0.015em] text-brand-ink group-hover:text-brand transition-colors duration-200 line-clamp-2 font-display">
                {post.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 mt-2 text-[11px] text-brand-ink/40">
              <span className="truncate max-w-[90px]">{post.author.name}</span>
              <span>·</span>
              <span className="flex items-center gap-1 shrink-0">
                <IconClock size={10} /> {post.readTime}m
              </span>
            </div>
          </div>
        </m.div>
      </Link>
    </m.div>
  )
}