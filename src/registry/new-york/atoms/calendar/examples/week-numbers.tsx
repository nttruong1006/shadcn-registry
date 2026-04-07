import { useState } from 'react'
import { Calendar } from '@/components/atoms/calendar'
import { Card, CardContent } from '@/components/atoms/card'

export function CalendarWeekNumbers() {
  const [date, setDate] = useState<Date | undefined>(new Date(new Date().getFullYear(), 0, 12))

  return (
    <Card className='mx-auto w-fit p-0'>
      <CardContent className='p-0'>
        <Calendar defaultMonth={date} mode='single' onSelect={setDate} selected={date} showWeekNumber />
      </CardContent>
    </Card>
  )
}
