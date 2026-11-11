import { cookies } from 'next/headers'
import type { JWT } from 'next-auth/jwt'
import {
  isPreviewOAuthPost,
  readPreviewOAuthCallback,
} from '@/lib/preview-oauth-server'
import { previewOAuthStore } from '@/lib/preview-oauth-store'
import { syncGoogleUser } from '@/lib/google-user'

const noStoreHeaders = {
  'cache-control': 'no-store',
  'referrer-policy': 'no-referrer',
}
const clearFlowCookies = [
  '__Host-pv_handle=; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=0',
  '__Host-pv_nonce=; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=0',
]

function terminalResponse(status: number) {
  const headers = new Headers(noStoreHeaders)
  for (const cookie of clearFlowCookies) headers.append('set-cookie', cookie)
  return new Response(null, { status, headers })
}

export async function POST(request: Request) {
  const trustedOrigin = process.env.NEXT_PUBLIC_SITE_URL
  if (!trustedOrigin || !isPreviewOAuthPost(request, trustedOrigin)) {
    return new Response(null, { status: 403, headers: noStoreHeaders })
  }
  const params = readPreviewOAuthCallback(await request.json().catch(() => null))
  if (!params) return new Response(null, { status: 400, headers: noStoreHeaders })

  const cookieStore = await cookies()
  const handle = cookieStore.get('__Host-pv_handle')?.value ?? ''
  const popupNonce = cookieStore.get('__Host-pv_nonce')?.value
  const state = params.get('state') ?? ''
  const verifier = previewOAuthStore.takeCallback(handle, state.split('.')[3] ?? '', popupNonce)
  if (!verifier) return terminalResponse(410)

  try {
    const code = params.get('code')
    if (!code || params.get('error')) throw new Error('Google authorization was denied')
    const redirectUri = process.env.FIGMA_PREVIEW_OAUTH_REDIRECT_URI
    const clientId = process.env.AUTH_GOOGLE_ID
    const clientSecret = process.env.AUTH_GOOGLE_SECRET
    if (!redirectUri || !clientId || !clientSecret) {
      throw new Error('Google OAuth configuration is incomplete')
    }

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        code_verifier: verifier,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    })
    const token = (await tokenResponse.json()) as { access_token?: unknown }
    if (!tokenResponse.ok || typeof token.access_token !== 'string') {
      throw new Error('Google token exchange failed')
    }

    const profileResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: { authorization: `Bearer ${token.access_token}` },
      cache: 'no-store',
    })
    const profile = (await profileResponse.json()) as {
      email?: unknown
      email_verified?: unknown
      name?: unknown
      picture?: unknown
      sub?: unknown
    }
    if (
      !profileResponse.ok ||
      typeof profile.sub !== 'string' ||
      typeof profile.email !== 'string' ||
      profile.email_verified !== true
    ) {
      throw new Error('Google returned no verified identity')
    }

    const user = await syncGoogleUser({
      email: profile.email,
      googleId: profile.sub,
      image: typeof profile.picture === 'string' ? profile.picture : undefined,
      name: typeof profile.name === 'string' ? profile.name : profile.email.split('@')[0],
    })
    const claims: JWT = {
      appUserId: String(user.id),
      email: user.email,
      name: user.name,
      picture: user.avatarUrl ?? undefined,
      sub: profile.sub,
    }
    if (!previewOAuthStore.complete(handle, claims)) {
      throw new Error('Preview OAuth transaction expired')
    }
    return terminalResponse(204)
  } catch (error) {
    previewOAuthStore.fail(handle)
    console.error(
      'Preview Google sign-in failed:',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return terminalResponse(410)
  }
}
