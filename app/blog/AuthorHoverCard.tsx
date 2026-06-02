'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import {
  IconBrandX,
  IconBrandLinkedin,
} from "@tabler/icons-react"
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
                  <IconBrandX size={15} />
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ahc-social-btn"
                >
                  <IconBrandLinkedin size={15} />
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}