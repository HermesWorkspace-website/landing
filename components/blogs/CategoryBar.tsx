'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { m } from 'framer-motion'
import { dbg } from '@/lib/debug-log'

interface CategoryBarProps {
  categories: string[]
  id?: string
  requestId?: string
}

export default function CategoryBar({ categories, id, requestId }: CategoryBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [active, setActive] = useState<string>(() => searchParams.get('category') || 'All Posts')

  useEffect(() => {
    dbg('CategoryBar', 'mounted', { categoriesCount: categories.length, categoriesList: categories, active, id, requestId: requestId || 'client-gen' });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dbg('CategoryBar', 'categories prop changed', { categoriesCount: categories.length, categoriesList: categories, id });
  }, [categories, id]);

  useEffect(() => {
    dbg('CategoryBar', 'active state changed', { active, id });
  }, [active, id]);

  const handleClick = (cat: string) => {
    dbg('CategoryBar', 'handleClick', { category: cat, previousActive: active, id });
    setActive(cat)
    const params = new URLSearchParams(searchParams.toString())
    if (cat.toLowerCase() === 'all posts') params.delete('category')
    else params.set('category', cat)
    const query = params.toString()
    const targetUrl = query ? `/blog?${query}` : '/blog'
    dbg('CategoryBar', 'navigating', { targetUrl, id });
    router.push(targetUrl, { scroll: false })
    setTimeout(() => {
      document.getElementById('blog-posts')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  return (
    <section className="pt-8 pb-2 sm:pt-10 sm:pb-3">
      {/* Divider + label */}
      <div className="flex items-center gap-4 mb-5 px-4 md:px-8 xl:px-16 sm:mb-7">
        <div className="w-[3px] h-5 rounded-full bg-brand" />
        <span className="font-body text-[10.5px] font-bold uppercase tracking-[0.2em] text-brand-ink/40">
          Browse by topic
        </span>
        <div className="flex-1 h-[1px] bg-black/[0.06]" />
      </div>

      {/* Pill row — scrollable on mobile, wrapping on desktop */}
      {/* Container padding is adjusted from px-4 md:px-8 xl:px-16 to px-0 md:px-4 xl:px-12
          so that the first pill text (which has px-4 padding itself) aligns exactly with the header text/border above it. */}
      <div className="
        flex gap-2 overflow-x-auto px-0 md:px-4 xl:px-12
        scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]
        md:flex-wrap md:overflow-visible
      ">
        {categories.map((cat) => {
          const isActive = active.toLowerCase() === cat.toLowerCase()
          return (
            <m.button
              key={cat}
              type="button"
              onClick={() => handleClick(cat)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="font-body relative px-4 py-2 rounded-full text-[12.5px] font-semibold transition-colors duration-200 focus:outline-none shrink-0"
            >
              {/* Active background */}
              {isActive && (
                <m.span
                  layoutId={id ? `category-pill-${id}` : 'category-pill'}
                  className="absolute inset-0 rounded-full bg-brand"
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <span className={`relative z-10 transition-colors duration-200 ${isActive ? 'text-white' : 'text-brand-ink/55 hover:text-brand-ink'}`}>
                {cat}
              </span>
            </m.button>
          )
        })}
      </div>
    </section>
  )
}