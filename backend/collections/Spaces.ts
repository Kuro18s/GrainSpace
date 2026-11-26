import type { Access, CollectionConfig } from 'payload'
import { cacheTags, revalidateCollection } from '@/lib/cache-tags'

const adminsOnly: Access = ({ req }) => req.user?.collection === 'admins'
const { afterChange, afterDelete } = revalidateCollection(cacheTags.spaces)

export const Spaces: CollectionConfig = {
  slug: 'spaces',
  admin: {
    group: 'Không gian & tài nguyên',
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'district', 'hourlyRate', 'status'],
  },
  access: {
    create: adminsOnly,
    delete: adminsOnly,
    read: () => true,
    update: adminsOnly,
  },
  hooks: { afterChange: [afterChange], afterDelete: [afterDelete] },
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
    { name: 'district', type: 'text', required: true },
    { name: 'address', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'area', type: 'number', required: true, min: 1 },
    { name: 'capacity', type: 'number', required: true, min: 1 },
    { name: 'hourlyRate', type: 'number', required: true, min: 0 },
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
    {
      name: 'amenities',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
  ],
}
