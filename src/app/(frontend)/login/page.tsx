import { AuthPage } from '@/components/AuthPage'
import { Suspense } from 'react'

async function LoginContent({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string; next?: string; type?: string }>
}) {
  const { error, message, next, type } = await searchParams
  return (
    <AuthPage
      accountType={type === 'admin' ? 'admin' : 'customer'}
      error={error}
      message={message}
      mode="login"
      next={next}
    />
  )
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string; next?: string; type?: string }>
}) {
  return (
    <Suspense fallback={<AuthPage mode="login" />}>
      <LoginContent searchParams={searchParams} />
    </Suspense>
  )
}
