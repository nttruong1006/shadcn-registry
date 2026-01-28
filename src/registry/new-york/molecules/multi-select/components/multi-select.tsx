import { ChevronDown, XIcon } from 'lucide-react'
import { type MouseEvent, type ReactNode, useCallback, useRef, useState } from 'react'
import { Badge, type BadgeProps } from '@/registry/new-york/ui/badge/components/badge'
import { Button, type ButtonProps } from '@/registry/new-york/ui/button/components/button'
import { Checkbox } from '@/registry/new-york/ui/checkbox/components/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  type CommandInputProps,
  CommandItem,
  type CommandItemProps,
  CommandList,
  type CommandListProps,
  type CommandProps
} from '@/registry/new-york/ui/command/components/command'
import {
  Popover,
  PopoverContent,
  type PopoverContentProps,
  type PopoverProps,
  PopoverTrigger,
  type PopoverTriggerProps
} from '@/registry/new-york/ui/popover/components/popover'
import { Separator } from '@/registry/new-york/ui/separator/components/separator'
import { Spinner } from '@/registry/new-york/ui/spinner/components/spinner'
import type { Option } from '@/types/base'
import { cn } from '@/utils/ui'

// Multi select
export interface MultiSelectProps {
  value: Array<Option['value']>
  options: Option[]
  placeholder?: string
  max?: number
  isServerSideSearching?: boolean
  popoverProps?: PopoverProps
  popoverTriggerProps?: PopoverTriggerProps
  popoverContentProps?: PopoverContentProps
  buttonTriggerProps?: ButtonProps
  selectedOptionBadgeProps?: Omit<BadgeProps, 'children'> & {
    children: (option: Option) => ReactNode
  }
  commandProps?: CommandProps
  commandInputProps?: CommandInputProps
  commandListProps?: CommandListProps
  commandItemProps?: Omit<CommandItemProps, 'children'> & {
    children: (option: Option) => ReactNode
  }
  commandGroupSlot?: ReactNode
  onValueChange: (value: MultiSelectProps['value']) => void
}

