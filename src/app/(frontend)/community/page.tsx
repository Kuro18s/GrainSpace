import type { Metadata } from 'next'
import { CommunityHub } from '@/components/CommunityHub'
import { RequireAppUser } from '@/components/RequireAppUser'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Cộng đồng | FILM//SPACE',
  description: 'Hướng dẫn, đánh giá thiết bị, workshop và thảo luận về nhiếp ảnh phim.',
}

export default function CommunityPage() {
  return (
    <Suspense
      fallback={<main className="auth-gate-loading">Đang xác minh phiên đăng nhập...</main>}
    >
      <RequireAppUser redirectTo="/community">
        <Suspense
          fallback={<main className="auth-gate-loading">Đang tải thư viện cộng đồng...</main>}
        >
          <CommunityHub />
        </Suspense>
      </RequireAppUser>
    </Suspense>
  )
}
