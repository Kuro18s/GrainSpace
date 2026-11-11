import { getPayload } from 'payload'
import config from '@payload-config'
import { getCurrentAppUser } from '@/lib/app-auth'
import {
  BookingOperationsClient,
  type OperationsBooking,
} from '@/components/BookingOperationsClient'

export async function BookingOperations() {
  const user = await getCurrentAppUser()
  if (!user || (user.role !== 'provider' && user.role !== 'platform-admin')) return null

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'bookings',
    depth: 1,
    limit: 100,
    overrideAccess: false,
    sort: '-bookingDate',
    user,
  })

  const bookings: OperationsBooking[] = result.docs.map((booking) => {
    const customer = typeof booking.customer === 'object' ? booking.customer : null
    const space = typeof booking.space === 'object' ? booking.space : null
    return {
      bookingDate: booking.bookingDate,
      createdAt: booking.createdAt,
      customerEmail: customer?.email ?? '',
      customerName: customer?.name ?? 'Khách hàng',
      endTime: booking.endTime,
      id: String(booking.id),
      reference: booking.reference,
      resources:
        booking.resources?.map((resource) =>
          typeof resource === 'object' ? resource.name : String(resource),
        ) ?? [],
      spaceName: space?.name ?? 'Không gian',
      startTime: booking.startTime,
      status: booking.status,
      total: booking.total,
      updatedAt: booking.updatedAt,
    }
  })

  return <BookingOperationsClient bookings={bookings} />
}
