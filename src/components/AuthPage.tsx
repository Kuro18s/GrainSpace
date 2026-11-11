import Image from 'next/image'
import Link from 'next/link'
import { loginAction, signupAction } from '@/app/(frontend)/auth-actions'
import { GoogleSignInButton } from '@/components/GoogleSignInButton'

type AuthPageProps = {
  accountType?: 'admin' | 'customer'
  error?: string
  message?: string
  mode: 'login' | 'signup'
  next?: string
}

export function AuthPage({
  accountType = 'customer',
  error,
  message,
  mode,
  next = '',
}: AuthPageProps) {
  const isSignup = mode === 'signup'
  const isAdmin = accountType === 'admin'
  const typeQuery = `?type=${accountType}`
  const googleEnabled = Boolean(
    process.env.AUTH_GOOGLE_ID &&
      process.env.AUTH_GOOGLE_SECRET &&
      process.env.AUTH_SECRET,
  )

  return (
    <main className="auth-page">
      <Image
        alt=""
        className="auth-background"
        fill
        priority
        sizes="100vw"
        src="https://images.unsplash.com/photo-1520522801082-bc68bc09689f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1800"
      />
      <div className="auth-shade" />
      <header className="auth-header">
        <Link className="brand" href="/">
          <Image alt="" height={26} src="/assets/f0348.svg" width={26} />
          <strong>FILM//SPACE</strong>
          <span>/ CỔNG KẾT NỐI SÁNG TẠO</span>
        </Link>
        <span className="status-pill status-pill--green">KẾT NỐI ĐƯỢC BẢO MẬT</span>
      </header>

      <section className="auth-stage">
        <div className="auth-card">
          <div className="auth-intro">
            <span className="eyebrow">ANALOG PEOPLE. SHARED SPACES.</span>
            <h1>Mọi khung hình,<br />một kết nối mới.</h1>
            <p>
              Tìm phòng tối, đặt studio và gặp những người cùng yêu chất phim.
              Không gian sáng tạo của bạn bắt đầu ở đây.
            </p>
            <div className="film-formats">
              <span><i />35 MM</span>
              <span className="is-active"><i />120</span>
              <span><i />4 × 5</span>
            </div>
            <ul className="auth-benefits">
              <li>Không gian và thiết bị trong một lượt đặt</li>
              <li>Kiến thức từ cộng đồng nhiếp ảnh phim</li>
              <li>Trợ lý AI đồng hành cùng ý tưởng</li>
            </ul>
            <span className="status-pill status-pill--green">24 KHÔNG GIAN SẴN SÀNG KẾT NỐI</span>
          </div>

          <div className="auth-form-panel">
            <nav className="account-type-tabs" aria-label="Loại tài khoản">
              <Link className={!isAdmin ? 'is-active' : ''} href={`/${mode}?type=customer`}>
                Khách hàng
              </Link>
              <Link className={isAdmin ? 'is-active' : ''} href={`/${mode}?type=admin`}>
                Quản trị viên
              </Link>
            </nav>
            <nav className="auth-tabs" aria-label="Xác thực">
              <Link className={!isSignup ? 'is-active' : ''} href={`/login${typeQuery}`}>Đăng nhập</Link>
              <Link className={isSignup ? 'is-active' : ''} href={`/signup${typeQuery}`}>Đăng ký</Link>
            </nav>
            <div>
              <h2>
                {isSignup
                  ? isAdmin ? 'Yêu cầu quyền quản trị.' : 'Tạo tài khoản khách hàng.'
                  : isAdmin ? 'Cổng quản trị viên.' : 'Chào mừng trở lại.'}
              </h2>
              <p>
                {isSignup
                  ? isAdmin
                    ? 'Yêu cầu sẽ được quản trị hệ thống xét duyệt trước khi cấp tài khoản.'
                    : 'Đăng ký để đặt phòng và sử dụng các công cụ sáng tạo.'
                  : isAdmin
                    ? 'Chỉ dành cho tài khoản đã được cấp quyền nền tảng.'
                    : 'Đăng nhập để tiếp tục vào FILM//SPACE.'}
              </p>
            </div>
            {error && <p className="auth-error" role="alert">{error}</p>}
            {message && <p className="auth-message" role="status">{message}</p>}
            {!isAdmin && googleEnabled && (
              <>
                <GoogleSignInButton
                  next={next}
                  previewMode={Boolean(process.env.FIGMA_PREVIEW_OAUTH_REDIRECT_URI)}
                />
                <div className="auth-divider"><span>HOẶC DÙNG EMAIL</span></div>
              </>
            )}
            {!isAdmin && !googleEnabled && (
              <p className="auth-provider-note">
                Đăng nhập Google đang chờ hoàn tất thông tin kết nối. Bạn vẫn có thể dùng email và mật khẩu.
              </p>
            )}
            <form action={isSignup ? signupAction : loginAction} className="auth-form">
              <input name="accountType" type="hidden" value={accountType} />
              <input name="next" type="hidden" value={next} />
              {isSignup && (
                <label>
                  Tên hiển thị
                  <input autoComplete="name" name="name" placeholder="Minh Anh" required />
                </label>
              )}
              <label>
                Địa chỉ email
                <input autoComplete="email" name="email" placeholder="minhanh@example.com" required type="email" />
              </label>
              {isSignup && isAdmin && (
                <>
                  <label>
                    Đơn vị / tổ chức
                    <input name="organization" placeholder="FILM Lab" required />
                  </label>
                  <label>
                    Lý do cần quyền quản trị
                    <textarea name="reason" placeholder="Mô tả trách nhiệm quản trị của bạn..." required rows={3} />
                  </label>
                </>
              )}
              {(!isSignup || !isAdmin) && (
                <label>
                  Mật khẩu
                  <input autoComplete={isSignup ? 'new-password' : 'current-password'} minLength={8} name="password" placeholder="••••••••••••" required type="password" />
                </label>
              )}
              <button className="auth-submit" type="submit">
                {isSignup
                  ? isAdmin ? 'Gửi yêu cầu quản trị' : 'Tạo tài khoản khách hàng'
                  : isAdmin ? 'Đăng nhập quản trị' : 'Đăng nhập khách hàng'} →
              </button>
            </form>
            <p className="auth-terms">
              Bằng việc tiếp tục, bạn đồng ý với Điều khoản sử dụng và Chính sách quyền riêng tư của FILM//SPACE.
            </p>
          </div>
        </div>
        <p className="auth-caption">ĐỒ ÁN TỐT NGHIỆP · GIAO DIỆN MINH HỌA · 2026</p>
      </section>
    </main>
  )
}
