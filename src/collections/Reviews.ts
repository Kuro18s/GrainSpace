import type { Access, CollectionConfig } from 'payload'
import { cacheTags, revalidateCollection } from '@/lib/cache-tags'

const adminsOnly: Access = ({ req }) => req.user?.collection === 'admins'
const readApprovedOrAdmin: Access = ({ req }) => {
  if (req.user?.collection === 'admins') return true
  return { status: { equals: 'approved' } }
}
const { afterChange, afterDelete } = revalidateCollection(cacheTags.reviews)

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    group: 'Cộng đồng',
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'space', 'rating', 'status', 'displayOrder'],
  },
  access: {
    create: adminsOnly,
    delete: adminsOnly,
    read: readApprovedOrAdmin,
    update: adminsOnly,
  },
  hooks: {
    afterChange: [afterChange],
    afterDelete: [afterDelete],
  },
  fields: [
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Liên kết tài khoản nếu nhận xét đến từ khách hàng đã đăng ký.',
      },
    },
    {
      name: 'customerName',
      type: 'text',
      required: true,
      admin: {
        description: 'Tên được hiển thị công khai cùng nhận xét.',
      },
    },
    {
      name: 'customerContext',
      type: 'text',
      required: true,
      admin: {
        description: 'Vai trò hoặc ngữ cảnh của khách hàng, ví dụ: Nhiếp ảnh gia chân dung.',
      },
    },
    {
      name: 'space',
      type: 'relationship',
      relationTo: 'spaces',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: 'review',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Chờ duyệt', value: 'pending' },
        { label: 'Đã duyệt', value: 'approved' },
        { label: 'Từ chối', value: 'rejected' },
      ],
    },
    {
      name: 'displayOrder',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      admin: {
        description: 'Số nhỏ hơn sẽ được hiển thị trước.',
      },
    },
  ],
  versions: false,
}
