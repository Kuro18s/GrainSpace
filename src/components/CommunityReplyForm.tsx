'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState, useTransition } from 'react'
import {
  createCommunityReplyAction,
  type ReplyActionResult,
} from '@/app/(frontend)/community-actions'

export function CommunityReplyForm({ threadID }: { threadID: string }) {
  const router = useRouter()
  const [body, setBody] = useState('')
  const [result, setResult] = useState<ReplyActionResult | null>(null)
  const [pending, startTransition] = useTransition()

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    startTransition(async () => {
      const nextResult = await createCommunityReplyAction({ body, threadID })
      setResult(nextResult)
      if (nextResult.ok) {
        setBody('')
        router.refresh()
      }
    })
  }

  return (
    <form className="mt-6 border border-[#26333f] bg-[#0d1218] p-5" onSubmit={submit}>
      <label className="block text-sm font-bold" htmlFor="community-reply">
        Tham gia thảo luận
      </label>
      <textarea
        className="mt-3 min-h-28 w-full resize-y border border-[#26333f] bg-[#080b0e] p-3 text-sm leading-6 text-[#edf3f5] outline-none focus:border-[#42d9f3]"
        id="community-reply"
        maxLength={2000}
        onChange={(event) => setBody(event.target.value)}
        placeholder="Chia sẻ kinh nghiệm hoặc đặt câu hỏi..."
        required
        value={body}
      />
      <div className="mt-3 flex items-center justify-between gap-4">
        <p
          aria-live="polite"
          className={`m-0 text-xs ${result?.ok ? 'text-[#6ddbad]' : 'text-[#ff8f8f]'}`}
        >
          {result?.message}
        </p>
        <button
          className="bg-[#42d9f3] px-5 py-3 text-xs font-bold text-[#080b0e] disabled:opacity-50"
          disabled={pending}
          type="submit"
        >
          {pending ? 'Đang đăng...' : 'Đăng phản hồi'}
        </button>
      </div>
    </form>
  )
}
