'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { getCurrentAppUser } from '@/lib/app-auth'

type EditableBookingStatus = 'cancelled' | 'checked-in' | 'completed' | 'confirmed' | 'pending'

export type UpdateBookingStatusResult =
  | { ok: true; status: EditableBookingStatus }
  | { ok: false; error: string }

export async function updateBookingStatusAction(input: {
  bookingId: string
  status: string
}): Promise<UpdateBookingStatusResult> {
  const user = await getCurrentAppUser()
  if (!user || (user.role !== 'provider' && user.role !== 'platform-admin')) {
    return { ok: false, error: 'Bạn không có quyền cập nhật lịch đặt chỗ.' }
  }

  const bookingId = input.bookingId.trim().slice(0, 100)
  const statuses: EditableBookingStatus[] = [
    'pending',
    'confirmed',
    'checked-in',
    'completed',
    'cancelled',
  ]
  const status = statuses.includes(input.status as EditableBookingStatus)
    ? (input.status as EditableBookingStatus)
    : null
  if (!bookingId || !status) {
    return { ok: false, error: 'Trạng thái hoặc mã đặt chỗ không hợp lệ.' }
  }

  try {
    const payload = await getPayload({ config })
    const booking = await payload.findByID({
      collection: 'bookings',
      id: bookingId,
      depth: 1,
      overrideAccess: false,
      user,
    })
    const allowedTransitions: Record<EditableBookingStatus, EditableBookingStatus[]> = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['checked-in', 'cancelled'],
      'checked-in': ['completed'],
      completed: [],
      cancelled: [],
    }
    if (!allowedTransitions[booking.status].includes(status)) {
      return { ok: false, error: 'Không thể chuyển sang trạng thái này từ trạng thái hiện tại.' }
    }
    await payload.update({
      collection: 'bookings',
      id: bookingId,
      data: { status },
      depth: 0,
      overrideAccess: false,
      user,
    })
    if (status === 'cancelled' || status === 'completed') {
      await payload.delete({
        collection: 'booking-slots',
        overrideAccess: true,
        where: { bookingReference: { equals: booking.reference } },
      })
    }
    if (status === 'completed') {
      const existing = await payload.find({
        collection: 'transactions',
        depth: 0,
        limit: 1,
        overrideAccess: true,
        where: { booking: { equals: booking.id } },
      })
      if (existing.totalDocs === 0) {
        const space = typeof booking.space === 'object' ? booking.space : null
        await payload.create({
          collection: 'transactions',
          data: {
            amount: booking.total,
            booking: booking.id,
            customer: typeof booking.customer === 'object' ? booking.customer.id : booking.customer,
            invoiceNumber: `INV-${booking.reference.replace(/^BK-/, '')}`,
            paidAt: new Date().toISOString(),
            bankCode:
              booking.paymentMethod === 'bank-transfer'
                ? (booking.bankCode ?? undefined)
                : undefined,
            paymentMethod: booking.paymentMethod ?? 'bank-transfer',
            provider:
              space?.provider && typeof space.provider === 'object'
                ? space.provider.id
                : (space?.provider ?? undefined),
            status: 'paid',
          },
          overrideAccess: true,
        })
      }
    }
    return { ok: true, status }
  } catch {
    return { ok: false, error: 'Không thể cập nhật trạng thái. Vui lòng thử lại.' }
  }
}
