'use client'

import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { createBookingAction } from '@/app/(frontend)/booking-actions'
import { PhotoRestorationLab } from '@/components/PhotoRestorationLab'
import {
  bankOptions,
  paymentMethods,
  type BankCode,
  type PaymentMethod,
} from '@/lib/payment-methods'

type Toast = { id: number; message: string }
type MuseMessage = { from: 'muse' | 'user'; text: string }
export type SuggestionRoom = {
  area: number
  capacity: number
  district: string
  hourlyRate: number
  id: string
  image: {
    alt: string
    height: number
    url: string
    width: number
  } | null
  name: string
  providerName: string
  rating: number
  type: 'darkroom' | 'processing-room' | 'studio'
}
export type SuggestionService = {
  code: string
  id: string
  name: string
  spaceId: string
  spaceName: string
  type: 'camera' | 'consumable' | 'darkroom-equipment' | 'lens'
  usageCount: number
}

const serviceTypeLabels: Record<SuggestionService['type'], string> = {
  camera: 'Máy ảnh',
  consumable: 'Vật tư',
  'darkroom-equipment': 'Phòng tối',
  lens: 'Ống kính',
}

const navRoutes: Record<string, string> = {
  'bộ sưu tập': '/collection',
  'cộng đồng': '/community',
  'không gian': '/spaces',
  'quản trị': '/control',
  'tổng quan': '/',
  'vận hành': '/operations',
}

function normalize(value: string) {
  return value.replace(/\s+/g, ' ').trim().toLowerCase()
}

function actionLabel(element: Element) {
  return normalize(element.textContent ?? '')
}

