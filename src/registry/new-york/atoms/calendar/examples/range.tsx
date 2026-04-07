import { addDays } from 'date-fns'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/atoms/calendar'

export function CalendarRange() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30)
  })

  return (
    <Calendar
      className='rounded-lg border'
      defaultMonth={dateRange?.from}
      mode='range'
      numberOfMonths={2}
      onSelect={setDateRange}
      selected={dateRange}
    />
  )
}
