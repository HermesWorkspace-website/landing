import './blog.css'
import Link from 'next/link'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="blog-nav">
        <Link href="/" className="blog-nav-home">← hermesworkspace.com</Link>
      </nav>
      {children}
    </>
  )
}