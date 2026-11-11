import type { JWT } from 'next-auth/jwt'
import { createPreviewOAuthStore } from '@/lib/preview-oauth-server'

const globalStore = globalThis as typeof globalThis & {
  filmspacePreviewOAuthStore?: ReturnType<typeof createPreviewOAuthStore<JWT>>
}

export const previewOAuthStore =
  globalStore.filmspacePreviewOAuthStore ?? createPreviewOAuthStore<JWT>()

if (process.env.NODE_ENV !== 'production') {
  globalStore.filmspacePreviewOAuthStore = previewOAuthStore
}
