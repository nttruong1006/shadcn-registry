import { useState } from 'react'
import { DateRangePicker, type DateRangePickerProps } from '@/components/atoms/date-picker'

export function DatePickerRange() {
  const [value, setValue] = useState<DateRangePickerProps['value']>({ from: undefined, to: undefined })

  return <DateRangePicker className='w-xs' onValueChange={setValue} placeholder='Select date range' value={value} />
}
