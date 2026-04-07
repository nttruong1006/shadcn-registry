import { useState } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/atoms/input-otp'

export function InputOTPInvalid() {
  const [value, setValue] = useState('000000')

  return (
    <InputOTP maxLength={6} onChange={setValue} value={value}>
      <InputOTPGroup>
        <InputOTPSlot aria-invalid index={0} />
        <InputOTPSlot aria-invalid index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot aria-invalid index={2} />
        <InputOTPSlot aria-invalid index={3} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot aria-invalid index={4} />
        <InputOTPSlot aria-invalid index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
