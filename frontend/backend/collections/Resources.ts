import type { Access, CollectionConfig } from 'payload'
import { cacheTags, revalidateCollection } from '@/lib/cache-tags'

const adminsOnly: Access = ({ req }) => req.user?.collection === 'admins'
const { afterChange, afterDelete } = revalidateCollection(cacheTags.resources)

export const Resources: CollectionConfig = {
  slug: 'resources',
  admin: {
    group: 'Không gian & tài nguyên',
    useAsTitle: 'name',
    defaultColumns: ['code', 'name', 'space', 'status'],
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
