'use client'

import { useMemo, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { updateBookingStatusAction } from '@/app/(frontend)/operations-actions'

export type OperationsBooking = {
  bookingDate: string
  createdAt: string
  customerEmail: string
  customerName: string
  endTime: string
  id: string
  reference: string
  resources: string[]
  spaceName: string
  startTime: string
  status: 'cancelled' | 'checked-in' | 'completed' | 'confirmed' | 'pending'
  total: number
  updatedAt: string
}

const statusLabels: Record<OperationsBooking['status'], string> = {
  cancelled: 'Đã hủy',
  'checked-in': 'Đã check-in',
  completed: 'Hoàn tất',
  confirmed: 'Đã xác nhận',
  pending: 'Chờ phê duyệt',
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value))
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function BookingOperationsClient({ bookings }: { bookings: OperationsBooking[] }) {
  const router = useRouter()
  const [selected, setSelected] = useState<OperationsBooking | null>(null)
  const [feedback, setFeedback] = useState('')
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | OperationsBooking['status']>('all')
  const [isPending, startTransition] = useTransition()
  const visibleBookings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return bookings.filter((booking) => {
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
      const searchable = [
        booking.reference,
        booking.customerName,
        booking.customerEmail,
        booking.spaceName,
      ]
        .join(' ')
        .toLowerCase()
      return matchesStatus && (!normalizedQuery || searchable.includes(normalizedQuery))
    })
  }, [bookings, query, statusFilter])
  const pendingCount = bookings.filter((booking) => booking.status === 'pending').length
  const confirmedCount = bookings.filter((booking) => booking.status === 'confirmed').length
  const confirmedRevenue = bookings
    .filter((booking) => booking.status === 'confirmed' || booking.status === 'completed')
    .reduce((total, booking) => total + booking.total, 0)

  const changeStatus = (booking: OperationsBooking, status: OperationsBooking['status']) => {
    setFeedback('')
    startTransition(async () => {
      const result = await updateBookingStatusAction({ bookingId: booking.id, status })
      if (!result.ok) {
        setFeedback(result.error)
        return
      }
      setSelected((current) => (current ? { ...current, status: result.status } : current))
      setFeedback(`Đã chuyển lịch sang “${statusLabels[result.status]}”.`)
      router.refresh()
    })
  }

  return (
    <section
      className="bg-[#0d1218] px-5 py-12 text-[#edf3f5] sm:px-8 lg:px-12"
      aria-labelledby="booking-operations-title"
    >
      <div className="mx-auto max-w-[1280px] border border-[#26333f] bg-[#101a22]">
        <header className="flex flex-col gap-4 border-b border-[#26333f] p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
          <div>
            <p className="mb-2 font-mono text-[10px] tracking-[0.14em] text-[#42d9f3]">
              VẬN HÀNH / BOOKING THỰC TẾ
            </p>
            <h2 id="booking-operations-title" className="m-0 text-2xl font-bold">
              Quản lý lịch đặt chỗ
            </h2>
            <p className="mb-0 mt-2 text-sm text-[#95a7b5]">
              Phê duyệt lịch, kiểm tra khách hàng, phòng và khung giờ trong một màn hình.
            </p>
          </div>
          <div className="border border-[#26333f] bg-[#0d1218] px-4 py-3 font-mono text-xs text-[#95a7b5]">
            TỔNG LỊCH <strong className="ml-3 text-[#edf3f5]">{bookings.length}</strong>
          </div>
        </header>

        <div className="grid gap-px border-b border-[#26333f] bg-[#26333f] sm:grid-cols-3">
          {[
            ['Chờ phê duyệt', pendingCount.toLocaleString('vi-VN'), 'text-[#ffb657]'],
            ['Đã xác nhận', confirmedCount.toLocaleString('vi-VN'), 'text-[#4ee39a]'],
            [
              'Doanh thu xác nhận',
              `${confirmedRevenue.toLocaleString('vi-VN')}đ`,
              'text-[#42d9f3]',
            ],
          ].map(([label, value, color]) => (
            <article className="bg-[#0d1218] p-5" key={label}>
              <p className="m-0 font-mono text-[10px] uppercase tracking-[0.08em] text-[#617584]">
                {label}
              </p>
              <strong className={`mt-2 block text-xl ${color}`}>{value}</strong>
            </article>
          ))}
        </div>

        <div className="grid gap-3 border-b border-[#26333f] p-4 sm:grid-cols-[1fr_auto] sm:p-5">
          <label className="grid gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#617584]">
              Tìm lịch đặt chỗ
            </span>
            <input
              className="min-h-11 border border-[#26333f] bg-[#0d1218] px-3 text-sm text-[#edf3f5] outline-none placeholder:text-[#617584] focus:border-[#42d9f3]"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Mã lịch, khách hàng, email hoặc phòng..."
              type="search"
              value={query}
            />
          </label>
          <label className="grid gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#617584]">
              Trạng thái
            </span>
            <select
              className="min-h-11 min-w-48 border border-[#26333f] bg-[#0d1218] px-3 text-sm text-[#edf3f5] outline-none focus:border-[#42d9f3]"
              onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}
              value={statusFilter}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Chờ phê duyệt</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="checked-in">Đã check-in</option>
              <option value="completed">Hoàn tất</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </label>
        </div>

        {bookings.length === 0 ? (
          <div className="grid min-h-64 place-items-center p-8 text-center">
            <div>
              <p className="font-mono text-xs tracking-[0.12em] text-[#42d9f3]">CHƯA CÓ BOOKING</p>
              <h3 className="mt-3 text-xl">Lịch mới sẽ xuất hiện tại đây.</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#95a7b5]">
                Khi khách hàng hoàn tất đặt phòng, ekip có thể xem chi tiết và xác nhận lịch ngay
                trên bảng này.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead className="bg-[#0d1218] font-mono text-[10px] tracking-[0.08em] text-[#617584]">
                <tr>
                  <th className="px-5 py-4 font-normal">MÃ LỊCH</th>
                  <th className="px-5 py-4 font-normal">KHÁCH HÀNG</th>
                  <th className="px-5 py-4 font-normal">PHÒNG / THỜI GIAN</th>
                  <th className="px-5 py-4 font-normal">TRẠNG THÁI</th>
                  <th className="px-5 py-4 font-normal">THAO TÁC</th>
                </tr>
              </thead>
              <tbody>
                {visibleBookings.map((booking) => (
                  <tr className="border-t border-[#26333f] text-sm" key={booking.id}>
                    <td className="px-5 py-5 font-mono text-xs text-[#42d9f3]">
                      {booking.reference}
                    </td>
                    <td className="px-5 py-5">
                      <strong className="block">{booking.customerName}</strong>
                      <span className="mt-1 block text-xs text-[#95a7b5]">
                        {booking.customerEmail}
                      </span>
                    </td>
                    <td className="px-5 py-5">
                      <strong className="block">{booking.spaceName}</strong>
                      <span className="mt-1 block text-xs text-[#95a7b5]">
                        {formatDate(booking.bookingDate)} · {booking.startTime}–{booking.endTime}
                      </span>
                    </td>
                    <td className="px-5 py-5">
                      <span className="inline-flex border border-[#617584] px-2.5 py-1 font-mono text-[10px] text-[#95a7b5]">
                        {statusLabels[booking.status]}
                      </span>
                    </td>
                    <td className="px-5 py-5">
                      <button
                        className="min-h-10 border border-[#617584] px-4 text-xs font-bold text-[#edf3f5] hover:border-[#42d9f3] hover:text-[#42d9f3]"
                        onClick={() => setSelected(booking)}
                        type="button"
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visibleBookings.length === 0 && (
              <div className="border-t border-[#26333f] p-10 text-center text-sm text-[#95a7b5]">
                Không tìm thấy lịch đặt chỗ phù hợp với bộ lọc.
              </div>
            )}
          </div>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[110] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
          onMouseDown={() => setSelected(null)}
          role="presentation"
        >
          <section
            aria-labelledby="booking-detail-title"
            aria-modal="true"
            className="max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto border border-[#42d9f3] bg-[#101a22] shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
          >
            <header className="flex items-start justify-between border-b border-[#26333f] p-5 sm:p-7">
              <div>
                <p className="mb-2 font-mono text-[10px] tracking-[0.12em] text-[#42d9f3]">
                  {selected.reference}
                </p>
                <h2 className="m-0 text-2xl" id="booking-detail-title">
                  Chi tiết lịch đặt chỗ
                </h2>
              </div>
              <button
                aria-label="Đóng chi tiết"
                className="min-h-11 min-w-11 border border-[#26333f] text-xl text-[#95a7b5] hover:border-[#42d9f3] hover:text-[#42d9f3]"
                onClick={() => setSelected(null)}
                type="button"
              >
                ×
              </button>
            </header>

            <div className="grid gap-px bg-[#26333f] sm:grid-cols-2">
              {[
                ['Khách hàng', selected.customerName],
                ['Email', selected.customerEmail || 'Chưa cung cấp'],
                ['Không gian', selected.spaceName],
                ['Ngày chụp', formatDate(selected.bookingDate)],
                ['Khung giờ', `${selected.startTime}–${selected.endTime}`],
                ['Tổng giá trị', `${selected.total.toLocaleString('vi-VN')}đ`],
                ['Tạo lúc', formatDateTime(selected.createdAt)],
                ['Cập nhật', formatDateTime(selected.updatedAt)],
              ].map(([label, value]) => (
                <div className="bg-[#0d1218] p-5" key={label}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#617584]">
                    {label}
                  </dt>
                  <dd className="mb-0 ml-0 mt-2 text-sm text-[#edf3f5]">{value}</dd>
                </div>
              ))}
            </div>

            <div className="border-t border-[#26333f] p-5 sm:p-7">
              <p className="mb-3 font-mono text-[10px] tracking-[0.08em] text-[#617584]">
                DỊCH VỤ / THIẾT BỊ
              </p>
              <p className="m-0 text-sm text-[#95a7b5]">
                {selected.resources.length > 0
                  ? selected.resources.join(' · ')
                  : 'Chưa chọn thiết bị bổ sung'}
              </p>
            </div>

            <footer className="border-t border-[#26333f] p-5 sm:p-7">
              <p className="mb-3 mt-0 font-mono text-[10px] tracking-[0.08em] text-[#617584]">
                CẬP NHẬT TRẠNG THÁI
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {selected.status === 'pending' && (
                  <button
                    className="min-h-12 border border-[#4ee39a] bg-[#152c26] px-4 text-sm font-bold text-[#4ee39a] disabled:opacity-40"
                    disabled={isPending}
                    onClick={() => changeStatus(selected, 'confirmed')}
                    type="button"
                  >
                    Xác nhận lịch
                  </button>
                )}
                {selected.status === 'confirmed' && (
                  <button
                    className="min-h-12 border border-[#42d9f3] bg-[#102c36] px-4 text-sm font-bold text-[#42d9f3] disabled:opacity-40"
                    disabled={isPending}
                    onClick={() => changeStatus(selected, 'checked-in')}
                    type="button"
                  >
                    Check-in
                  </button>
                )}
                {selected.status === 'checked-in' && (
                  <button
                    className="min-h-12 border border-[#4ee39a] bg-[#152c26] px-4 text-sm font-bold text-[#4ee39a] disabled:opacity-40"
                    disabled={isPending}
                    onClick={() => changeStatus(selected, 'completed')}
                    type="button"
                  >
                    Check-out & hoàn tất
                  </button>
                )}
                {(selected.status === 'pending' || selected.status === 'confirmed') && (
                  <button
                    className="min-h-12 border border-[#ff6b6b] bg-[#301a1a] px-4 text-sm font-bold text-[#ff8b8b] disabled:opacity-40"
                    disabled={isPending}
                    onClick={() => changeStatus(selected, 'cancelled')}
                    type="button"
                  >
                    Hủy lịch
                  </button>
                )}
                {(selected.status === 'completed' || selected.status === 'cancelled') && (
                  <p className="m-0 text-sm text-[#95a7b5]">
                    Lịch đã kết thúc, không thể đổi trạng thái.
                  </p>
                )}
              </div>
              {feedback && (
                <p className="mb-0 mt-4 text-sm text-[#95a7b5]" role="status">
                  {feedback}
                </p>
              )}
            </footer>
          </section>
        </div>
      )}
    </section>
  )
}
