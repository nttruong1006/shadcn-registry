import React from 'react'
import { NumberInput, type NumberInputProps } from '@/registry/new-york/molecules/number-input/components/number-input'

// Component
export const NumberInputDemo = () => {
  // States
  const [value, setValue] = React.useState<NumberInputProps['value']>('')

  // Template
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
