'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { getCurrentAppUser } from '@/lib/app-auth'
import { isBankCode, isPaymentMethod } from '@/lib/payment-methods'
import { randomUUID } from 'node:crypto'

type BookingRequest = {
  bookingDate: string
  endTime: string
  bankCode?: string
  paymentMethod: string
  resourceIds?: string[]
  spaceName: string
  startTime: string
}

export type BookingResult =
  | { ok: true; reference: string }
  | { ok: false; error: string; loginRequired?: boolean }

const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/

export async function createBookingAction(input: BookingRequest): Promise<BookingResult> {
  const user = await getCurrentAppUser()
  if (!user) {
    return { ok: false, error: 'Bạn cần đăng nhập để hoàn tất đặt chỗ.', loginRequired: true }
  }

  const spaceName = input.spaceName.trim().slice(0, 100)
  const bookingDate = input.bookingDate.trim()
  const startTime = input.startTime.trim()
  const endTime = input.endTime.trim()
  const paymentMethod = isPaymentMethod(input.paymentMethod) ? input.paymentMethod : null
  const bankCode = isBankCode(input.bankCode) ? input.bankCode : null

  if (
    !spaceName ||
    !timePattern.test(startTime) ||
    !timePattern.test(endTime) ||
    !paymentMethod ||
    (paymentMethod === 'bank-transfer' && !bankCode)
  ) {
    return { ok: false, error: 'Thông tin không gian, khung giờ hoặc thanh toán chưa hợp lệ.' }
  }

  const date = new Date(`${bookingDate}T00:00:00.000Z`)
  if (Number.isNaN(date.getTime())) {
    return { ok: false, error: 'Ngày đặt chỗ chưa hợp lệ.' }
  }

  const payload = await getPayload({ config })
  const spaces = await payload.find({
    collection: 'spaces',
    depth: 0,
    limit: 1,
    overrideAccess: false,
    user,
    where: { name: { equals: spaceName } },
  })
  const space = spaces.docs[0]

  if (!space || space.status !== 'available') {
    return { ok: false, error: 'Không gian này hiện không còn khả dụng.' }
  }

  const toMinutes = (value: string) => {
    const [hour, minute] = value.split(':').map(Number)
    return hour * 60 + minute
  }
  const startMinutes = toMinutes(startTime)
  const endMinutes = toMinutes(endTime)
  if (endMinutes <= startMinutes) {
    return { ok: false, error: 'Giờ kết thúc phải sau giờ bắt đầu.' }
  }
  const resourceIDs = [
    ...new Set((input.resourceIds ?? []).map((id) => id.trim()).filter(Boolean)),
  ].slice(0, 20)
  const resources =
    resourceIDs.length > 0
      ? await payload.find({
          collection: 'resources',
          depth: 0,
          limit: resourceIDs.length,
          overrideAccess: false,
          user,
          where: { id: { in: resourceIDs } },
        })
      : null
  if (
    resources &&
    (resources.docs.length !== resourceIDs.length ||
      resources.docs.some(
        (resource) =>
          resource.status !== 'available' ||
          String(typeof resource.space === 'object' ? resource.space.id : resource.space) !==
            String(space.id),
      ))
  ) {
    return { ok: false, error: 'Một thiết bị đã chọn không còn khả dụng tại không gian này.' }
  }

  const durationHours = (endMinutes - startMinutes) / 60
  const reference = `BK-${randomUUID().slice(0, 8).toUpperCase()}`
  const slotMinutes: number[] = []
  for (let minute = Math.floor(startMinutes / 15) * 15; minute < endMinutes; minute += 15) {
    slotMinutes.push(minute)
  }
  const slotLabel = (minute: number) =>
    `${String(Math.floor(minute / 60)).padStart(2, '0')}:${String(minute % 60).padStart(2, '0')}`
  const locks = slotMinutes.flatMap((minute) => [
    {
      lockKey: `${bookingDate}:space:${space.id}:${slotLabel(minute)}`,
      resource: undefined,
    },
    ...resourceIDs.map((resource) => ({
      lockKey: `${bookingDate}:resource:${resource}:${slotLabel(minute)}`,
      resource,
    })),
  ])
  const acquiredLocks: string[] = []

  try {
    for (const lock of locks) {
      await payload.create({
        collection: 'booking-slots',
        data: {
          bookingDate: date.toISOString(),
          bookingReference: reference,
          endTime,
          lockKey: lock.lockKey,
          resource: lock.resource,
          space: space.id,
          startTime,
        },
        overrideAccess: true,
      })
      acquiredLocks.push(lock.lockKey)
    }
    await payload.create({
      collection: 'bookings',
      data: {
        bookingDate: date.toISOString(),
        bankCode: paymentMethod === 'bank-transfer' ? bankCode : undefined,
        customer: user.id,
        endTime,
        reference,
        resources: resourceIDs,
        space: space.id,
        startTime,
        status: 'pending',
        total: Math.round(space.hourlyRate * durationHours),
        paymentMethod,
      },
      draft: false,
      overrideAccess: false,
      user,
    })
  } catch (error) {
    if (acquiredLocks.length > 0) {
      await payload
        .delete({
          collection: 'booking-slots',
          overrideAccess: true,
          where: { bookingReference: { equals: reference } },
        })
        .catch(() => undefined)
    }
    const message = error instanceof Error ? error.message : ''
    return {
      ok: false,
      error:
        message.includes('unique') || message.includes('Khung giờ')
          ? 'Khung giờ này vừa được người khác đặt. Vui lòng chọn giờ khác.'
          : 'Không thể tạo đặt chỗ. Vui lòng thử lại.',
    }
  }

  return { ok: true, reference }
}
