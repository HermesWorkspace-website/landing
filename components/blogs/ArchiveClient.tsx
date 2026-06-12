'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { m, AnimatePresence } from 'framer-motion'
import {
  IconSearch, IconX, IconClock, IconFilter, IconCheck, IconCalendar, IconChevronLeft
} from '@tabler/icons-react'

// ─── Types ────────────────────────────────────────────────────────────────────
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
  "Educational Technology": {
    pill: 'bg-teal-500/10 text-teal-700',
    bg: 'bg-teal-500/10',
    text: 'text-teal-700',
    accent: '#14B8A6'
  },

  "School Communication": {
    pill: 'bg-brand/10 text-brand',
    bg: 'bg-brand/10',
    text: 'text-brand',
    accent: '#6063EE'
  },

  "Academic Management": {
    pill: 'bg-red-700/10 text-red-700',
    bg: 'bg-red-700/10',
    text: 'text-red-700',
    accent: '#DC2626'
  },

  "Resources": {
    pill: 'bg-green-500/10 text-green-600',
    bg: 'bg-green-500/10',
    text: 'text-green-600',
    accent: '#6063EE'
  },

  "Parent Engagement": {
    pill: 'bg-red-500/10 text-red-600',
    bg: 'bg-red-500/10',
    text: 'text-red-600',
    accent: '#EF4444'
  },

  "School Operations": {
    pill: 'bg-orange-500/10 text-orange-600',
    bg: 'bg-orange-500/10',
    text: 'text-orange-600',
    accent: '#EA580C'
  },

  General: {
    pill: 'bg-brand/10 text-brand',
    bg: 'bg-brand/10',
    text: 'text-brand',
    accent: '#6063EE'
  },
}

function getColors(cat: string) {
  return CATEGORY_COLORS[cat] ?? { pill: 'bg-neutral-100 text-neutral-600', bg: 'bg-neutral-100', text: 'text-neutral-600', accent: '#6063EE' }
}

// ─── Article Card (matches /blog PostCard design) ─────────────────────────────
function ArticleCard({ article }: { article: ArchiveArticle }) {
  const c = getColors(article.category)

  return (
    <Link href={`/blog/${article.slug}`} className="block group">
      <m.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="h-full flex flex-col"
      >
        {/* ── Cover image ── */}
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
            <div className="absolute inset-0 bg-gradient-to-br from-brand/15 to-brand/30 flex items-center justify-center aspect-video">
              <span className="text-brand/40 text-6xl font-bold font-display select-none">
                {article.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* ── Meta row: category pill · dash · date ── */}
        <div className="flex flex-wrap items-center gap-2 mt-4 mb-3">
          <span
            className={`inline-flex items-center px-2.5 py-[3px] rounded-full text-[11px] font-medium border border-current/20 ${c.bg} ${c.text}`}
          >
            {article.category}
          </span>
          <span className="hidden sm:inline-block h-px bg-brand-ink/20 flex-shrink-0" style={{ width: '1.5rem' }} />
          <span className="sm:hidden text-brand-ink/30 font-body text-[11px]">•</span>
          <span className="text-[12px] text-brand-ink/50 font-medium font-body">
            {article.date}
          </span>
        </div>

        {/* ── Title ── */}
        <h3 className="font-display text-[18px] font-bold leading-[1.3] tracking-[-0.02em] text-brand-ink mb-2 group-hover:underline group-hover:text-brand decoration-brand/60 decoration-[1.5px] underline-offset-[3px] transition-colors duration-200 line-clamp-3">
          {article.title}
        </h3>

        {/* ── Excerpt ── */}
        <p className="font-body text-[13.5px] text-brand-muted leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>
      </m.article>
    </Link>
  )
}

