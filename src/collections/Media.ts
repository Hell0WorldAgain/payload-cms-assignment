import type { CollectionConfig } from 'payload'
import path from 'path'

const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: path.resolve(__dirname, '../../media'), // Important: correct path
    mimeTypes: ['image/*'],
  },
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}

export default Media