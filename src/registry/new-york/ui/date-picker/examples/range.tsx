import { useState } from 'react'
import { DateRangePicker, type DateRangePickerProps } from '@/registry/new-york/ui/date-picker/components/date-picker'

// Component
export const DatePickerRange = () => {
  // States
  const [value, setValue] = useState<DateRangePickerProps['value']>({ from: undefined, to: undefined })

  // Template
  return <DateRangePicker className='w-xs' onValueChange={setValue} placeholder='Select date range' value={value} />
}
