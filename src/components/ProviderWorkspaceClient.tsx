'use client'

import { FormEvent, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  deleteProviderRecordAction,
  savePackageAction,
  savePromotionAction,
  saveResourceAction,
  saveSpaceAction,
} from '@/app/(frontend)/provider-actions'

type Option = { id: string; name: string }
const field =
  'min-h-11 w-full border border-[#26333f] bg-[#080b0e] px-3 text-sm text-[#edf3f5] outline-none focus:border-[#42d9f3]'

export function ProviderWorkspaceClient({
  experts,
  packages,
  promotions,
  resources,
  spaces,
}: {
  experts: Option[]
  packages: Option[]
  promotions: Option[]
  resources: Array<Option & { space: string }>
  spaces: Option[]
}) {
  const router = useRouter()
  const [tab, setTab] = useState<'packages' | 'promotions' | 'resources' | 'spaces'>('spaces')
  const [feedback, setFeedback] = useState('')
  const [selected, setSelected] = useState<Record<string, string>>({})
  const [isPending, startTransition] = useTransition()
  const run = (task: () => Promise<{ ok: boolean; message?: string; error?: string }>) => {
    setFeedback('')
    startTransition(async () => {
      const result = await task()
      setFeedback(result.ok ? (result.message ?? 'Đã lưu.') : (result.error ?? 'Không thể lưu.'))
      if (result.ok) router.refresh()
    })
  }
  const form = (event: FormEvent<HTMLFormElement>) => new FormData(event.currentTarget)

  return (
    <section
      className="bg-[#080b0e] px-5 py-12 text-[#edf3f5] sm:px-8 lg:px-12"
      aria-labelledby="provider-workspace-title"
    >
      <div className="mx-auto max-w-[1280px] border border-[#26333f] bg-[#101a22]">
        <header className="border-b border-[#26333f] p-6">
          <p className="mb-2 font-mono text-[10px] tracking-[0.14em] text-[#42d9f3]">
            CORE FLOW / QUẢN LÝ NHÀ CUNG CẤP
          </p>
          <h2 className="m-0 text-2xl" id="provider-workspace-title">
            Phòng, thiết bị và gói dịch vụ
          </h2>
        </header>
        <div className="flex overflow-x-auto border-b border-[#26333f]">
          {(
            [
              ['spaces', 'Không gian'],
              ['resources', 'Thiết bị'],
              ['packages', 'Gói dịch vụ'],
              ['promotions', 'Khuyến mãi'],
            ] as const
          ).map(([value, label]) => (
            <button
              className={`min-h-12 border-b-2 px-5 text-sm ${tab === value ? 'border-[#42d9f3] text-[#42d9f3]' : 'border-transparent text-[#95a7b5]'}`}
              key={value}
              onClick={() => setTab(value)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'spaces' && (
          <form
            className="grid gap-4 p-6 md:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault()
              const data = form(event)
              run(() =>
                saveSpaceAction({
                  acoustics: String(data.get('acoustics') ?? ''),
                  address: String(data.get('address') ?? ''),
                  area: Number(data.get('area')),
                  capacity: Number(data.get('capacity')),
                  dailyRate: Number(data.get('dailyRate')),
                  description: String(data.get('description') ?? ''),
                  district: String(data.get('district') ?? ''),
                  halfDayRate: Number(data.get('halfDayRate')),
                  hourlyRate: Number(data.get('hourlyRate')),
                  id: String(data.get('id') ?? '') || undefined,
                  lighting: String(data.get('lighting') ?? ''),
                  name: String(data.get('name') ?? ''),
                  policies: String(data.get('policies') ?? ''),
                  pricingModel: String(data.get('pricingModel')) as
                    | 'daily'
                    | 'half-day'
                    | 'hourly'
                    | 'package',
                  slug: String(data.get('slug') ?? ''),
                  style: String(data.get('style') ?? ''),
                  type: String(data.get('type')) as 'darkroom' | 'processing-room' | 'studio',
                  ventilation: String(data.get('ventilation') ?? ''),
                }),
              )
            }}
          >
            <SelectExisting
              items={spaces}
              label="Tạo mới hoặc sửa không gian"
              onChange={(id) => setSelected((current) => ({ ...current, spaces: id }))}
              value={selected.spaces ?? ''}
            />
            <Input name="name" label="Tên không gian" required />
            <Input name="slug" label="Slug" required />
            <label>
              Loại
              <select className={field} name="type">
                <option value="studio">Studio</option>
                <option value="darkroom">Phòng tối</option>
                <option value="processing-room">Phòng tráng</option>
              </select>
            </label>
            <Input name="address" label="Địa chỉ" required />
            <Input name="district" label="Khu vực / quận" required />
            <Input name="area" label="Diện tích (m²)" type="number" required />
            <Input name="capacity" label="Sức chứa" type="number" required />
            <Input name="style" label="Phong cách" />
            <Input name="lighting" label="Ánh sáng" />
            <Input name="ventilation" label="Thông gió" />
            <Input name="acoustics" label="Âm thanh" />
            <label>
              Mô hình giá
              <select className={field} name="pricingModel">
                <option value="hourly">Theo giờ</option>
                <option value="half-day">Nửa ngày</option>
                <option value="daily">Theo ngày</option>
                <option value="package">Theo gói</option>
              </select>
            </label>
            <Input name="hourlyRate" label="Giá/giờ" type="number" required />
            <Input name="halfDayRate" label="Giá nửa ngày" type="number" />
            <Input name="dailyRate" label="Giá cả ngày" type="number" />
            <Input name="policies" label="Chính sách" />
            <label className="md:col-span-2">
              Mô tả
              <textarea className={`${field} min-h-28 py-3`} name="description" required />
            </label>
            <Submit pending={isPending} />
            <DeleteButton
              disabled={isPending}
              id={selected.spaces}
              onDelete={() => run(() => deleteProviderRecordAction('spaces', selected.spaces))}
            />
          </form>
        )}

        {tab === 'resources' && (
          <form
            className="grid gap-4 p-6 md:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault()
              const data = form(event)
              run(() =>
                saveResourceAction({
                  code: String(data.get('code') ?? ''),
                  description: String(data.get('description') ?? ''),
                  hourlyRate: Number(data.get('hourlyRate')),
                  id: String(data.get('id') ?? '') || undefined,
                  name: String(data.get('name') ?? ''),
                  space: String(data.get('space') ?? ''),
                  type: String(data.get('type')) as
                    | 'camera'
                    | 'consumable'
                    | 'darkroom-equipment'
                    | 'lens',
                }),
              )
            }}
          >
            <SelectExisting
              items={resources}
              label="Tạo mới hoặc sửa thiết bị"
              onChange={(id) => setSelected((current) => ({ ...current, resources: id }))}
              value={selected.resources ?? ''}
            />
            <Input name="name" label="Tên thiết bị / vật tư" required />
            <Input name="code" label="Mã tài nguyên" required />
            <label>
              Không gian
              <select className={field} name="space" required>
                <option value="">Chọn không gian</option>
                {spaces.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Loại
              <select className={field} name="type">
                <option value="camera">Máy ảnh</option>
                <option value="lens">Ống kính</option>
                <option value="darkroom-equipment">Thiết bị phòng tối</option>
                <option value="consumable">Vật tư</option>
              </select>
            </label>
            <Input name="hourlyRate" label="Giá/giờ" type="number" />
            <Input name="description" label="Mô tả" />
            <Submit pending={isPending} />
            <DeleteButton
              disabled={isPending}
              id={selected.resources}
              onDelete={() =>
                run(() => deleteProviderRecordAction('resources', selected.resources))
              }
            />
          </form>
        )}

        {tab === 'packages' && (
          <form
            className="grid gap-4 p-6 md:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault()
              const data = form(event)
              run(() =>
                savePackageAction({
                  basePrice: Number(data.get('basePrice')),
                  description: String(data.get('description') ?? ''),
                  durationHours: Number(data.get('durationHours')),
                  id: String(data.get('id') ?? '') || undefined,
                  instructor: String(data.get('instructor') ?? '') || undefined,
                  name: String(data.get('name') ?? ''),
                  resources: data.getAll('resources').map(String),
                  slug: String(data.get('slug') ?? ''),
                  space: String(data.get('space') ?? ''),
                  type: String(data.get('type')) as
                    | 'custom'
                    | 'film-processing'
                    | 'portrait'
                    | 'printing'
                    | 'product'
                    | 'workshop',
                }),
              )
            }}
          >
            <SelectExisting
              items={packages}
              label="Tạo mới hoặc sửa gói"
              onChange={(id) => setSelected((current) => ({ ...current, packages: id }))}
              value={selected.packages ?? ''}
            />
            <Input name="name" label="Tên gói" required />
            <Input name="slug" label="Slug" required />
            <label>
              Loại gói
              <select className={field} name="type">
                <option value="portrait">Chân dung</option>
                <option value="product">Sản phẩm</option>
                <option value="film-processing">Tráng phim</option>
                <option value="printing">In ảnh</option>
                <option value="workshop">Workshop</option>
                <option value="custom">Tùy chỉnh</option>
              </select>
            </label>
            <label>
              Phòng
              <select className={field} name="space" required>
                <option value="">Chọn phòng</option>
                {spaces.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Giảng viên
              <select className={field} name="instructor">
                <option value="">Không có</option>
                {experts.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="md:col-span-2">
              Thiết bị
              <select className={`${field} min-h-28`} multiple name="resources">
                {resources.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <Input name="durationHours" label="Thời lượng (giờ)" type="number" required />
            <Input name="basePrice" label="Giá gói" type="number" required />
            <label className="md:col-span-2">
              Mô tả
              <textarea className={`${field} min-h-28 py-3`} name="description" required />
            </label>
            <Submit pending={isPending} />
            <DeleteButton
              disabled={isPending}
              id={selected.packages}
              onDelete={() =>
                run(() => deleteProviderRecordAction('service-packages', selected.packages))
              }
            />
          </form>
        )}
        {tab === 'promotions' && (
          <form
            className="grid gap-4 p-6 md:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault()
              const data = form(event)
              run(() =>
                savePromotionAction({
                  code: String(data.get('code') ?? ''),
                  discountType: String(data.get('discountType')) as 'fixed' | 'percent',
                  discountValue: Number(data.get('discountValue')),
                  endsAt: String(data.get('endsAt') ?? ''),
                  id: String(data.get('id') ?? '') || undefined,
                  name: String(data.get('name') ?? ''),
                  packages: data.getAll('packages').map(String),
                  spaces: data.getAll('spaces').map(String),
                  startsAt: String(data.get('startsAt') ?? ''),
                }),
              )
            }}
          >
            <SelectExisting
              items={promotions}
              label="Tạo mới hoặc sửa chiến dịch"
              onChange={(id) => setSelected((current) => ({ ...current, promotions: id }))}
              value={selected.promotions ?? ''}
            />
            <Input name="name" label="Tên chiến dịch" required />
            <Input name="code" label="Mã khuyến mãi" required />
            <label>
              Loại giảm
              <select className={field} name="discountType">
                <option value="percent">Phần trăm</option>
                <option value="fixed">Số tiền</option>
              </select>
            </label>
            <Input name="discountValue" label="Mức giảm" type="number" required />
            <Input name="startsAt" label="Bắt đầu" type="datetime-local" required />
            <Input name="endsAt" label="Kết thúc" type="datetime-local" required />
            <label>
              Phòng áp dụng
              <select className={`${field} min-h-28`} multiple name="spaces">
                {spaces.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Gói áp dụng
              <select className={`${field} min-h-28`} multiple name="packages">
                {packages.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <Submit pending={isPending} />
            <DeleteButton
              disabled={isPending}
              id={selected.promotions}
              onDelete={() =>
                run(() => deleteProviderRecordAction('promotions', selected.promotions))
              }
            />
          </form>
        )}
        {feedback && (
          <p className="m-0 border-t border-[#26333f] p-4 text-sm text-[#95a7b5]" role="status">
            {feedback}
          </p>
        )}
      </div>
    </section>
  )
}

function Input({
  label,
  name,
  required,
  type = 'text',
}: {
  label: string
  name: string
  required?: boolean
  type?: string
}) {
  return (
    <label>
      {label}
      <input className={field} name={name} required={required} type={type} />
    </label>
  )
}
function SelectExisting({
  items,
  label,
  onChange,
  value,
}: {
  items: Option[]
  label: string
  onChange: (id: string) => void
  value: string
}) {
  return (
    <label>
      {label}
      <select
        className={field}
        name="id"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value="">Tạo mới</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>{`Sửa: ${item.name}`}</option>
        ))}
      </select>
    </label>
  )
}
function Submit({ pending }: { pending: boolean }) {
  return (
    <button
      className="min-h-12 border border-[#42d9f3] bg-[#42d9f3] px-5 font-bold text-[#080b0e] disabled:opacity-40 md:col-span-2"
      disabled={pending}
      type="submit"
    >
      {pending ? 'Đang lưu...' : 'Lưu thay đổi'}
    </button>
  )
}
function DeleteButton({
  disabled,
  id,
  onDelete,
}: {
  disabled: boolean
  id?: string
  onDelete: () => void
}) {
  if (!id) return null
  return (
    <button
      className="min-h-11 border border-[#ff6b6b] px-5 font-bold text-[#ff9b9b] disabled:opacity-40 md:col-span-2"
      disabled={disabled}
      onClick={() => {
        if (window.confirm('Xóa bản ghi này? Thao tác không thể hoàn tác.')) onDelete()
      }}
      type="button"
    >
      Xóa bản ghi đã chọn
    </button>
  )
}
