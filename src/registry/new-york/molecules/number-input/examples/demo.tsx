import { useState } from 'react'
import { NumberInput, type NumberInputProps } from '@/components/molecules/number-input'

export function NumberInputDemo() {
  const [value, setValue] = useState<NumberInputProps['value']>('')

  return (
    <NumberInput
      className='w-xs'
      onFieldChange={setValue}
      onValueChange={({ value }) => setValue(value)}
      placeholder='Enter number'
      value={value}
    />
  )
}
