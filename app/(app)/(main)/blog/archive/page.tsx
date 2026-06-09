import React from 'react'
import { getCachedPosts } from '@/components/blogs/blogs'
import { ArchiveClient } from '@/components/blogs/ArchiveClient'
import type { ArchiveArticle } from '@/components/blogs/ArchiveClient'
import type { Tag } from '@/payload-types'

export const dynamic = 'force-dynamic'

export default async function ArchivePage() {
  const postsResult = await getCachedPosts({})
  
  const articles: ArchiveArticle[] = postsResult.docs.map((post) => {
    const category = typeof post.tags?.[0] === 'object'
      ? (post.tags[0] as Tag).name
      : 'General'

    const authorName = typeof post.author === 'object' && post.author !== null
      ? (post.author as { name?: string }).name ?? 'HermesWorkspace'
      : 'HermesWorkspace'

    const authorAvatar = typeof post.author === 'object' && post.author !== null
      ? (post.author as { avatar?: { url?: string } }).avatar?.url ?? ''
      : ''

    const cover = typeof post.coverImage === 'object' && post.coverImage !== null
      ? (post.coverImage as { url?: string }).url || ''
      : ''

    const coverAlt = typeof post.coverImage === 'object' && post.coverImage !== null
      ? (post.coverImage as { alt?: string }).alt || post.title || ''
      : post.title || ''

    return {
      id: String(post.id),
      slug: post.slug ?? '',
      title: post.title,
      excerpt: post.excerpt ?? '',
      category,
      readTime: (post as any).readTime ?? 5,
      date: post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : '',
      cover,
      coverAlt,
      authorName,
      authorAvatar,
      featured: post.featured ?? false,
    }
  })

  return <ArchiveClient articles={articles} />
}