import type { Access, CollectionConfig, FieldAccess } from 'payload'

const adminsOnly: Access = ({ req }) => req.user?.collection === 'admins'
const adminFieldsOnly: FieldAccess = ({ req }) => req.user?.collection === 'admins'

export const AdminAccessRequests: CollectionConfig = {
  slug: 'admin-access-requests',
  admin: {
    group: 'Ứng dụng',
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'organization', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    delete: adminsOnly,
    read: adminsOnly,
    update: adminsOnly,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true, index: true },
    { name: 'organization', type: 'text', required: true },
    { name: 'reason', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      required: true,
      options: [
        { label: 'Chờ duyệt', value: 'pending' },
        { label: 'Đã phê duyệt', value: 'approved' },
        { label: 'Từ chối', value: 'rejected' },
      ],
      access: {
        create: adminFieldsOnly,
        update: adminFieldsOnly,
      },
    },
    {
      name: 'reviewNote',
      type: 'textarea',
      access: {
        create: adminFieldsOnly,
        read: adminFieldsOnly,
        update: adminFieldsOnly,
      },
    },
  ],
}
