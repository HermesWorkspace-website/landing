'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface AuthorHoverCardProps {
  author: {
    name: string
    avatar?: { url?: string | null; alt?: string | null } | null
    bio?: string | null
    twitter?: string | null
    linkedin?: string | null
  }
}

export function AuthorHoverCard({ author }: AuthorHoverCardProps) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const openTimer = useRef<NodeJS.Timeout | null>(null)
  const closeTimer = useRef<NodeJS.Timeout | null>(null)

  const open = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    openTimer.current = setTimeout(() => {
      setMounted(true)
      requestAnimationFrame(() => setVisible(true))
    }, 120)
  }

  const close = () => {
    if (openTimer.current) clearTimeout(openTimer.current)
    setVisible(false)
    closeTimer.current = setTimeout(() => setMounted(false), 220)
  }

  useEffect(() => () => {
    if (openTimer.current) clearTimeout(openTimer.current)
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  const avatarUrl = author.avatar?.url
  const initials = author.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const twitterUrl = author.twitter
    ? author.twitter.startsWith('http')
      ? author.twitter
      : `https://x.com/${author.twitter.replace('@', '')}`
    : null

  const linkedinUrl = author.linkedin
    ? author.linkedin.startsWith('http')
      ? author.linkedin
      : `https://linkedin.com/in/${author.linkedin}`
    : null

  return (
    <div className="ahc-root" onMouseEnter={open} onMouseLeave={close}>
      {/* ── Trigger ── */}
      <button
        className="ahc-trigger"
        onFocus={open}
        onBlur={close}
        aria-haspopup="true"
        aria-expanded={visible}
        type="button"
      >
        <span className="ahc-sm-avatar">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={author.name}
              width={22}
              height={22}
              className="ahc-sm-img"
            />
          ) : (
            <span className="ahc-sm-initials">{initials}</span>
          )}
        </span>
        <span className="ahc-trigger-name">{author.name}</span>
      </button>

      {/* ── Floating card ── */}
      {mounted && (
        <div
          className={`ahc-card${visible ? ' ahc-card--in' : ' ahc-card--out'}`}
          role="tooltip"
          aria-label={`About ${author.name}`}
        >
          {/* Avatar + identity row */}
          <div className="ahc-card-top">
            <div className="ahc-lg-avatar">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={author.name}
                  width={56}
                  height={56}
                  className="ahc-lg-img"
                />
              ) : (
                <span className="ahc-lg-initials">{initials}</span>
              )}
            </div>

            <div className="ahc-card-identity">
              <span className="ahc-card-name">{author.name}</span>
              <span className="ahc-card-label">Author</span>
            </div>
          </div>

          {/* Bio */}
          {author.bio && (
            <p className="ahc-bio">{author.bio}</p>
          )}

          {/* Social links */}
          {(twitterUrl || linkedinUrl) && (
            <div className="ahc-socials">
              {twitterUrl && (
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ahc-social-btn"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  X / Twitter
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ahc-social-btn"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}