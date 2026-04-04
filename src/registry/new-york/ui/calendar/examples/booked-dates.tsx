import { useState } from 'react'
import { Calendar } from '@/components/atoms/calendar'
import { Card, CardContent } from '@/components/atoms/card'

const bookedDates = Array.from({ length: 15 }, (_, i) => new Date(new Date().getFullYear(), 1, 12 + i))

// Component
export function CalendarBookedDates() {
  // States
  const [date, setDate] = useState<Date | undefined>(new Date(new Date().getFullYear(), 1, 3))

  // Template
  return (
    <Card className='mx-auto w-fit p-0'>
      <CardContent className='p-0'>
        <Calendar
          defaultMonth={date}
          disabled={bookedDates}
          mode='single'
          modifiers={{
            booked: bookedDates
          }}
          modifiersClassNames={{
            booked: '[&>button]:line-through opacity-100'
          }}
          onSelect={setDate}
          selected={date}
        />
      </CardContent>
    </Card>
  )
}
