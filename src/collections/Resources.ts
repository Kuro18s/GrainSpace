import type { Access, CollectionConfig } from 'payload'
import { cacheTags, revalidateCollection } from '@/lib/cache-tags'

const adminsOrPlatform = (user: unknown) =>
  Boolean(
    user &&
    typeof user === 'object' &&
    'collection' in user &&
    (user.collection === 'admins' ||
      (user.collection === 'users' && 'role' in user && user.role === 'platform-admin')),
  )
const createByProvider: Access = ({ req }) =>
  adminsOrPlatform(req.user) || (req.user?.collection === 'users' && req.user.role === 'provider')
const manageOwn: Access = ({ req }) => {
  if (adminsOrPlatform(req.user)) return true
  if (req.user?.collection === 'users' && req.user.role === 'provider') {
    return { provider: { equals: req.user.id } }
  }
  return false
}
const { afterChange, afterDelete } = revalidateCollection(cacheTags.resources)

export const Resources: CollectionConfig = {
  slug: 'resources',
  admin: {
    group: 'Không gian & tài nguyên',
    useAsTitle: 'name',
    defaultColumns: ['code', 'name', 'space', 'status'],
  },
  access: {
    create: createByProvider,
    delete: manageOwn,
    read: () => true,
    update: manageOwn,
  },
  hooks: {
    afterChange: [afterChange],
    afterDelete: [afterDelete],
    beforeValidate: [
      async ({ data, req }) => {
        if (req.user?.collection === 'users' && req.user.role === 'provider') {
          const spaceId =
            data?.space && typeof data.space === 'object' && 'id' in data.space
              ? data.space.id
              : data?.space
          if (spaceId) {
            const space = await req.payload.findByID({
              collection: 'spaces',
              id: spaceId,
              depth: 0,
              overrideAccess: true,
            })
            const providerId =
              typeof space.provider === 'object' ? space.provider?.id : space.provider
            if (String(providerId ?? '') !== String(req.user.id)) {
              throw new Error('Bạn chỉ có thể thêm tài nguyên vào không gian của mình.')
            }
          }
          return { ...data, provider: req.user.id }
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'code', type: 'text', required: true, unique: true, index: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Máy ảnh', value: 'camera' },
        { label: 'Ống kính', value: 'lens' },
        { label: 'Thiết bị phòng tối', value: 'darkroom-equipment' },
        { label: 'Vật tư', value: 'consumable' },
      ],
    },
    { name: 'space', type: 'relationship', relationTo: 'spaces', required: true },
    { name: 'provider', type: 'relationship', relationTo: 'users', index: true },
    { name: 'hourlyRate', type: 'number', min: 0, defaultValue: 0 },
    { name: 'description', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'available',
      options: [
        { label: 'Khả dụng', value: 'available' },
        { label: 'Đang sử dụng', value: 'in-use' },
        { label: 'Bảo trì', value: 'maintenance' },
      ],
    },
    { name: 'usageCount', type: 'number', defaultValue: 0, min: 0 },
  ],
}
