import type { Access, CollectionConfig, FieldAccess } from 'payload'
import { cacheTags, revalidateCollection } from '@/lib/cache-tags'

const isAppUser = (user: unknown): user is { collection: 'users'; id: string | number } =>
  Boolean(user && typeof user === 'object' && 'collection' in user && user.collection === 'users')

const isOperationsUser = (
  user: unknown,
): user is {
  collection: 'users'
  id: string | number
  role: 'platform-admin' | 'provider'
} =>
  isAppUser(user) &&
  'role' in user &&
  (user.role === 'provider' || user.role === 'platform-admin')

const readOwnOrOperations: Access = ({ req }) => {
  if (req.user?.collection === 'admins') return true
  if (isOperationsUser(req.user)) return true
  if (!isAppUser(req.user)) return false
  return { customer: { equals: req.user.id } }
}

const adminsOnly: FieldAccess = ({ req }) => req.user?.collection === 'admins'
const appUsersOrAdmins: FieldAccess = ({ req }) =>
  req.user?.collection === 'admins' || isAppUser(req.user)
const operationsOrAdmins: FieldAccess = ({ req }) =>
  req.user?.collection === 'admins' || isOperationsUser(req.user)
const { afterChange, afterDelete } = revalidateCollection(cacheTags.bookings)

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    group: 'Vận hành',
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'space', 'bookingDate', 'startTime', 'status', 'total'],
  },
  access: {
    create: ({ req }) => req.user?.collection === 'admins' || isAppUser(req.user),
    delete: ({ req }) => req.user?.collection === 'admins',
    read: readOwnOrOperations,
    update: ({ req }) => req.user?.collection === 'admins' || isOperationsUser(req.user),
  },
  hooks: {
    afterChange: [afterChange],
    afterDelete: [afterDelete],
    beforeValidate: [
      ({ data, operation, req }) => {
        if (operation === 'create' && isAppUser(req.user)) {
          return { ...data, customer: req.user.id, status: 'pending' }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'reference',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      access: { update: adminsOnly },
    },
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      access: {
        create: appUsersOrAdmins,
        update: adminsOnly,
      },
    },
    {
      name: 'space',
      type: 'relationship',
      relationTo: 'spaces',
      required: true,
      access: { update: adminsOnly },
    },
    {
      name: 'resources',
      type: 'relationship',
      relationTo: 'resources',
      hasMany: true,
      access: { update: adminsOnly },
    },
    { name: 'bookingDate', type: 'date', required: true, access: { update: adminsOnly } },
    { name: 'startTime', type: 'text', required: true, access: { update: adminsOnly } },
    { name: 'endTime', type: 'text', required: true, access: { update: adminsOnly } },
    {
      name: 'total',
      type: 'number',
      required: true,
      min: 0,
      access: { update: adminsOnly },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      access: {
        update: operationsOrAdmins,
      },
      options: [
        { label: 'Chờ xác nhận', value: 'pending' },
        { label: 'Đã xác nhận', value: 'confirmed' },
        { label: 'Đã check-in', value: 'checked-in' },
        { label: 'Hoàn tất', value: 'completed' },
        { label: 'Đã hủy', value: 'cancelled' },
      ],
    },
  ],
}
