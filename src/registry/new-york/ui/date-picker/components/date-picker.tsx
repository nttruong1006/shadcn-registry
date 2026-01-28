import { format, toDate } from 'date-fns'
import { CalendarIcon, XIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Button } from '@/registry/new-york/ui/button/components/button'
import { Calendar, type CalendarProps } from '@/registry/new-york/ui/calendar/components/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/new-york/ui/popover/components/popover'

// Date picker
export interface DatePickerProps {
  id?: string
  value: Date | string | null | undefined
  isCanRemoveValue?: boolean
  className?: string
  isDisabled?: boolean
  placeholder?: string
  calendarProps?: Omit<CalendarProps, 'mode' | 'selected' | 'required' | 'onSelect'>
  onValueChange: (value: Date | null | undefined) => void
}

export const DatePicker = ({
  id,
  value,
  isCanRemoveValue = true,
  className,
  isDisabled,
  placeholder,
  calendarProps,
  onValueChange
}: DatePickerProps) => {
  // States
  const [isOpenPopover, setIsOpenPopover] = useState(false)

  // Memos
  // Selected date
  const selectedDate = useMemo(() => {
    return value ? toDate(value) : undefined
  }, [value])

  // Template
  return (
    <div className={className}>
      <Popover modal onOpenChange={setIsOpenPopover} open={isOpenPopover}>
        <PopoverTrigger asChild>
          <Button
            aria-expanded={isOpenPopover}
            className='w-full justify-start font-normal data-[empty=true]:text-muted-foreground [&_svg]:pointer-events-auto'
            data-empty={!value}
            disabled={isDisabled}
            id={id}
            variant='outline'
          >
            <span className='line-clamp-1 text-ellipsis'>{value ? format(value, 'dd/MM/yyyy') : placeholder}</span>

            {isCanRemoveValue && value ? (
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
        </PopoverTrigger>

        <PopoverContent className='w-auto overflow-hidden p-0'>
          <Calendar
            captionLayout='dropdown'
            mode='single'
            onSelect={(date) => {
              onValueChange(date)
              setIsOpenPopover(false)
            }}
            required
            selected={selectedDate}
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

// Date range picker
export interface DateRangePickerProps {
  value?: DateRange
  isCanRemoveValue?: boolean
  className?: string
  isDisabled?: boolean
  placeholder?: string
  calendarProps?: Omit<CalendarProps, 'mode' | 'selected' | 'required' | 'onSelect'>
  onValueChange: (value: DateRange) => void
}

export const DateRangePicker = ({
  value,
  isCanRemoveValue = true,
  className,
  isDisabled,
  placeholder,
  calendarProps,
  onValueChange
}: DateRangePickerProps) => {
  // States
  const [isOpenPopover, setIsOpenPopover] = useState(false)

  // Template
  return (
    <div className={className}>
      <Popover onOpenChange={setIsOpenPopover} open={isOpenPopover}>
        <PopoverTrigger asChild>
          <Button
            aria-expanded={isOpenPopover}
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

            {isCanRemoveValue && value?.from && value?.to ? (
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
        </PopoverTrigger>

        <PopoverContent className='w-auto overflow-hidden p-0'>
          <Calendar
            captionLayout='dropdown'
            mode='range'
            onSelect={onValueChange}
            required
            selected={value}
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
