'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface HeroSectionProps {
  totalPosts: number
  totalCategories: number
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const elRef = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = elRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          let current = 0
          const step = target / 60
          const id = setInterval(() => {
            current = Math.min(current + step, target)
            setVal(Math.floor(current))
            if (current >= target) clearInterval(id)
          }, 16)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={elRef}>{val.toLocaleString()}{suffix}</span>
}

export default function HeroSection({ totalPosts, totalCategories }: HeroSectionProps) {
  return (
    <section className="relative bg-white border-b border-slate-100">
      {/* Ambient glow — no overflow-hidden so badge never clips */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(96,99,238,0.07),transparent_60%)] pointer-events-none" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-16 pb-14 sm:px-8 sm:pt-20 sm:pb-16 md:pt-24 md:pb-20 lg:px-16 lg:pt-28 lg:pb-24 xl:pt-32 xl:pb-28">

        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-6 inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-[11.5px] font-semibold text-indigo-600 tracking-wide sm:text-xs sm:px-4 sm:py-2"
        >
          HermesWorkspace Journal
        </motion.span>

        {/* Headline + subtext + stats: two-column on lg+, single column below */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-20">

          {/* Left: headline + subtext */}
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-bold tracking-tight text-slate-900 leading-[1.15]
              text-[clamp(1.75rem,6vw,4.5rem)]">
              {[
                { text: 'Resources, insights, and', accent: false },
                { text: 'operational knowledge',    accent: true  },
                { text: 'for modern schools',       accent: false },
              ].map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className={`block ${line.accent ? 'text-indigo-600' : ''}`}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.12, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.65, ease: 'easeOut' }}
              className="mt-5 text-slate-500 leading-relaxed max-w-xl
                text-[13.5px] sm:text-[15px] lg:text-base xl:text-lg"
            >
              Practical frameworks, communication strategies, school operations
              guidance, and technology insights designed for educational leaders.
            </motion.p>
          </div>

          {/* Right / bottom: stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.65, ease: 'easeOut' }}
            className="flex items-start gap-8 border-t border-slate-100 pt-6
              sm:gap-12 sm:pt-8
              lg:border-t-0 lg:pt-0 lg:flex-col lg:items-start lg:gap-6 lg:shrink-0 lg:pb-1"
          >
            {[
              { label: 'Resources',  content: <AnimatedCounter target={totalPosts} suffix="+" /> },
              { label: 'Categories', content: <AnimatedCounter target={totalCategories} /> },
              { label: 'Updates',    content: 'Weekly' },
            ].map(({ label, content }) => (
              <div key={label}>
                <p className="font-bold tabular-nums text-slate-900 leading-none
                  text-[1.6rem] sm:text-3xl lg:text-[2rem] xl:text-4xl">
                  {content}
                </p>
                <p className="mt-1 text-[11px] text-slate-400 sm:text-xs">{label}</p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}