import Image from 'next/image'
import Link from 'next/link'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cacheTags } from '@/lib/cache-tags'
import { CurrentUserIdentity } from '@/components/CurrentUserIdentity'
import { CommunityHubClient } from '@/components/CommunityHubClient'

async function getCommunityPosts() {
  'use cache'
  cacheLife('max')
  cacheTag(cacheTags.communityPosts)

  const payload = await getPayload({ config })
  return payload.find({
    collection: 'community-posts',
    depth: 1,
    limit: 100,
    overrideAccess: false,
    sort: '-publishedAt',
  })
}

export async function CommunityHub() {
  const result = await getCommunityPosts()
  const posts = result.docs.map((post) => {
    const image = typeof post.featuredImage === 'object' ? post.featuredImage : null
    const resource = typeof post.resource === 'object' ? post.resource : null
    return {
      authorName: post.authorName,
      capacity: post.capacity ?? null,
      category: post.category,
      excerpt: post.excerpt,
      expertise: post.expertise ?? null,
      image: image?.url
        ? {
            alt: image.alt || post.title,
            height: Number(image.height) || 1,
            url: image.url,
            width: Number(image.width) || 1,
          }
        : null,
      publishedAt: post.publishedAt,
      rating: post.rating ?? null,
      resourceName: resource?.name ?? null,
      slug: post.slug,
      title: post.title,
      venue: post.venue ?? null,
      workshopDate: post.workshopDate ?? null,
    }
  })

  return (
    <main className="min-h-screen bg-[#080b0e] text-[#edf3f5]">
      <header className="flex min-h-20 items-center justify-between border-b border-[#26333f] px-5 sm:px-8 lg:px-12">
        <Link className="flex items-center gap-3" href="/">
          <Image alt="" height={28} src="/assets/ec17a.svg" width={28} />
          <span className="text-[22px] font-bold tracking-[-0.7px]">FILM//SPACE</span>
        </Link>
        <nav aria-label="Điều hướng chính" className="hidden items-center gap-7 md:flex">
          <Link className="text-[13px] text-[#95a7b5] hover:text-[#edf3f5]" href="/">
            Tổng quan
          </Link>
          <Link className="text-[13px] text-[#95a7b5] hover:text-[#edf3f5]" href="/spaces">
            Không gian
          </Link>
          <Link
            className="border-b-2 border-[#42d9f3] pb-2 text-[13px] text-[#42d9f3]"
            href="/community"
          >
            Cộng đồng
          </Link>
          <Link className="text-[13px] text-[#95a7b5] hover:text-[#edf3f5]" href="/collection">
            Bộ sưu tập
          </Link>
        </nav>
        <CurrentUserIdentity />
      </header>

      <section className="border-b border-[#26333f] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <p className="mb-4 font-mono text-[11px] tracking-[0.16em] text-[#ffb657]">
              COMMUNITY / TRI THỨC & CẢM HỨNG
            </p>
            <h1 className="m-0 max-w-4xl text-5xl font-bold leading-[1.04] tracking-[-0.04em] sm:text-6xl">
              Chia sẻ kỹ thuật. Lan tỏa chất phim.
            </h1>
          </div>
          <p className="m-0 border-l border-[#42d9f3] pl-5 text-sm leading-7 text-[#95a7b5]">
            Hướng dẫn thực hành, đánh giá thiết bị, lịch workshop và trao đổi trực tiếp cùng những
            người làm nghề.
          </p>
        </div>
      </section>

      <CommunityHubClient posts={posts} />
    </main>
  )
}
