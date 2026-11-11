'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { getCurrentAppUser } from '@/lib/app-auth'

export type ProviderActionResult = { ok: true; message: string } | { ok: false; error: string }

const text = (value: unknown, max = 500) =>
  String(value ?? '')
    .trim()
    .slice(0, max)
const number = (value: unknown) => Number(value)

async function providerContext() {
  const user = await getCurrentAppUser()
  if (!user || (user.role !== 'provider' && user.role !== 'platform-admin')) return null
  return { payload: await getPayload({ config }), user }
}

export async function submitProviderApplicationAction(input: {
  address: string
  businessName: string
  experience: string
  phone: string
  taxCode?: string
}): Promise<ProviderActionResult> {
  const user = await getCurrentAppUser()
  if (!user) return { ok: false, error: 'Bạn cần đăng nhập để gửi hồ sơ.' }
  const businessName = text(input.businessName, 120)
  const phone = text(input.phone, 30)
  const address = text(input.address, 500)
  const experience = text(input.experience, 2000)
  if (!businessName || !phone || !address || !experience) {
    return { ok: false, error: 'Vui lòng điền đầy đủ thông tin bắt buộc.' }
  }
  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'provider-applications',
      data: {
        address,
        applicant: user.id,
        businessName,
        experience,
        phone,
        status: 'pending',
        taxCode: text(input.taxCode, 50) || undefined,
      },
      draft: false,
      overrideAccess: false,
      user,
    })
    return { ok: true, message: 'Hồ sơ đã được gửi và đang chờ duyệt.' }
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error && error.message.includes('unique')
          ? 'Bạn đã có một hồ sơ nhà cung cấp.'
          : 'Không thể gửi hồ sơ lúc này.',
    }
  }
}

export async function saveSpaceAction(input: {
  acoustics?: string
  address: string
  area: number
  capacity: number
  dailyRate?: number
  description: string
  district: string
  halfDayRate?: number
  hourlyRate: number
  id?: string
  lighting?: string
  name: string
  policies?: string
  pricingModel: 'daily' | 'half-day' | 'hourly' | 'package'
  slug: string
  style?: string
  type: 'darkroom' | 'processing-room' | 'studio'
  ventilation?: string
}): Promise<ProviderActionResult> {
  const context = await providerContext()
  if (!context) return { ok: false, error: 'Bạn không có quyền quản lý không gian.' }
  const name = text(input.name, 120)
  const slug = text(input.slug, 120)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
  if (
    !name ||
    !slug ||
    number(input.area) <= 0 ||
    number(input.capacity) <= 0 ||
    number(input.hourlyRate) < 0
  ) {
    return { ok: false, error: 'Tên, slug, diện tích, sức chứa hoặc giá chưa hợp lệ.' }
  }
  const data = {
    acoustics: text(input.acoustics, 1000) || undefined,
    address: text(input.address, 500),
    area: number(input.area),
    capacity: number(input.capacity),
    dailyRate: number(input.dailyRate) || undefined,
    description: text(input.description, 2000),
    district: text(input.district, 120),
    halfDayRate: number(input.halfDayRate) || undefined,
    hourlyRate: number(input.hourlyRate),
    lighting: text(input.lighting, 1000) || undefined,
    name,
    policies: text(input.policies, 2000) || undefined,
    pricingModel: input.pricingModel,
    provider: context.user.id,
    providerName: context.user.organization || context.user.name,
    slug,
    status: 'available' as const,
    style: text(input.style, 300) || undefined,
    type: input.type,
    ventilation: text(input.ventilation, 1000) || undefined,
  }
  try {
    if (input.id) {
      await context.payload.update({
        collection: 'spaces',
        id: text(input.id, 100),
        data,
        overrideAccess: false,
        user: context.user,
      })
    } else {
      await context.payload.create({
        collection: 'spaces',
        data,
        draft: false,
        overrideAccess: false,
        user: context.user,
      })
    }
    return { ok: true, message: input.id ? 'Đã cập nhật không gian.' : 'Đã tạo không gian.' }
  } catch {
    return { ok: false, error: 'Không thể lưu không gian. Kiểm tra slug và quyền sở hữu.' }
  }
}

