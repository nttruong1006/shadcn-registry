import { add, format, isAfter, isBefore, max, min, set, sub } from 'date-fns'
import { ChevronDown, X } from 'lucide-react'
import React from 'react'
import { Button } from '@/registry/new-york/ui/button/components/button'
import { Combobox, type ComboboxProps } from '@/registry/new-york/ui/combobox/components/combobox'
import { Label } from '@/registry/new-york/ui/label/components/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/new-york/ui/popover/components/popover'
import { cn } from '@/utils/ui'

export const generateOptions = (startYear: number, endYear: number): ComboboxProps['options'] => {
  return Array.from({
    length: endYear - startYear + 1
  }).map((_, index) => {
    const optionValue = `${index + startYear}`
    return {
      value: optionValue,
      label: optionValue
    }
  })
}

export const today = new Date()
export const yearOffset = 100
export const defaultOptions = generateOptions(today.getFullYear() - yearOffset, today.getFullYear() + yearOffset)

// Year picker
export type YearPickerProps = Omit<ComboboxProps, 'options'> & {
  minDate?: Date
  maxDate?: Date
}

export const YearPicker = ({ minDate, maxDate, ...props }: YearPickerProps) => {
  // Memos
  const options = React.useMemo<ComboboxProps['options']>(() => {
    // Has not both min date and max date
    if (!(minDate || maxDate)) {
      return defaultOptions
    }

    // Has both min date and max date
    if (minDate && maxDate) {
      return generateOptions(minDate.getFullYear(), maxDate.getFullYear())
    }

    // Only has min date
    if (minDate) {
      return generateOptions(
        minDate.getFullYear(),
        add(max([minDate, today]), {
          years: yearOffset
        }).getFullYear()
      )
    }

    // Only has max date
    if (maxDate) {
      return generateOptions(
        sub(min([today, maxDate]), {
          years: yearOffset
        }).getFullYear(),
        maxDate.getFullYear()
      )
    }

    return []
  }, [minDate, maxDate])

  // Template
  return <Combobox {...props} options={options} />
}

// Year range picker
export type YearRangePickerProps = Omit<YearPickerProps, 'value' | 'onValueChange'> & {
  value: { start: Date | null | undefined; end: Date | null | undefined } | null | undefined
  onValueChange: (value: YearRangePickerProps['value']) => void
}

export const YearRangePicker = ({
  value,
  minDate,
  maxDate,
  placeholder,
  isCanRemoveValue = true,
  popoverProps,
  popoverTriggerProps,
  buttonTriggerProps,
  popoverContentProps,
  onValueChange
}: YearRangePickerProps) => {
  // Memos
  const options = React.useMemo<ComboboxProps['options']>(() => {
    // Has not both min date and max date
    if (!(minDate || maxDate)) {
      return defaultOptions
    }

    // Has both min date and max date
    if (minDate && maxDate) {
      return generateOptions(minDate.getFullYear(), maxDate.getFullYear())
    }

    // Only has min date
    if (minDate) {
      return generateOptions(
        minDate.getFullYear(),
        add(max([minDate, today]), {
          years: yearOffset
        }).getFullYear()
      )
    }

    // Only has max date
    if (maxDate) {
      return generateOptions(
        sub(min([today, maxDate]), {
          years: yearOffset
        }).getFullYear(),
        maxDate.getFullYear()
      )
    }

    return []
  }, [minDate, maxDate])

  const isEmpty = React.useMemo(() => {
    return !(value?.start && value?.end)
  }, [value])

  // Template
  return (
    <Popover {...popoverProps}>
      <PopoverTrigger {...popoverTriggerProps} asChild={popoverTriggerProps?.asChild ?? true}>
        {popoverTriggerProps?.children ?? (
          <Button
            data-empty={isEmpty}
            role='combobox'
            variant='outline'
            {...buttonTriggerProps}
            className={cn(
              'w-full justify-start font-normal data-[empty=true]:text-muted-foreground [&_svg]:pointer-events-auto',
              buttonTriggerProps?.className
            )}
          >
            {buttonTriggerProps?.children ?? (
              <>
                <span className='line-clamp-1 block text-ellipsis'>
                  {value?.start && value?.end
                    ? `${format(value.start, 'yyyy')} - ${format(value.end, 'yyyy')}`
                    : placeholder}
                </span>

                {isCanRemoveValue && !isEmpty ? (
                  <X
                    className='ml-auto size-4 shrink-0 text-muted-foreground transition-transform hover:scale-125'
                    onClick={(e) => {
                      e.stopPropagation()
                      onValueChange(null)
                    }}
                  />
                ) : (
                  <ChevronDown className='ml-auto size-4 shrink-0 text-muted-foreground' />
                )}
              </>
            )}
          </Button>
        )}
      </PopoverTrigger>

      <PopoverContent
        {...popoverContentProps}
        className={cn('min-w-(--radix-popover-trigger-width) p-0', popoverContentProps?.className)}
      >
        <div className='space-y-4 p-4'>
          {/* Start */}
          <div className='space-y-2'>
            <Label>Start year</Label>
            <Combobox
              isCanRemoveValue={false}
              onValueChange={(yearValue) => {
                if (!yearValue) {
                  return
                }

                const date = set(today, {
                  date: 1,
                  month: value?.start ? value.start.getMonth() : 0,
                  year: +yearValue
                })

                const changeDate = value?.end ? min([date, value.end]) : date

                if (minDate && isBefore(changeDate, minDate)) {
                  return onValueChange({
                    start: minDate,
                    end: value?.end
                  })
                }

                if (maxDate && isAfter(changeDate, maxDate)) {
                  return onValueChange({
                    start: maxDate,
                    end: value?.end
                  })
                }

                onValueChange({
                  start: changeDate,
                  end: value?.end
                })
              }}
              options={options}
              placeholder='Select year'
              value={value?.start?.getFullYear().toString()}
            />
          </div>

          {/* End */}
          <div className='space-y-2'>
            <Label>End year</Label>
            <Combobox
              isCanRemoveValue={false}
              onValueChange={(yearValue) => {
                if (!yearValue) {
                  return
                }

                const date = set(today, {
                  date: 1,
                  month: value?.end ? value.end.getMonth() : 0,
                  year: +yearValue
                })

                const changeDate = value?.start ? max([value.start, date]) : date

                if (minDate && isBefore(changeDate, minDate)) {
                  return onValueChange({
                    start: value?.start,
                    end: minDate
                  })
                }

                if (maxDate && isAfter(changeDate, maxDate)) {
                  return onValueChange({
                    start: value?.start,
                    end: maxDate
                  })
                }

                onValueChange({
                  start: value?.start,
                  end: changeDate
                })
              }}
              options={options}
              placeholder='Select year'
              value={value?.end?.getFullYear().toString()}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
