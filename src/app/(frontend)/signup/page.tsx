import { AuthPage } from '@/components/AuthPage'
import { Suspense } from 'react'

async function SignupContent({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; type?: string }>
}) {
  const { error, type } = await searchParams
  return <AuthPage accountType={type === 'admin' ? 'admin' : 'customer'} error={error} mode="signup" />
}

export default function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; type?: string }>
}) {
  return (
    <Suspense fallback={<AuthPage mode="signup" />}>
      <SignupContent searchParams={searchParams} />
    </Suspense>
  )
}
