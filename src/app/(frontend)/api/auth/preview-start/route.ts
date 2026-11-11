import { createHash } from 'node:crypto'
import { cookies } from 'next/headers'
import {
  hasPreviewOAuthCsrf,
  isPreviewOAuthPost,
} from '@/lib/preview-oauth-server'
import { previewOAuthStore } from '@/lib/preview-oauth-store'

const noStoreHeaders = {
  'cache-control': 'no-store',
  'referrer-policy': 'no-referrer',
}

function prefixHasEnoughTime(prefix: string) {
  try {
    const payload = JSON.parse(Buffer.from(prefix.split('.')[1], 'base64url').toString()) as {
      exp?: unknown
    }
    return typeof payload.exp === 'number' && payload.exp * 1000 > Date.now() + 5 * 60_000
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  const trustedOrigin = process.env.NEXT_PUBLIC_SITE_URL
  if (!trustedOrigin || !isPreviewOAuthPost(request, trustedOrigin)) {
    return Response.json({ error: 'Invalid request' }, { status: 403, headers: noStoreHeaders })
  }

  const body = (await request.json().catch(() => null)) as {
    csrf?: unknown
    secret?: unknown
  } | null
  const cookieStore = await cookies()
  const bootstrap = cookieStore.get('__Host-pv_bootstrap')?.value
  if (
    !body ||
    typeof body.secret !== 'string' ||
    !hasPreviewOAuthCsrf(bootstrap, body.csrf)
  ) {
    return Response.json({ error: 'Invalid request' }, { status: 400, headers: noStoreHeaders })
  }

  const redirectUri = process.env.FIGMA_PREVIEW_OAUTH_REDIRECT_URI
  const statePrefix = process.env.FIGMA_PREVIEW_OAUTH_STATE_PREFIX
  const clientId = process.env.AUTH_GOOGLE_ID
  if (!redirectUri || !statePrefix || !clientId || !prefixHasEnoughTime(statePrefix)) {
    return Response.json(
      { error: 'Preview sign-in unavailable' },
      { status: 503, headers: noStoreHeaders },
    )
  }

  const transaction = previewOAuthStore.begin(body.secret)
  if (!transaction) {
    return Response.json({ error: 'Invalid request' }, { status: 409, headers: noStoreHeaders })
  }

  const challenge = createHash('sha256').update(transaction.verifier).digest('base64url')
  const state = [
    statePrefix,
    transaction.nonce,
    Buffer.from('/api/auth/preview-callback').toString('base64url'),
  ].join('.')
  const authorizationUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  authorizationUrl.search = new URLSearchParams({
    client_id: clientId,
    code_challenge: challenge,
    code_challenge_method: 'S256',
    prompt: 'select_account',
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state,
  }).toString()

  const headers = new Headers(noStoreHeaders)
  headers.append(
    'set-cookie',
    '__Host-pv_bootstrap=; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=0',
  )
  headers.append(
    'set-cookie',
    `__Host-pv_handle=${body.secret}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=300`,
  )
  headers.append(
    'set-cookie',
    `__Host-pv_nonce=${transaction.nonce}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=300`,
  )
  return Response.json({ authorizationUrl: authorizationUrl.toString() }, { headers })
}
