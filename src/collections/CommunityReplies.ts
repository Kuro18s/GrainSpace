import type { Access, CollectionConfig, FieldAccess } from 'payload'
import { cacheTags, revalidateCollection } from '@/lib/cache-tags'

const isAppUser: Access = ({ req }) =>
  req.user?.collection === 'admins' || req.user?.collection === 'users'

const manageOwn: Access = ({ req }) => {
  if (
    req.user?.collection === 'admins' ||
    (req.user?.collection === 'users' && req.user.role === 'platform-admin')
  ) {
    return true
  }
  if (req.user?.collection === 'users') return { author: { equals: req.user.id } }
  return false
}

const serverOwned: FieldAccess = ({ req }) => req.user?.collection === 'admins'
const { afterChange, afterDelete } = revalidateCollection(cacheTags.communityReplies)

export const CommunityReplies: CollectionConfig = {
  slug: 'community-replies',
  admin: {
    group: 'Cộng đồng',
    useAsTitle: 'authorName',
    defaultColumns: ['thread', 'authorName', 'createdAt'],
  },
  access: {
    create: isAppUser,
    delete: manageOwn,
    read: () => true,
    update: manageOwn,
  },
  hooks: {
    afterChange: [afterChange],
    afterDelete: [afterDelete],
    beforeValidate: [
      async ({ data, req }) => {
        if (req.user?.collection !== 'users') return data
        const threadID =
          data?.thread && typeof data.thread === 'object' && 'id' in data.thread
            ? data.thread.id
            : data?.thread
        if (!threadID) throw new Error('Bài thảo luận là bắt buộc.')
        const thread = await req.payload.findByID({
          collection: 'community-posts',
          id: threadID,
          depth: 0,
          overrideAccess: false,
          user: req.user,
        })
        if (thread.category !== 'discussion') {
          throw new Error('Chỉ bài thuộc mục Thảo luận mới nhận phản hồi.')
        }
        return { ...data, author: req.user.id, authorName: req.user.name }
      },
    ],
  },
  fields: [
    {
      name: 'thread',
      type: 'relationship',
      relationTo: 'community-posts',
      required: true,
      index: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
      access: { create: serverOwned, update: serverOwned },
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
      access: { create: serverOwned, update: serverOwned },
    },
    { name: 'body', type: 'textarea', required: true, maxLength: 2000 },
  ],
  versions: false,
}