export async function saveResourceAction(input: {
  code: string
  description?: string
  hourlyRate?: number
  id?: string
  name: string
  space: string
  type: 'camera' | 'consumable' | 'darkroom-equipment' | 'lens'
}): Promise<ProviderActionResult> {
  const context = await providerContext()
  if (!context) return { ok: false, error: 'Bạn không có quyền quản lý tài nguyên.' }
  const data = {
    code: text(input.code, 50).toUpperCase(),
    description: text(input.description, 1000) || undefined,
    hourlyRate: Math.max(0, number(input.hourlyRate) || 0),
    name: text(input.name, 120),
    provider: context.user.id,
    space: text(input.space, 100),
    status: 'available' as const,
    type: input.type,
  }
  if (!data.code || !data.name || !data.space)
    return { ok: false, error: 'Thiếu mã, tên hoặc không gian.' }
  try {
    if (input.id)
      await context.payload.update({
        collection: 'resources',
        id: text(input.id, 100),
        data,
        overrideAccess: false,
        user: context.user,
      })
    else
      await context.payload.create({
        collection: 'resources',
        data,
        draft: false,
        overrideAccess: false,
        user: context.user,
      })
    return { ok: true, message: input.id ? 'Đã cập nhật tài nguyên.' : 'Đã tạo tài nguyên.' }
  } catch {
    return { ok: false, error: 'Không thể lưu tài nguyên.' }
  }
}

export async function savePackageAction(input: {
  basePrice: number
  description: string
  durationHours: number
  id?: string
  instructor?: string
  name: string
  resources: string[]
  slug: string
  space: string
  type: 'custom' | 'film-processing' | 'portrait' | 'printing' | 'product' | 'workshop'
}): Promise<ProviderActionResult> {
  const context = await providerContext()
  if (!context) return { ok: false, error: 'Bạn không có quyền quản lý gói.' }
  const data = {
    active: true,
    basePrice: Math.max(0, number(input.basePrice)),
    description: text(input.description, 2000),
    durationHours: Math.max(1, number(input.durationHours)),
    instructor: text(input.instructor, 100) || undefined,
    name: text(input.name, 120),
    provider: context.user.id,
    resources: input.resources.map((id) => text(id, 100)).filter(Boolean),
    slug: text(input.slug, 120)
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-'),
    space: text(input.space, 100),
    type: input.type,
  }
  if (!data.name || !data.slug || !data.space || !data.description)
    return { ok: false, error: 'Thông tin gói chưa đầy đủ.' }
  try {
    if (input.id)
      await context.payload.update({
        collection: 'service-packages',
        id: text(input.id, 100),
        data,
        overrideAccess: false,
        user: context.user,
      })
    else
      await context.payload.create({
        collection: 'service-packages',
        data,
        draft: false,
        overrideAccess: false,
        user: context.user,
      })
    return { ok: true, message: input.id ? 'Đã cập nhật gói dịch vụ.' : 'Đã tạo gói dịch vụ.' }
  } catch {
    return { ok: false, error: 'Không thể lưu gói dịch vụ.' }
  }
}

export async function savePromotionAction(input: {
  code: string
  discountType: 'fixed' | 'percent'
  discountValue: number
  endsAt: string
  id?: string
  name: string
  packages: string[]
  spaces: string[]
  startsAt: string
}): Promise<ProviderActionResult> {
  const context = await providerContext()
  if (!context) return { ok: false, error: 'Bạn không có quyền quản lý khuyến mãi.' }
  const value = number(input.discountValue)
  if (!text(input.name) || !text(input.code) || value <= 0 || !input.startsAt || !input.endsAt) {
    return { ok: false, error: 'Thông tin chiến dịch chưa hợp lệ.' }
  }
  if (input.discountType === 'percent' && value > 100)
    return { ok: false, error: 'Mức giảm phần trăm không được vượt quá 100.' }
  const data = {
    active: true,
    code: text(input.code, 50).toUpperCase(),
    discountType: input.discountType,
    discountValue: value,
    endsAt: new Date(input.endsAt).toISOString(),
    name: text(input.name, 120),
    packages: input.packages.map((id) => text(id, 100)).filter(Boolean),
    provider: context.user.id,
    spaces: input.spaces.map((id) => text(id, 100)).filter(Boolean),
    startsAt: new Date(input.startsAt).toISOString(),
  }
  try {
    if (input.id)
      await context.payload.update({
        collection: 'promotions',
        id: text(input.id, 100),
        data,
        overrideAccess: false,
        user: context.user,
      })
    else
      await context.payload.create({
        collection: 'promotions',
        data,
        draft: false,
        overrideAccess: false,
        user: context.user,
      })
    return {
      ok: true,
      message: input.id ? 'Đã cập nhật chiến dịch.' : 'Đã tạo chiến dịch khuyến mãi.',
    }
  } catch {
    return { ok: false, error: 'Không thể lưu chiến dịch khuyến mãi.' }
  }
}

