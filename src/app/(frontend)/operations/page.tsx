import OperationsDesign from '@/components/figma/OperationsDesign'
import { RequireAppUser } from '@/components/RequireAppUser'
import { Suspense } from 'react'
import { BookingOperations } from '@/components/BookingOperations'
import { ProviderWorkspace } from '@/components/ProviderWorkspace'
import { OperationalDataSummary } from '@/components/OperationalDataSummary'
import { PortfolioManager } from '@/components/PortfolioManager'

export default function OperationsPage() {
  return (
    <Suspense
      fallback={<main className="auth-gate-loading">Đang xác minh phiên đăng nhập...</main>}
    >
      <RequireAppUser redirectTo="/operations" roles={['provider', 'platform-admin']}>
        <OperationsDesign />
        <Suspense
          fallback={
            <section className="auth-gate-loading">Đang tổng hợp dữ liệu vận hành...</section>
          }
        >
          <OperationalDataSummary />
        </Suspense>
        <Suspense
          fallback={
            <section className="auth-gate-loading">Đang tải workspace nhà cung cấp...</section>
          }
        >
          <ProviderWorkspace />
        </Suspense>
        <Suspense
          fallback={<section className="auth-gate-loading">Đang tải bộ sưu tập ảnh...</section>}
        >
          <PortfolioManager />
        </Suspense>
        <Suspense
          fallback={<section className="auth-gate-loading">Đang tải lịch đặt chỗ...</section>}
        >
          <BookingOperations />
        </Suspense>
      </RequireAppUser>
    </Suspense>
  )
}
