import type { Access, CollectionConfig, Where } from 'payload'

const readOwnOrStaff: Access = ({ req }) => {
  if (req.user?.collection === 'admins') return true
  if (req.user?.collection === 'users' && req.user.role === 'platform-admin') return true
  if (req.user?.collection === 'users' && req.user.role === 'provider')
    return { 'booking.space.provider': { equals: req.user.id } } as Where
  if (req.user?.collection === 'users') return { openedBy: { equals: req.user.id } } as Where
  return false
}
export const Disputes: CollectionConfig = {
  slug: 'disputes',
  admin: {
    group: 'Tài chính',
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'booking', 'status', 'priority'],
  },
  access: {
    create: ({ req }) => req.user?.collection === 'users',
    delete: ({ req }) => req.user?.collection === 'admins',
    read: readOwnOrStaff,
    update: ({ req }) =>
      Boolean(
        req.user?.collection === 'admins' ||
        (req.user?.collection === 'users' && req.user.role === 'platform-admin'),
      ),
  },
  hooks: {
    beforeValidate: [
      ({ data, operation, req }) =>
        operation === 'create' && req.user?.collection === 'users'
          ? { ...data, openedBy: req.user.id, status: 'open' }
          : data,
    ],
  },
  fields: [
    { name: 'reference', type: 'text', required: true, unique: true, index: true },
    { name: 'booking', type: 'relationship', relationTo: 'bookings', required: true },
    { name: 'transaction', type: 'relationship', relationTo: 'transactions' },
    { name: 'openedBy', type: 'relationship', relationTo: 'users', required: true },
    { name: 'reason', type: 'textarea', required: true },
    { name: 'evidence', type: 'upload', relationTo: 'media', hasMany: true },
    {
      name: 'priority',
      type: 'select',
      required: true,
      defaultValue: 'normal',
      options: ['low', 'normal', 'high', 'urgent'],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'open',
      options: ['open', 'reviewing', 'resolved', 'rejected'],
    },
    { name: 'resolution', type: 'textarea' },
  ],
  versions: false,
}
