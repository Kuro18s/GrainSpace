import { getCurrentAppUser } from '@/lib/app-auth'

const roleLabels = {
  customer: 'Khách hàng',
  expert: 'Chuyên gia',
  photographer: 'Nhiếp ảnh gia',
  provider: 'Nhà cung cấp',
  'platform-admin': 'Quản trị nền tảng',
} as const

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'FS'
  const selected = parts.length === 1 ? parts : [parts[0], parts.at(-1)!]
  return selected
    .map((part) => part[0])
    .join('')
    .toLocaleUpperCase('vi-VN')
}

export async function CurrentUserIdentity() {
  const user = await getCurrentAppUser()
  const name = user?.name?.trim() || 'Tài khoản'
  const role = user?.role ? roleLabels[user.role] : 'Thành viên'
  const context = user?.organization ? `${role} / ${user.organization}` : role

  return (
    <>
      <div
        className="[word-break:break-word] content-stretch flex flex-col font-normal gap-[3px] items-start leading-[normal] overflow-clip relative shrink-0 whitespace-nowrap"
        data-name="Account details"
      >
        <p className="font-['Space_Grotesk:Regular'] relative shrink-0 text-[#edf3f5] text-[12px]">
          {name}
        </p>
        <p className="font-['JetBrains_Mono:Regular'] relative shrink-0 text-[#617584] text-[9px]">
          {context}
        </p>
      </div>
      <div
        className="bg-[#102c36] border border-[#26333f] border-solid content-stretch flex items-center justify-center overflow-clip relative shrink-0 size-[34px]"
        data-name="Avatar"
      >
        <p className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[normal] relative shrink-0 text-[#42d9f3] text-[11px] whitespace-nowrap">
          {getInitials(name)}
        </p>
      </div>
    </>
  )
}

export async function CurrentUserGreeting() {
  const user = await getCurrentAppUser()
  const name = user?.name?.trim() || 'BẠN'
  return <>CHÀO {name.toLocaleUpperCase('vi-VN')} / KHÔNG GIAN SÁNG TẠO CỦA BẠN</>
}
