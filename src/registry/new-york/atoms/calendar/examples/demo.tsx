import { useState } from 'react'
import { Calendar } from '@/components/atoms/calendar'

export function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar captionLayout='dropdown' className='rounded-lg border' mode='single' onSelect={setDate} selected={date} />
  )
}
