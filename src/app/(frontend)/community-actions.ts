'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { getCurrentAppUser } from '@/lib/app-auth'

export type ReplyActionResult = { ok: boolean; message: string }

export async function createCommunityReplyAction(input: {
  body: string
  threadID: string
}): Promise<ReplyActionResult> {
  const user = await getCurrentAppUser()
  if (!user) return { ok: false, message: 'Bạn cần đăng nhập để phản hồi.' }

  const body = String(input.body ?? '')
    .trim()
    .slice(0, 2000)
  const threadID = String(input.threadID ?? '').trim()
  if (!body || !threadID) return { ok: false, message: 'Nội dung phản hồi không được để trống.' }

  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'community-replies',
      data: {
        author: user.id,
        authorName: user.name,
        body,
        thread: threadID,
      },
      overrideAccess: false,
      user,
    })
    return { ok: true, message: 'Đã đăng phản hồi.' }
  } catch {
    return { ok: false, message: 'Không thể đăng phản hồi cho bài viết này.' }
  }
}
