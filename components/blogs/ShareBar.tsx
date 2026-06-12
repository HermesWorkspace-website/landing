"use client"

import { useState, useEffect } from 'react';
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
const WhatsAppIcon = () => (
  <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)
const TelegramIcon = () => (
  <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)
const ShareIcon = () => (
  <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
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

const SHARE_BUTTONS: { id: 'x' | 'linkedin' | 'facebook' | 'whatsapp' | 'telegram' | 'mail'; label: string; Icon: () => React.ReactElement }[] = [
  { id: 'x',        label: 'X / Twitter',  Icon: XIcon         },
  { id: 'linkedin', label: 'LinkedIn',      Icon: LinkedInIcon  },
  { id: 'whatsapp', label: 'WhatsApp',      Icon: WhatsAppIcon  },
  { id: 'telegram', label: 'Telegram',      Icon: TelegramIcon  },
  { id: 'facebook', label: 'Facebook',      Icon: FacebookIcon  },
  { id: 'mail',     label: 'Email',         Icon: MailIcon      },
]

const getUrl = () => (typeof window !== 'undefined' ? window.location.href : '')

export function ShareBar({ title, compact = false, vertical = false }: ShareBarProps) {
  const [copied, setCopied] = useState(false)
  const [supportsNativeShare, setSupportsNativeShare] = useState(false)

  useEffect(() => {
    setSupportsNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function')
  }, [])

  const share = (platform: 'x' | 'linkedin' | 'facebook' | 'whatsapp' | 'telegram' | 'mail' | 'copy' | 'native') => {
    const url = getUrl()
    if (!url) return
    switch (platform) {
      case 'native': {
        if (typeof navigator !== 'undefined' && navigator.share) {
          navigator.share({ title, text: title, url }).catch(() => {})
        }
        break
      }
      case 'x':
        window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer')
        break
      case 'linkedin':
        // LinkedIn Share API supports only the `url` parameter (no title/description).
        // This is a LinkedIn platform limitation since their 2022 API migration.
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer')
        break
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank', 'noopener,noreferrer')
        break
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank', 'noopener,noreferrer')
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer')
        break
      case 'mail':
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
        break
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }).catch(() => {
          // Fallback for insecure contexts
          const ta = document.createElement('textarea')
          ta.value = url
          ta.style.position = 'fixed'
          ta.style.opacity = '0'
          document.body.appendChild(ta)
          ta.select()
          document.execCommand('copy')
          document.body.removeChild(ta)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
        break
    }
  }

  /* ── Compact: icon-only row for topbar ── */
  if (compact) {
    return (
      <div className="flex items-center gap-1">
        {supportsNativeShare && (
          <button
            type="button"
            onClick={() => share('native')}
            aria-label="Share"
            className="w-7 h-7 rounded-md flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          >
            <ShareIcon />
          </button>
        )}
        {SHARE_BUTTONS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => share(id)}
            aria-label={`Share on ${label}`}
            className="w-7 h-7 rounded-md flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          >
            <Icon />
          </button>
        ))}
        <button
          type="button"
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
        {supportsNativeShare && (
          <button
            type="button"
            onClick={() => share('native')}
            aria-label="Share"
            className="flex items-center gap-2.5 h-8 px-2.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors text-[12px] font-medium w-full text-left"
          >
            <ShareIcon />
            Share
          </button>
        )}
        {SHARE_BUTTONS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => share(id)}
            aria-label={`Share on ${label}`}
            className="flex items-center gap-2.5 h-8 px-2.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors text-[12px] font-medium w-full text-left"
          >
            <Icon />
            {label}
          </button>
        ))}
        <button
          type="button"
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
        {supportsNativeShare && (
          <button
            type="button"
            onClick={() => share('native')}
            title="Share"
            aria-label="Share"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors border border-transparent hover:border-neutral-200"
          >
            <ShareIcon />
          </button>
        )}
        {SHARE_BUTTONS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
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
            type="button"
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