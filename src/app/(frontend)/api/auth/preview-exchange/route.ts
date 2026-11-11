import { encode } from 'next-auth/jwt'
import { isPreviewOAuthPost } from '@/lib/preview-oauth-server'
import { previewOAuthStore } from '@/lib/preview-oauth-store'
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from '@/lib/session-cookie'

const noStoreHeaders = { 'cache-control': 'no-store' }

export async function POST(request: Request) {
  const trustedOrigin = process.env.NEXT_PUBLIC_SITE_URL
  if (!trustedOrigin || !isPreviewOAuthPost(request, trustedOrigin)) {
    return new Response(null, { status: 403, headers: noStoreHeaders })
  }
  const body = (await request.json().catch(() => null)) as { secret?: unknown } | null
  if (!body || typeof body.secret !== 'string') {
    return new Response(null, { status: 400, headers: noStoreHeaders })
  }
  const outcome = previewOAuthStore.consume(body.secret)
  if (outcome.status !== 'complete') {
    return new Response(null, {
      status: outcome.status === 'pending' ? 202 : 410,
      headers: noStoreHeaders,
    })
  }
  const secret = process.env.AUTH_SECRET
  if (!secret) return new Response(null, { status: 503, headers: noStoreHeaders })

  const token = await encode({
    token: outcome.result,
    secret,
    salt: SESSION_COOKIE,
    maxAge: SESSION_MAX_AGE,
  })
  const cookie = [
    `${SESSION_COOKIE}=${token}`,
    `Max-Age=${SESSION_MAX_AGE}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=None',
    'Partitioned',
  ].join('; ')
  return new Response(null, {
    status: 204,
    headers: { ...noStoreHeaders, 'set-cookie': cookie },
  })
}
