import HomeDesign from '@/components/figma/HomeDesign'
import { RequireAppUser } from '@/components/RequireAppUser'
import { Suspense } from 'react'

export default function HomePage() {
  return (
    <Suspense fallback={<main className="auth-gate-loading">Đang xác minh phiên đăng nhập...</main>}>
      <RequireAppUser redirectTo="/">
        <HomeDesign />
      </RequireAppUser>
    </Suspense>
  )
}
