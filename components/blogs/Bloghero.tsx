'use client'

import { m } from 'framer-motion'

interface HeroSectionProps {
  totalPosts: number
  totalCategories: number
}

export default function HeroSection({ totalPosts, totalCategories }: HeroSectionProps) {
  return (
    <section className="relative bg-white border-b border-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(96,99,238,0.06),transparent_55%)] pointer-events-none" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-14 pb-8 sm:px-8 sm:pt-16 sm:pb-10 lg:px-16 lg:pt-20 lg:pb-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <m.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.45, ease: 'easeOut' }}
              className="font-display font-bold text-slate-900 tracking-tight text-2xl sm:text-3xl lg:text-4xl"
            >
              Resources & insights for{' '}
              <span className="text-indigo-600">modern schools</span>
            </m.h1>
            <m.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.4, ease: 'easeOut' }}
              className="mt-2 text-slate-400 text-sm max-w-md"
            >
              Practical frameworks, communication strategies, and technology
              insights for educational leaders.
            </m.p>
          </div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="flex items-center gap-8 shrink-0 border-t border-slate-100 pt-4 sm:border-t-0 sm:pt-0 sm:border-l sm:border-slate-100 sm:pl-8 lg:pl-12"
          >
            {[
              { value: `${totalPosts}+`, label: 'Resources' },
              { value: totalCategories,  label: 'Categories' },
              { value: 'Weekly',         label: 'Updates' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-bold text-slate-900 text-2xl sm:text-3xl leading-none tabular-nums">{value}</p>
                <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </m.div>

        </div>
      </div>
    </section>
  )
}