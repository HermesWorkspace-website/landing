'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { ArticleCard, type ArchiveArticle } from '@/components/blogs/ArticleCard'

interface FeaturedCarouselProps {
  posts: ArchiveArticle[]
}

export default function FeaturedCarousel({ posts }: FeaturedCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
    slidesToScroll: 1,
  })

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onReInit = () => setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onReInit)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onReInit)
    }
  }, [emblaApi, onSelect])

  if (!posts.length) return null

  const showControls = scrollSnaps.length > 1

  return (
    <section className="mb-4">
      <div className="mb-4">
        <h4 className="font-display text-3xl font-bold text-brand-ink mt-2">
          Featured Blogs
        </h4>
        <p className="mt-3 text-brand-muted text-[15px]">
          Our most important guides, insights and resources.
        </p>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {posts.map((post) => (
            <div
              key={post.id}
              className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-6"
            >
              <ArticleCard article={post} />
            </div>
          ))}
        </div>
      </div>

      {showControls && (
        <div className="flex items-center justify-center gap-8 mt-8">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            aria-label="Previous"
            className="w-9 h-9 rounded-full border border-brand-ink/10 bg-white flex items-center justify-center text-brand-ink/40 hover:border-brand/40 hover:text-brand transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <IconChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-2">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="relative h-[6px] rounded-full transition-all duration-300 focus:outline-none"
                style={{
                  width: i === selectedIndex ? 20 : 6,
                  background: i === selectedIndex ? '#6063EE' : 'rgba(0,0,0,0.12)',
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            aria-label="Next"
            className="w-9 h-9 rounded-full border border-brand-ink/10 bg-white flex items-center justify-center text-brand-ink/40 hover:border-brand/40 hover:text-brand transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <IconChevronRight size={16} />
          </button>
        </div>
      )}
    </section>
  )
}
