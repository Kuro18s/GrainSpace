import 'server-only'

import { cookies } from 'next/headers'
import { connection } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Config } from '@/payload-types'
import { auth } from '@/auth'
import { SESSION_COOKIE } from '@/lib/session-cookie'

const APP_SESSION_COOKIE = 'app-session'

export type AppUser = Config['collections']['users']

export async function getCurrentAppSession(): Promise<{
  source: 'google' | 'password'
  user: AppUser
} | null> {
  await connection()
  const cookieStore = await cookies()
  const token = cookieStore.get(APP_SESSION_COOKIE)?.value
  const payload = await getPayload({ config })

  if (token) {
    const authHeaders = new Headers({ Authorization: `JWT ${token}` })
    const { user } = await payload.auth({ headers: authHeaders })
    if (user?.collection === 'users') {
      return { source: 'password', user: user as AppUser }
    }
  }

  if (!process.env.AUTH_SECRET || !process.env.AUTH_GOOGLE_ID || !process.env.AUTH_GOOGLE_SECRET) {
    return null
  }

  const hasGoogleSession = cookieStore
    .getAll()
    .some((cookie) => cookie.name === SESSION_COOKIE || cookie.name.startsWith(`${SESSION_COOKIE}.`))
  if (!hasGoogleSession) return null

  try {
    const session = await auth()
    if (!session?.user?.id) return null
    const user = await payload.findByID({
      collection: 'users',
      id: session.user.id,
      depth: 0,
      overrideAccess: true,
    })
    return {
      source: 'google',
      user: { ...user, collection: 'users' } as AppUser,
    }
  } catch {
    return null
  }
}

export async function getCurrentAppUser(): Promise<AppUser | null> {
  return (await getCurrentAppSession())?.user ?? null
}

export async function setAppSession(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(APP_SESSION_COOKIE, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
}

export async function clearAppSession() {
  const cookieStore = await cookies()
  cookieStore.delete(APP_SESSION_COOKIE)
}
