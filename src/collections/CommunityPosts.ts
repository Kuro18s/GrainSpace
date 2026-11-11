import { revalidateTag } from 'next/cache'
import type { Access, CollectionConfig } from 'payload'
import { cacheTags } from '@/lib/cache-tags'

const createByExpert: Access = ({ req }) =>
  req.user?.collection === 'admins' ||
  (req.user?.collection === 'users' &&
    (req.user.role === 'expert' || req.user.role === 'platform-admin'))
const manageOwn: Access = ({ req }) => {
  if (
    req.user?.collection === 'admins' ||
    (req.user?.collection === 'users' && req.user.role === 'platform-admin')
  )
    return true
  if (req.user?.collection === 'users' && req.user.role === 'expert')
    return { author: { equals: req.user.id } }
  return false
}
const detailTag = (slug: unknown) => `${cacheTags.communityPosts}:${String(slug ?? '')}`

export const CommunityPosts: CollectionConfig = {
  slug: 'community-posts',
  admin: {
    group: 'Cộng đồng',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'authorName', 'publishedAt'],
  },
  access: {
    create: createByExpert,
    delete: manageOwn,
    read: () => true,
    update: manageOwn,
  },
  hooks: {
    afterChange: [
      ({ doc, previousDoc }) => {
        revalidateTag(cacheTags.communityPosts, 'max')
        revalidateTag(detailTag(doc.slug), 'max')
        if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
          revalidateTag(detailTag(previousDoc.slug), 'max')
        }
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateTag(cacheTags.communityPosts, 'max')
        revalidateTag(detailTag(doc.slug), 'max')
      },
    ],
    beforeValidate: [
      ({ data, req }) =>
        req.user?.collection === 'users' && req.user.role === 'expert'
          ? { ...data, author: req.user.id, authorName: req.user.name }
          : data,
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'body', type: 'textarea', required: true },
    { name: 'authorName', type: 'text', required: true },
    { name: 'author', type: 'relationship', relationTo: 'users', index: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Nhiếp ảnh', value: 'photography' },
        { label: 'Công cụ thiết bị', value: 'equipment' },
        { label: 'Kỹ thuật phòng tối', value: 'darkroom' },
        { label: 'Workshop', value: 'workshop' },
        { label: 'Thảo luận', value: 'discussion' },
        { label: 'Góc chuyên gia', value: 'expert' },
      ],
    },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    {
      name: 'resource',
      type: 'relationship',
      relationTo: 'resources',
      admin: { description: 'Thiết bị liên quan khi đây là bài đánh giá.' },
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      admin: { description: 'Điểm đánh giá thiết bị, từ 1 đến 5.' },
    },
    {
      name: 'workshopDate',
      type: 'date',
      admin: { description: 'Thời gian bắt đầu workshop.' },
    },
    { name: 'workshopEndDate', type: 'date' },
    { name: 'venue', type: 'text' },
    { name: 'capacity', type: 'number', min: 1 },
    {
      name: 'expertise',
      type: 'text',
      admin: { description: 'Chuyên môn hiển thị trong Góc chuyên gia.' },
    },
    { name: 'publishedAt', type: 'date', required: true },
  ],
}
