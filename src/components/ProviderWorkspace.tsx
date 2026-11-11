import { getPayload } from 'payload'
import config from '@payload-config'
import { getCurrentAppUser } from '@/lib/app-auth'
import { ProviderWorkspaceClient } from '@/components/ProviderWorkspaceClient'

export async function ProviderWorkspace() {
  const user = await getCurrentAppUser()
  if (!user || (user.role !== 'provider' && user.role !== 'platform-admin')) return null
  const payload = await getPayload({ config })
  const ownerWhere = user.role === 'provider' ? { provider: { equals: user.id } } : undefined
  const [spaces, resources, packages, promotions, experts] = await Promise.all([
    payload.find({
      collection: 'spaces',
      depth: 0,
      limit: 100,
      overrideAccess: false,
      user,
      where: ownerWhere,
    }),
    payload.find({
      collection: 'resources',
      depth: 0,
      limit: 100,
      overrideAccess: false,
      user,
      where: ownerWhere,
    }),
    payload.find({
      collection: 'service-packages',
      depth: 0,
      limit: 100,
      overrideAccess: false,
      user,
      where: ownerWhere,
    }),
    payload.find({
      collection: 'promotions',
      depth: 0,
      limit: 100,
      overrideAccess: false,
      user,
      where: ownerWhere,
    }),
    payload.find({
      collection: 'users',
      depth: 0,
      limit: 100,
      overrideAccess: true,
      where: { role: { equals: 'expert' } },
    }),
  ])
  return (
    <section id="provider-workspace" className="scroll-mt-6">
      <ProviderWorkspaceClient
        experts={experts.docs.map((expert) => ({ id: String(expert.id), name: expert.name }))}
        packages={packages.docs.map((item) => ({ id: String(item.id), name: item.name }))}
        promotions={promotions.docs.map((item) => ({ id: String(item.id), name: item.name }))}
        resources={resources.docs.map((item) => ({
          id: String(item.id),
          name: item.name,
          space: typeof item.space === 'object' ? String(item.space.id) : String(item.space),
        }))}
        spaces={spaces.docs.map((item) => ({ id: String(item.id), name: item.name }))}
      />
    </section>
  )
}
