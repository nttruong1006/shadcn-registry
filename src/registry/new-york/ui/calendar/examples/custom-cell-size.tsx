import { addDays } from 'date-fns'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Calendar, CalendarDayButton } from '@/components/atoms/calendar'
import { Card, CardContent } from '@/components/atoms/card'

// Component
export function CalendarCustomDays() {
  // States
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 11, 8),
    to: addDays(new Date(new Date().getFullYear(), 11, 8), 10)
  })

  // Template
  return (
    <Card className='mx-auto w-fit p-0'>
      <CardContent className='p-0'>
        <Calendar
          captionLayout='dropdown'
          className='[--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]'
          components={{
            DayButton: ({ children, modifiers, day, ...props }) => {
              const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6

              return (
                <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                  {children}
                  {!modifiers.outside && <span>{isWeekend ? '$120' : '$100'}</span>}
                </CalendarDayButton>
              )
            }
          }}
          defaultMonth={range?.from}
          formatters={{
            formatMonthDropdown: (date) => {
              return date.toLocaleString('default', { month: 'long' })
            }
          }}
          mode='range'
          numberOfMonths={1}
          onSelect={setRange}
          selected={range}
        />
      </CardContent>
    </Card>
  )
}
