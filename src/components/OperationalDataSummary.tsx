import config from '@payload-config'
import { getPayload } from 'payload'
import { getCurrentAppUser } from '@/lib/app-auth'

const money = new Intl.NumberFormat('vi-VN', {
  currency: 'VND',
  maximumFractionDigits: 0,
  style: 'currency',
})

export async function OperationalDataSummary() {
  const user = await getCurrentAppUser()
  if (!user || (user.role !== 'provider' && user.role !== 'platform-admin')) return null

  const payload = await getPayload({ config })
  const [bookings, transactions, maintenance, disputes] = await Promise.all([
    payload.find({
      collection: 'bookings',
      depth: 0,
      limit: 100,
      overrideAccess: false,
      sort: '-bookingDate',
      user,
    }),
    payload.find({
      collection: 'transactions',
      depth: 0,
      limit: 100,
      overrideAccess: false,
      sort: '-createdAt',
      user,
    }),
    payload.find({
      collection: 'maintenance-records',
      depth: 0,
      limit: 100,
      overrideAccess: false,
      sort: 'scheduledAt',
      user,
    }),
    payload.find({
      collection: 'disputes',
      depth: 0,
      limit: 100,
      overrideAccess: false,
      sort: '-createdAt',
      user,
    }),
  ])

  const paidRevenue = transactions.docs
    .filter((transaction) => transaction.status === 'paid')
    .reduce((total, transaction) => total + transaction.amount, 0)
  const activeBookings = bookings.docs.filter((booking) =>
    ['pending', 'confirmed', 'checked-in'].includes(booking.status),
  ).length
  const pendingMaintenance = maintenance.docs.filter((record) =>
    ['scheduled', 'in-progress'].includes(record.status),
  ).length
  const openDisputes = disputes.docs.filter((dispute) =>
    ['open', 'reviewing'].includes(dispute.status),
  ).length

  const metrics = [
    ['DOANH THU ĐÃ GHI NHẬN', money.format(paidRevenue), `${transactions.totalDocs} hóa đơn`],
    ['LỊCH ĐANG HOẠT ĐỘNG', String(activeBookings), `${bookings.totalDocs} lượt đặt`],
    ['BẢO TRÌ CẦN XỬ LÝ', String(pendingMaintenance), `${maintenance.totalDocs} bản ghi`],
    ['TRANH CHẤP ĐANG MỞ', String(openDisputes), `${disputes.totalDocs} tổng hồ sơ`],
  ]

  return (
    <section
      aria-labelledby="live-operations-title"
      className="bg-[#080b0e] px-5 py-12 text-[#edf3f5] sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-[1280px]">
        <p className="mb-2 font-mono text-[10px] tracking-[0.14em] text-[#42d9f3]">
          LIVE DATA / PAYLOAD
        </p>
        <h2 className="mb-6 text-2xl" id="live-operations-title">
          Dữ liệu vận hành trực tiếp
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map(([label, value, note]) => (
            <article className="border border-[#26333f] bg-[#101a22] p-5" key={label}>
              <p className="font-mono text-[10px] tracking-[0.12em] text-[#95a7b5]">{label}</p>
              <strong className="my-3 block text-3xl font-normal">{value}</strong>
              <p className="text-xs text-[#42d9f3]">{note}</p>
            </article>
          ))}
        </div>
        <div className="mt-5 overflow-x-auto border border-[#26333f] bg-[#101a22]">
          <div className="border-b border-[#26333f] px-5 py-4">
            <h3 className="m-0 text-base">Hóa đơn gần đây</h3>
          </div>
          {transactions.docs.length === 0 ? (
            <p className="m-0 px-5 py-8 text-sm text-[#95a7b5]">
              Chưa có hóa đơn. Hóa đơn thủ công sẽ được tạo khi check-out hoàn tất.
            </p>
          ) : (
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="text-[#95a7b5]">
                <tr>
                  <th className="px-5 py-3">Số hóa đơn</th>
                  <th className="px-5 py-3">Phương thức</th>
                  <th className="px-5 py-3">Trạng thái</th>
                  <th className="px-5 py-3 text-right">Giá trị</th>
                </tr>
              </thead>
              <tbody>
                {transactions.docs.slice(0, 8).map((transaction) => (
                  <tr className="border-t border-[#26333f]" key={transaction.id}>
                    <td className="px-5 py-3 font-mono text-[#42d9f3]">
                      {transaction.invoiceNumber}
                    </td>
                    <td className="px-5 py-3">{transaction.paymentMethod}</td>
                    <td className="px-5 py-3">{transaction.status}</td>
                    <td className="px-5 py-3 text-right">{money.format(transaction.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  )
}
