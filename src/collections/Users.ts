import type { Access, CollectionConfig, FieldAccess } from 'payload'

const isAppUser: Access = ({ req }) => req.user?.collection === 'users'
const isSelfOrAdmin: Access = ({ req }) => {
  if (req.user?.collection === 'admins') return true
  if (req.user?.collection !== 'users') return false
  return { id: { equals: req.user.id } }
}
const adminsOnly: FieldAccess = ({ req }) => req.user?.collection === 'admins'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'Ứng dụng',
    useAsTitle: 'name',
  },
  auth: true,
  access: {
    admin: () => false,
    create: () => true,
    delete: () => false,
    read: isSelfOrAdmin,
    update: isSelfOrAdmin,
    unlock: isAppUser,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'customer',
      required: true,
      options: [
        { label: 'Khách hàng', value: 'customer' },
        { label: 'Nhiếp ảnh gia', value: 'photographer' },
        { label: 'Chuyên gia', value: 'expert' },
        { label: 'Nhà cung cấp', value: 'provider' },
        { label: 'Quản trị nền tảng', value: 'platform-admin' },
      ],
      access: {
        create: adminsOnly,
        update: adminsOnly,
      },
    },
    {
      name: 'organization',
      type: 'text',
    },
    {
      name: 'googleId',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        description: 'Mã định danh Google được đồng bộ tự động khi đăng nhập.',
        readOnly: true,
      },
      access: {
        create: adminsOnly,
        update: adminsOnly,
      },
    },
    {
      name: 'avatarUrl',
      type: 'text',
      admin: {
        description: 'Ảnh đại diện từ nhà cung cấp đăng nhập.',
        readOnly: true,
      },
      access: {
        create: adminsOnly,
        update: adminsOnly,
      },
    },
    {
      name: 'authProvider',
      type: 'select',
      options: [
        { label: 'Email và mật khẩu', value: 'password' },
        { label: 'Google', value: 'google' },
      ],
      admin: { readOnly: true },
      access: {
        create: adminsOnly,
        update: adminsOnly,
      },
    },
  ],
  versions: false,
}
