import { Suspense } from 'react'
import { RequireAppUser } from '@/components/RequireAppUser'
import { ProviderApplicationForm } from '@/components/ProviderApplicationForm'

export default function ProviderApplyPage() {
  return (
    <Suspense
      fallback={<main className="auth-gate-loading">Đang xác minh phiên đăng nhập...</main>}
    >
      <RequireAppUser redirectTo="/provider/apply">
        <main className="min-h-screen bg-[#080b0e] px-5 py-16 text-[#edf3f5] sm:px-8">
          <div className="mx-auto max-w-2xl">
            <p className="mb-3 font-mono text-[10px] tracking-[0.14em] text-[#42d9f3]">
              ĐỐI TÁC / ĐĂNG KÝ NHÀ CUNG CẤP
            </p>
            <h1 className="m-0 text-4xl">Đưa không gian của bạn lên FILM//SPACE.</h1>
            <p className="mb-8 mt-4 leading-7 text-[#95a7b5]">
              Gửi thông tin vận hành để đội ngũ nền tảng xét duyệt. Sau khi được chấp thuận, tài
              khoản sẽ mở workspace quản lý phòng, thiết bị và gói dịch vụ.
            </p>
            <ProviderApplicationForm />
          </div>
        </main>
      </RequireAppUser>
    </Suspense>
  )
}
