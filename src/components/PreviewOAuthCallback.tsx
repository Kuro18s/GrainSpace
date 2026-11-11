'use client'

import { useEffect, useState } from 'react'
import { completePreviewOAuthCallback } from '@/lib/preview-oauth-browser'

export function PreviewOAuthCallback() {
  const [message, setMessage] = useState('Đang hoàn tất đăng nhập...')

  useEffect(() => {
    void completePreviewOAuthCallback(async (callback) => {
      const response = await fetch('/api/auth/preview-complete', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ callback }),
      })
      if (!response.ok) throw new Error('Preview sign-in failed')
    })
      .then(() => {
        setMessage('Đăng nhập thành công. Bạn có thể đóng cửa sổ này.')
        window.close()
      })
      .catch(() => setMessage('Đăng nhập không thành công. Hãy đóng cửa sổ và thử lại.'))
  }, [])

  return (
    <main className="oauth-popup">
      <span className="eyebrow">FILM//SPACE / GOOGLE</span>
      <h1>{message}</h1>
    </main>
  )
}
