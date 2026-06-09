// app/(app)/(main)/blog/page.tsx
// blogs.tsx already handles mobile vs desktop rendering internally,
// so this page just passes searchParams through.

import Blogs from '@/components/blogs/blogs';

export const dynamic = 'force-dynamic';

type BlogSearchParams = {
  category?: string;
  search?: string;
  tag?: string;
};

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<BlogSearchParams>;
}) {
  return <Blogs searchParams={searchParams} />;
}