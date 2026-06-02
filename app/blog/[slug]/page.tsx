import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Post } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

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

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) return {}
  const seo = post.seo
  return {
    title: seo?.metaTitle ?? post.title,
    description: seo?.metaDescription ?? post.excerpt,
    openGraph: {
      images: [
        {
          url:
            (seo?.ogImage as any)?.url ??
            (post.coverImage as any)?.sizes?.og?.url ??
            (post.coverImage as any)?.url,
        },
      ],
    },
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
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
          {author && (
            <div className="post-author">
              {author.avatar?.url && (
                <Image
                  src={author.avatar.url}
                  alt={author.name}
                  width={28}
                  height={28}
                  className="author-avatar"
                />
              )}
              <span className="author-name">{author.name}</span>
            </div>
          )}
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
          <RichText data={post.content} />
        </div>
      </article>
    </main>
  )
}