import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Authors } from './collections/Authors'
import { Tags } from './collections/Tags'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { NewsletterSubscribers } from './collections/NewsletterSubscribers'
import { imagekitAdapter } from './lib/imagekit-adapter'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
  },
  editor: lexicalEditor(),
  collections: [Users, Authors, Tags, Media, Posts, NewsletterSubscribers],
  secret: process.env.PAYLOAD_SECRET!,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI!,
      // Keep pool small for serverless/hosted Postgres (Neon, Supabase, etc.)
      // to avoid exhausting connection limits
      max: 2,
      // Discard idle connections after 20s — before the host drops them
      idleTimeoutMillis: 20_000,
      // Fail fast (10s) if no connection is available, instead of hanging
      connectionTimeoutMillis: 10_000,
    },
  }),
  // ── Sharp: enables server-side image resizing in the admin panel ──────────
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  upload: {
    limits: {
      fileSize: 10_000_000, // 10 MB
    },
  },
  // ── Cloud storage: all media uploads go to ImageKit ───────────────────────
  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: imagekitAdapter(),
          // Skip writing files to /public/media on disk
          disableLocalStorage: true,
          // URL used for public access — served via ImageKit CDN
          generateFileURL: ({ filename: fname }) => {
            const base = (process.env.IMAGEKIT_URL_ENDPOINT ?? '').replace(/\/$/, '')
            const fldr = process.env.IMAGEKIT_FOLDER ?? 'cms'
            return `${base}/${fldr}/${fname}`
          },
        },
      },
    }),
  ],
})