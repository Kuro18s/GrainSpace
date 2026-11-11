export const paymentMethods = [
  { label: 'Chuyển khoản ngân hàng', value: 'bank-transfer' },
  { label: 'VNPay QR', value: 'vnpay' },
  { label: 'Thẻ quốc tế', value: 'stripe' },
] as const

export const bankOptions = [
  { label: 'Vietcombank', value: 'vietcombank' },
  { label: 'BIDV', value: 'bidv' },
  { label: 'VietinBank', value: 'vietinbank' },
  { label: 'Techcombank', value: 'techcombank' },
  { label: 'MB Bank', value: 'mbbank' },
  { label: 'ACB', value: 'acb' },
  { label: 'VPBank', value: 'vpbank' },
  { label: 'Sacombank', value: 'sacombank' },
] as const

export type PaymentMethod = (typeof paymentMethods)[number]['value']
export type BankCode = (typeof bankOptions)[number]['value']

export const isPaymentMethod = (value: unknown): value is PaymentMethod =>
  paymentMethods.some((method) => method.value === value)

export const isBankCode = (value: unknown): value is BankCode =>
  bankOptions.some((bank) => bank.value === value)