export function InteractionLayer({
  children,
  rooms,
  services = [],
}: {
  children: ReactNode
  rooms: SuggestionRoom[]
  services?: SuggestionService[]
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [bookingOpen, setBookingOpen] = useState(false)
  const [composerOpen, setComposerOpen] = useState(false)
  const [museOpen, setMuseOpen] = useState(false)
  const [photoLabOpen, setPhotoLabOpen] = useState(false)
  const [recommendOpen, setRecommendOpen] = useState(false)
  const [recommendMode, setRecommendMode] = useState<'rooms' | 'services'>('rooms')
  const [roomType, setRoomType] = useState<'all' | SuggestionRoom['type']>('all')
  const [serviceType, setServiceType] = useState<'all' | SuggestionService['type']>('all')
  const [budget, setBudget] = useState(300000)
  const [capacity, setCapacity] = useState(2)
  const [selectedSpace, setSelectedSpace] = useState('Phòng tối 01')
  const [selectedResourceIDs, setSelectedResourceIDs] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank-transfer')
  const [bankCode, setBankCode] = useState<BankCode>('vietcombank')
  const [toasts, setToasts] = useState<Toast[]>([])
  const [messages, setMessages] = useState<MuseMessage[]>([
    {
      from: 'muse',
      text: 'Chào bạn. Tôi có thể gợi ý không gian, thiết bị hoặc quy trình phòng tối.',
    },
  ])
  const [isPending, startTransition] = useTransition()
  const toastId = useRef(0)
  const isAuthRoute = pathname === '/login' || pathname === '/signup'
  const recommendations = useMemo(
    () =>
      [...rooms]
        .filter((room) => roomType === 'all' || room.type === roomType)
        .filter((room) => room.capacity >= capacity)
        .map((room) => ({
          room,
          score:
            40 +
            (room.hourlyRate <= budget
              ? 30
              : Math.max(0, 20 - (room.hourlyRate - budget) / 10000)) +
            20 +
            room.rating * 2,
        }))
        .sort((a, b) => b.score - a.score)
        .map(({ room }) => room),
    [budget, capacity, roomType, rooms],
  )
  const bestRoom = recommendations[0]
  const serviceRecommendations = useMemo(
    () =>
      [...services]
        .filter((service) => serviceType === 'all' || service.type === serviceType)
        .sort((a, b) => b.usageCount - a.usageCount || a.name.localeCompare(b.name, 'vi')),
    [serviceType, services],
  )

  const notify = (message: string) => {
    const id = ++toastId.current
    setToasts((current) => [...current, { id, message }])
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 3200)
  }

  useEffect(() => {
    const selectors = [
      '[data-name="Action"]',
      '[data-name="Chat input"]',
      '[data-name="Knowledge search"]',
      '[data-name="Navigation item"]',
      '[data-name="Photo upload"]',
      '[data-name="Search filters"]',
      '[data-name="Space result"]',
      '[data-name="Tab"]',
      '[data-name="Time slot"]',
    ].join(',')

    const scrollToPanel = (dataName: string) => {
      const panel = Array.from(document.querySelectorAll<HTMLElement>('[data-name]')).find(
        (element) => element.dataset.name === dataName,
      )
      if (!panel) {
        notify(`Không tìm thấy khu vực “${dataName}” trên màn hình này.`)
        return
      }
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' })
      panel.classList.add('is-interactive-focus')
      window.setTimeout(() => panel.classList.remove('is-interactive-focus'), 1800)
    }

    const activateTab = (label: string) => {
      if (label.includes('lượt đặt của tôi')) scrollToPanel('Upcoming bookings')
      else if (label.includes('thiết bị yêu thích')) {
        setRecommendMode('services')
        setRecommendOpen(true)
      } else if (label.includes('bộ sưu tập ảnh')) router.push('/collection')
      else if (label.includes('gói đã lưu')) router.push('/spaces')
      else if (label.includes('tổng quan vận hành')) scrollToPanel('Operational metrics')
      else if (label.includes('không gian & lịch')) scrollToPanel('Lịch phân bổ tài nguyên')
      else if (label.includes('thiết bị & vật tư'))
        scrollToPanel('Thiết bị & vật tư / vòng đời tài nguyên')
      else if (label.includes('gói & khuyến mãi')) {
        const workspace = document.querySelector<HTMLElement>('#provider-workspace')
        workspace?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (label === 'doanh thu') scrollToPanel('Doanh thu 7 ngày')
      else if (label.includes('hồ sơ cơ sở')) scrollToPanel('Business profile')
      else if (label === 'tổng quan') scrollToPanel('Platform metrics')
      else if (label.includes('người dùng & vai trò')) scrollToPanel('Phân quyền & người dùng')
      else if (label.includes('duyệt nhà cung cấp')) scrollToPanel('Phê duyệt nhà cung cấp')
      else if (label.includes('giao dịch & tranh chấp')) scrollToPanel('Transactions and disputes')
      else if (label.includes('nội dung & danh mục')) scrollToPanel('Nội dung & danh mục')
      else if (label.includes('cấu hình ai')) scrollToPanel('Cấu hình trợ lý MUSE')
      else notify(`Đang xem: ${label}.`)
    }

    const activate = (target: Element) => {
      const named = target.closest<HTMLElement>(selectors)
      if (!named) return
      const name = named.dataset.name
      const label = actionLabel(named)

      if (name === 'Navigation item') {
        const route = navRoutes[label]
        if (route) router.push(route)
        return
      }

      if (name === 'Space result') {
        if (!named.hasAttribute('data-space-choice')) return
        document.querySelectorAll('[data-space-choice]').forEach((space) => {
          space.classList.remove('is-interactive-selected')
          const status = space.querySelector<HTMLElement>('[data-name="Status"] p')
          const comparison = space.querySelector<HTMLElement>(':scope > p:last-child')
          if (status) status.textContent = 'Còn lịch'
          if (comparison) comparison.textContent = '□ Chọn không gian'
        })
        named.classList.add('is-interactive-selected')
        const heading = named.querySelector('[class*="Space_Grotesk:Bold"]')?.textContent?.trim()
        const directParagraphs = Array.from(named.children).filter(
          (child): child is HTMLParagraphElement => child instanceof HTMLParagraphElement,
        )
        const provider = directParagraphs[1]?.textContent?.trim().split('·')[0]?.trim()
        const status = named.querySelector<HTMLElement>('[data-name="Status"] p')
        const comparison = named.querySelector<HTMLElement>(':scope > p:last-child')
        if (status) status.textContent = 'Đang chọn'
        if (comparison) comparison.textContent = '☑ Đã chọn'
        if (heading) {
          setSelectedSpace(heading)
          setSelectedResourceIDs([])
          const selectedTitle = document.querySelector<HTMLElement>('[data-selected-space-title]')
          const comparisonSummary = document.querySelector<HTMLElement>(
            '[data-selected-space-comparison]',
          )
          const bookingSummary = document.querySelector<HTMLElement>(
            '[data-selected-space-summary]',
          )
          if (selectedTitle) selectedTitle.textContent = heading
          if (comparisonSummary)
            comparisonSummary.textContent = `${heading} đang được chọn. Chọn phòng khác để thay thế lựa chọn hiện tại.`
          if (bookingSummary)
            bookingSummary.textContent =
              `${provider ?? 'FILM//SPACE'} / ${heading}`.toLocaleUpperCase('vi-VN')
        }
        notify(`Đã chọn ${heading ?? 'không gian'}.`)
        return
      }

      if (name === 'Time slot') {
        const slotLabel = named.textContent?.trim() || ''
        if (named.querySelector('.line-through')) {
          notify(`Khung giờ ${slotLabel} đã được đặt. Vui lòng chọn giờ khác.`)
          return
        }
        document.querySelectorAll('[data-name="Time slot"]').forEach((slot) => {
          slot.classList.remove('is-interactive-selected')
        })
        named.classList.add('is-interactive-selected')
        setSelectedTime(slotLabel)
        const [start = '--', end = '--'] = slotLabel.split(/[–-]/)
        const inputs = document.querySelectorAll<HTMLElement>(
          '[data-name="Time fields"] [data-name="Input"] > p',
        )
        const duration = Math.max(1, Number(end) - Number(start))
        const badge = document.querySelector<HTMLElement>('[data-selected-time-badge]')
        const summary = document.querySelector<HTMLElement>('[data-selected-time-summary]')
        if (inputs[0]) inputs[0].textContent = `${start}:00`
        if (inputs[1]) inputs[1].textContent = `${end}:00`
        if (badge) badge.textContent = `LỊCH ${start}–${end}H`
        if (summary) summary.textContent = `${start}:00–${end}:00 · ${duration} giờ · 01 người`
        notify(`Đã cập nhật khung giờ ${slotLabel}.`)
        return
      }

      if (name === 'Tab') {
        const parent = named.parentElement
        parent?.querySelectorAll('[data-name="Tab"]').forEach((tab) => {
          tab.classList.remove('is-interactive-active')
        })
        named.classList.add('is-interactive-active')
        activateTab(label)
        return
      }

      if (name === 'Search filters') {
        setRecommendMode('rooms')
        setMuseOpen(false)
        setRecommendOpen(true)
        return
      }

      if (name === 'Knowledge search' || name === 'Chat input') {
        setMuseOpen(true)
        return
      }

      if (name === 'Photo upload') {
        setMuseOpen(false)
        setRecommendOpen(false)
        setPhotoLabOpen(true)
        return
      }

      if (name !== 'Action') return

      if (label.includes('tìm không gian sáng tạo')) router.push('/spaces')
      else if (label.includes('khám phá cộng đồng')) router.push('/community')
      else if (label.includes('tạo đặt chỗ trực tiếp')) router.push('/spaces')
      else if (label.includes('tiếp tục thanh toán')) setBookingOpen(true)
      else if (label.includes('viết bài mới')) setComposerOpen(true)
      else if (label.includes('xuất báo cáo')) exportReport()
      else if (label.includes('xem tất cả tài nguyên')) {
        setRecommendMode('services')
        setRecommendOpen(true)
      } else if (label.includes('xem lịch của tôi')) router.push('/#workspace')
      else if (label.includes('lịch sử đặt chỗ')) router.push('/#workspace')
      else if (label.includes('tham gia cộng đồng')) router.push('/community')
      else if (label.includes('chọn phòng khác')) {
        setRecommendMode('rooms')
        setRecommendOpen(true)
      } else if (label.includes('doanh thu 7 ngày')) exportReport()
      else if (label.includes('chỉnh sửa cơ sở')) {
        const workspace = document.querySelector<HTMLElement>('#provider-workspace')
        if (workspace) workspace.scrollIntoView({ behavior: 'smooth', block: 'start' })
        else notify('Workspace cơ sở chưa sẵn sàng cho tài khoản này.')
      } else if (label.includes('mở trung tâm tranh chấp')) scrollToPanel('Tranh chấp cần xử lý')
      else if (label.includes('nhắn nhà cung cấp')) {
        setRecommendOpen(false)
        setMuseOpen(true)
        setMessages((current) => [
          ...current,
          {
            from: 'muse',
            text: `Bạn đang quan tâm đến ${selectedSpace}. Hãy cho tôi biết nội dung cần trao đổi; tôi sẽ giúp bạn chuẩn bị yêu cầu trước khi liên hệ nhà cung cấp.`,
          },
        ])
      } else if (label.includes('chọn ảnh') || label.includes('phục chế')) setPhotoLabOpen(true)
      else if (label.includes('hỏi trợ lý') || label.includes('tìm kiếm')) setMuseOpen(true)
      else if (label.includes('tìm không gian')) {
        setRecommendMode('rooms')
        setRecommendOpen(true)
      } else notify('Thao tác đã được ghi nhận.')
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target
      if (target instanceof Element) {
        const interactive = target.closest<HTMLElement>(selectors)
        if (interactive) activate(interactive)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      const target = event.target
      if (target instanceof Element) {
        const interactive = target.closest<HTMLElement>(selectors)
        if (!interactive) return
        event.preventDefault()
        activate(interactive)
      }
    }
    const handleChange = (event: Event) => {
      const target = event.target
      if (target instanceof HTMLInputElement && target.matches('[data-booking-date]')) {
        setSelectedDate(target.value)
        if (target.value) {
          const formattedDate = target.value.split('-').reverse().join('.')
          const summary = document.querySelector<HTMLElement>('[data-selected-date-summary]')
          if (summary) summary.textContent = formattedDate
          notify(`Đã chọn ngày ${formattedDate}.`)
        }
      }
    }

    const controls = Array.from(document.querySelectorAll<HTMLElement>(selectors))
    controls.forEach((control) => {
      if (!control.hasAttribute('tabindex')) control.tabIndex = 0
      if (!control.hasAttribute('role')) {
        control.setAttribute('role', control.dataset.name === 'Tab' ? 'tab' : 'button')
      }
    })

    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('change', handleChange)
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('change', handleChange)
    }
  }, [pathname, router])

  const exportReport = () => {
    const csv = [
      ['Chỉ số', 'Giá trị'],
      ['Thành viên', '1.280'],
      ['Nhà cung cấp', '24'],
      ['Giá trị giao dịch', '128.400.000đ'],
      ['Tranh chấp đang mở', '2'],
    ]
      .map((row) => row.join(','))
      .join('\n')
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'filmspace-bao-cao-thang-11.csv'
    anchor.click()
    URL.revokeObjectURL(url)
    notify('Báo cáo CSV đã được tải xuống.')
  }

  const submitBooking = () => {
    if (!selectedDate || !selectedTime) {
      notify('Hãy chọn ngày và khung giờ trước khi xác nhận đặt chỗ.')
      return
    }
    const [rawStart = '14:00', rawEnd = '17:00'] = selectedTime
      .replace(/[^\d:–-]/g, '')
      .split(/[–-]/)
    const normalizeTime = (value: string) => (value.includes(':') ? value : `${value}:00`)
    const startTime = normalizeTime(rawStart)
    const endTime = normalizeTime(rawEnd)

    startTransition(async () => {
      const result = await createBookingAction({
        bankCode: paymentMethod === 'bank-transfer' ? bankCode : undefined,
        bookingDate: selectedDate,
        endTime,
        paymentMethod,
        resourceIds: selectedResourceIDs,
        spaceName: selectedSpace,
        startTime,
      })
      if (result.ok) {
        setBookingOpen(false)
        notify(`Đã tạo đặt chỗ ${result.reference}.`)
        router.refresh()
      } else if (result.loginRequired) {
        notify(result.error)
        router.push('/login')
      } else {
        notify(result.error)
      }
    })
  }

  const museReply = (value: string) => {
    const lower = value.toLowerCase()
    const serviceTypeMatch: SuggestionService['type'] | undefined =
      lower.includes('ống kính') || lower.includes('lens')
        ? 'lens'
        : lower.includes('máy ảnh') || lower.includes('canon') || lower.includes('sony')
          ? 'camera'
          : lower.includes('hóa chất') || lower.includes('film') || lower.includes('vật tư')
            ? 'consumable'
            : lower.includes('thiết bị') || lower.includes('phòng tối')
              ? 'darkroom-equipment'
              : undefined
    const matchingService = serviceTypeMatch
      ? [...services]
          .filter((service) => service.type === serviceTypeMatch)
          .sort((a, b) => b.usageCount - a.usageCount)[0]
      : undefined

    if (matchingService) {
      return `${matchingService.name} (${matchingService.code}) đang sẵn sàng tại ${matchingService.spaceName}. Đây là gợi ý ${serviceTypeLabels[matchingService.type].toLowerCase()} phù hợp theo nhu cầu của bạn. Mở “Gợi ý phòng & dịch vụ” để xem thêm lựa chọn.`
    }

    const matchingRoom =
      (lower.includes('studio') && rooms.find((room) => room.type === 'studio')) ||
      ((lower.includes('c-41') || lower.includes('phim màu')) &&
        rooms.find((room) => room.type === 'processing-room')) ||
      ((lower.includes('phòng tối') || lower.includes('người mới')) &&
        [...rooms]
          .filter((room) => room.type === 'darkroom')
          .sort((a, b) => a.hourlyRate - b.hourlyRate)[0]) ||
      ((lower.includes('rẻ') || lower.includes('ngân sách')) &&
        [...rooms].sort((a, b) => a.hourlyRate - b.hourlyRate)[0]) ||
      bestRoom

    if (!matchingRoom) {
      if (services.length > 0) {
        const service = services[0]
        return `Hiện chưa có phòng khớp tiêu chí, nhưng ${service.name} đang khả dụng tại ${service.spaceName}.`
      }
      return 'Hiện chưa có không gian hoặc dịch vụ khả dụng. Bạn có thể quay lại sau hoặc liên hệ nhà cung cấp.'
    }
    const nearbyServices = services.filter((service) => service.spaceId === matchingRoom.id)
    const serviceNote =
      nearbyServices.length > 0
        ? ` Có thể kết hợp ${nearbyServices
            .slice(0, 2)
            .map((service) => service.name)
            .join(' và ')}.`
        : ''
    return `${matchingRoom.name} tại ${matchingRoom.providerName} là lựa chọn phù hợp: ${matchingRoom.hourlyRate.toLocaleString('vi-VN')}đ/giờ, sức chứa ${matchingRoom.capacity} người, ${matchingRoom.area} m² và được đánh giá ${matchingRoom.rating.toFixed(1)}/5.${serviceNote}`
  }

  const askMuse = (value: string) => {
    if (!value) return
    setMessages((current) => [...current, { from: 'user', text: value }])
    window.setTimeout(() => {
      setMessages((current) => [...current, { from: 'muse', text: museReply(value) }])
    }, 450)
  }

  const sendMuseMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const value = String(form.get('message') ?? '').trim()
    event.currentTarget.reset()
    askMuse(value)
  }

  const chooseSuggestedRoom = (room: SuggestionRoom) => {
    setSelectedSpace(room.name)
    setSelectedResourceIDs([])
    setRecommendOpen(false)
    notify(`Đã chọn ${room.name} từ bộ gợi ý.`)
    router.push('/spaces')
  }

  const chooseSuggestedService = (service: SuggestionService) => {
    setSelectedSpace(service.spaceName)
    setSelectedResourceIDs([service.id])
    setRecommendOpen(false)
    notify(`Đã chọn ${service.name} tại ${service.spaceName}.`)
    router.push('/spaces')
  }

  return (
    <>
      {children}

      {!isAuthRoute && (
        <div className="assistant-triggers">
          <button
            aria-expanded={recommendOpen}
            className="recommend-trigger"
            onClick={() => {
              setMuseOpen(false)
              setRecommendOpen((open) => !open)
            }}
            type="button"
          >
            PHÒNG & DỊCH VỤ
          </button>
          <button
            aria-expanded={photoLabOpen}
            className="photo-lab-trigger"
            onClick={() => {
              setMuseOpen(false)
              setRecommendOpen(false)
              setPhotoLabOpen(true)
            }}
            type="button"
          >
            PHỤC CHẾ ẢNH
          </button>
          <button
            aria-expanded={museOpen}
            aria-label="Mở trợ lý MUSE"
            className="muse-trigger"
            onClick={() => {
              setRecommendOpen(false)
              setMuseOpen((open) => !open)
            }}
            type="button"
          >
            MUSE
            <span />
          </button>
        </div>
      )}

      {museOpen && !isAuthRoute && (
        <aside className="muse-panel" aria-label="Trợ lý MUSE">
          <header>
            <div>
              <strong>MUSE / TƯ VẤN PHÒNG & DỊCH VỤ</strong>
              <span>ĐANG TRỰC TUYẾN · PHẢN HỒI NHANH</span>
            </div>
            <button aria-label="Đóng trợ lý" onClick={() => setMuseOpen(false)} type="button">
              ×
            </button>
          </header>
          <div className="muse-messages" aria-live="polite">
            {messages.map((message, index) => (
              <p
                className={`muse-message muse-message--${message.from}`}
                key={`${message.from}-${index}`}
              >
                {message.text}
              </p>
            ))}
          </div>
          <div className="muse-prompts" aria-label="Câu hỏi gợi ý">
            {[
              'Phòng tối nào phù hợp người mới?',
              'Gợi ý studio cho 4 người',
              'Có máy ảnh nào đang rảnh?',
              'Tôi cần ống kính chụp chân dung',
            ].map((prompt) => (
              <button onClick={() => askMuse(prompt)} type="button" key={prompt}>
                {prompt}
              </button>
            ))}
          </div>
          <form className="muse-form" onSubmit={sendMuseMessage}>
            <input
              aria-label="Câu hỏi cho MUSE"
              name="message"
              placeholder="Mô tả buổi chụp hoặc dịch vụ bạn cần..."
            />
            <button type="submit">GỬI ↑</button>
          </form>
        </aside>
      )}

      {recommendOpen && !isAuthRoute && (
        <aside className="recommend-panel" aria-label="Gợi ý phòng và dịch vụ">
          <header>
            <div>
              <span className="eyebrow">MUSE / SMART MATCH</span>
              <strong>Chọn phòng và dịch vụ.</strong>
            </div>
            <button
              aria-label="Đóng gợi ý phòng"
              onClick={() => setRecommendOpen(false)}
              type="button"
            >
              ×
            </button>
          </header>
          <div className="recommend-tabs" role="tablist" aria-label="Loại gợi ý">
            <button
              aria-selected={recommendMode === 'rooms'}
              className={recommendMode === 'rooms' ? 'is-active' : ''}
              onClick={() => setRecommendMode('rooms')}
              role="tab"
              type="button"
            >
              Phòng chụp <span>{rooms.length}</span>
            </button>
            <button
              aria-selected={recommendMode === 'services'}
              className={recommendMode === 'services' ? 'is-active' : ''}
              onClick={() => setRecommendMode('services')}
              role="tab"
              type="button"
            >
              Dịch vụ & thiết bị <span>{services.length}</span>
            </button>
          </div>
          {recommendMode === 'rooms' ? (
            <>
              <div className="recommend-filters">
                <label>
                  Loại không gian
                  <select
                    value={roomType}
                    onChange={(event) => setRoomType(event.target.value as typeof roomType)}
                  >
                    <option value="all">Tất cả</option>
                    <option value="darkroom">Phòng tối</option>
                    <option value="studio">Studio</option>
                    <option value="processing-room">Phòng tráng</option>
                  </select>
                </label>
                <label>
                  Ngân sách tối đa
                  <select
                    value={budget}
                    onChange={(event) => setBudget(Number(event.target.value))}
                  >
                    <option value={200000}>200.000đ / giờ</option>
                    <option value={300000}>300.000đ / giờ</option>
                    <option value={500000}>500.000đ / giờ</option>
                  </select>
                </label>
                <label>
                  Số người
                  <select
                    value={capacity}
                    onChange={(event) => setCapacity(Number(event.target.value))}
                  >
                    <option value={1}>1 người</option>
                    <option value={2}>2 người</option>
                    <option value={4}>4 người</option>
                    <option value={8}>8 người</option>
                  </select>
                </label>
              </div>
              <div className="recommend-results">
                {recommendations.slice(0, 3).map((room, index) => (
                  <article className={index === 0 ? 'is-best' : ''} key={room.id}>
                    {room.image && (
                      <div className="recommend-room-image">
                        <Image alt={room.image.alt} fill sizes="30rem" src={room.image.url} />
                      </div>
                    )}
                    <div>
                      <span>{index === 0 ? 'PHÙ HỢP NHẤT' : `GỢI Ý 0${index + 1}`}</span>
                      <strong>{room.name}</strong>
                      <p>
                        {room.providerName} · {room.district}
                      </p>
                    </div>
                    <dl>
                      <div>
                        <dt>Giá</dt>
                        <dd>{room.hourlyRate.toLocaleString('vi-VN')}đ/h</dd>
                      </div>
                      <div>
                        <dt>Sức chứa</dt>
                        <dd>{room.capacity} người</dd>
                      </div>
                      <div>
                        <dt>Đánh giá</dt>
                        <dd>{room.rating.toFixed(1)}/5</dd>
                      </div>
                    </dl>
                    <button onClick={() => chooseSuggestedRoom(room)} type="button">
                      Chọn phòng này →
                    </button>
                  </article>
                ))}
                {recommendations.length === 0 && <p>Chưa có phòng phù hợp với tiêu chí đã chọn.</p>}
              </div>
            </>
          ) : (
            <>
              <div className="recommend-service-filter">
                <label>
                  Nhóm dịch vụ
                  <select
                    value={serviceType}
                    onChange={(event) => setServiceType(event.target.value as typeof serviceType)}
                  >
                    <option value="all">Tất cả dịch vụ</option>
                    <option value="camera">Máy ảnh</option>
                    <option value="lens">Ống kính</option>
                    <option value="darkroom-equipment">Thiết bị phòng tối</option>
                    <option value="consumable">Vật tư</option>
                  </select>
                </label>
                <span>Chỉ hiển thị thiết bị đang khả dụng</span>
              </div>
              <div className="recommend-results recommend-results--services">
                {serviceRecommendations.slice(0, 6).map((service, index) => (
                  <article className={index === 0 ? 'is-best' : ''} key={service.id}>
                    <div>
                      <span>
                        {serviceTypeLabels[service.type]} · {service.code}
                      </span>
                      <strong>{service.name}</strong>
                      <p>Có tại {service.spaceName}</p>
                    </div>
                    <dl>
                      <div>
                        <dt>Trạng thái</dt>
                        <dd>Sẵn sàng</dd>
                      </div>
                      <div>
                        <dt>Lượt dùng</dt>
                        <dd>{service.usageCount}</dd>
                      </div>
                      <div>
                        <dt>Báo giá</dt>
                        <dd>Theo phòng</dd>
                      </div>
                    </dl>
                    <button onClick={() => chooseSuggestedService(service)} type="button">
                      Chọn dịch vụ này →
                    </button>
                  </article>
                ))}
                {serviceRecommendations.length === 0 && (
                  <p>Chưa có dịch vụ phù hợp đang khả dụng.</p>
                )}
              </div>
            </>
          )}
        </aside>
      )}

      <PhotoRestorationLab
        onClose={() => setPhotoLabOpen(false)}
        onNotify={notify}
        open={photoLabOpen && !isAuthRoute}
      />

      {bookingOpen && (
        <div
          className="interaction-backdrop"
          role="presentation"
          onMouseDown={() => setBookingOpen(false)}
        >
          <section
            aria-labelledby="booking-title"
            aria-modal="true"
            className="interaction-modal"
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
          >
            <span className="eyebrow">XÁC NHẬN ĐẶT CHỖ</span>
            <h2 id="booking-title">Hoàn tất lựa chọn của bạn.</h2>
            <dl>
              <div>
                <dt>Không gian</dt>
                <dd>{selectedSpace}</dd>
              </div>
              <div>
                <dt>Ngày</dt>
                <dd>{selectedDate ? selectedDate.split('-').reverse().join('.') : 'Chưa chọn'}</dd>
              </div>
              <div>
                <dt>Khung giờ</dt>
                <dd>{selectedTime || 'Chưa chọn'}</dd>
              </div>
            </dl>
            <fieldset className="payment-method-picker">
              <legend>Phương thức thanh toán</legend>
              <div className="payment-method-options">
                {paymentMethods.map((method) => (
                  <label
                    className={paymentMethod === method.value ? 'is-selected' : ''}
                    key={method.value}
                  >
                    <input
                      checked={paymentMethod === method.value}
                      name="payment-method"
                      onChange={() => setPaymentMethod(method.value)}
                      type="radio"
                      value={method.value}
                    />
                    <span>{method.label}</span>
                  </label>
                ))}
              </div>
              {paymentMethod === 'bank-transfer' && (
                <label className="payment-bank-select">
                  Chọn ngân hàng
                  <select
                    onChange={(event) => setBankCode(event.target.value as BankCode)}
                    value={bankCode}
                  >
                    {bankOptions.map((bank) => (
                      <option key={bank.value} value={bank.value}>
                        {bank.label}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </fieldset>
            <p>
              Đặt chỗ được lưu vào Payload và chờ nhà cung cấp xác nhận. Thông tin QR hoặc tài khoản
              ngân hàng sẽ hiển thị ở bước đối soát; hệ thống không tự động trừ tiền.
            </p>
            <footer>
              <button onClick={() => setBookingOpen(false)} type="button">
                Quay lại
              </button>
              <button disabled={isPending} onClick={submitBooking} type="button">
                {isPending ? 'Đang xử lý...' : 'Xác nhận đặt chỗ →'}
              </button>
            </footer>
          </section>
        </div>
      )}

      {composerOpen && (
        <div
          className="interaction-backdrop"
          role="presentation"
          onMouseDown={() => setComposerOpen(false)}
        >
          <form
            className="interaction-modal interaction-modal--composer"
            onMouseDown={(event) => event.stopPropagation()}
            onSubmit={(event) => {
              event.preventDefault()
              setComposerOpen(false)
              notify('Bản nháp đã được lưu trong phiên làm việc.')
            }}
          >
            <span className="eyebrow">CỘNG ĐỒNG / BÀI VIẾT MỚI</span>
            <h2>Chia sẻ câu chuyện của bạn.</h2>
            <label>
              Tiêu đề
              <input required placeholder="Ví dụ: Bản in đầu tiên của tôi" />
            </label>
            <label>
              Chủ đề
              <select defaultValue="darkroom">
                <option value="darkroom">Kỹ thuật phòng tối</option>
                <option value="photography">Nhiếp ảnh</option>
                <option value="equipment">Thiết bị</option>
              </select>
            </label>
            <label>
              Nội dung
              <textarea required rows={6} placeholder="Viết những điều bạn muốn chia sẻ..." />
            </label>
            <footer>
              <button onClick={() => setComposerOpen(false)} type="button">
                Hủy
              </button>
              <button type="submit">Lưu bản nháp →</button>
            </footer>
          </form>
        </div>
      )}

      <div className="toast-stack" aria-live="polite">
        {toasts.map((toast) => (
          <div className="interaction-toast" key={toast.id}>
            {toast.message}
          </div>
        ))}
      </div>
    </>
  )
}
