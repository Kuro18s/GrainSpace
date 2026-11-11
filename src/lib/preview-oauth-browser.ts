'use client'

type PreviewOAuthWindow = Window & { __figmaPreviewOAuthPopupsAllowed?: boolean }

const READY = 'figma-preview-oauth:ready'
const ACK = 'figma-preview-oauth:ack'
const STARTED = 'figma-preview-oauth:started'
const FAILED = 'figma-preview-oauth:failed'
const SECRET = /^[a-f0-9]{64}$/
const HANDSHAKE_TIMEOUT_MS = 10_000
const CONNECT_TIMEOUT_MS = 45_000
const START_TIMEOUT_MS = 60_000
const EXCHANGE_POLL_MS = 1_000
const EXCHANGE_TIMEOUT_MS = 5 * 60_000

function randomSecret(win: Window): string {
  return Array.from(win.crypto.getRandomValues(new Uint8Array(32)), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('')
}

export function openPreviewOAuth(win: PreviewOAuthWindow = window): Promise<string> {
  if (win.__figmaPreviewOAuthPopupsAllowed !== true) {
    return Promise.reject(new Error('Preview OAuth is unavailable'))
  }
  return new Promise((resolve, reject) => {
    let popup: Window | null = null
    let secret: string | undefined
    let timer = 0
    const cleanup = () => {
      win.clearTimeout(timer)
      win.removeEventListener('message', receive)
    }
    const rejectAfter = (milliseconds: number, message: string) => {
      win.clearTimeout(timer)
      timer = win.setTimeout(() => {
        cleanup()
        popup?.close()
        reject(new Error(message))
      }, milliseconds)
    }
    const receive = (event: MessageEvent) => {
      if (!popup || event.source !== popup || event.origin !== win.location.origin) return
      if (
        event.data?.type === READY &&
        secret === undefined &&
        typeof event.data.secret === 'string' &&
        SECRET.test(event.data.secret)
      ) {
        secret = event.data.secret
        popup.postMessage({ type: ACK, secret }, win.location.origin)
        rejectAfter(START_TIMEOUT_MS, 'Preview sign-in did not start')
      } else if (secret !== undefined && event.data?.secret === secret) {
        if (event.data.type === STARTED) {
          cleanup()
          resolve(secret)
        } else if (event.data.type === FAILED) {
          cleanup()
          popup.close()
          reject(new Error('Preview sign-in unavailable'))
        }
      }
    }
    rejectAfter(CONNECT_TIMEOUT_MS, 'Preview OAuth popup did not connect')
    win.addEventListener('message', receive)
    try {
      popup = win.open('/api/auth/preview-signin', '_blank', 'width=480,height=640')
    } catch {
      cleanup()
      reject(new Error('Preview OAuth popup was blocked'))
      return
    }
    if (!popup || popup === win) {
      cleanup()
      reject(new Error('Preview OAuth popup was blocked'))
    }
  })
}

export async function waitForPreviewOAuthSession(
  secret: string,
  signal: AbortSignal,
  win: Window = window,
): Promise<'complete' | 'expired' | 'aborted'> {
  const deadline = Date.now() + EXCHANGE_TIMEOUT_MS
  const stop = new AbortController()
  const abort = () => stop.abort()
  const expiry = win.setTimeout(abort, EXCHANGE_TIMEOUT_MS)
  signal.addEventListener('abort', abort)
  if (signal.aborted) abort()
  try {
    while (!stop.signal.aborted && Date.now() < deadline) {
      const response = await win.fetch('/api/auth/preview-exchange', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ secret }),
        signal: stop.signal,
      })
      if (response.status === 204) return 'complete'
      if (response.status === 410) return 'expired'
      if (response.status !== 202) throw new Error('Preview sign-in could not be completed')
      await new Promise<void>((resolve) => {
        const done = () => {
          win.clearTimeout(timer)
          stop.signal.removeEventListener('abort', done)
          resolve()
        }
        const timer = win.setTimeout(done, EXCHANGE_POLL_MS)
        stop.signal.addEventListener('abort', done)
      })
    }
  } catch (error) {
    if (!stop.signal.aborted) throw error
  } finally {
    win.clearTimeout(expiry)
    signal.removeEventListener('abort', abort)
  }
  return signal.aborted ? 'aborted' : 'expired'
}

export async function startPreviewOAuthBridge(
  start: (secret: string) => Promise<string>,
  win: Window = window,
): Promise<void> {
  const opener = win.opener as Window | null
  if (!opener || win.location.search || win.location.hash) {
    throw new Error('Open preview sign-in from the app')
  }
  const secret = randomSecret(win)
  await new Promise<void>((resolve, reject) => {
    const cleanup = () => {
      win.clearTimeout(timer)
      win.removeEventListener('message', receive)
    }
    const receive = (event: MessageEvent) => {
      if (
        event.source !== opener ||
        event.origin !== win.location.origin ||
        event.data?.type !== ACK ||
        event.data.secret !== secret
      ) {
        return
      }
      cleanup()
      resolve()
    }
    const timer = win.setTimeout(() => {
      cleanup()
      reject(new Error('Preview OAuth opener did not connect'))
    }, HANDSHAKE_TIMEOUT_MS)
    win.addEventListener('message', receive)
    opener.postMessage({ type: READY, secret }, win.location.origin)
  })
  try {
    const authorizationUrl = await start(secret)
    opener.postMessage({ type: STARTED, secret }, win.location.origin)
    win.location.assign(authorizationUrl)
  } catch (error) {
    opener.postMessage({ type: FAILED, secret }, win.location.origin)
    throw error
  }
}

const callbackCompletions = new WeakMap<Window, Promise<void>>()

export function completePreviewOAuthCallback(
  submit: (callback: string) => Promise<void>,
  win: Window = window,
): Promise<void> {
  let completion = callbackCompletions.get(win)
  if (!completion) {
    completion = takeCallback(submit, win)
    callbackCompletions.set(win, completion)
  }
  return completion
}

async function takeCallback(
  submit: (callback: string) => Promise<void>,
  win: Window,
): Promise<void> {
  const { pathname, search, hash } = win.location
  win.history.replaceState(null, '', pathname)
  if (search || hash.length < 2) throw new Error('Open preview sign-in from the app')
  await submit(hash.slice(1))
}
