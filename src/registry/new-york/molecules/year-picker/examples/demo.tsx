import { useState } from 'react'
import { YearPicker, type YearPickerProps } from '@/registry/new-york/molecules/year-picker/components/year-picker'

// Component
export const YearPickerDemo = () => {
  // States
  const [value, setValue] = useState<YearPickerProps['value']>(null)

  // Template
  return (
    <div className='w-full max-w-xs'>
      <YearPicker onValueChange={setValue} placeholder='Select year' value={value} />
    </div>
  )
}
