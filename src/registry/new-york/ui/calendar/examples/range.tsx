import { addDays } from 'date-fns'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/atoms/calendar'
import { Card, CardContent } from '@/components/atoms/card'

// Component
export function CalendarRange() {
  // States
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30)
  })

  // Template
  return (
    <Card className='mx-auto w-fit p-0'>
      <CardContent className='p-0'>
        <Calendar
          defaultMonth={dateRange?.from}
          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
          mode='range'
          numberOfMonths={2}
          onSelect={setDateRange}
          selected={dateRange}
        />
      </CardContent>
    </Card>
  )
}
