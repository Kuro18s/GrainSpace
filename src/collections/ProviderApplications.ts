import type { Access, CollectionConfig } from 'payload'

const readOwnOrAdmin: Access = ({ req }) => {
  if (
    req.user?.collection === 'admins' ||
    (req.user?.collection === 'users' && req.user.role === 'platform-admin')
  )
    return true
  if (req.user?.collection === 'users') return { applicant: { equals: req.user.id } }
  return false
}
export const ProviderApplications: CollectionConfig = {
  slug: 'provider-applications',
  admin: {
    group: 'Đối tác',
    useAsTitle: 'businessName',
    defaultColumns: ['businessName', 'applicant', 'status', 'createdAt'],
  },
  access: {
    create: ({ req }) => req.user?.collection === 'users',
    delete: ({ req }) => req.user?.collection === 'admins',
    read: readOwnOrAdmin,
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
          ? { ...data, applicant: req.user.id, status: 'pending' }
          : data,
    ],
    afterChange: [
      async ({ doc, previousDoc, req }) => {
        if (doc.status === 'approved' && previousDoc?.status !== 'approved') {
          const applicantId = typeof doc.applicant === 'object' ? doc.applicant.id : doc.applicant
          await req.payload.update({
            collection: 'users',
            id: applicantId,
            data: { organization: doc.businessName, role: 'provider' },
            overrideAccess: true,
          })
        }
      },
    ],
  },
  fields: [
    { name: 'applicant', type: 'relationship', relationTo: 'users', required: true, unique: true },
    { name: 'businessName', type: 'text', required: true },
    { name: 'taxCode', type: 'text' },
    { name: 'phone', type: 'text', required: true },
    { name: 'address', type: 'textarea', required: true },
    { name: 'experience', type: 'textarea', required: true },
    { name: 'portfolio', type: 'upload', relationTo: 'media', hasMany: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: ['pending', 'reviewing', 'approved', 'rejected'],
    },
    { name: 'reviewNote', type: 'textarea' },
  ],
  versions: false,
}