export const MultiSelect = ({
  value,
  options,
  placeholder,
  max = Number.POSITIVE_INFINITY,
  isServerSideSearching,
  popoverProps,
  popoverTriggerProps,
  buttonTriggerProps,
  popoverContentProps,
  selectedOptionBadgeProps,
  commandProps,
  commandInputProps,
  commandListProps,
  commandItemProps,
  commandGroupSlot,
  onValueChange
}: MultiSelectProps) => {
  // Refs
  const valueContainerRef = useRef<HTMLDivElement>(null)
  const overflowBadgeRef = useRef<HTMLSpanElement>(null)

  // States
  const [overflowItemCount, setOverflowItemCount] = useState(0)

  // Methods
  const resize = useCallback((node: HTMLDivElement) => {
    valueContainerRef.current = node

    const checkOverflow = () => {
      const containerElement = valueContainerRef.current
      if (!containerElement) {
        return
      }

      const items = Array.from(
        containerElement.querySelectorAll<HTMLSpanElement>('span[data-slot="badge"][data-option="true"]')
      )

      for (const item of items) {
        item.style.removeProperty('display')
      }

      let overflowCount = 0
      for (let i = items.length - 1; i >= 0; i--) {
        if (containerElement.scrollWidth <= containerElement.clientWidth) {
          break
        }

        overflowCount++
        items[i].style.display = 'none'
        overflowBadgeRef.current?.style.removeProperty('display')
      }
      setOverflowItemCount(overflowCount)
    }

    const mutationObserver = new MutationObserver(checkOverflow)
    const resizeObserver = new ResizeObserver(checkOverflow)

    mutationObserver.observe(node, {
      childList: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    })
    resizeObserver.observe(node)

    return () => {
      mutationObserver.disconnect()
      resizeObserver.disconnect()
    }
  }, [])

  const toggleOption = (option: Option['value']) => {
    const newSelectedValues = value.includes(option) ? value.filter((value) => value !== option) : [...value, option]
    onValueChange(newSelectedValues)
  }

  const deleteOption = (e: MouseEvent<HTMLSpanElement>, option: Option['value']) => {
    e.stopPropagation()
    toggleOption(option)
  }

  const deleteExtraOptions = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    const newSelectedValues = value.slice(0, value.length - overflowItemCount)
    onValueChange(newSelectedValues)
  }

  const deleteAllOptions = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    onValueChange([])
  }

  // Template
  return (
    <Popover {...popoverProps} modal>
      <PopoverTrigger {...popoverTriggerProps} asChild={popoverTriggerProps?.asChild ?? true}>
        <Button
          {...buttonTriggerProps}
          className={cn(
            'w-full justify-start font-normal data-[empty=true]:text-muted-foreground [&_svg]:pointer-events-auto',
            buttonTriggerProps?.className
          )}
          data-empty={value.length === 0}
          variant='outline'
        >
          {value.length > 0 ? (
            <>
              <div className='flex grow items-center gap-2 overflow-hidden' ref={resize}>
                {value.map((value) => {
                  const option = options.find((option) => option.value === value)
                  return option ? (
                    <Badge
                      data-option='true'
                      key={value}
                      variant='secondary'
                      {...selectedOptionBadgeProps}
                      className={cn(
                        '[&>svg]:transition-transform hover:[&>svg]:scale-125',
                        selectedOptionBadgeProps?.className
                      )}
                      onClick={(e) => deleteOption(e, value)}
                    >
                      {option && selectedOptionBadgeProps?.children
                        ? selectedOptionBadgeProps.children(option)
                        : option.label}
                      <XIcon />
                    </Badge>
                  ) : null
                })}

                <Badge
                  ref={overflowBadgeRef}
                  variant='secondary'
                  {...selectedOptionBadgeProps}
                  className={cn(
                    '[&>svg]:transition-transform hover:[&>svg]:scale-125',
                    selectedOptionBadgeProps?.className
                  )}
                  onClick={deleteExtraOptions}
                  style={{
                    display: overflowItemCount > 0 ? 'flex' : 'none'
                  }}
                >
                  {`+ ${overflowItemCount}`}
                  <XIcon />
                </Badge>
              </div>

              <XIcon
                className='size-4 text-muted-foreground transition-transform hover:scale-125'
                onClick={deleteAllOptions}
              />

              <Separator className='flex h-full min-h-6' orientation='vertical' />
            </>
          ) : (
            <div className='line-clamp-1 text-ellipsis'>{placeholder}</div>
          )}

          <ChevronDown className='ml-auto size-4 shrink-0 text-muted-foreground' />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        {...popoverContentProps}
        align={popoverContentProps?.align ?? 'start'}
        className={cn('min-w-(--radix-popover-trigger-width) p-0', popoverContentProps?.className)}
      >
        <Command {...commandProps}>
          <div className='flex items-center gap-2 border-input border-b px-3'>
            <Checkbox
              checked={value.length === options.length || (value.length > 0 && 'indeterminate')}
              onCheckedChange={(checked) => {
                onValueChange(checked ? options.map((option) => option.value) : [])
              }}
            />
            <div className='[&>div]:flex-1 [&>div]:border-b-0 [&>div]:border-b-none [&>div]:px-0'>
              <CommandInput placeholder='Search' {...commandInputProps}>
                {isServerSideSearching && <Spinner />}
              </CommandInput>
            </div>
          </div>

          <div className='relative'>
            <CommandList {...commandListProps} className={cn('scrollbar', commandListProps?.className)}>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = value.includes(option.value)
                  const isDisabled = !isSelected && value.length === max

                  return (
                    <CommandItem
                      disabled={isDisabled}
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                      value={option.label}
                    >
                      <Checkbox checked={isSelected} />
                      {commandItemProps?.children ? commandItemProps.children(option) : option.label}
                    </CommandItem>
                  )
                })}

                {commandGroupSlot && commandGroupSlot}
              </CommandGroup>
            </CommandList>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
