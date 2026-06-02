'use client'

import { useState } from 'react'

interface ShareBarProps {
  title: string
}

export function ShareBar({ title }: ShareBarProps) {
  const [copied, setCopied] = useState(false)

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href
    }
    return ''
  }

  const handleShare = (platform: 'x' | 'linkedin' | 'facebook' | 'mail' | 'copy') => {
    const url = getShareUrl()
    if (!url) return

    switch (platform) {
      case 'x':
        window.open(
          `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          '_blank',
          'noopener,noreferrer'
        )
        break
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          '_blank',
          'noopener,noreferrer'
        )
        break
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank',
          'noopener,noreferrer'
        )
        break
      case 'mail':
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        break
    }
  }

  return (
    <div className="share-bar-container">
      <span className="share-bar-label">SHARE THIS POST</span>
      <div className="share-bar-icons">
        <button
          onClick={() => handleShare('x')}
          className="share-bar-btn"
          title="Share on X / Twitter"
          aria-label="Share on X / Twitter"
        >
          <svg className="share-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </button>

        <button
          onClick={() => handleShare('linkedin')}
          className="share-bar-btn"
          title="Share on LinkedIn"
          aria-label="Share on LinkedIn"
        >
          <svg className="share-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </button>

        <button
          onClick={() => handleShare('facebook')}
          className="share-bar-btn"
          title="Share on Facebook"
          aria-label="Share on Facebook"
        >
          <svg className="share-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
          </svg>
        </button>

        <button
          onClick={() => handleShare('mail')}
          className="share-bar-btn"
          title="Share via Email"
          aria-label="Share via Email"
        >
          <svg className="share-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </button>

        <button
          onClick={() => handleShare('copy')}
          className={`share-bar-btn ${copied ? 'share-copied' : ''}`}
          title={copied ? 'Link Copied!' : 'Copy Link'}
          aria-label={copied ? 'Link Copied' : 'Copy Link'}
        >
          <svg className="share-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          {copied && <span className="copied-tooltip">Copied!</span>}
        </button>
      </div>
    </div>
  )
}
