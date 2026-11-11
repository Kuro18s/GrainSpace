import SpacesDesign from '@/components/figma/SpacesDesign'
import { RequireAppUser } from '@/components/RequireAppUser'
import { Suspense } from 'react'
import { SpaceVisualGallery } from '@/components/SpaceVisualGallery'
import { CustomerReviews } from '@/components/CustomerReviews'
import { PortfolioGallery } from '@/components/PortfolioGallery'

export default function SpacesPage() {
  return (
    <Suspense
      fallback={<main className="auth-gate-loading">Đang xác minh phiên đăng nhập...</main>}
    >
      <RequireAppUser redirectTo="/spaces">
        <SpacesDesign />
        <Suspense
          fallback={
            <section className="auth-gate-loading">Đang tải hình ảnh không gian...</section>
          }
        >
          <SpaceVisualGallery />
        </Suspense>
        <Suspense fallback={<section className="auth-gate-loading">Đang tải portfolio...</section>}>
          <PortfolioGallery />
        </Suspense>
        <CustomerReviews />
      </RequireAppUser>
    </Suspense>
  )
}
