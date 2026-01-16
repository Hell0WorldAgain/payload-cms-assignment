import { buildConfig } from 'payload'
import path from 'path'

import { mongooseAdapter } from '@payloadcms/db-mongodb'

import Pages from './collections/Pages'
import Media from './collections/Media'
import ContactSubmissions from './collections/ContactSubmissions'
import Users from './collections/Users'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'dev-secret',

  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/payload',
  }),

  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',

  admin: {
    user: Users.slug,
  },

  collections: [
    Pages,
    Media,
    ContactSubmissions,
    Users,
  ],

  localization: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    fallback: true,
  },

  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },

  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },

  cors: [
    'http://localhost:3000',
    process.env.PAYLOAD_PUBLIC_CORS_ORIGINS || '',
  ].filter(Boolean),

  csrf: [
    'http://localhost:3000',
    process.env.PAYLOAD_PUBLIC_CORS_ORIGINS || '',
  ].filter(Boolean),
})
