import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { syncGoogleUser } from '@/lib/google-user'
import {
  CSRF_COOKIE,
  SESSION_COOKIE,
  SESSION_COOKIE_OPTIONS,
  SESSION_MAX_AGE,
} from '@/lib/session-cookie'

if (
  !process.env.AUTH_URL &&
  process.env.NEXT_PUBLIC_SITE_URL &&
  !process.env.NEXT_PUBLIC_SITE_URL.includes('localhost')
) {
  process.env.AUTH_URL = process.env.NEXT_PUBLIC_SITE_URL
}

export const { handlers, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  providers: [Google],
  session: { strategy: 'jwt', maxAge: SESSION_MAX_AGE },
  cookies: {
    sessionToken: { name: SESSION_COOKIE, options: SESSION_COOKIE_OPTIONS },
    csrfToken: { name: CSRF_COOKIE, options: SESSION_COOKIE_OPTIONS },
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === 'google' && profile) {
        const googleProfile = profile as {
          email?: string
          email_verified?: boolean
          name?: string
          picture?: string
          sub?: string
        }
        if (!googleProfile.email || !googleProfile.email_verified || !googleProfile.sub) {
          throw new Error('Google account must provide a verified email address')
        }
        const user = await syncGoogleUser({
          email: googleProfile.email,
          googleId: googleProfile.sub,
          image: googleProfile.picture,
          name: googleProfile.name ?? googleProfile.email.split('@')[0],
        })
        token.appUserId = String(user.id)
      }
      return token
    },
    session({ session, token }) {
      if (session.user && typeof token.appUserId === 'string') {
        session.user.id = token.appUserId
      }
      return session
    },
  },
})
