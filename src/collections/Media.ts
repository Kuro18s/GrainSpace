import type { Access, CollectionConfig } from 'payload'

import { createFolderField, createTagField } from 'payload'
import { cacheTags, revalidateCollection } from '@/lib/cache-tags'

const { afterChange, afterDelete } = revalidateCollection(cacheTags.spaces)
const portfolioCache = revalidateCollection(cacheTags.portfolios)

const manageOwnMedia: Access = ({ req }) => {
  if (
    req.user?.collection === 'admins' ||
    (req.user?.collection === 'users' && req.user.role === 'platform-admin')
  )
    return true
  if (req.user?.collection === 'users' && req.user.role === 'provider') {
    return { uploadedBy: { equals: req.user.id } }
  }
  return false
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: ({ req }) =>
      Boolean(
        req.user?.collection === 'admins' ||
        (req.user?.collection === 'users' &&
          ['platform-admin', 'provider'].includes(req.user.role ?? '')),
      ),
    delete: manageOwnMedia,
    read: () => true,
    update: manageOwnMedia,
  },
  hooks: {
    afterChange: [afterChange, portfolioCache.afterChange],
    afterDelete: [afterDelete, portfolioCache.afterDelete],
    beforeValidate: [
      ({ data, req }) =>
        req.user?.collection === 'users' && req.user.role === 'provider'
          ? { ...data, uploadedBy: req.user.id }
          : data,
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    { name: 'uploadedBy', type: 'relationship', relationTo: 'users', index: true },
    createFolderField({ relationTo: 'folders' }),
    createTagField({ relationTo: 'tags' }),
  ],
  upload: {
    mimeTypes: ['image/*'],
    modifyResponseHeaders: ({ headers }) => {
      headers.set('Cache-Control', 'public, max-age=31536000, immutable')
      return headers
    },
  },
}
