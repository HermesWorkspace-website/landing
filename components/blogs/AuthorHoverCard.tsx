"use client"

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { IconBrandX, IconBrandLinkedin } from '@tabler/icons-react'

interface AuthorHoverCardProps {
  author: {
    name: string
    avatar?: { url?: string | null; alt?: string | null } | null
    bio?: string | null
    twitter?: string | null
    linkedin?: string | null
  }
  /** sidebar: always-expanded block for the desktop sidebar */
  sidebar?: boolean
}

export function AuthorHoverCard({ author, sidebar = false }: AuthorHoverCardProps) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const openTimer = useRef<NodeJS.Timeout | null>(null)
  const closeTimer = useRef<NodeJS.Timeout | null>(null)

  const open = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    openTimer.current = setTimeout(() => {
      setMounted(true)
      requestAnimationFrame(() => setVisible(true))
    }, 100)
  }

  const close = () => {
    if (openTimer.current) clearTimeout(openTimer.current)
    setVisible(false)
    closeTimer.current = setTimeout(() => setMounted(false), 200)
  }

  useEffect(() => () => {
    if (openTimer.current) clearTimeout(openTimer.current)
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  const avatarUrl = author.avatar?.url
  const initials = author.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()

  const twitterUrl = author.twitter
    ? author.twitter.startsWith('http') ? author.twitter : `https://x.com/${author.twitter.replace('@', '')}`
    : null

  const linkedinUrl = author.linkedin
    ? author.linkedin.startsWith('http') ? author.linkedin : `https://linkedin.com/in/${author.linkedin}`
    : null

  /* ── Sidebar variant ── */
  if (sidebar) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 bg-brand/10 flex items-center justify-center ring-2 ring-brand/20">
          {avatarUrl
            ? <Image src={avatarUrl} alt={author.name} width={44} height={44} className="w-full h-full object-cover" />
            : <span className="text-[14px] font-bold text-brand">{initials}</span>
          }
        </div>
        <div className="min-w-0">
          <p className="text-[14px] font-bold text-neutral-900 leading-tight">{author.name}</p>
          {author.bio && (
            <p className="text-[11.5px] text-neutral-400 leading-snug mt-0.5 line-clamp-1">{author.bio}</p>
          )}
          {(twitterUrl || linkedinUrl) && (
            <div className="flex items-center gap-1.5 mt-1.5">
              {twitterUrl && (
                <a href={twitterUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 h-6 px-2.5 rounded-full bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-600 text-[11px] font-semibold transition-colors">
                  <IconBrandX size={10} /> Twitter
                </a>
              )}
              {linkedinUrl && (
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 h-6 px-2.5 rounded-full bg-neutral-100 hover:bg-[#0077B5] hover:text-white text-neutral-600 text-[11px] font-semibold transition-colors">
                  <IconBrandLinkedin size={10} /> LinkedIn
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  /* ── Inline trigger + hover card ── */
  const toggle = () => { if (visible) { close() } else { open() } }

  return (
    <div className="relative" onMouseEnter={open} onMouseLeave={close}>
      {/* Trigger */}
      <button
        className="flex items-center gap-2 group"
        onFocus={open}
        onBlur={(e) => {
          if (e.relatedTarget && e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) return
          close()
        }}
        onClick={toggle}
        aria-haspopup="true"
        aria-expanded={visible}
        type="button"
      >
        {/* Small avatar */}
        <span className="w-6 h-6 rounded-full overflow-hidden shrink-0 bg-brand/10 flex items-center justify-center ring-1 ring-neutral-200">
          {avatarUrl
            ? <Image src={avatarUrl} alt={author.name} width={24} height={24} className="w-full h-full object-cover" />
            : <span className="text-[9px] font-bold text-brand">{initials}</span>
          }
        </span>
        <span className="text-[13px] font-medium text-neutral-700 group-hover:text-neutral-950 transition-colors underline-offset-2 group-hover:underline decoration-neutral-300">
          {author.name}
        </span>
      </button>

      {/* Floating card */}
      {mounted && (
        <div
          className={`
            absolute bottom-full left-0 mb-2.5 z-50 w-[260px]
            bg-white rounded-xl border border-neutral-150 shadow-xl shadow-neutral-900/[0.08]
            p-4 origin-bottom-left
            transition-all duration-200 ease-out
            ${visible
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-1 pointer-events-none'
            }
          `}
          role="tooltip"
          aria-label={`About ${author.name}`}
          onMouseEnter={open}
          onMouseLeave={close}
        >
          {/* Top row */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-brand/10 flex items-center justify-center ring-2 ring-neutral-100">
              {avatarUrl
                ? <Image src={avatarUrl} alt={author.name} width={48} height={48} className="w-full h-full object-cover" />
                : <span className="text-[15px] font-bold text-brand">{initials}</span>
              }
            </div>
            <div>
              <p className="text-[14px] font-semibold text-neutral-900 leading-tight">{author.name}</p>
              <p className="text-[11px] text-neutral-400 font-medium mt-0.5 uppercase tracking-wide">Author</p>
            </div>
          </div>

          {/* Bio */}
          {author.bio && (
            <p className="text-[12.5px] text-neutral-500 leading-relaxed mb-3 border-t border-neutral-100 pt-3">
              {author.bio}
            </p>
          )}

          {/* Socials */}
          {(twitterUrl || linkedinUrl) && (
            <div className="flex items-center gap-2 pt-1">
              {twitterUrl && (
                <button type="button"
                  onMouseDown={(e) => { e.preventDefault(); window.open(twitterUrl, '_blank', 'noopener,noreferrer') }}
                  className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-600 text-[11.5px] font-medium transition-colors">
                  <IconBrandX size={12} /> Twitter
                </button>
              )}
              {linkedinUrl && (
                <button type="button"
                  onMouseDown={(e) => { e.preventDefault(); window.open(linkedinUrl, '_blank', 'noopener,noreferrer') }}
                  className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-lg bg-neutral-100 hover:bg-[#0077B5] hover:text-white text-neutral-600 text-[11.5px] font-medium transition-colors">
                  <IconBrandLinkedin size={12} /> LinkedIn
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}