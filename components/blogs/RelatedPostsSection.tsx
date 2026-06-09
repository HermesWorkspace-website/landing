import React from 'react'
import { RelatedPosts } from '@/components/blogs/Relatedposts'

interface RelatedPostsSectionProps {
  posts: any[]
  categoryName: string
}

export default function RelatedPostsSection({ posts, categoryName }: RelatedPostsSectionProps) {
  return <RelatedPosts posts={posts} categoryName={categoryName} />
}
