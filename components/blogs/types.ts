// components/blogs/types.ts
export interface BlogAuthor {
  name: string
  avatar: string
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  tags: BlogTag[]
  readTime: number
  date: string
  cover: string
  author: BlogAuthor
  featured?: boolean
}

export interface BlogTag {
  id: string | number
  name: string
  slug: string
}