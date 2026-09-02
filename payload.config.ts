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
import { DATABASE_URI } from './env'

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
      connectionString: DATABASE_URI!,
    },
    push: false,
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  upload: {
    limits: {
      fileSize: 10_000_000,
    },
  },
  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: imagekitAdapter(),
          disableLocalStorage: true,
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