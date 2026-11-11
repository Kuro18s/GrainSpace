import type { Access, CollectionConfig } from 'payload'
import { cacheTags, revalidateCollection } from '@/lib/cache-tags'

const isAdminOrPlatform = (user: unknown) =>
  Boolean(
    user &&
    typeof user === 'object' &&
    'collection' in user &&
    (user.collection === 'admins' ||
      (user.collection === 'users' && 'role' in user && user.role === 'platform-admin')),
  )
const createByProvider: Access = ({ req }) =>
  isAdminOrPlatform(req.user) || (req.user?.collection === 'users' && req.user.role === 'provider')
const manageOwn: Access = ({ req }) => {
  if (isAdminOrPlatform(req.user)) return true
  if (req.user?.collection === 'users' && req.user.role === 'provider') {
    return { provider: { equals: req.user.id } }
  }
  return false
}
const { afterChange, afterDelete } = revalidateCollection(cacheTags.spaces)

export const Spaces: CollectionConfig = {
  slug: 'spaces',
  admin: {
    group: 'Không gian & tài nguyên',
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'district', 'hourlyRate', 'status'],
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
      ({ data, req }) => {
        if (req.user?.collection === 'users' && req.user.role === 'provider') {
          return {
            ...data,
            provider: req.user.id,
            providerName: req.user.organization || req.user.name,
          }
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Phòng tối', value: 'darkroom' },
        { label: 'Studio', value: 'studio' },
        { label: 'Phòng tráng', value: 'processing-room' },
      ],
    },
    { name: 'providerName', type: 'text', required: true },
    { name: 'provider', type: 'relationship', relationTo: 'users', index: true },
    { name: 'district', type: 'text', required: true },
    { name: 'address', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'area', type: 'number', required: true, min: 1 },
    { name: 'capacity', type: 'number', required: true, min: 1 },
    { name: 'hourlyRate', type: 'number', required: true, min: 0 },
    {
      name: 'pricingModel',
      type: 'select',
      defaultValue: 'hourly',
      options: [
        { label: 'Theo giờ', value: 'hourly' },
        { label: 'Nửa ngày', value: 'half-day' },
        { label: 'Theo ngày', value: 'daily' },
        { label: 'Theo gói', value: 'package' },
      ],
    },
    { name: 'halfDayRate', type: 'number', min: 0 },
    { name: 'dailyRate', type: 'number', min: 0 },
    { name: 'style', type: 'text' },
    { name: 'lighting', type: 'textarea' },
    { name: 'ventilation', type: 'textarea' },
    { name: 'acoustics', type: 'textarea' },
    {
      name: 'operatingHours',
      type: 'array',
      fields: [
        {
          name: 'day',
          type: 'select',
          required: true,
          options: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        },
        { name: 'openTime', type: 'text' },
        { name: 'closeTime', type: 'text' },
        { name: 'closed', type: 'checkbox', defaultValue: false },
      ],
    },
    { name: 'policies', type: 'textarea' },
    { name: 'rating', type: 'number', min: 0, max: 5, defaultValue: 4.8 },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'available',
      required: true,
      options: [
        { label: 'Còn lịch', value: 'available' },
        { label: 'Đang sử dụng', value: 'occupied' },
        { label: 'Bảo trì', value: 'maintenance' },
      ],
    },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },
    {
      name: 'amenities',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
  ],
}
