import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { CurrentUserIdentity } from '@/components/CurrentUserIdentity'
import { PortfolioGallery } from '@/components/PortfolioGallery'
import { RequireAppUser } from '@/components/RequireAppUser'

export const metadata: Metadata = {
  title: 'Bộ sưu tập | FILM//SPACE',
  description: 'Tác phẩm nhiếp ảnh phim được thực hiện trong cộng đồng FILM//SPACE.',
}

function CollectionHeader() {
  return (
    <>
      <header className="flex min-h-20 w-full items-center justify-between border-b border-[#26333f] bg-[#080b0e] px-5 text-[#edf3f5] sm:px-8 lg:px-12">
        <Link className="flex items-center gap-3" href="/">
          <Image alt="" height={28} src="/assets/ec17a.svg" width={28} />
          <span className="text-[22px] font-bold tracking-[-0.7px]">FILM//SPACE</span>
        </Link>
        <nav aria-label="Điều hướng chính" className="hidden items-center gap-7 md:flex">
          <Link className="text-[13px] text-[#95a7b5] transition hover:text-[#edf3f5]" href="/">
            Tổng quan
          </Link>
          <Link
            className="text-[13px] text-[#95a7b5] transition hover:text-[#edf3f5]"
            href="/spaces"
          >
            Không gian
          </Link>
          <Link
            className="text-[13px] text-[#95a7b5] transition hover:text-[#edf3f5]"
            href="/community"
          >
            Cộng đồng
          </Link>
          <Link
            className="border-b-2 border-[#42d9f3] pb-2 text-[13px] text-[#42d9f3]"
            href="/collection"
          >
            Bộ sưu tập
          </Link>
        </nav>
        <CurrentUserIdentity />
      </header>
      <section className="relative overflow-hidden border-b border-[#26333f] bg-[#0d1218] px-5 py-16 text-[#edf3f5] sm:px-8 lg:px-12 lg:py-24">
        <div className="pointer-events-none absolute -right-16 -top-40 h-96 w-96 rounded-full bg-[#42d9f3]/10 blur-3xl" />
        <div className="relative mx-auto max-w-[1280px]">
          <p className="mb-5 font-mono text-[11px] tracking-[0.16em] text-[#ffb657]">
            ARCHIVE / SELECTED WORK / 2026
          </p>
          <h1 className="m-0 max-w-4xl text-5xl font-bold leading-[1.03] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            Mỗi cuộn phim là một câu chuyện được giữ lại.
          </h1>
          <div className="mt-8 flex max-w-3xl flex-col gap-6 border-l border-[#42d9f3] pl-5 sm:flex-row sm:items-end sm:justify-between">
            <p className="m-0 max-w-2xl text-sm leading-7 text-[#95a7b5] sm:text-base">
              Khám phá dự án từ nhiếp ảnh gia, phòng tối và studio trong cộng đồng. Từ khoảnh khắc
              bấm máy đến bản in cuối cùng, mọi tác phẩm đều gắn với một không gian thật.
            </p>
            <a
              className="shrink-0 font-mono text-[11px] tracking-[0.12em] text-[#42d9f3]"
              href="#portfolio-gallery"
            >
              XEM TÁC PHẨM ↓
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default function CollectionPage() {
  return (
    <Suspense
      fallback={<main className="auth-gate-loading">Đang xác minh phiên đăng nhập...</main>}
    >
      <RequireAppUser redirectTo="/collection">
        <main className="min-h-screen bg-[#080b0e]">
          <CollectionHeader />
          <Suspense
            fallback={<section className="auth-gate-loading">Đang tải bộ sưu tập ảnh...</section>}
          >
            <PortfolioGallery />
          </Suspense>
        </main>
      </RequireAppUser>
    </Suspense>
  )
}
