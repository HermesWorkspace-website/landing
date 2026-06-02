import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Authors } from './collections/Authors'
import { Tags } from './collections/Tags'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { NewsletterSubscribers } from './collections/NewsletterSubscribers'


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
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  upload: {
    limits: {
      fileSize: 5_000_000, // 5MB
    },
  },
})