import 'server-only'

import { randomBytes } from 'node:crypto'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { User } from '@/payload-types'

export type VerifiedGoogleProfile = {
  email: string
  googleId: string
  image?: string | null
  name: string
}

export async function syncGoogleUser(profile: VerifiedGoogleProfile): Promise<User> {
  const payload = await getPayload({ config })
  const byGoogleId = await payload.find({
    collection: 'users',
    limit: 1,
    overrideAccess: true,
    where: { googleId: { equals: profile.googleId } },
  })
  let user = byGoogleId.docs[0]

  if (!user) {
    const byEmail = await payload.find({
      collection: 'users',
      limit: 1,
      overrideAccess: true,
      where: { email: { equals: profile.email.toLowerCase() } },
    })
    user = byEmail.docs[0]
  }

  if (user) {
    return payload.update({
      collection: 'users',
      id: user.id,
      data: {
        authProvider: 'google',
        avatarUrl: profile.image ?? undefined,
        googleId: profile.googleId,
        name: profile.name || user.name,
      },
      overrideAccess: true,
    })
  }

  return payload.create({
    collection: 'users',
    data: {
      authProvider: 'google',
      avatarUrl: profile.image ?? undefined,
      email: profile.email.toLowerCase(),
      googleId: profile.googleId,
      name: profile.name || profile.email.split('@')[0],
      password: randomBytes(32).toString('base64url'),
      role: 'customer',
    },
    draft: false,
    overrideAccess: true,
  })
}
