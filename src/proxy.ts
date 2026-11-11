import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const hasAppSession = Boolean(request.cookies.get('app-session')?.value)
  const hasGoogleSession = Boolean(
    request.cookies.get('__Host-authjs.session-token')?.value ||
      request.cookies.get('authjs.session-token')?.value,
  )
  if (hasAppSession || hasGoogleSession) return NextResponse.next()

  const next = request.nextUrl.pathname
  const loginURL = request.nextUrl.clone()
  loginURL.pathname = '/login'
  loginURL.search = ''
  loginURL.searchParams.set('next', next)
  return NextResponse.redirect(loginURL)
}

export const config = {
  matcher: [
    '/((?!login|signup|admin|api|_next|assets|fonts|\\.figma|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)',
  ],
}