export async function savePortfolioAction(formData: FormData): Promise<ProviderActionResult> {
  const context = await providerContext()
  if (!context) return { ok: false, error: 'Bạn không có quyền quản lý portfolio.' }

  const id = text(formData.get('id'), 100)
  const title = text(formData.get('title'), 120)
  const slug = text(formData.get('slug'), 120)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
  const description = text(formData.get('description'), 2000)
  const space = text(formData.get('space'), 100) || undefined
  const published = formData.get('published') === 'true'
  if (!title || !slug || !description) {
    return { ok: false, error: 'Tên, slug và mô tả portfolio là bắt buộc.' }
  }

  const files = formData
    .getAll('images')
    .filter((value): value is File => value instanceof File && value.size > 0)
    .slice(0, 8)
  if (files.some((file) => !file.type.startsWith('image/') || file.size > 10 * 1024 * 1024)) {
    return { ok: false, error: 'Mỗi tệp phải là ảnh và không vượt quá 10 MB.' }
  }

  const uploadedMedia: string[] = []
  try {
    const existing = id
      ? await context.payload.findByID({
          collection: 'portfolios',
          id,
          depth: 0,
          overrideAccess: false,
          user: context.user,
        })
      : null
    const existingImages =
      existing?.images?.map((item) => ({
        caption: item.caption,
        image: typeof item.image === 'object' ? item.image.id : item.image,
      })) ?? []

    for (const file of files) {
      const media = await context.payload.create({
        collection: 'media',
        data: { alt: `${title} — ${file.name}` },
        file: {
          data: Buffer.from(await file.arrayBuffer()),
          mimetype: file.type,
          name: file.name.slice(0, 180),
          size: file.size,
        },
        overrideAccess: false,
        user: context.user,
      })
      uploadedMedia.push(String(media.id))
    }

    const images = [...existingImages, ...uploadedMedia.map((image) => ({ caption: '', image }))]
    if (images.length === 0) {
      return { ok: false, error: 'Hãy chọn ít nhất một ảnh cho portfolio.' }
    }
    const data = {
      description,
      images,
      provider: context.user.id,
      published,
      slug,
      space,
      title,
    }
    if (id) {
      await context.payload.update({
        collection: 'portfolios',
        id,
        data,
        overrideAccess: false,
        user: context.user,
      })
    } else {
      await context.payload.create({
        collection: 'portfolios',
        data,
        draft: false,
        overrideAccess: false,
        user: context.user,
      })
    }
    return { ok: true, message: id ? 'Đã cập nhật portfolio.' : 'Đã tạo portfolio.' }
  } catch {
    for (const mediaID of uploadedMedia) {
      await context.payload
        .delete({
          collection: 'media',
          id: mediaID,
          overrideAccess: false,
          user: context.user,
        })
        .catch(() => undefined)
    }
    return { ok: false, error: 'Không thể lưu portfolio. Kiểm tra slug, ảnh và quyền sở hữu.' }
  }
}

const providerCollections = [
  'portfolios',
  'promotions',
  'resources',
  'service-packages',
  'spaces',
] as const
type ProviderCollection = (typeof providerCollections)[number]

export async function deleteProviderRecordAction(
  collection: ProviderCollection,
  id: string,
): Promise<ProviderActionResult> {
  const context = await providerContext()
  if (!context || !providerCollections.includes(collection)) {
    return { ok: false, error: 'Bạn không có quyền xóa bản ghi này.' }
  }
  const safeID = text(id, 100)
  if (!safeID) return { ok: false, error: 'Bản ghi không hợp lệ.' }
  try {
    await context.payload.delete({
      collection,
      id: safeID,
      overrideAccess: false,
      user: context.user,
    })
    return { ok: true, message: 'Đã xóa bản ghi.' }
  } catch {
    return {
      ok: false,
      error: 'Không thể xóa bản ghi. Hãy kiểm tra quyền sở hữu và dữ liệu liên quan.',
    }
  }
}
