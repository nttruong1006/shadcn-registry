import { useState } from 'react'
import { Calendar } from '@/components/atoms/calendar'

// Component
export function CalendarDemo() {
  // States
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Template
  return (
    <Calendar captionLayout='dropdown' className='rounded-lg border' mode='single' onSelect={setDate} selected={date} />
  )
}
