import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cacheTags } from '@/lib/cache-tags'

async function getApprovedReviews() {
  'use cache'
  cacheLife('max')
  cacheTag(cacheTags.reviews)

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'reviews',
    depth: 1,
    limit: 6,
    overrideAccess: false,
    sort: 'displayOrder',
    where: { status: { equals: 'approved' } },
  })

  return result.docs
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={filled ? 'text-[#ffb657]' : 'text-[#26333f]'}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="m10 1.65 2.5 5.07 5.6.81-4.05 3.95.96 5.57L10 14.42l-5.01 2.63.96-5.57L1.9 7.53l5.6-.81L10 1.65Z" />
    </svg>
  )
}

function Stars({ rating }: { rating: number }) {
  return (
    <div
      aria-label={`${rating} trên 5 sao`}
      className="flex items-center gap-1"
      role="img"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <span className="block size-4" key={index}>
          <StarIcon filled={index < rating} />
        </span>
      ))}
    </div>
  )
}

export async function CustomerReviews() {
  const reviews = await getApprovedReviews()
  const average =
    reviews.length > 0
      ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
      : 0

  return (
    <section
      aria-labelledby="customer-reviews-title"
      className="border-t border-[#26333f] bg-[#080b0e] px-5 py-16 text-[#edf3f5] sm:px-8 lg:px-12 lg:py-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <header className="mb-9 grid gap-6 border-b border-[#26333f] pb-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-3 font-mono text-[10px] tracking-[0.16em] text-[#42d9f3]">
              CỘNG ĐỒNG / NHẬN XÉT KHÁCH HÀNG
            </p>
            <h2 className="m-0 max-w-2xl text-3xl font-bold tracking-[-0.03em] sm:text-4xl" id="customer-reviews-title">
              Trải nghiệm thật từ những buổi chụp.
            </h2>
          </div>
          {reviews.length > 0 && (
            <div className="flex items-end gap-4 md:justify-end">
              <strong className="text-5xl leading-none tracking-[-0.06em] text-[#edf3f5]">
                {average.toFixed(1)}
              </strong>
              <div>
                <Stars rating={Math.round(average)} />
                <p className="mb-0 mt-2 font-mono text-[10px] tracking-[0.1em] text-[#617584]">
                  ĐIỂM TRUNG BÌNH / 5
                </p>
              </div>
            </div>
          )}
        </header>

        {reviews.length > 0 ? (
          <div className="grid gap-px bg-[#26333f] lg:grid-cols-3">
            {reviews.map((review, index) => {
              const space = typeof review.space === 'object' ? review.space : null
              return (
                <article className="flex min-h-72 flex-col bg-[#0d1218] p-6 sm:p-7" key={review.id}>
                  <div className="flex items-center justify-between gap-4">
                    <Stars rating={review.rating} />
                    <span className="font-mono text-xs text-[#ffb657]">{review.rating}.0/5</span>
                  </div>
                  <blockquote className="mb-8 mt-7 flex-1 text-lg leading-8 text-[#d5e0e5]">
                    “{review.review}”
                  </blockquote>
                  <footer className="flex items-center gap-3 border-t border-[#26333f] pt-5">
                    <span className="grid size-10 shrink-0 place-items-center border border-[#42d9f3] bg-[#102c36] font-mono text-xs text-[#42d9f3]">
                      {review.customerName
                        .split(' ')
                        .map((part) => part[0])
                        .join('')}
                    </span>
                    <div className="min-w-0">
                      <cite className="block not-italic font-bold text-[#edf3f5]">{review.customerName}</cite>
                      <p className="mb-0 mt-1 truncate font-mono text-[10px] tracking-[0.06em] text-[#617584]">
                        {review.customerContext} · {space?.name ?? 'Không gian FILM//SPACE'}
                      </p>
                    </div>
                  </footer>
                  <span className="mt-5 font-mono text-[9px] tracking-[0.12em] text-[#3f5260]">
                    REVIEW / {String(index + 1).padStart(2, '0')}
                  </span>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="border border-dashed border-[#26333f] bg-[#0d1218] px-6 py-14 text-center">
            <p className="m-0 font-mono text-xs tracking-[0.1em] text-[#617584]">
              CHƯA CÓ NHẬN XÉT ĐÃ ĐƯỢC DUYỆT
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
