import { format } from 'date-fns'
import { CalendarIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Button } from '@/components/atoms/button'
import { Calendar } from '@/components/atoms/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover'

export interface DatePickerProps {
  id?: string
  value: Date | null | undefined
  canRemove?: boolean
  className?: string
  disabled?: boolean
  placeholder?: string
  // calendarProps?: Omit<CalendarProps, 'mode' | 'selected' | 'required' | 'onSelect'>
  onValueChange: (value: Date | null | undefined) => void
}

export function DatePicker({
  id,
  value,
  canRemove = true,
  className,
  disabled,
  placeholder,
  onValueChange
}: DatePickerProps) {
  const [openPopover, setOpenPopover] = useState(false)

  return (
    <div className={className}>
      <Popover modal onOpenChange={setOpenPopover} open={openPopover}>
        <PopoverTrigger
          render={
            <Button
              aria-expanded={openPopover}
              className='w-full justify-start font-normal data-[empty=true]:text-muted-foreground [&_svg]:pointer-events-auto'
              data-empty={!value}
              disabled={disabled}
              id={id}
              variant='outline'
            >
              <span className='line-clamp-1 text-ellipsis'>{value ? format(value, 'dd/MM/yyyy') : placeholder}</span>

              {canRemove && value ? (
                <XIcon
                  className='ml-auto size-4 shrink-0 text-muted-foreground transition-transform hover:scale-125'
                  onClick={(e) => {
                    e.stopPropagation()
                    onValueChange(null)
                  }}
                />
              ) : (
                <CalendarIcon className='ml-auto size-4 shrink-0 text-muted-foreground' />
              )}
            </Button>
          }
        />

        <PopoverContent className='w-auto overflow-hidden p-0'>
          <Calendar
            captionLayout='dropdown'
            mode='single'
            onSelect={(date) => {
              onValueChange(date)
              setOpenPopover(false)
            }}
            required
            selected={value ?? undefined}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export interface DateRangePickerProps {
  value?: DateRange
  canRemove?: boolean
  className?: string
  isDisabled?: boolean
  placeholder?: string
  // calendarProps?: Omit<CalendarProps, 'mode' | 'selected' | 'required' | 'onSelect'>
  onValueChange: (value: DateRange) => void
}

export function DateRangePicker({
  value,
  canRemove = true,
  className,
  isDisabled,
  placeholder,
  onValueChange
}: DateRangePickerProps) {
  const [openPopover, setOpenPopover] = useState(false)

  return (
    <div className={className}>
      <Popover onOpenChange={setOpenPopover} open={openPopover}>
        <PopoverTrigger
          render={
            <Button
              aria-expanded={openPopover}
              className='w-full justify-start font-normal data-[empty=true]:text-muted-foreground [&_svg]:pointer-events-auto'
              data-empty={!(value?.from && value?.to)}
              disabled={isDisabled}
              variant='outline'
            >
              <span className='line-clamp-1 text-ellipsis'>
                {value?.from && value?.to
                  ? `${format(value.from, 'dd/MM/yyyy')} - ${format(value.to, 'dd/MM/yyyy')}`
                  : placeholder}
              </span>

              {canRemove && value?.from && value?.to ? (
                <XIcon
                  className='ml-auto size-4 shrink-0 text-muted-foreground transition-transform hover:scale-125'
                  onClick={(e) => {
                    e.stopPropagation()
                    onValueChange({ from: undefined, to: undefined })
                  }}
                />
              ) : (
                <CalendarIcon className='ml-auto size-4 shrink-0 text-muted-foreground' />
              )}
            </Button>
          }
        />

        <PopoverContent className='w-auto overflow-hidden p-0'>
          <Calendar
            captionLayout='dropdown'
            mode='range'
            numberOfMonths={2}
            onSelect={onValueChange}
            required
            selected={value}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
