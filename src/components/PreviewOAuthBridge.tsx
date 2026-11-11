'use client'

import { useEffect, useState } from 'react'
import { startPreviewOAuthBridge } from '@/lib/preview-oauth-browser'

export function PreviewOAuthBridge({ csrf }: { csrf: string }) {
  const [message, setMessage] = useState('Đang kết nối với Google...')

  useEffect(() => {
    void startPreviewOAuthBridge(async (secret) => {
      const response = await fetch('/api/auth/preview-start', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ csrf, secret }),
      })
      if (!response.ok) throw new Error('Preview sign-in unavailable')
      const body = (await response.json()) as { authorizationUrl?: unknown }
      if (typeof body.authorizationUrl !== 'string') throw new Error('Invalid authorization URL')
      return body.authorizationUrl
    }).catch(() => setMessage('Không thể mở đăng nhập Google. Hãy đóng cửa sổ và thử lại.'))
  }, [csrf])

  return (
    <main className="oauth-popup">
      <span className="eyebrow">FILM//SPACE / GOOGLE</span>
      <h1>{message}</h1>
      <p>Không đóng cửa sổ này trong khi quá trình xác thực đang diễn ra.</p>
    </main>
  )
}
