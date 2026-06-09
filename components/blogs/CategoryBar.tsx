'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface CategoryBarProps {
  categories: string[]
}

export default function CategoryBar({ categories }: CategoryBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const confirmedCategory = searchParams.get('category') || 'All Posts'
  const [active, setActive] = useState<string>(confirmedCategory)

  useEffect(() => {
    setActive(confirmedCategory)
  }, [confirmedCategory])

  const handleClick = (cat: string) => {
    setActive(cat)
    const params = new URLSearchParams(searchParams.toString())
    if (cat.toLowerCase() === 'all posts') params.delete('category')
    else params.set('category', cat)
    const query = params.toString()
    router.push(query ? `/blog?${query}` : '/blog', { scroll: false })
    setTimeout(() => {
      document.getElementById('blog-posts')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }
  return (
    <section className="py-8 sm:py-10">
      {/* Divider + label */}
      <div className="flex items-center gap-4 mb-5 px-4 md:px-8 xl:px-16 sm:mb-7">
        <div className="w-[3px] h-5 rounded-full bg-brand" />
        <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-brand-ink/40">
          Browse by topic
        </span>
        <div className="flex-1 h-[1px] bg-black/[0.06]" />
      </div>

      {/* Pill row — scrollable on mobile, wrapping on desktop */}
      <div className="
        flex gap-2 overflow-x-auto px-4 md:px-8 xl:px-16
        scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]
        md:flex-wrap md:overflow-visible
      ">
        {categories.map((cat) => {
          const isActive = active.toLowerCase() === cat.toLowerCase()
          return (
            <motion.button
              key={cat}
              type="button"
              onClick={() => handleClick(cat)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="font-body relative px-4 py-2 rounded-full text-[12.5px] font-semibold transition-colors duration-200 focus:outline-none shrink-0"
            >
              {/* Active background */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    layoutId="category-pill"
                    className="absolute inset-0 rounded-full bg-brand"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </AnimatePresence>
              <span className={`relative z-10 transition-colors duration-200 ${isActive ? 'text-white' : 'text-brand-ink/55 hover:text-brand-ink'}`}>
                {cat}
              </span>
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}