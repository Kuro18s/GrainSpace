import { PreviewOAuthCallback } from '@/components/PreviewOAuthCallback'
import { notFound } from 'next/navigation'

export const instant = false

export default async function PreviewOAuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  if (Object.keys(await searchParams).length > 0) notFound()
  return <PreviewOAuthCallback />
}
