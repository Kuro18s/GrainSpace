import type { Access, CollectionConfig } from 'payload'
import { cacheTags, revalidateCollection } from '@/lib/cache-tags'

const createByProvider: Access = ({ req }) =>
  req.user?.collection === 'admins' ||
  (req.user?.collection === 'users' &&
    (req.user.role === 'provider' || req.user.role === 'platform-admin'))
const manageOwn: Access = ({ req }) => {
  if (
    req.user?.collection === 'admins' ||
    (req.user?.collection === 'users' && req.user.role === 'platform-admin')
  )
    return true
  if (req.user?.collection === 'users' && req.user.role === 'provider')
    return { provider: { equals: req.user.id } }
  return false
}
const { afterChange, afterDelete } = revalidateCollection(cacheTags.servicePackages)

export const ServicePackages: CollectionConfig = {
  slug: 'service-packages',
  admin: {
    group: 'Dịch vụ & giá',
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'space', 'basePrice', 'active'],
  },
  access: { create: createByProvider, delete: manageOwn, read: () => true, update: manageOwn },
  hooks: {
    afterChange: [afterChange],
    afterDelete: [afterDelete],
    beforeValidate: [
      async ({ data, req }) => {
        if (req.user?.collection !== 'users' || req.user.role !== 'provider') return data
        const relationID = (value: unknown) =>
          value && typeof value === 'object' && 'id' in value ? value.id : value
        const spaceID = relationID(data?.space)
        if (spaceID) {
          const space = await req.payload.findByID({
            collection: 'spaces',
            id: spaceID as string,
            depth: 0,
            overrideAccess: true,
          })
          if (String(relationID(space.provider) ?? '') !== String(req.user.id)) {
            throw new Error('Gói dịch vụ chỉ có thể dùng không gian của bạn.')
          }
        }
        for (const resourceValue of data?.resources ?? []) {
          const resource = await req.payload.findByID({
            collection: 'resources',
            id: relationID(resourceValue) as string,
            depth: 0,
            overrideAccess: true,
          })
          if (String(relationID(resource.provider) ?? '') !== String(req.user.id)) {
            throw new Error('Gói dịch vụ chỉ có thể dùng tài nguyên của bạn.')
          }
        }
        if (data?.instructor) {
          const instructor = await req.payload.findByID({
            collection: 'users',
            id: relationID(data.instructor) as string,
            depth: 0,
            overrideAccess: true,
          })
          if (instructor.role !== 'expert')
            throw new Error('Giảng viên được chọn phải có vai trò chuyên gia.')
        }
        return { ...data, provider: req.user.id }
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'provider', type: 'relationship', relationTo: 'users', required: true, index: true },
    { name: 'space', type: 'relationship', relationTo: 'spaces', required: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Chân dung', value: 'portrait' },
        { label: 'Sản phẩm', value: 'product' },
        { label: 'Tráng phim', value: 'film-processing' },
        { label: 'In ảnh', value: 'printing' },
        { label: 'Workshop', value: 'workshop' },
        { label: 'Tùy chỉnh', value: 'custom' },
      ],
    },
    { name: 'description', type: 'textarea', required: true },
    { name: 'resources', type: 'relationship', relationTo: 'resources', hasMany: true },
    { name: 'instructor', type: 'relationship', relationTo: 'users' },
    {
      name: 'consumables',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'quantity', type: 'number', required: true, min: 1 },
      ],
    },
    { name: 'durationHours', type: 'number', required: true, min: 1 },
    { name: 'basePrice', type: 'number', required: true, min: 0 },
    { name: 'active', type: 'checkbox', defaultValue: true },
  ],
  versions: false,
}
