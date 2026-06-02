import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    // No local disk storage — files go straight to ImageKit
    disableLocalStorage: true,
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 432, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      // Stored by the ImageKit adapter for reliable file deletion
      name: 'imagekitFileId',
      type: 'text',
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
  ],
}