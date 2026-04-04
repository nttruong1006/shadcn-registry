import { Clock2Icon } from 'lucide-react'
import { useState } from 'react'
import { Calendar } from '@/components/atoms/calendar'
import { Card, CardContent, CardFooter } from '@/components/atoms/card'
import { Field, FieldGroup, FieldLabel } from '@/components/atoms/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/atoms/input-group'

// Component
export function CalendarWithTime() {
  // States
  const [date, setDate] = useState<Date | undefined>(new Date(new Date().getFullYear(), new Date().getMonth(), 12))

  // Template
  return (
    <Card
      // size='sm'
      className='mx-auto w-fit'
    >
      <CardContent>
        <Calendar className='p-0' mode='single' onSelect={setDate} selected={date} />
      </CardContent>
      <CardFooter className='border-t bg-card'>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor='time-from'>Start Time</FieldLabel>
            <InputGroup>
              <InputGroupInput
                className='appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
                defaultValue='10:30:00'
                id='time-from'
                step='1'
                type='time'
              />
              <InputGroupAddon>
                <Clock2Icon className='text-muted-foreground' />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor='time-to'>End Time</FieldLabel>
            <InputGroup>
              <InputGroupInput
                className='appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
                defaultValue='12:30:00'
                id='time-to'
                step='1'
                type='time'
              />
              <InputGroupAddon>
                <Clock2Icon className='text-muted-foreground' />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  )
}
