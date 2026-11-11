'use client'

import { FormEvent, useState, useTransition } from 'react'
import { submitProviderApplicationAction } from '@/app/(frontend)/provider-actions'

export function ProviderApplicationForm() {
  const [message, setMessage] = useState('')
  const [isPending, startTransition] = useTransition()
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    startTransition(async () => {
      const result = await submitProviderApplicationAction({
        address: String(data.get('address') ?? ''),
        businessName: String(data.get('businessName') ?? ''),
        experience: String(data.get('experience') ?? ''),
        phone: String(data.get('phone') ?? ''),
        taxCode: String(data.get('taxCode') ?? ''),
      })
      setMessage(result.ok ? result.message : result.error)
    })
  }
  const input =
    'min-h-12 border border-[#26333f] bg-[#080b0e] px-4 text-[#edf3f5] outline-none focus:border-[#42d9f3]'
  return (
    <form className="grid gap-5 border border-[#26333f] bg-[#101a22] p-6 sm:p-8" onSubmit={submit}>
      <label className="grid gap-2">
        Tên doanh nghiệp / studio
        <input className={input} name="businessName" required />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          Số điện thoại
          <input className={input} name="phone" required />
        </label>
        <label className="grid gap-2">
          Mã số thuế
          <input className={input} name="taxCode" />
        </label>
      </div>
      <label className="grid gap-2">
        Địa chỉ
        <textarea className={`${input} min-h-24 py-3`} name="address" required />
      </label>
      <label className="grid gap-2">
        Kinh nghiệm và dịch vụ cung cấp
        <textarea className={`${input} min-h-36 py-3`} name="experience" required />
      </label>
      <button
        className="min-h-12 bg-[#42d9f3] px-5 font-bold text-[#080b0e] disabled:opacity-40"
        disabled={isPending}
        type="submit"
      >
        {isPending ? 'Đang gửi...' : 'Gửi hồ sơ xét duyệt'}
      </button>
      {message && (
        <p className="m-0 text-sm text-[#95a7b5]" role="status">
          {message}
        </p>
      )}
    </form>
  )
}
