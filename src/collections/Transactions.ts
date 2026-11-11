import type { Access, CollectionConfig, Where } from 'payload'
import { cacheTags, revalidateCollection } from '@/lib/cache-tags'
import { bankOptions, isBankCode } from '@/lib/payment-methods'

const isStaff = (user: unknown) =>
  Boolean(
    user &&
    typeof user === 'object' &&
    'collection' in user &&
    user.collection === 'users' &&
    'role' in user &&
    (user.role === 'provider' || user.role === 'platform-admin'),
  )
const readOwnOrStaff: Access = ({ req }) => {
  if (req.user?.collection === 'admins') return true
  if (
    isStaff(req.user) &&
    req.user &&
    typeof req.user === 'object' &&
    'role' in req.user &&
    req.user.role === 'platform-admin'
  )
    return true
  if (isStaff(req.user) && req.user && typeof req.user === 'object' && 'id' in req.user) {
    return { provider: { equals: req.user.id } } as Where
  }
  if (req.user?.collection !== 'users') return false
  return { customer: { equals: req.user.id } } as Where
}
const adminsOnly: Access = ({ req }) => req.user?.collection === 'admins'
const { afterChange, afterDelete } = revalidateCollection(cacheTags.transactions)

export const Transactions: CollectionConfig = {
  slug: 'transactions',
  admin: {
    group: 'Tài chính',
    useAsTitle: 'invoiceNumber',
    defaultColumns: ['invoiceNumber', 'booking', 'amount', 'status', 'paymentMethod'],
  },
  access: {
    create: adminsOnly,
    delete: adminsOnly,
    read: readOwnOrStaff,
    update: adminsOnly,
  },
  hooks: {
    afterChange: [afterChange],
    afterDelete: [afterDelete],
    beforeValidate: [
      ({ data }) => {
        if (data?.paymentMethod === 'bank-transfer' && !isBankCode(data.bankCode)) {
          throw new Error('Giao dịch chuyển khoản phải có ngân hàng đối soát.')
        }
        if (data?.paymentMethod && data.paymentMethod !== 'bank-transfer') {
          return { ...data, bankCode: undefined }
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'invoiceNumber', type: 'text', required: true, unique: true, index: true },
    { name: 'booking', type: 'relationship', relationTo: 'bookings', required: true, unique: true },
    { name: 'customer', type: 'relationship', relationTo: 'users', required: true },
    { name: 'provider', type: 'relationship', relationTo: 'users' },
    { name: 'amount', type: 'number', required: true, min: 0 },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Chờ thanh toán', value: 'pending' },
        { label: 'Đã thanh toán', value: 'paid' },
        { label: 'Hoàn tiền', value: 'refunded' },
        { label: 'Thất bại', value: 'failed' },
      ],
    },
    {
      name: 'paymentMethod',
      type: 'select',
      required: true,
      defaultValue: 'bank-transfer',
      options: [
        { label: 'Đối soát thủ công', value: 'manual' },
        { label: 'Chuyển khoản ngân hàng', value: 'bank-transfer' },
        { label: 'Stripe', value: 'stripe' },
        { label: 'VNPay', value: 'vnpay' },
      ],
    },
    {
      name: 'bankCode',
      type: 'select',
      options: [...bankOptions],
      admin: {
        condition: (_, siblingData) => siblingData?.paymentMethod === 'bank-transfer',
      },
    },
    { name: 'paidAt', type: 'date' },
  ],
  versions: false,
}
