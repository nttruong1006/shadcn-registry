import { useState } from 'react'
import { DatePicker, type DatePickerProps } from '@/components/atoms/date-picker'

export function DatePickerBasic() {
  const [value, setValue] = useState<DatePickerProps['value']>(null)

  return <DatePicker className='w-xs' onValueChange={setValue} placeholder='Select date' value={value} />
}
