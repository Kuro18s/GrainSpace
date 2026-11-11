import type { Access, CollectionConfig } from 'payload'

const manage: Access = ({ req }) => {
  if (
    req.user?.collection === 'admins' ||
    (req.user?.collection === 'users' && req.user.role === 'platform-admin')
  )
    return true
  if (req.user?.collection === 'users' && req.user.role === 'provider')
    return { provider: { equals: req.user.id } }
  return false
}
export const MaintenanceRecords: CollectionConfig = {
  slug: 'maintenance-records',
  admin: {
    group: 'Vận hành',
    useAsTitle: 'title',
    defaultColumns: ['title', 'resource', 'scheduledAt', 'status'],
  },
  access: {
    create: ({ req }) =>
      Boolean(
        req.user?.collection === 'admins' ||
        (req.user?.collection === 'users' &&
          ['provider', 'platform-admin'].includes(req.user.role ?? '')),
      ),
    delete: manage,
    read: manage,
    update: manage,
  },
  hooks: {
    beforeValidate: [
      ({ data, req }) =>
        req.user?.collection === 'users' && req.user.role === 'provider'
          ? { ...data, provider: req.user.id }
          : data,
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'provider', type: 'relationship', relationTo: 'users', required: true, index: true },
    { name: 'space', type: 'relationship', relationTo: 'spaces' },
    { name: 'resource', type: 'relationship', relationTo: 'resources' },
    { name: 'scheduledAt', type: 'date', required: true },
    { name: 'completedAt', type: 'date' },
    { name: 'notes', type: 'textarea', required: true },
    { name: 'cost', type: 'number', min: 0 },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'scheduled',
      options: [
        { label: 'Đã lên lịch', value: 'scheduled' },
        { label: 'Đang thực hiện', value: 'in-progress' },
        { label: 'Hoàn tất', value: 'completed' },
        { label: 'Đã hủy', value: 'cancelled' },
      ],
    },
  ],
  versions: false,
}
