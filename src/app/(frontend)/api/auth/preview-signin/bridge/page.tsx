import { cookies } from 'next/headers'
import { PreviewOAuthBridge } from '@/components/PreviewOAuthBridge'

export const instant = false

export default async function PreviewSignInBridgePage() {
  const csrf = (await cookies()).get('__Host-pv_bootstrap')?.value
  if (!csrf) {
    return <main className="oauth-popup"><h1>Phiên đăng nhập không hợp lệ.</h1></main>
  }
  return <PreviewOAuthBridge csrf={csrf} />
}
