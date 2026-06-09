import type { CollectionConfig, CollectionBeforeOperationHook } from 'payload'

const makeFilenameUnique: CollectionBeforeOperationHook = ({ req, operation }) => {
  if ((operation === 'create' || operation === 'update') && req.file) {
    const originalName = req.file.name
    const dotIndex = originalName.lastIndexOf('.')
    const extension = dotIndex !== -1 ? originalName.slice(dotIndex) : ''
    const baseName = dotIndex !== -1 ? originalName.slice(0, dotIndex) : originalName
    
    // Generate a unique suffix using timestamp and a random number
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    req.file.name = `${baseName}-${uniqueSuffix}${extension}`
  }
}

export const Media: CollectionConfig = {
  slug: 'media',
  hooks: {
    beforeOperation: [makeFilenameUnique],
  },
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