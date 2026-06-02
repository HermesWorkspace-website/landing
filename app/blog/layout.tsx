import '@/app/(app)/globals.css'
import './blog.css'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ThemeToggle } from './ThemeToggle'
import Footer from '@/components/shared/Footer'

export const metadata: Metadata = {
    metadataBase: new URL('https://hermesworkspace.com'),
    title: {
        default: 'Blog | HermesWorkspace',
        template: '%s | HermesWorkspace Blog',
    },
    description: 'Visit the HermesWorkspace blog to learn more about our thoughts on building tools for modern schools, EdTech, AI, and school operations and future of work.',
    robots: { index: true, follow: true },
    openGraph: {
        title: 'Blog | HermesWorkspace',
        description: 'Visit the HermesWorkspace blog to learn more about our thoughts on building tools for modern schools, EdTech, AI, and school operations and future of work.',
        url: 'https://hermesworkspace.com/blog',
        siteName: 'HermesWorkspace',
        images: [
            {
                url: 'https://hermesworkspace.com/opengraph-image.jpg',
                width: 1200,
                height: 630,
                alt: 'HermesWorkspace Blog',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog | HermesWorkspace',
        description: 'Visit the HermesWorkspace blog to learn more about our thoughts on building tools for modern schools, EdTech, AI, and school operations and future of work.',
        images: ['https://hermesworkspace.com/opengraph-image.jpg'],
    },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en-IN" className="blog-page" suppressHydrationWarning>
            <head>
                {/*
          Inline script runs before first paint to read localStorage
          and apply the correct theme class — prevents FOUC entirely.
        */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var t=localStorage.getItem('blog-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-theme',(t==='dark'||(t===null&&d))?'dark':'light')}catch(e){}})()`,
                    }}
                />
            </head>
            <body suppressHydrationWarning>
                <nav className="blog-nav">
                    <Link href="/" className="blog-nav-home">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M19 12H5M12 5l-7 7 7 7" />
                        </svg>
                        hermesworkspace.com
                    </Link>
                    <ThemeToggle />
                </nav>
                {children}
                <Footer />
            </body>
        </html>
    )
}