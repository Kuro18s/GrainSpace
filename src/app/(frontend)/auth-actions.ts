'use server'

import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { clearAppSession, setAppSession } from '@/lib/app-auth'

function text(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

type AccountType = 'admin' | 'customer'

function accountType(formData: FormData): AccountType {
  return text(formData, 'accountType') === 'admin' ? 'admin' : 'customer'
}

function safeNext(formData: FormData) {
  const next = text(formData, 'next')
  return next.startsWith('/') && !next.startsWith('//') ? next : ''
}

function authError(message: string, mode: 'login' | 'signup', type: AccountType) {
  redirect(`/${mode}?type=${type}&error=${encodeURIComponent(message)}`)
}

export async function loginAction(formData: FormData) {
  const type = accountType(formData)
  const email = text(formData, 'email').toLowerCase()
  const password = text(formData, 'password')

  if (!email || !password) authError('Vui lòng nhập email và mật khẩu.', 'login', type)

  const payload = await getPayload({ config })
  let token: string | undefined
  let role: string | null | undefined

  try {
    const result = await payload.login({
      collection: 'users',
      data: { email, password },
    })
    token = result.token
    role = result.user?.role
  } catch {
    authError('Email hoặc mật khẩu chưa chính xác.', 'login', type)
  }

  if (type === 'admin' && role !== 'platform-admin') {
    authError('Tài khoản này chưa được cấp quyền quản trị viên.', 'login', type)
  }
  if (type === 'customer' && role === 'platform-admin') {
    authError('Vui lòng sử dụng cổng đăng nhập quản trị viên.', 'login', type)
  }
  if (!token) return authError('Không thể tạo phiên đăng nhập.', 'login', type)
  await setAppSession(token)
  const next = safeNext(formData)
  redirect(next || (type === 'admin' ? '/control' : '/'))
}

export async function signupAction(formData: FormData) {
  const type = accountType(formData)
  const name = text(formData, 'name')
  const email = text(formData, 'email').toLowerCase()
  const password = text(formData, 'password')

  if (name.length < 2) authError('Tên hiển thị cần ít nhất 2 ký tự.', 'signup', type)
  if (!email.includes('@')) authError('Địa chỉ email chưa hợp lệ.', 'signup', type)

  const payload = await getPayload({ config })

  if (type === 'admin') {
    const organization = text(formData, 'organization')
    const reason = text(formData, 'reason')
    if (organization.length < 2) {
      authError('Vui lòng nhập đơn vị hoặc tổ chức.', 'signup', type)
    }
    if (reason.length < 10) {
      authError('Lý do đăng ký cần ít nhất 10 ký tự.', 'signup', type)
    }

    try {
      await payload.create({
        collection: 'admin-access-requests',
        data: { email, name, organization, reason, status: 'pending' },
        draft: false,
        overrideAccess: false,
      })
    } catch {
      authError('Không thể gửi yêu cầu quản trị. Vui lòng kiểm tra lại thông tin.', 'signup', type)
    }

    redirect('/login?type=admin&message=Yêu cầu quản trị đã được gửi và đang chờ phê duyệt.')
  }

  if (password.length < 8) authError('Mật khẩu cần ít nhất 8 ký tự.', 'signup', type)
  try {
    await payload.create({
      collection: 'users',
      data: { email, name, password, role: 'customer' },
      draft: false,
      overrideAccess: false,
    })
  } catch {
    authError('Email này đã được sử dụng hoặc dữ liệu chưa hợp lệ.', 'signup', type)
  }

  let token: string | undefined
  try {
    const result = await payload.login({
      collection: 'users',
      data: { email, password },
    })
    token = result.token
  } catch {
    authError('Tài khoản đã tạo nhưng chưa thể đăng nhập.', 'signup', type)
  }

  if (!token) return authError('Không thể tạo phiên đăng nhập.', 'signup', type)
  await setAppSession(token)
  redirect('/')
}

export async function logoutAction() {
  await clearAppSession()
  redirect('/login')
}
