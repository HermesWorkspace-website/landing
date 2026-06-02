import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/payload-types'

export const revalidate = 60

async function getPosts() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    depth: 2,
  })
  return docs as Post[]
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="blog-root">
      <header className="blog-header">
        <p className="blog-eyebrow">Hermes Workspace</p>
        <h1 className="blog-title">Writing</h1>
        <p className="blog-subtitle">
          Thoughts on education, collaboration, and building for India.
        </p>
      </header>

      <div className="blog-divider" />

      <section className="blog-list">
        {posts.map((post) => (
          <PostRow key={post.id} post={post} />
        ))}
      </section>
    </main>
  )
}

function PostRow({ post }: { post: Post }) {
  const cover = typeof post.coverImage === 'object' ? post.coverImage : null
  const author = typeof post.author === 'object' ? post.author : null
  const tags = Array.isArray(post.tags)
    ? post.tags.filter((t) => typeof t === 'object')
    : []

  return (
    <Link href={`/blog/${post.slug}`} className="post-row">
      <div className="post-row-meta">
        <time className="post-date">
          {post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : ''}
        </time>
        {tags.length > 0 && (
          <div className="post-tags">
            {(tags as any[]).map((tag) => (
              <span key={tag.id} className="post-tag">
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="post-row-content">
        <h2 className="post-row-title">{post.title}</h2>
        {post.excerpt && <p className="post-row-excerpt">{post.excerpt}</p>}
        {author && (
          <div className="post-row-author">
            {author.avatar && typeof author.avatar === 'object' && (
              <Image
                src={(author.avatar as any).url}
                alt={author.name}
                width={20}
                height={20}
                className="author-avatar-sm"
              />
            )}
            <span>{author.name}</span>
          </div>
        )}
      </div>

      {cover && (
        <div className="post-row-cover">
          <Image
            src={(cover as any).sizes?.card?.url ?? (cover as any).url}
            alt={(cover as any).alt ?? post.title}
            width={160}
            height={100}
            className="cover-img"
          />
        </div>
      )}
    </Link>
  )
}