import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { cacheLife, cacheTag } from 'next/cache'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { CommunityReplyForm } from '@/components/CommunityReplyForm'
import { RequireAppUser } from '@/components/RequireAppUser'
import { cacheTags } from '@/lib/cache-tags'

const categoryLabels = {
  darkroom: 'Hướng dẫn phòng tối',
  discussion: 'Thảo luận',
  equipment: 'Đánh giá thiết bị',
  expert: 'Góc chuyên gia',
  photography: 'Hướng dẫn nhiếp ảnh',
  workshop: 'Workshop',
} as const

async function getPost(slug: string) {
  'use cache'
  cacheLife('max')
  cacheTag(cacheTags.communityPosts, `${cacheTags.communityPosts}:${slug}`)
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'community-posts',
    depth: 2,
    limit: 1,
    overrideAccess: false,
    where: { slug: { equals: slug } },
  })
  return result.docs[0] ?? null
}

async function getReplies(threadID: string) {
  'use cache'
  cacheLife('max')
  cacheTag(cacheTags.communityReplies)
  const payload = await getPayload({ config })
  return payload.find({
    collection: 'community-replies',
    depth: 0,
    limit: 100,
    overrideAccess: false,
    sort: 'createdAt',
    where: { thread: { equals: threadID } },
  })
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'community-posts',
    depth: 0,
    limit: 100,
    overrideAccess: false,
    select: { slug: true },
  })
  return result.docs.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return { description: post.excerpt, title: `${post.title} | FILM//SPACE` }
}

async function CommunityPostContent({ slug }: { slug: string }) {
  const post = await getPost(slug)
  if (!post) notFound()
  const image = typeof post.featuredImage === 'object' ? post.featuredImage : null
  const resource = typeof post.resource === 'object' ? post.resource : null
  const replies = post.category === 'discussion' ? await getReplies(post.id) : null

  return (
    <main className="min-h-screen bg-[#080b0e] text-[#edf3f5]">
      <header className="border-b border-[#26333f] px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1080px] items-center justify-between">
          <Link className="font-bold" href="/community">
            FILM//SPACE
          </Link>
          <Link
            className="font-mono text-[10px] tracking-[0.12em] text-[#42d9f3]"
            href="/community"
          >
            ← TRỞ LẠI CỘNG ĐỒNG
          </Link>
        </div>
      </header>
      <article className="mx-auto max-w-[1080px] px-5 py-12 sm:px-8 lg:py-20">
        <p className="font-mono text-[11px] tracking-[0.14em] text-[#ffb657]">
          {categoryLabels[post.category]}
        </p>
        <h1 className="mb-0 mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-6xl">
          {post.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#95a7b5]">{post.excerpt}</p>
        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-y border-[#26333f] py-4 font-mono text-[10px] tracking-[0.08em] text-[#617584]">
          <span>{post.authorName}</span>
          <span>
            {new Intl.DateTimeFormat('vi-VN', { dateStyle: 'long' }).format(
              new Date(post.publishedAt),
            )}
          </span>
          {post.rating && <span className="text-[#ffb657]">{post.rating.toFixed(1)} / 5</span>}
          {resource?.name && <span>{resource.name}</span>}
          {post.expertise && <span className="text-[#6ddbad]">{post.expertise}</span>}
        </div>
        {image?.url && Number(image.width) > 0 && Number(image.height) > 0 && (
          <div className="relative mt-10 aspect-[16/8] overflow-hidden bg-[#15202a]">
            <Image
              alt={image.alt || post.title}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 1080px) 100vw, 1080px"
              src={image.url}
            />
          </div>
        )}
        {post.category === 'workshop' && post.workshopDate && (
          <aside className="mt-8 grid gap-5 border border-[#26333f] bg-[#0d1218] p-5 sm:grid-cols-3">
            <div>
              <p className="m-0 font-mono text-[10px] text-[#617584]">THỜI GIAN</p>
              <p className="mb-0 mt-2 text-sm">
                {new Intl.DateTimeFormat('vi-VN', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }).format(new Date(post.workshopDate))}
              </p>
            </div>
            <div>
              <p className="m-0 font-mono text-[10px] text-[#617584]">ĐỊA ĐIỂM</p>
              <p className="mb-0 mt-2 text-sm">{post.venue || 'Sẽ cập nhật'}</p>
            </div>
            <div>
              <p className="m-0 font-mono text-[10px] text-[#617584]">SỨC CHỨA</p>
              <p className="mb-0 mt-2 text-sm">
                {post.capacity ? `${post.capacity} người` : 'Sẽ cập nhật'}
              </p>
            </div>
          </aside>
        )}
        <div className="mt-10 max-w-3xl whitespace-pre-line text-base leading-8 text-[#c4d0d6]">
          {post.body}
        </div>
      </article>
      {post.category === 'discussion' && (
        <section className="mx-auto max-w-[1080px] border-t border-[#26333f] px-5 py-12 sm:px-8">
          <div className="flex items-end justify-between">
            <h2 className="m-0 text-2xl font-bold">Phản hồi cộng đồng</h2>
            <span className="font-mono text-[10px] text-[#617584]">
              {replies?.totalDocs ?? 0} PHẢN HỒI
            </span>
          </div>
          <div className="mt-6 space-y-3">
            {replies?.docs.map((reply) => (
              <div className="border border-[#26333f] bg-[#0d1218] p-5" key={reply.id}>
                <div className="flex items-center justify-between gap-4">
                  <p className="m-0 text-sm font-bold">{reply.authorName}</p>
                  <time className="font-mono text-[10px] text-[#617584]">
                    {new Intl.DateTimeFormat('vi-VN', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    }).format(new Date(reply.createdAt))}
                  </time>
                </div>
                <p className="mb-0 mt-3 whitespace-pre-line text-sm leading-6 text-[#95a7b5]">
                  {reply.body}
                </p>
              </div>
            ))}
          </div>
          <CommunityReplyForm threadID={post.id} />
        </section>
      )}
    </main>
  )
}

export default function CommunityPostPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<main className="auth-gate-loading">Đang tải bài viết...</main>}>
      {params.then(({ slug }) => (
        <RequireAppUser redirectTo={`/community/${slug}`}>
          <CommunityPostContent slug={slug} />
        </RequireAppUser>
      ))}
    </Suspense>
  )
}
