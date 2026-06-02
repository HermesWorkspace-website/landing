import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import type { Post, Tag } from '@/payload-types'

export const revalidate = 60

async function getPosts({
    tag,
    page = 1,
    limit = 7,
}: {
    tag?: string
    page?: number
    limit?: number
}) {
    const payload = await getPayload({ config })

    return payload.find({
        collection: 'posts',

        where: {
            status: {
                equals: 'published',
            },

            ...(tag
                ? {
                    'tags.slug': {
                        equals: tag,
                    },
                }
                : {}),
        },

        sort: '-publishedAt',

        depth: 2,

        limit,

        page,
    })
}

async function getTags() {
    const payload = await getPayload({ config })

    const { docs } = await payload.find({
        collection: 'tags',
        limit: 50,
        depth: 0,
    })

    return docs as Tag[]
}

export default async function BlogPage({
    searchParams,
}: {
    searchParams: Promise<{
        tag?: string
        page?: string
    }>
}) {
    const { tag, page } = await searchParams

    const currentPage = Number(page || 1)

    const [{ docs: posts, hasNextPage }, tags] = await Promise.all([
        getPosts({
            tag,
            page: currentPage,
            limit: 7,
        }),
        getTags(),
    ])

    const featured =
        !tag && currentPage === 1
            ? posts[0] ?? null
            : null

    const rest =
        !tag && currentPage === 1
            ? posts.slice(1)
            : posts

    const latest =
        !tag && currentPage === 1
            ? posts.slice(1, 6)
            : posts.slice(0, 5)

    return (
        <main className="bl-root">
            {/* ── Header ── */}
            <header className="bl-header">
                <p className="bl-eyebrow">HermesWorkspace</p>

                <h1 className="bl-title">Ideas & Infrastructure</h1>

                <p className="bl-desc"> Thoughts on education, operations, AI, and building tools for modern schools. </p>

                {/* ── Topic pills ── */}
                {tags.length > 0 && (
                    <nav className="bl-topics" aria-label="Topics">
                        <Link
                            href="/blog"
                            className={`bl-topic ${!tag ? 'bl-topic--active' : ''}`}
                        >
                            Latest
                        </Link>

                        {tags.map((t) => (
                            <Link
                                key={t.id}
                                href={`/blog?tag=${t.slug}`}
                                className={`bl-topic ${tag === t.slug ? 'bl-topic--active' : ''}`}
                            >
                                {t.name}
                            </Link>
                        ))}
                    </nav>
                )}
            </header>

            {/* ── Featured post ── */}
            {featured && !tag && <FeaturedPost post={featured} />}

            {/* ── Body ── */}
            <div className="bl-body">
                {/* ── Feed ── */}
                <section className="bl-feed">
                    {rest.length === 0 ? (
                        !featured ? (
                            <EmptyState tag={tag} />
                        ) : null
                    ) : (
                        <>
                            {rest.map((post, i) => (
                                <FeedCard
                                    key={post.id}
                                    post={post}
                                    index={i}
                                />
                            ))}

                            {hasNextPage && (
                                <div className="bl-pagination">
                                    <Link
                                        href={`/blog?${new URLSearchParams({
                                            ...(tag ? { tag } : {}),
                                            page: String(currentPage + 1),
                                        })}`}
                                        className="bl-load-more"
                                    >
                                        Load more articles
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </section>

                {/* ── Sidebar ── */}
                <aside className="bl-sidebar">
                    <p className="bl-sidebar-label">Latest</p>

                    <div className="bl-sidebar-list">
                        {latest.map((post) => (
                            <SidebarItem
                                key={post.id}
                                post={post}
                            />
                        ))}
                    </div>
                </aside>
            </div>
        </main>
    )
}

/* ───────────────────────────────────────────── */
/* ── Featured Hero ──────────────────────────── */
/* ───────────────────────────────────────────── */

function FeaturedPost({ post }: { post: Post }) {
    const cover =
        typeof post.coverImage === 'object'
            ? (post.coverImage as any)
            : null

    const author =
        typeof post.author === 'object'
            ? (post.author as any)
            : null

    const tags = Array.isArray(post.tags)
        ? post.tags.filter((t) => typeof t === 'object')
        : []

    return (
        <Link
            href={`/blog/${post.slug}`}
            className="bl-featured"
        >
            {cover && (
                <div className="bl-featured-img-wrap">
                    <Image
                        src={cover.sizes?.card?.url ?? cover.url}
                        alt={cover.alt ?? post.title}
                        fill
                        className="bl-featured-img"
                        priority
                    />
                </div>
            )}

            <div className="bl-featured-body">
                {tags.length > 0 && (
                    <div className="bl-featured-tags">
                        {(tags as any[]).map((t) => (
                            <span key={t.id} className="bl-tag">
                                {t.name}
                            </span>
                        ))}
                    </div>
                )}

                <h2 className="bl-featured-title">
                    {post.title}
                </h2>

                {post.excerpt && (
                    <p className="bl-featured-excerpt">
                        {post.excerpt}
                    </p>
                )}

                <div className="bl-featured-meta">
                    {author && (
                        <div className="bl-author-row">
                            {author.avatar?.url && (
                                <Image
                                    src={author.avatar.url}
                                    alt={author.name}
                                    width={22}
                                    height={22}
                                    className="bl-avatar"
                                />
                            )}

                            <span className="bl-author-name">
                                {author.name}
                            </span>
                        </div>
                    )}

                    {post.publishedAt && (
                        <time className="bl-date">
                            {new Date(post.publishedAt).toLocaleDateString(
                                'en-IN',
                                {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                }
                            )}
                        </time>
                    )}
                </div>
            </div>
        </Link>
    )
}

/* ───────────────────────────────────────────── */
/* ── Feed Card ──────────────────────────────── */
/* ───────────────────────────────────────────── */

function FeedCard({
    post,
    index,
}: {
    post: Post
    index: number
}) {
    const cover =
        typeof post.coverImage === 'object'
            ? (post.coverImage as any)
            : null

    const author =
        typeof post.author === 'object'
            ? (post.author as any)
            : null

    const tags = Array.isArray(post.tags)
        ? post.tags.filter((t) => typeof t === 'object')
        : []

    return (
        <Link
            href={`/blog/${post.slug}`}
            className="bl-card"
            style={{
                animationDelay: `${index * 40}ms`,
            }}
        >
            {cover && (
                <div className="bl-card-img-wrap">
                    <Image
                        src={cover.sizes?.card?.url ?? cover.url}
                        alt={cover.alt ?? post.title}
                        fill
                        className="bl-card-img"
                    />
                </div>
            )}

            <div className="bl-card-body">
                {tags.length > 0 && (
                    <div className="bl-card-tags">
                        {(tags as any[]).map((t) => (
                            <span key={t.id} className="bl-tag">
                                {t.name}
                            </span>
                        ))}
                    </div>
                )}

                <h3 className="bl-card-title">
                    {post.title}
                </h3>

                {post.excerpt && (
                    <p className="bl-card-excerpt">
                        {post.excerpt}
                    </p>
                )}

                <div className="bl-card-meta">
                    {author && (
                        <div className="bl-author-row">
                            {author.avatar?.url && (
                                <Image
                                    src={author.avatar.url}
                                    alt={author.name}
                                    width={18}
                                    height={18}
                                    className="bl-avatar"
                                />
                            )}

                            <span className="bl-author-name">
                                {author.name}
                            </span>
                        </div>
                    )}

                    {post.publishedAt && (
                        <time className="bl-date">
                            {new Date(post.publishedAt).toLocaleDateString(
                                'en-IN',
                                {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                }
                            )}
                        </time>
                    )}
                </div>
            </div>
        </Link>
    )
}

/* ───────────────────────────────────────────── */
/* ── Sidebar Item ───────────────────────────── */
/* ───────────────────────────────────────────── */

function SidebarItem({ post }: { post: Post }) {
    const cover =
        typeof post.coverImage === 'object'
            ? (post.coverImage as any)
            : null

    const author =
        typeof post.author === 'object'
            ? (post.author as any)
            : null

    const tags = Array.isArray(post.tags)
        ? post.tags.filter((t) => typeof t === 'object')
        : []

    return (
        <Link
            href={`/blog/${post.slug}`}
            className="bl-si"
        >
            {cover && (
                <div className="bl-si-img-wrap">
                    <Image
                        src={cover.sizes?.thumbnail?.url ?? cover.url}
                        alt={cover.alt ?? post.title}
                        fill
                        className="bl-si-img"
                    />
                </div>
            )}

            <div className="bl-si-body">
                {tags.length > 0 && (
                    <span className="bl-tag bl-tag--xs">
                        {(tags as any[])[0].name}
                    </span>
                )}

                <p className="bl-si-title">
                    {post.title}
                </p>

                <div className="bl-si-meta">
                    {author && (
                        <span className="bl-author-name">
                            {author.name}
                        </span>
                    )}

                    {post.publishedAt && (
                        <>
                            <span className="bl-sep">·</span>

                            <time className="bl-date">
                                {new Date(post.publishedAt).toLocaleDateString(
                                    'en-IN',
                                    {
                                        month: 'short',
                                        day: 'numeric',
                                    }
                                )}
                            </time>
                        </>
                    )}
                </div>
            </div>
        </Link>
    )
}

/* ───────────────────────────────────────────── */
/* ── Empty State ────────────────────────────── */
/* ───────────────────────────────────────────── */

function EmptyState({ tag }: { tag?: string }) {
    return (
        <div className="bl-empty">
            <span className="bl-empty-icon">✦</span>

            <p className="bl-empty-text">
                {tag
                    ? `No posts tagged "${tag}" yet.`
                    : 'No posts published yet.'}
            </p>

            {tag && (
                <Link
                    href="/blog"
                    className="bl-empty-link"
                >
                    View all posts →
                </Link>
            )}
        </div>
    )
}
