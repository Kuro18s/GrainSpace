import Image from 'next/image'
import Link from 'next/link'
import { getCurrentAppSession } from '@/lib/app-auth'
import { logoutAction } from '@/app/(frontend)/auth-actions'
import { AuthLogoutButton } from '@/components/AuthLogoutButton'

export async function RouteDock() {
  const session = await getCurrentAppSession()
  const user = session?.user
  const routes = [
    ['Tổng quan', '/'],
    ['Không gian', '/spaces'],
    ['Bộ sưu tập', '/collection'],
    ...(user?.role === 'provider' || user?.role === 'platform-admin'
      ? [['Vận hành', '/operations'] as const]
      : []),
    ['Cộng đồng', '/community'],
    ...(user && user.role !== 'provider' && user.role !== 'platform-admin'
      ? [['Đăng ký đối tác', '/provider/apply'] as const]
      : []),
    ...(user?.role === 'platform-admin' ? [['Quản trị', '/control'] as const] : []),
  ] as const

  return (
    <aside className="route-dock" aria-label="Điều hướng nhanh">
      <Link className="route-dock__brand" href="/">
        <Image alt="" height={17} src="/assets/ec17a.svg" width={17} />
        <span>FILM//SPACE</span>
      </Link>
      <nav>
        {routes.map(([label, href]) => (
          <Link href={href} key={href}>
            {label}
          </Link>
        ))}
      </nav>
      {user ? (
        session.source === 'google' ? (
          <AuthLogoutButton title={`Đăng xuất ${user.name ?? user.email ?? ''}`} />
        ) : (
          <form action={logoutAction}>
            <button title={`Đăng xuất ${user.name ?? user.email ?? ''}`} type="submit">
              Đăng xuất
            </button>
          </form>
        )
      ) : (
        <Link href="/login">Đăng nhập</Link>
      )}
    </aside>
  )
}
