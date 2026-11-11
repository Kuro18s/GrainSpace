import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { getCurrentAppUser } from '@/lib/app-auth'

export const metadata: Metadata = {
  title: 'Cổng nhà cung cấp | FILM//SPACE',
  description: 'Đăng ký hoặc truy cập workspace vận hành dành cho nhà cung cấp FILM//SPACE.',
}

async function ProviderDestination() {
  const user = await getCurrentAppUser()
  if (!user) return redirect('/login?next=%2Fprovider')
  if (user.role === 'provider' || user.role === 'platform-admin') return redirect('/operations')
  return redirect('/provider/apply')
}

export default function ProviderPage() {
  return (
    <Suspense
      fallback={
        <main className="auth-gate-loading">Đang mở không gian dành cho nhà cung cấp...</main>
      }
    >
      <ProviderDestination />
    </Suspense>
  )
}
