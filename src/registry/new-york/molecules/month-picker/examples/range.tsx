import React from 'react'
import {
  MonthRangePicker,
  type MonthRangePickerProps
} from '@/registry/new-york/molecules/month-picker/components/month-picker'

// Component
export const MonthPickerRange = () => {
  // States
  const [value, setValue] = React.useState<MonthRangePickerProps['value']>(null)

  // Template
  return (
    <div className='w-full max-w-xs'>
      <MonthRangePicker onValueChange={setValue} placeholder='Select month' value={value} />
    </div>
  )
}
