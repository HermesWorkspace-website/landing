import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Post } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { AuthorHoverCard } from '../AuthorHoverCard'
import { ShareBar } from '../ShareBar'

export const revalidate = 60

async function getPost(slug: string) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    depth: 2,
    limit: 1,
  })
  return (docs[0] as Post) ?? null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  const seo = post.seo
  const ogImageUrl =
    (seo?.ogImage as any)?.url ??
    (post.coverImage as any)?.sizes?.og?.url ??
    (post.coverImage as any)?.url

  return {
    title: seo?.metaTitle ?? `${post.title} | Hermes Workspace`,
    description: seo?.metaDescription ?? post.excerpt,
    alternates: {
      canonical: `https://hermesworkspace.com/blog/${slug}`,
    },
    openGraph: {
      title: seo?.metaTitle ?? post.title,
      description: seo?.metaDescription ?? post.excerpt,
      url: `https://hermesworkspace.com/blog/${slug}`,
      siteName: 'HermesWorkspace',
      type: 'article',
      publishedTime: post.publishedAt ?? undefined,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.metaTitle ?? post.title,
      description: seo?.metaDescription ?? post.excerpt,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const cover = typeof post.coverImage === 'object' ? (post.coverImage as any) : null
  const author = typeof post.author === 'object' ? (post.author as any) : null
  const tags = Array.isArray(post.tags) ? post.tags.filter((t) => typeof t === 'object') : []

  return (
    <main className="post-root">
      <article className="post-article">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="post-tags-top">
            {(tags as any[]).map((tag) => (
              <span key={tag.id} className="post-tag">{tag.name}</span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="post-title">{post.title}</h1>

        {/* Meta */}
        <div className="post-byline">
          {author && <AuthorHoverCard author={author} />}
          <span className="byline-sep">·</span>
          <time className="post-date">
            {post.publishedAt &&
              new Date(post.publishedAt).toLocaleDateString('en-IN', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
          </time>
        </div>

        {/* Top Share Bar */}
        <ShareBar title={post.title} />

        <div className="post-divider" />

        {/* Cover image */}
        {cover && (
          <div className="post-cover">
            <Image
              src={cover.url}
              alt={cover.alt ?? post.title}
              width={1200}
              height={630}
              className="cover-image"
              priority
            />
          </div>
        )}

        {/* Body */}
        <div className="post-body notion-prose">
          <RichText data={post.content}  />
        </div>

        <div className="post-divider" />

        {/* Bottom Share Bar */}
        <ShareBar title={post.title} />
      </article>
    </main>
  )
}