'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { announceSessionChange } from '@/lib/auth-session-browser'
import {
  openPreviewOAuth,
  waitForPreviewOAuthSession,
} from '@/lib/preview-oauth-browser'

declare global {
  interface Window {
    __figmaPreviewOAuthPopupsAllowed?: boolean
  }
}

export function GoogleSignInButton({
  next = '',
  previewMode,
}: {
  next?: string
  previewMode: boolean
}) {
  const router = useRouter()
  const pendingSignIn = useRef<AbortController | null>(null)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  useEffect(() => () => pendingSignIn.current?.abort(), [])

  async function startGoogleSignIn() {
    setError('')
    setPending(true)
    if (previewMode) {
      if (window.__figmaPreviewOAuthPopupsAllowed !== true) {
        setError('Google chưa khả dụng trong Preview. Hãy cho phép popup hoặc dùng email.')
        setPending(false)
        return
      }
      pendingSignIn.current?.abort()
      const controller = (pendingSignIn.current = new AbortController())
      try {
        const secret = await openPreviewOAuth()
        const outcome = await waitForPreviewOAuthSession(secret, controller.signal)
        if (outcome === 'complete') {
          await announceSessionChange(router)
          router.push(next || '/')
        } else if (outcome === 'expired') {
          setError('Phiên đăng nhập đã hết hạn. Vui lòng thử lại.')
        }
      } catch {
        setError('Không thể mở Google trong Preview. Hãy cho phép popup hoặc dùng email.')
      } finally {
        setPending(false)
      }
      return
    }

    try {
      await signIn('google', { redirectTo: next || '/' })
    } catch {
      setError('Không thể kết nối Google. Vui lòng thử lại.')
      setPending(false)
    }
  }

  return (
    <div className="google-auth">
      <button
        className="google-auth__button"
        disabled={pending}
        onClick={startGoogleSignIn}
        type="button"
      >
        <span aria-hidden="true">G</span>
        {pending ? 'Đang kết nối Google...' : 'Tiếp tục với Google'}
      </button>
      {error && <p className="google-auth__error" role="alert">{error}</p>}
    </div>
  )
}
