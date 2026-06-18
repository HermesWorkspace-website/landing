'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { m, AnimatePresence } from 'framer-motion'
import {
  IconSearch, IconX, IconFilter, IconCheck, IconChevronLeft
} from '@tabler/icons-react'
import { ArticleCard, getColors, type ArchiveArticle } from '@/components/blogs/ArticleCard'

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

  return (
    <Link
      href={`/blog/${article.slug}`}
      onClick={onPick}
      className="flex items-center gap-2 px-3 py-2.5 hover:bg-neutral-50 transition-colors"
    >
      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-neutral-100">
        {article.cover
          ? <Image src={article.cover} alt={article.coverAlt} width={40} height={40} className="w-full h-full object-cover" />
          : <div className="w-full h-full bg-brand/10 flex items-center justify-center text-brand/35 font-bold text-sm font-display">{article.title.charAt(0)}</div>
        }
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium text-brand-ink line-clamp-2 font-body">{article.title}</p>
      </div>
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

  // Filtered articles — operates across all articles
  const filteredArticles = useMemo(() => {
    let base = [...articles]

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
  }, [articles, activeCategories, debouncedQuery])

  const isSearching = debouncedQuery.trim().length > 0 && searchFocused

  return (
    <div className="min-h-screen bg-brand-bg pt-16">
      {/* ── Hero header ── */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-4 pb-6">
          <Link href="/blog"
            className="font-body inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand-ink/40 hover:text-brand transition-colors group mb-4">
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
                Browse {articles.length} articles
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
                  <IconSearch size={15} className="text-neutral-500 shrink-0" />
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
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-neutral-200 shadow-xl shadow-neutral-900/10 z-50 flex flex-col max-h-[420px] overflow-hidden"
                    >
                      {suggestions.length === 0 ? (
                        <div className="px-4 py-6 text-center text-[13px] text-neutral-500">
                          No matches for &ldquo;{debouncedQuery}&rdquo;
                        </div>
                      ) : (
                        <>
                          <div className="flex-1 overflow-y-auto min-h-0">
                            {Object.entries(suggestionsByCategory).map(([cat, items]) => {
                              const { pill } = getColors(cat)
                              return (
                                <div key={cat}>
                                  <div className="px-4 pt-3 pb-1.5 flex items-center gap-2 bg-neutral-50/50 border-b border-neutral-100/60">
                                    <span className={`text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${pill}`}>
                                      {cat}
                                    </span>
                                    <span className="text-[11px] text-neutral-500">{items.length} result{items.length > 1 ? 's' : ''}</span>
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
                          </div>
                          <div className="shrink-0 border-t border-neutral-100 px-4 py-2.5 text-[11.5px] text-neutral-500 text-center bg-neutral-50/20">
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
                  <span className="hidden sm:inline">Filter</span>
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
                      <p className="text-[10.5px] font-bold uppercase tracking-widest text-neutral-500 px-1 mb-2">
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
                className="mt-3 flex flex-wrap gap-2 overflow-hidden"
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
      <main className="max-w-6xl mx-auto px-6 md:px-10 pt-6 pb-12">

        {filteredArticles.length === 0 ? (
          <div className="py-24 text-center text-neutral-500 text-[15px]">
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
