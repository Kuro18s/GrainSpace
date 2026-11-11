import type { Access, CollectionConfig, Where } from 'payload'
import { cacheTags, revalidateCollection } from '@/lib/cache-tags'

const isAdminOrPlatform = (user: unknown) =>
  Boolean(
    user &&
    typeof user === 'object' &&
    'collection' in user &&
    (user.collection === 'admins' ||
      (user.collection === 'users' && 'role' in user && user.role === 'platform-admin')),
  )

const createPortfolio: Access = ({ req }) =>
  isAdminOrPlatform(req.user) || (req.user?.collection === 'users' && req.user.role === 'provider')

const managePortfolio: Access = ({ req }) => {
  if (isAdminOrPlatform(req.user)) return true
  if (req.user?.collection === 'users' && req.user.role === 'provider') {
    return { provider: { equals: req.user.id } }
  }
  return false
}

const readPortfolio: Access = ({ req }) => {
  if (isAdminOrPlatform(req.user)) return true
  if (req.user?.collection === 'users' && req.user.role === 'provider') {
    return {
      or: [{ provider: { equals: req.user.id } }, { published: { equals: true } }],
    } as Where
  }
  return { published: { equals: true } } as Where
}

const { afterChange, afterDelete } = revalidateCollection(cacheTags.portfolios)

export const Portfolios: CollectionConfig = {
  slug: 'portfolios',
  admin: {
    group: 'Không gian & tài nguyên',
    useAsTitle: 'title',
    defaultColumns: ['title', 'provider', 'space', 'published', 'updatedAt'],
  },
  access: {
    create: createPortfolio,
    delete: managePortfolio,
    read: readPortfolio,
    update: managePortfolio,
  },
  hooks: {
    afterChange: [afterChange],
    afterDelete: [afterDelete],
    beforeValidate: [
      async ({ data, req }) => {
        if (req.user?.collection !== 'users' || req.user.role !== 'provider') return data
        const relationID = (value: unknown) =>
          value && typeof value === 'object' && 'id' in value ? value.id : value
        if (data?.space) {
          const space = await req.payload.findByID({
            collection: 'spaces',
            id: relationID(data.space) as string,
            depth: 0,
            overrideAccess: true,
          })
          if (String(relationID(space.provider) ?? '') !== String(req.user.id)) {
            throw new Error('Bộ sưu tập chỉ có thể gắn với không gian của bạn.')
          }
        }
        for (const imageRow of data?.images ?? []) {
          const mediaID = relationID(imageRow.image)
          if (!mediaID) continue
          const media = await req.payload.findByID({
            collection: 'media',
            id: mediaID as string,
            depth: 0,
            overrideAccess: true,
          })
          if (String(relationID(media.uploadedBy) ?? '') !== String(req.user.id)) {
            throw new Error('Portfolio chỉ có thể sử dụng ảnh do bạn tải lên.')
          }
        }
        return { ...data, provider: req.user.id }
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'provider',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
    },
    { name: 'space', type: 'relationship', relationTo: 'spaces' },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      maxRows: 24,
      required: true,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
    { name: 'published', type: 'checkbox', defaultValue: false, index: true },
  ],
  versions: false,
}
