'use client'

import { FormEvent, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deleteProviderRecordAction, savePortfolioAction } from '@/app/(frontend)/provider-actions'

type Portfolio = {
  description: string
  id: string
  imageCount: number
  published: boolean
  slug: string
  space: string
  title: string
}

const field =
  'min-h-11 w-full border border-[#26333f] bg-[#080b0e] px-3 text-sm text-[#edf3f5] outline-none focus:border-[#42d9f3]'

export function PortfolioManagerClient({
  portfolios,
  spaces,
}: {
  portfolios: Portfolio[]
  spaces: Array<{ id: string; name: string }>
}) {
  const router = useRouter()
  const [selectedID, setSelectedID] = useState('')
  const [feedback, setFeedback] = useState('')
  const [pending, startTransition] = useTransition()
  const selected = portfolios.find((portfolio) => portfolio.id === selectedID)

  const run = (task: () => Promise<{ ok: boolean; error?: string; message?: string }>) => {
    setFeedback('')
    startTransition(async () => {
      const result = await task()
      setFeedback(result.ok ? (result.message ?? 'Đã lưu.') : (result.error ?? 'Không thể lưu.'))
      if (result.ok) router.refresh()
    })
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    run(() => savePortfolioAction(data))
  }

  return (
    <section
      aria-labelledby="portfolio-manager-title"
      className="bg-[#080b0e] px-5 py-12 text-[#edf3f5] sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-[1280px] border border-[#26333f] bg-[#101a22]">
        <header className="grid gap-4 border-b border-[#26333f] p-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-2 font-mono text-[10px] tracking-[0.14em] text-[#42d9f3]">
              PORTFOLIO / MEDIA LIBRARY
            </p>
            <h2 className="m-0 text-2xl" id="portfolio-manager-title">
              Bộ sưu tập ảnh
            </h2>
            <p className="mb-0 mt-2 text-sm text-[#95a7b5]">
              Tải ảnh dự án, hậu trường và không gian để xuất bản trên trang khám phá.
            </p>
          </div>
          <span className="font-mono text-xs text-[#95a7b5]">{portfolios.length} BỘ SƯU TẬP</span>
        </header>

        <form className="grid gap-4 p-6 md:grid-cols-2" key={selectedID} onSubmit={submit}>
          <label>
            Chọn portfolio
            <select
              className={field}
              name="id"
              onChange={(event) => setSelectedID(event.target.value)}
              value={selectedID}
            >
              <option value="">Tạo bộ sưu tập mới</option>
              {portfolios.map((portfolio) => (
                <option key={portfolio.id} value={portfolio.id}>
                  {portfolio.title} · {portfolio.imageCount} ảnh
                </option>
              ))}
            </select>
          </label>
          <label>
            Không gian liên kết
            <select className={field} defaultValue={selected?.space ?? ''} name="space">
              <option value="">Không gắn với phòng cụ thể</option>
              {spaces.map((space) => (
                <option key={space.id} value={space.id}>
                  {space.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Tên bộ sưu tập
            <input className={field} defaultValue={selected?.title ?? ''} name="title" required />
          </label>
          <label>
            Slug
            <input
              className={field}
              defaultValue={selected?.slug ?? ''}
              name="slug"
              pattern="[a-z0-9-]+"
              required
            />
          </label>
          <label className="md:col-span-2">
            Mô tả
            <textarea
              className={`${field} min-h-28 py-3`}
              defaultValue={selected?.description ?? ''}
              name="description"
              required
            />
          </label>
          <label className="md:col-span-2">
            {selected ? 'Thêm ảnh mới vào portfolio' : 'Ảnh portfolio'}
            <input
              accept="image/*"
              className={`${field} py-2`}
              multiple
              name="images"
              required={!selected}
              type="file"
            />
            <span className="mt-2 block text-xs text-[#617584]">
              Tối đa 8 ảnh mỗi lần, 10 MB/ảnh. Ảnh mới sẽ được nối vào bộ sưu tập hiện tại.
            </span>
          </label>
          <label className="flex min-h-11 items-center gap-3 border border-[#26333f] px-3">
            <input
              defaultChecked={selected?.published ?? false}
              name="published"
              type="checkbox"
              value="true"
            />
            Công khai trên trang Không gian
          </label>
          <button
            className="min-h-11 bg-[#42d9f3] px-5 font-bold text-[#080b0e] disabled:opacity-40"
            disabled={pending}
            type="submit"
          >
            {pending ? 'Đang tải ảnh...' : selected ? 'Cập nhật portfolio' : 'Tạo portfolio'}
          </button>
          {selected && (
            <button
              className="min-h-11 border border-[#ff6b6b] px-5 font-bold text-[#ff9b9b] disabled:opacity-40 md:col-span-2"
              disabled={pending}
              onClick={() => {
                if (
                  window.confirm('Xóa portfolio này? Ảnh gốc vẫn được giữ trong thư viện Media.')
                ) {
                  run(() => deleteProviderRecordAction('portfolios', selected.id))
                }
              }}
              type="button"
            >
              Xóa portfolio đã chọn
            </button>
          )}
        </form>
        {feedback && (
          <p className="m-0 border-t border-[#26333f] p-4 text-sm text-[#95a7b5]" role="status">
            {feedback}
          </p>
        )}
      </div>
    </section>
  )
}
