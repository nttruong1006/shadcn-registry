import { useState } from 'react'
import { Calendar } from '@/registry/new-york/ui/calendar/components/calendar'

// Component
export const CalendarDemo = () => {
  // States
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Template
  return <Calendar className='rounded-md border shadow-sm' mode='single' onSelect={setDate} selected={date} />
}
