'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'

type Category = 'darkroom' | 'discussion' | 'equipment' | 'expert' | 'photography' | 'workshop'
type Tab = 'all' | 'discussion' | 'equipment' | 'expert' | 'guide' | 'workshop'

type CommunityCard = {
  authorName: string
  capacity: number | null
  category: Category
  excerpt: string
  expertise: string | null
  image: { alt: string; height: number; url: string; width: number } | null
  publishedAt: string
  rating: number | null
  resourceName: string | null
  slug: string
  title: string
  venue: string | null
  workshopDate: string | null
}

const tabs: Array<{ label: string; value: Tab }> = [
  { label: 'Khám phá', value: 'all' },
  { label: 'Bài viết hướng dẫn', value: 'guide' },
  { label: 'Đánh giá thiết bị', value: 'equipment' },
  { label: 'Workshop', value: 'workshop' },
  { label: 'Thảo luận', value: 'discussion' },
  { label: 'Góc chuyên gia', value: 'expert' },
]

const labels: Record<Category, string> = {
  darkroom: 'Hướng dẫn phòng tối',
  discussion: 'Thảo luận',
  equipment: 'Đánh giá thiết bị',
  expert: 'Góc chuyên gia',
  photography: 'Hướng dẫn nhiếp ảnh',
  workshop: 'Workshop',
}

function matchesTab(category: Category, tab: Tab) {
  if (tab === 'all') return true
  if (tab === 'guide') return category === 'photography' || category === 'darkroom'
  return category === tab
}

export function CommunityHubClient({ posts }: { posts: CommunityCard[] }) {
  const [activeTab, setActiveTab] = useState<Tab>('all')
  const [query, setQuery] = useState('')
  const visiblePosts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('vi')
    return posts.filter(
      (post) =>
        matchesTab(post.category, activeTab) &&
        (!normalizedQuery ||
          `${post.title} ${post.excerpt} ${post.authorName}`
            .toLocaleLowerCase('vi')
            .includes(normalizedQuery)),
    )
  }, [activeTab, posts, query])

  return (
    <section className="mx-auto max-w-[1380px] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mb-8 flex flex-col gap-5 border-b border-[#26333f] pb-6">
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Chuyên mục">
          {tabs.map((tab) => (
            <button
              aria-selected={activeTab === tab.value}
              className={`shrink-0 border px-4 py-3 text-left text-xs font-bold transition ${
                activeTab === tab.value
                  ? 'border-[#42d9f3] bg-[#102c36] text-[#42d9f3]'
                  : 'border-[#26333f] bg-[#0d1218] text-[#95a7b5] hover:text-[#edf3f5]'
              }`}
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              role="tab"
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3 border border-[#26333f] bg-[#0d1218] px-4 py-3">
          <span className="font-mono text-[10px] tracking-[0.12em] text-[#617584]">TÌM KIẾM</span>
          <input
            className="min-w-0 flex-1 bg-transparent text-sm text-[#edf3f5] outline-none placeholder:text-[#617584]"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tên bài viết, chủ đề hoặc tác giả..."
            type="search"
            value={query}
          />
        </label>
      </div>

      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="m-0 font-mono text-[10px] tracking-[0.14em] text-[#42d9f3]">
            {tabs.find((tab) => tab.value === activeTab)?.label.toUpperCase()}
          </p>
          <h2 className="mb-0 mt-2 text-2xl font-bold">Thư viện cộng đồng</h2>
        </div>
        <span className="font-mono text-[10px] text-[#617584]">{visiblePosts.length} BÀI</span>
      </div>

      {visiblePosts.length === 0 ? (
        <div className="border border-dashed border-[#26333f] py-16 text-center text-sm text-[#95a7b5]">
          Chưa có nội dung phù hợp với bộ lọc này.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visiblePosts.map((post) => (
            <article
              className="group flex min-h-[320px] flex-col overflow-hidden border border-[#26333f] bg-[#0d1218]"
              key={post.slug}
            >
              {post.image && (
                <div className="relative aspect-[16/8] overflow-hidden bg-[#15202a]">
                  <Image
                    alt={post.image.alt}
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    src={post.image.url}
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="font-mono text-[10px] tracking-[0.1em] text-[#ffb657]">
                    {labels[post.category]}
                  </span>
                  {post.rating && (
                    <span className="border border-[#ffb657]/40 px-2 py-1 font-mono text-[10px] text-[#ffb657]">
                      {post.rating.toFixed(1)} / 5
                    </span>
                  )}
                </div>
                <h3 className="m-0 text-xl font-bold leading-7">{post.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#95a7b5]">{post.excerpt}</p>
                {post.workshopDate && (
                  <p className="mt-1 font-mono text-[10px] leading-5 text-[#6ddbad]">
                    {new Intl.DateTimeFormat('vi-VN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    }).format(new Date(post.workshopDate))}
                    {post.venue ? ` / ${post.venue}` : ''}
                    {post.capacity ? ` / ${post.capacity} chỗ` : ''}
                  </p>
                )}
                {post.expertise && (
                  <p className="mt-1 font-mono text-[10px] text-[#6ddbad]">{post.expertise}</p>
                )}
                <div className="mt-auto flex items-end justify-between gap-3 pt-6">
                  <p className="m-0 text-xs text-[#617584]">
                    {post.authorName}
                    {post.resourceName ? ` / ${post.resourceName}` : ''}
                  </p>
                  <Link
                    className="shrink-0 text-xs font-bold text-[#42d9f3]"
                    href={`/community/${post.slug}`}
                  >
                    Xem chi tiết ↗
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
