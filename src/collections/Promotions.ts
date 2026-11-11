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
export const Promotions: CollectionConfig = {
  slug: 'promotions',
  admin: {
    group: 'Dịch vụ & giá',
    useAsTitle: 'name',
    defaultColumns: ['code', 'name', 'discountValue', 'startsAt', 'endsAt', 'active'],
  },
  access: {
    create: ({ req }) =>
      Boolean(
        req.user?.collection === 'admins' ||
        (req.user?.collection === 'users' &&
          ['provider', 'platform-admin'].includes(req.user.role ?? '')),
      ),
    delete: manage,
    read: () => true,
    update: manage,
  },
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        if (data?.startsAt && data?.endsAt && new Date(data.endsAt) <= new Date(data.startsAt)) {
          throw new Error('Thời gian kết thúc khuyến mãi phải sau thời gian bắt đầu.')
        }
        if (data?.discountType === 'percent' && Number(data.discountValue) > 100) {
          throw new Error('Mức giảm phần trăm không được vượt quá 100.')
        }
        if (req.user?.collection !== 'users' || req.user.role !== 'provider') return data
        const relationID = (value: unknown) =>
          value && typeof value === 'object' && 'id' in value ? value.id : value
        for (const spaceValue of data?.spaces ?? []) {
          const space = await req.payload.findByID({
            collection: 'spaces',
            id: relationID(spaceValue) as string,
            depth: 0,
            overrideAccess: true,
          })
          if (String(relationID(space.provider) ?? '') !== String(req.user.id))
            throw new Error('Khuyến mãi chỉ có thể áp dụng cho không gian của bạn.')
        }
        for (const packageValue of data?.packages ?? []) {
          const servicePackage = await req.payload.findByID({
            collection: 'service-packages',
            id: relationID(packageValue) as string,
            depth: 0,
            overrideAccess: true,
          })
          if (String(relationID(servicePackage.provider) ?? '') !== String(req.user.id))
            throw new Error('Khuyến mãi chỉ có thể áp dụng cho gói của bạn.')
        }
        return { ...data, provider: req.user.id }
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'code', type: 'text', required: true, unique: true, index: true },
    { name: 'provider', type: 'relationship', relationTo: 'users', required: true, index: true },
    {
      name: 'discountType',
      type: 'select',
      required: true,
      options: [
        { label: 'Phần trăm', value: 'percent' },
        { label: 'Số tiền', value: 'fixed' },
      ],
    },
    { name: 'discountValue', type: 'number', required: true, min: 0 },
    { name: 'startsAt', type: 'date', required: true },
    { name: 'endsAt', type: 'date', required: true },
    { name: 'spaces', type: 'relationship', relationTo: 'spaces', hasMany: true },
    { name: 'packages', type: 'relationship', relationTo: 'service-packages', hasMany: true },
    { name: 'active', type: 'checkbox', defaultValue: true },
  ],
  versions: false,
}
