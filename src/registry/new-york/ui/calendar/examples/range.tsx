import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Calendar } from '@/registry/new-york/ui/calendar/components/calendar'

// Component
export const CalendarRange = () => {
  // States
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 5, 12),
    to: new Date(2025, 6, 15)
  })

  // Template
  return (
    <Calendar
      className='rounded-lg border shadow-sm'
      defaultMonth={dateRange?.from}
      mode='range'
      numberOfMonths={2}
      onSelect={setDateRange}
      selected={dateRange}
    />
  )
}
