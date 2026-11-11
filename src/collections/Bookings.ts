import type { Access, CollectionConfig, FieldAccess, Where } from 'payload'
import { cacheTags, revalidateCollection } from '@/lib/cache-tags'
import { bankOptions, isBankCode, isPaymentMethod, paymentMethods } from '@/lib/payment-methods'

const isAppUser = (user: unknown): user is { collection: 'users'; id: string | number } =>
  Boolean(user && typeof user === 'object' && 'collection' in user && user.collection === 'users')

const isOperationsUser = (
  user: unknown,
): user is {
  collection: 'users'
  id: string | number
  role: 'platform-admin' | 'provider'
} =>
  isAppUser(user) && 'role' in user && (user.role === 'provider' || user.role === 'platform-admin')

const readOwnOrOperations: Access = ({ req }) => {
  if (req.user?.collection === 'admins') return true
  if (isOperationsUser(req.user) && req.user.role === 'platform-admin') return true
  if (isOperationsUser(req.user)) return providerBookings(req.user.id)
  if (!isAppUser(req.user)) return false
  return { customer: { equals: req.user.id } }
}

const adminsOnly: FieldAccess = ({ req }) => req.user?.collection === 'admins'
const appUsersOrAdmins: FieldAccess = ({ req }) =>
  req.user?.collection === 'admins' || isAppUser(req.user)
const operationsOrAdmins: FieldAccess = ({ req }) =>
  req.user?.collection === 'admins' || isOperationsUser(req.user)
const providerBookings = (providerID: string | number): Where => ({
  'space.provider': { equals: providerID },
})
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
    update: ({ req }) => {
      if (req.user?.collection === 'admins') return true
      if (isOperationsUser(req.user) && req.user.role === 'platform-admin') return true
      if (isOperationsUser(req.user)) return providerBookings(req.user.id)
      return false
    },
  },
  hooks: {
    afterChange: [afterChange],
    afterDelete: [afterDelete],
    beforeValidate: [
      async ({ data, operation, req }) => {
        if (operation === 'create' && isAppUser(req.user)) {
          const nextData = {
            ...(data ?? {}),
            customer: req.user.id,
            paymentMethod: isPaymentMethod(data?.paymentMethod)
              ? data.paymentMethod
              : 'bank-transfer',
            status: 'pending',
          } as Record<string, any>
          if (nextData.paymentMethod === 'bank-transfer') {
            if (!isBankCode(nextData.bankCode)) {
              throw new Error('Vui lòng chọn ngân hàng nhận chuyển khoản.')
            }
          } else {
            nextData.bankCode = undefined
          }
          if (nextData.space && nextData.bookingDate && nextData.startTime && nextData.endTime) {
            const spaceId =
              typeof nextData.space === 'object' && 'id' in nextData.space
                ? nextData.space.id
                : nextData.space
            const conflicts = await req.payload.find({
              collection: 'bookings',
              depth: 0,
              limit: 1,
              overrideAccess: true,
              where: {
                and: [
                  { space: { equals: spaceId } },
                  { bookingDate: { equals: nextData.bookingDate } },
                  { status: { in: ['pending', 'confirmed', 'checked-in'] } },
                  { startTime: { less_than: nextData.endTime } },
                  { endTime: { greater_than: nextData.startTime } },
                ],
              },
            })
            if (conflicts.totalDocs > 0) {
              throw new Error('Khung giờ này vừa được người khác đặt. Vui lòng chọn giờ khác.')
            }
          }
          return nextData
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
    {
      name: 'paymentMethod',
      type: 'select',
      defaultValue: 'bank-transfer',
      options: [...paymentMethods],
      access: {
        create: appUsersOrAdmins,
        update: adminsOnly,
      },
    },
    {
      name: 'bankCode',
      type: 'select',
      options: [...bankOptions],
      admin: {
        condition: (_, siblingData) => siblingData?.paymentMethod === 'bank-transfer',
        description: 'Ngân hàng khách hàng chọn để nhận hướng dẫn chuyển khoản.',
      },
      access: {
        create: appUsersOrAdmins,
        update: adminsOnly,
      },
    },
  ],
}
