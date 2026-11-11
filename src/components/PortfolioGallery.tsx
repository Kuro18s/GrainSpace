import Image from 'next/image'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cacheTags } from '@/lib/cache-tags'

async function getPublishedPortfolios() {
  'use cache'
  cacheLife('max')
  cacheTag(cacheTags.portfolios)

  const payload = await getPayload({ config })
  return payload.find({
    collection: 'portfolios',
    depth: 2,
    limit: 24,
    overrideAccess: false,
    sort: '-updatedAt',
    where: { published: { equals: true } },
  })
}

export async function PortfolioGallery() {
  const result = await getPublishedPortfolios()

  return (
    <section
      aria-labelledby="portfolio-gallery-title"
      id="portfolio-gallery"
      className="bg-[#080b0e] px-5 py-16 text-[#edf3f5] sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-[1280px]">
        <header className="mb-8 max-w-2xl">
          <p className="mb-2 font-mono text-[10px] tracking-[0.14em] text-[#ffb657]">
            SELECTED WORK / CỘNG ĐỒNG SÁNG TẠO
          </p>
          <h2 className="m-0 text-3xl font-bold" id="portfolio-gallery-title">
            Bộ sưu tập từ các nhà sáng tạo.
          </h2>
          <p className="mb-0 mt-3 text-sm leading-6 text-[#95a7b5]">
            Dự án thực tế được thực hiện tại các studio, phòng tối và phòng tráng trên FILM//SPACE.
          </p>
        </header>
        {result.docs.length === 0 ? (
          <div className="border border-dashed border-[#26333f] bg-[#0d1218] px-6 py-16 text-center">
            <p className="m-0 font-mono text-[10px] tracking-[0.14em] text-[#42d9f3]">
              ARCHIVE / ĐANG CẬP NHẬT
            </p>
            <h3 className="mb-0 mt-4 text-xl font-bold">Chưa có bộ sưu tập được công bố.</h3>
            <p className="mx-auto mb-0 mt-3 max-w-xl text-sm leading-6 text-[#95a7b5]">
              Các nhà sáng tạo đang hoàn thiện những khung hình đầu tiên. Hãy quay lại sau để khám
              phá tác phẩm mới.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {result.docs.map((portfolio) => {
              const space = typeof portfolio.space === 'object' ? portfolio.space : null
              const provider = typeof portfolio.provider === 'object' ? portfolio.provider : null
              const images =
                portfolio.images
                  ?.map((item) => ({
                    caption: item.caption,
                    media: typeof item.image === 'object' ? item.image : null,
                  }))
                  .filter(
                    (item) =>
                      item.media?.url &&
                      Number(item.media.width) > 0 &&
                      Number(item.media.height) > 0,
                  ) ?? []
              if (images.length === 0) return null
              return (
                <article
                  className="overflow-hidden border border-[#26333f] bg-[#101a22]"
                  key={portfolio.id}
                >
                  <div className="grid grid-cols-2 gap-px bg-[#26333f]">
                    {images.slice(0, 4).map(({ caption, media }, index) => (
                      <div
                        className={`relative overflow-hidden bg-[#19232d] ${
                          index === 0 && images.length === 1
                            ? 'col-span-2 aspect-[16/9]'
                            : 'aspect-square'
                        }`}
                        key={media?.id}
                      >
                        {media?.url && (
                          <Image
                            alt={media.alt || caption || portfolio.title}
                            className="object-cover transition duration-500 hover:scale-[1.03]"
                            fill
                            sizes="(max-width: 1024px) 50vw, 25vw"
                            src={media.url}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="p-5">
                    <p className="mb-2 font-mono text-[10px] tracking-[0.1em] text-[#42d9f3]">
                      {provider?.organization || provider?.name || 'FILM//SPACE'}
                      {space?.name ? ` / ${space.name}` : ''}
                    </p>
                    <h3 className="m-0 text-xl font-bold">{portfolio.title}</h3>
                    <p className="mb-0 mt-2 text-sm leading-6 text-[#95a7b5]">
                      {portfolio.description}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
