import { newPreviewOAuthSecret } from '@/lib/preview-oauth-server'

export function GET(request: Request) {
  const headers = new Headers({
    'cache-control': 'no-store',
    'referrer-policy': 'no-referrer',
  })
  if (new URL(request.url).search) return new Response(null, { status: 400, headers })
  headers.append(
    'set-cookie',
    `__Host-pv_bootstrap=${newPreviewOAuthSecret()}; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=300`,
  )
  headers.set('location', '/api/auth/preview-signin/bridge')
  return new Response(null, { status: 303, headers })
}
