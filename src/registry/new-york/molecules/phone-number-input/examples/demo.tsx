import { useState } from 'react'
import { PhoneNumberInput } from '@/registry/new-york/molecules/phone-number-input/components/phone-number-input'

export function PhoneNumberInputDemo() {
  const [value, setValue] = useState('')

  return (
    <PhoneNumberInput className='max-w-xs' onValueChange={setValue} placeholder='Enter phone number' value={value} />
  )
}
