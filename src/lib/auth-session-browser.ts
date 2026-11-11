'use client'

export async function announceSessionChange(router: { refresh(): void }): Promise<void> {
  router.refresh()
}
