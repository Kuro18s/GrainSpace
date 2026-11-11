import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cacheTags } from '@/lib/cache-tags'
import {
  InteractionLayer,
  type SuggestionRoom,
  type SuggestionService,
} from '@/components/InteractionLayer'

async function getSuggestions(): Promise<{
  rooms: SuggestionRoom[]
  services: SuggestionService[]
}> {
  'use cache'
  cacheLife('max')
  cacheTag(cacheTags.spaces)
  cacheTag(cacheTags.resources)

  const payload = await getPayload({ config })
  const [spaceResult, resourceResult] = await Promise.all([
    payload.find({
      collection: 'spaces',
      depth: 1,
      limit: 24,
      overrideAccess: false,
      sort: '-rating',
      where: { status: { equals: 'available' } },
    }),
    payload.find({
      collection: 'resources',
      depth: 1,
      limit: 40,
      overrideAccess: false,
      sort: '-usageCount',
      where: { status: { equals: 'available' } },
    }),
  ])

  return {
    rooms: spaceResult.docs.map((space) => {
      const image = typeof space.featuredImage === 'object' ? space.featuredImage : null
      return {
        area: space.area,
        capacity: space.capacity,
        district: space.district,
        hourlyRate: space.hourlyRate,
        id: String(space.id),
        image:
          image?.url && image.width && image.height
            ? {
                alt: image.alt,
                height: image.height,
                url: image.url,
                width: image.width,
              }
            : null,
        name: space.name,
        providerName: space.providerName,
        rating: space.rating ?? 0,
        type: space.type,
      }
    }),
    services: resourceResult.docs.map((resource) => {
      const space = typeof resource.space === 'object' ? resource.space : null
      return {
        code: resource.code,
        id: String(resource.id),
        name: resource.name,
        spaceId: space ? String(space.id) : String(resource.space),
        spaceName: space?.name ?? 'Không gian liên kết',
        type: resource.type,
        usageCount: resource.usageCount ?? 0,
      }
    }),
  }
}

export async function InteractiveExperience({ children }: { children: React.ReactNode }) {
  const { rooms, services } = await getSuggestions()
  return (
    <InteractionLayer rooms={rooms} services={services}>
      {children}
    </InteractionLayer>
  )
}
