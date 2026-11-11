'use client'

import { signOut } from 'next-auth/react'

export function AuthLogoutButton({ title }: { title: string }) {
  return (
    <button onClick={() => signOut({ redirectTo: '/login' })} title={title} type="button">
      Đăng xuất
    </button>
  )
}
