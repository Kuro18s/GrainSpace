import type { Access, CollectionConfig } from 'payload'

const adminsOnly: Access = ({ req }) => req.user?.collection === 'admins'

export const BookingSlots: CollectionConfig = {
  slug: 'booking-slots',
  admin: {
    group: 'Vận hành',
    hidden: true,
    useAsTitle: 'lockKey',
  },
  access: {
    create: adminsOnly,
    delete: adminsOnly,
    read: adminsOnly,
    update: adminsOnly,
  },
  fields: [
    { name: 'lockKey', type: 'text', required: true, unique: true, index: true },
    { name: 'bookingReference', type: 'text', required: true, index: true },
    { name: 'bookingDate', type: 'date', required: true, index: true },
    { name: 'startTime', type: 'text', required: true },
    { name: 'endTime', type: 'text', required: true },
    { name: 'space', type: 'relationship', relationTo: 'spaces', required: true },
    { name: 'resource', type: 'relationship', relationTo: 'resources' },
  ],
  timestamps: true,
  versions: false,
}
