"use client"

import { useState } from 'react';
import React from 'react';

interface ShareBarProps {
  title: string
  /** compact: icon-only row, for topbar */
  compact?: boolean
  /** vertical: stacked list, for sidebar */
  vertical?: boolean
}

const XIcon = () => (
  <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)
const LinkedInIcon = () => (
  <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
)
const FacebookIcon = () => (
  <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
  </svg>
)
const MailIcon = () => (
  <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
)
const CopyIcon = () => (
  <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
)
const CheckIcon = () => (
  <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

export function ShareBar({ title, compact = false, vertical = false }: ShareBarProps) {
  const [copied, setCopied] = useState(false)

  const getUrl = () => (typeof window !== 'undefined' ? window.location.href : '')

  const share = (platform: 'x' | 'linkedin' | 'facebook' | 'mail' | 'copy') => {
    const url = getUrl()
    if (!url) return
    switch (platform) {
      case 'x':
        window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer')
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer')
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

  const buttons: { id: 'x' | 'linkedin' | 'facebook' | 'mail'; label: string; Icon: () => React.ReactElement }[] = [
    { id: 'x',        label: 'X / Twitter',  Icon: XIcon        },
    { id: 'linkedin', label: 'LinkedIn',      Icon: LinkedInIcon },
    { id: 'facebook', label: 'Facebook',      Icon: FacebookIcon },
    { id: 'mail',     label: 'Email',         Icon: MailIcon     },
  ]

  /* ── Compact: icon-only row for topbar ── */
  if (compact) {
    return (
      <div className="flex items-center gap-1">
        {buttons.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => share(id)}
            aria-label={`Share on ${label}`}
            className="w-7 h-7 rounded-md flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          >
            <Icon />
          </button>
        ))}
        <button
          onClick={() => share('copy')}
          aria-label={copied ? 'Copied' : 'Copy link'}
          className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
            copied
              ? 'text-emerald-600 bg-emerald-50'
              : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100'
          }`}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
    )
  }

  /* ── Vertical: stacked list for sidebar ── */
  if (vertical) {
    return (
      <div className="flex flex-col gap-1">
        {buttons.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => share(id)}
            aria-label={`Share on ${label}`}
            className="flex items-center gap-2.5 h-8 px-2.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors text-[12px] font-medium w-full text-left"
          >
            <Icon />
            {label}
          </button>
        ))}
        <button
          onClick={() => share('copy')}
          aria-label={copied ? 'Copied' : 'Copy link'}
          className={`flex items-center gap-2.5 h-8 px-2.5 rounded-lg transition-colors text-[12px] font-medium w-full text-left ${
            copied
              ? 'text-emerald-600 bg-emerald-50'
              : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
          }`}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Copied!' : 'Copy link'}
        </button>
      </div>
    )
  }

  /* ── Default inline row ── */
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mr-1">Share</span>
      <div className="flex items-center gap-1">
        {buttons.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => share(id)}
            title={`Share on ${label}`}
            aria-label={`Share on ${label}`}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors border border-transparent hover:border-neutral-200"
          >
            <Icon />
          </button>
        ))}
        <div className="relative">
          <button
            onClick={() => share('copy')}
            title={copied ? 'Copied!' : 'Copy link'}
            aria-label={copied ? 'Copied' : 'Copy link'}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors border ${
              copied
                ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
                : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 border-transparent hover:border-neutral-200'
            }`}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
          {copied && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[11px] font-medium px-2 py-1 rounded-md whitespace-nowrap pointer-events-none">
              Copied!
            </span>
          )}
        </div>
      </div>
    </div>
  )
}