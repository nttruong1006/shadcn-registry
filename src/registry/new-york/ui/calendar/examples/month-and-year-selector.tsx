import { useState } from 'react'
import { Calendar } from '@/registry/new-york/ui/calendar/components/calendar'

// Component
export const CalendarWithMonthAndYearSelector = () => {
  // States
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Template
  return (
    <Calendar
      captionLayout='dropdown'
      className='rounded-md border shadow-sm'
      mode='single'
      onSelect={setDate}
      selected={date}
    />
  )
}
