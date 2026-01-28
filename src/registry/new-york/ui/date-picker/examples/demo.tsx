import { useState } from 'react'
import { DatePicker, type DatePickerProps } from '@/registry/new-york/ui/date-picker/components/date-picker'

// Component
export const DatePickerDemo = () => {
  // States
  const [value, setValue] = useState<DatePickerProps['value']>(null)

  // Template
  return <DatePicker className='w-xs' onValueChange={setValue} placeholder='Select date' value={value} />
}
