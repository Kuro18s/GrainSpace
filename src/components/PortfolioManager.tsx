import config from '@payload-config'
import { getPayload } from 'payload'
import { getCurrentAppUser } from '@/lib/app-auth'
import { PortfolioManagerClient } from '@/components/PortfolioManagerClient'

export async function PortfolioManager() {
  const user = await getCurrentAppUser()
  if (!user || (user.role !== 'provider' && user.role !== 'platform-admin')) return null

  const payload = await getPayload({ config })
  const ownerWhere = user.role === 'provider' ? { provider: { equals: user.id } } : undefined
  const [portfolios, spaces] = await Promise.all([
    payload.find({
      collection: 'portfolios',
      depth: 0,
      limit: 100,
      overrideAccess: false,
      sort: '-updatedAt',
      user,
      where: ownerWhere,
    }),
    payload.find({
      collection: 'spaces',
      depth: 0,
      limit: 100,
      overrideAccess: false,
      sort: 'name',
      user,
      where: ownerWhere,
    }),
  ])

  return (
    <PortfolioManagerClient
      portfolios={portfolios.docs.map((portfolio) => ({
        description: portfolio.description,
        id: String(portfolio.id),
        imageCount: portfolio.images?.length ?? 0,
        published: portfolio.published ?? false,
        slug: portfolio.slug,
        space:
          typeof portfolio.space === 'object'
            ? String(portfolio.space?.id ?? '')
            : String(portfolio.space ?? ''),
        title: portfolio.title,
      }))}
      spaces={spaces.docs.map((space) => ({ id: String(space.id), name: space.name }))}
    />
  )
}
