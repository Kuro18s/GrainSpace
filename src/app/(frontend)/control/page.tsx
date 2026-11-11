import ControlDesign from '@/components/figma/ControlDesign'
import { RequireAppUser } from '@/components/RequireAppUser'
import { Suspense } from 'react'

export default function ControlPage() {
  return (
    <Suspense fallback={<main className="auth-gate-loading">Đang xác minh quyền quản trị...</main>}>
      <RequireAppUser redirectTo="/control" roles={['platform-admin']}>
        <ControlDesign />
      </RequireAppUser>
    </Suspense>
  )
}
