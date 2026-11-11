import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cacheTags } from '@/lib/cache-tags'

async function getLiveCounts() {
  'use cache'
  cacheLife('max')
  cacheTag(cacheTags.spaces, cacheTags.resources, cacheTags.communityPosts)

  const payload = await getPayload({ config })
  const [spaces, resources, posts] = await Promise.all([
    payload.count({ collection: 'spaces' as never, overrideAccess: false }),
    payload.count({ collection: 'resources' as never, overrideAccess: false }),
    payload.count({ collection: 'community-posts' as never, overrideAccess: false }),
  ])

  return { posts: posts.totalDocs, resources: resources.totalDocs, spaces: spaces.totalDocs }
}

export async function LivePayloadStatus() {
  const counts = await getLiveCounts()

  return (
    <div className="payload-status" title="Dữ liệu trực tiếp từ Payload CMS">
      <span />
      PAYLOAD LIVE · {counts.spaces} KHÔNG GIAN · {counts.resources} THIẾT BỊ · {counts.posts} BÀI VIẾT
    </div>
  )
}
