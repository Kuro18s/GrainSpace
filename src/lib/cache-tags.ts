import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const cacheTags = {
  bookings: 'filmspace:bookings',
  communityPosts: 'filmspace:community-posts',
  communityReplies: 'filmspace:community-replies',
  portfolios: 'filmspace:portfolios',
  reviews: 'filmspace:reviews',
  resources: 'filmspace:resources',
  servicePackages: 'filmspace:service-packages',
  spaces: 'filmspace:spaces',
  transactions: 'filmspace:transactions',
  users: 'filmspace:users',
} as const

export function revalidateCollection(tag: string) {
  const afterChange: CollectionAfterChangeHook = () => {
    revalidateTag(tag, 'max')
  }
  const afterDelete: CollectionAfterDeleteHook = () => {
    revalidateTag(tag, 'max')
  }

  return { afterChange, afterDelete }
}
