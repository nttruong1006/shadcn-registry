import { useState } from 'react'
import {
  YearRangePicker,
  type YearRangePickerProps
} from '@/registry/new-york/molecules/year-picker/components/year-picker'

// Component
export const YearPickerRange = () => {
  // States
  const [value, setValue] = useState<YearRangePickerProps['value']>(null)

  // Template
  return (
    <div className='w-full max-w-xs'>
      <YearRangePicker onValueChange={setValue} placeholder='Select year' value={value} />
    </div>
  )
}
