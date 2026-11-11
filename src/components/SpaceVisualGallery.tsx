import Image from 'next/image'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cacheTags } from '@/lib/cache-tags'

async function getVisualSpaces() {
  'use cache'
  cacheLife('max')
  cacheTag(cacheTags.spaces)

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'spaces',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    sort: '-rating',
    where: { status: { equals: 'available' } },
  })

  return result.docs
}

const typeLabels = {
  darkroom: 'Phòng tối',
  'processing-room': 'Phòng tráng',
  studio: 'Studio',
} as const

export async function SpaceVisualGallery() {
  const spaces = await getVisualSpaces()

  return (
    <section className="bg-[#0d1218] px-5 py-16 text-[#edf3f5] sm:px-8 lg:px-12" aria-labelledby="visual-spaces-title">
      <div className="mx-auto max-w-[1280px]">
        <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 font-mono text-[10px] tracking-[0.14em] text-[#42d9f3]">KHÔNG GIAN / HÌNH ẢNH THỰC TẾ</p>
            <h2 className="m-0 text-3xl font-bold" id="visual-spaces-title">Chọn nơi cho buổi chụp tiếp theo.</h2>
          </div>
          <p className="m-0 max-w-md text-sm leading-6 text-[#95a7b5]">Ảnh được quản lý trực tiếp trong Payload, có thể thay đổi mà không cần sửa giao diện.</p>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          {spaces.map((space) => {
            const image = typeof space.featuredImage === 'object' ? space.featuredImage : null
            return (
              <article className="group overflow-hidden border border-[#26333f] bg-[#101a22]" data-name="Space result" key={space.id}>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#19232d]">
                  {image?.url && image.width && image.height ? (
                    <Image
                      alt={image.alt || `Không gian ${space.name}`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      src={image.url}
                    />
                  ) : (
                    <div className="grid h-full place-items-center font-mono text-xs text-[#617584]">ĐANG CẬP NHẬT HÌNH ẢNH</div>
                  )}
                  <span className="absolute left-4 top-4 border border-[#42d9f3] bg-[#102c36]/90 px-3 py-2 font-mono text-[10px] tracking-[0.1em] text-[#42d9f3]">
                    {typeLabels[space.type]}
                  </span>
                </div>
                <div className="grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <p className="mb-2 font-mono text-[10px] tracking-[0.08em] text-[#617584]">{space.providerName} · {space.district}</p>
                    <h3 className="m-0 text-xl font-bold">{space.name}</h3>
                    <p className="mb-0 mt-2 line-clamp-2 text-sm leading-6 text-[#95a7b5]">{space.description}</p>
                  </div>
                  <div className="sm:text-right">
                    <strong className="block text-lg text-[#ffb657]">{space.hourlyRate.toLocaleString('vi-VN')}đ</strong>
                    <span className="text-xs text-[#617584]">mỗi giờ · {space.rating?.toFixed(1) ?? 'Mới'}/5</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
