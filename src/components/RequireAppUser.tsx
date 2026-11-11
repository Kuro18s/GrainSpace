import { redirect } from 'next/navigation'
import { getCurrentAppUser } from '@/lib/app-auth'

export async function RequireAppUser({
  children,
  redirectTo,
  roles,
}: {
  children: React.ReactNode
  redirectTo: string
  roles?: Array<'customer' | 'expert' | 'photographer' | 'platform-admin' | 'provider'>
}) {
  const user = await getCurrentAppUser()
  if (!user) redirect(`/login?next=${encodeURIComponent(redirectTo)}`)
  if (roles && (!user.role || !roles.includes(user.role))) redirect('/')
  return children
}
