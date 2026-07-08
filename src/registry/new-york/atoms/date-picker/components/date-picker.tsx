import { format } from 'date-fns'
import { CalendarIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Button } from '@/components/atoms/button'
import { Calendar } from '@/components/atoms/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover'

export interface DatePickerProps {
  canRemove?: boolean
  className?: string
  disabled?: boolean
  id?: string
  invalid?: boolean
  onValueChange: (value: Date | null | undefined) => void
  placeholder?: string
  value: Date | null | undefined
}

export function DatePicker({
  id,
  value,
  canRemove: canRemoveProp = true,
  className,
  disabled,
  invalid,
  placeholder,
  onValueChange
}: DatePickerProps) {
  const [openPopover, setOpenPopover] = useState(false)

  const canRemove = !!value && canRemoveProp

  return (
    <div className={className}>
      <Popover modal onOpenChange={setOpenPopover} open={openPopover}>
        <PopoverTrigger
          nativeButton={false}
          render={
            <div className='relative'>
              <Button
                aria-expanded={openPopover}
                aria-invalid={invalid}
                className='w-full justify-start font-normal data-[empty=true]:text-muted-foreground'
                data-empty={!value}
                disabled={disabled}
                id={id}
                variant='outline'
              >
                <span className='line-clamp-1 text-ellipsis'>{value ? format(value, 'dd/MM/yyyy') : placeholder}</span>
              </Button>

              <Button
                className='absolute top-1/2 right-1 -translate-y-1/2 [&>svg:not([class*="size-"])]:size-4'
                disabled={disabled}
                onClick={(e) => {
                  if (canRemove) {
                    e.stopPropagation()
                    onValueChange(null)
                  }
                }}
                size='icon-xs'
                variant='ghost'
              >
                {canRemove ? <XIcon /> : <CalendarIcon />}
              </Button>
            </div>
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
  canRemove?: boolean
  className?: string
  disabled?: boolean
  onValueChange: (value: DateRange) => void
  placeholder?: string
  value?: DateRange
}

export function DateRangePicker({
  value,
  canRemove: canRemoveProp = true,
  className,
  disabled,
  placeholder,
  onValueChange
}: DateRangePickerProps) {
  const [openPopover, setOpenPopover] = useState(false)

  const canRemove = !!value?.from && !!value?.to && canRemoveProp

  return (
    <div className={className}>
      <Popover onOpenChange={setOpenPopover} open={openPopover}>
        <PopoverTrigger
          render={
            <div className='relative'>
              <Button
                aria-expanded={openPopover}
                className='w-full justify-start font-normal data-[empty=true]:text-muted-foreground'
                data-empty={!(value?.from && value?.to)}
                disabled={disabled}
                variant='outline'
              >
                <span className='line-clamp-1 text-ellipsis'>
                  {value?.from && value?.to
                    ? `${format(value.from, 'dd/MM/yyyy')} - ${format(value.to, 'dd/MM/yyyy')}`
                    : placeholder}
                </span>
              </Button>

              <Button
                className='absolute top-1/2 right-1 -translate-y-1/2 [&>svg:not([class*="size-"])]:size-4'
                disabled={disabled}
                onClick={(e) => {
                  if (canRemove) {
                    e.stopPropagation()
                    onValueChange({ from: undefined, to: undefined })
                  }
                }}
                size='icon-xs'
                variant='ghost'
              >
                {canRemove ? <XIcon /> : <CalendarIcon />}
              </Button>
            </div>
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