// ─── Search suggestion item ───────────────────────────────────────────────────
function SearchSuggestion({
  article,
  query,
  onPick,
}: {
  article: ArchiveArticle
  query: string
  onPick: () => void
}) {
  const { pill } = getColors(article.category)
  
  const hi = (text: string) => {
    const idx = text.toLowerCase().indexOf(query.toLowerCase())
    if (idx === -1 || !query) return <span>{text}</span>
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-brand/10 text-brand rounded px-0.5 not-italic">{text.slice(idx, idx + query.length)}</mark>
        {text.slice(idx + query.length)}
      </>
    )
  }

  return (
    <Link
      href={`/blog/${article.slug}`}
      onClick={onPick}
      className="flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-50 transition-colors"
    >
      {/* Tiny cover */}
      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-neutral-100">
        {article.cover
          ? <Image src={article.cover} alt={article.coverAlt} width={40} height={40} className="w-full h-full object-cover" />
          : <div className="w-full h-full bg-brand/10 flex items-center justify-center text-brand/35 font-bold text-sm font-display">{article.title.charAt(0)}</div>
        }
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium text-brand-ink truncate font-body">{hi(article.title)}</p>
        <p className="text-[11px] text-brand-muted truncate font-body">{hi(article.excerpt)}</p>
      </div>
      <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full shrink-0 ${pill}`}>
        {article.category}
      </span>
    </Link>
  )
}

// ─── Main client ──────────────────────────────────────────────────────────────
export function ArchiveClient({ articles = [] }: { articles?: ArchiveArticle[] }) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const [showFilter, setShowFilter] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Debounce
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 150)
    return () => clearTimeout(t)
  }, [query])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // All unique categories
  const allCategories = useMemo(
    () => Array.from(new Set(articles.map((a) => a.category))).sort(),
    [articles]
  )

  const toggleCategory = (cat: string) => {
    setActiveCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  // Search suggestions (max 8, across all categories)
  const suggestions = useMemo(() => {
    if (!debouncedQuery.trim()) return []
    const q = debouncedQuery.toLowerCase()
    return articles
      .filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.authorName.toLowerCase().includes(q)
      )
      .slice(0, 8)
  }, [debouncedQuery, articles])

  // Group suggestions by category for display dropdown
  const suggestionsByCategory = useMemo(() => {
    const map: Record<string, ArchiveArticle[]> = {}
    suggestions.forEach((a) => {
      if (!map[a.category]) map[a.category] = []
      map[a.category].push(a)
    })
    return map
  }, [suggestions])

  // The pinned featured post — always the first article, never affected by filters
 const featuredPosts = useMemo(
  () => articles.filter((a) => a.featured),
  [articles]
)

const regularPosts = useMemo(
  () => articles.filter((a) => !a.featured),
  [articles]
)

  // Filtered articles list — excludes the pinned post
  const filteredArticles = useMemo(() => {
   let base = [...regularPosts]
    
    // 1. Category filters
    if (activeCategories.length > 0) {
      base = base.filter((a) => activeCategories.includes(a.category))
    }

    // 2. Search query filtering
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase()
      base = base.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.authorName.toLowerCase().includes(q)
      )
    }

    return base
  }, [regularPosts, activeCategories, debouncedQuery])

  const isSearching = debouncedQuery.trim().length > 0 && searchFocused

  return (
    <div className="min-h-screen bg-brand-bg pt-16">
      {/* ── Hero header ── */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-6 pb-10">
          <Link href="/blog"
            className="font-body inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand-ink/40 hover:text-brand transition-colors group mb-6">
            <IconChevronLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Blog
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="font-body text-[11px] font-bold uppercase tracking-[0.18em] text-brand-ink/40 mb-2">
                Complete Archive
              </p>
              <h1
                className="font-extrabold text-[36px] md:text-[48px] leading-[1.05] tracking-[-0.03em] text-brand-ink font-display"
              >
                All Articles
              </h1>
              <p className="font-body mt-2 text-[14px] text-brand-muted">
                Showing {featuredPosts.length + filteredArticles.length} of {articles.length} total articles
              </p>
            </div>

            {/* Search + Filter UI */}
            <div className="flex items-center gap-3 md:w-[420px]">
              {/* Search input wrapper */}
              <div ref={searchRef} className="relative flex-1">
                <div className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border bg-white transition-all ${
                  searchFocused
                    ? 'border-brand ring-2 ring-brand/15 shadow-sm'
                    : 'border-neutral-200 shadow-sm'
                }`}>
                  <IconSearch size={15} className="text-neutral-400 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    placeholder="Search archive..."
                    className="font-body flex-1 text-[13.5px] text-brand-ink placeholder:text-brand-ink/30 bg-transparent outline-none min-w-0"
                  />
                  {query && (
                    <button type="button" onClick={() => { setQuery(''); setDebouncedQuery('') }}
                      className="text-brand-ink/40 hover:text-brand transition-colors">
                      <IconX size={14} />
                    </button>
                  )}
                </div>

                {/* Suggestions Dropdown */}
                <AnimatePresence>
                  {isSearching && (
                    <m.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-neutral-200 shadow-xl shadow-neutral-900/10 z-50 overflow-hidden max-h-[420px] overflow-y-auto"
                    >
                      {suggestions.length === 0 ? (
                        <div className="px-4 py-6 text-center text-[13px] text-neutral-400">
                          No matches for &ldquo;{debouncedQuery}&rdquo;
                        </div>
                      ) : (
                        <>
                          {Object.entries(suggestionsByCategory).map(([cat, items]) => {
                            const { pill } = getColors(cat)
                            return (
                              <div key={cat}>
                                <div className="px-4 pt-3 pb-1.5 flex items-center gap-2 bg-neutral-50/50 border-b border-neutral-100/60">
                                  <span className={`text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${pill}`}>
                                    {cat}
                                  </span>
                                  <span className="text-[11px] text-neutral-400">{items.length} result{items.length > 1 ? 's' : ''}</span>
                                </div>
                                {items.map((a) => (
                                  <SearchSuggestion
                                    key={a.id}
                                    article={a}
                                    query={debouncedQuery}
                                    onPick={() => { setSearchFocused(false); setQuery('') }}
                                  />
                                ))}
                              </div>
                            )
                          })}
                          <div className="border-t border-neutral-100 px-4 py-2.5 text-[11.5px] text-neutral-400 text-center bg-neutral-50/20">
                            {suggestions.length} suggestion{suggestions.length > 1 ? 's' : ''} found
                          </div>
                        </>
                      )}
                    </m.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Filter Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowFilter((p) => !p)}
                  className={`font-body flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-[13px] font-semibold transition-all shadow-sm ${
                    activeCategories.length > 0
                      ? 'border-brand/40 bg-brand/10 text-brand'
                      : 'border-neutral-200 bg-white text-brand-ink/60 hover:border-neutral-300'
                  }`}
                >
                  <IconFilter size={14} />
                  Filter
                  {activeCategories.length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center">
                      {activeCategories.length}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showFilter && (
                    <m.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 bg-white rounded-xl border border-neutral-200 shadow-xl shadow-neutral-900/10 z-50 p-3 w-[220px]"
                    >
                      <p className="text-[10.5px] font-bold uppercase tracking-widest text-neutral-400 px-1 mb-2">
                        Filter by Category
                      </p>
                      <div className="space-y-0.5">
                        {allCategories.map((cat) => {
                          const { pill } = getColors(cat)
                          const active = activeCategories.includes(cat)
                          const count = articles.filter((a) => a.category === cat).length
                          return (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => toggleCategory(cat)}
                              className={`font-body w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-[12.5px] transition-colors ${
                                active ? 'bg-brand/10 text-brand' : 'text-brand-ink/70 hover:bg-neutral-50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                                  active ? 'bg-brand border-brand' : 'border-neutral-300'
                                }`}>
                                  {active && <IconCheck size={10} className="text-white" />}
                                </span>
                                {cat}
                              </div>
                              <span className="text-[11px] text-brand-ink/40 font-medium">{count}</span>
                            </button>
                          )
                        })}
                      </div>
                      {activeCategories.length > 0 && (
                        <button
                          type="button"
                          onClick={() => { setActiveCategories([]); setShowFilter(false) }}
                          className="font-body w-full mt-2 pt-2 border-t border-neutral-100 text-[12px] text-brand-ink/40 hover:text-brand transition-colors text-center"
                        >
                          Clear all filters
                        </button>
                      )}
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Active filter tags row */}
          <AnimatePresence>
            {activeCategories.length > 0 && (
              <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 flex flex-wrap gap-2 overflow-hidden"
              >
                {activeCategories.map((cat) => {
                  const { pill } = getColors(cat)
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`font-body inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold ${pill}`}
                    >
                      {cat}
                      <IconX size={11} />
                    </button>
                  )
                })}
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ── Archive Grid ── */}
      <main className="max-w-6xl mx-auto px-6 md:px-10 py-12">

  {/* Featured Blogs Section */}
  {featuredPosts.length > 0 && (
    <section className="mb-20">
      <div className="mb-10">
        <p className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
          Featured Content
        </p>

        <h2 className="font-display text-4xl font-bold text-brand-ink mt-2">
          Featured Blogs
        </h2>

        <p className="mt-3 text-brand-muted">
          Our most important guides, insights and resources.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {featuredPosts.map((article, i) => (
          <m.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: i * 0.05,
            }}
          >
            <ArticleCard article={article} />
          </m.div>
        ))}
      </div>
    </section>
  )}

  {/* All Blogs Divider */}
  <div className="my-16 flex items-center gap-4">
    <div className="flex-1 h-px bg-neutral-200" />

    <span className="font-body text-[11px] uppercase tracking-[0.2em] text-brand-ink/40">
      All Blogs
    </span>

    <div className="flex-1 h-px bg-neutral-200" />
  </div>

  {/* All Blogs Heading */}
  <div className="mb-10">
    <h2 className="font-display text-4xl font-bold text-brand-ink">
      All Blogs
    </h2>

    <p className="mt-3 text-brand-muted">
      Showing {filteredArticles.length} articles
    </p>
  </div>

  {/* All Blogs Grid */}
  {filteredArticles.length === 0 ? (
    <div className="py-24 text-center text-neutral-400 text-[15px]">
      No articles match your search or filters.
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
      {filteredArticles.map((article, i) => (
        <m.div
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: Math.min(i * 0.05, 0.4),
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <ArticleCard article={article} />
        </m.div>
      ))}
    </div>
  )}

</main>
    </div>
  )
}

