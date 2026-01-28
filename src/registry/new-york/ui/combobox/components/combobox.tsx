import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Button, type ButtonProps } from '@/registry/new-york/ui/button/components/button'
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
import type { Option } from '@/types/base'
import { cn } from '@/utils/ui'

// Combobox
export interface ComboboxProps {
  value: Option['value'] | null | undefined
  options: Option[]
  isValueCanBeEmptyString?: boolean
  isCanRemoveValue?: boolean
  placeholder?: string
  popoverProps?: PopoverProps
  popoverTriggerProps?: PopoverTriggerProps
  buttonTriggerProps?: ButtonProps
  popoverContentProps?: PopoverContentProps
  commandProps?: CommandProps
  commandInputProps?: CommandInputProps
  commandListProps?: CommandListProps
  commandItemProps?: Omit<CommandItemProps, 'children'> & {
    children: (option: Option) => React.ReactNode | React.ReactNode
  }
  commandItemPrefix?: (option: Option) => React.ReactNode
  commandGroupSlot?: React.ReactNode
  onValueChange: (value: ComboboxProps['value']) => void
}

export const useLabel = (args: Pick<ComboboxProps, 'value' | 'options' | 'isValueCanBeEmptyString'>) => {
  // Args
  const { value, options, isValueCanBeEmptyString } = args

  // States
  const [label, setLabel] = useState<string>()

  // Effects
  // Reset label
  useEffect(() => {
    if (value == null || (value === '' && !isValueCanBeEmptyString)) {
      return setLabel(undefined)
    }

    const selectedOption = options.find((option) => option.value === value)

    if (selectedOption) {
      setLabel(selectedOption.label)
    }
  }, [value, options, isValueCanBeEmptyString])

  return { label }
}

export const Combobox = ({
  value,
  options,
  isValueCanBeEmptyString = false,
  isCanRemoveValue = true,
  placeholder,
  popoverProps,
  popoverTriggerProps,
  buttonTriggerProps,
  popoverContentProps,
  commandProps,
  commandInputProps,
  commandListProps,
  commandItemProps,
  commandItemPrefix,
  commandGroupSlot,
  onValueChange
}: ComboboxProps) => {
  // Hooks
  const { label } = useLabel({
    value,
    options,
    isValueCanBeEmptyString
  })

  // States
  const [isOpenPopover, setIsOpenPopover] = useState(false)

  // Memos
  const isEmpty = useMemo(() => {
    return value == null || (value === '' && !isValueCanBeEmptyString)
  }, [value, isValueCanBeEmptyString])

  return (
    <Popover {...popoverProps} modal onOpenChange={setIsOpenPopover} open={isOpenPopover}>
      <PopoverTrigger {...popoverTriggerProps} asChild={popoverTriggerProps?.asChild ?? true}>
        {popoverTriggerProps?.children ?? (
          <Button
            aria-expanded={isOpenPopover}
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
                <span className='line-clamp-1 text-ellipsis'> {label ?? placeholder}</span>
                {isCanRemoveValue && !isEmpty ? (
                  <XIcon
                    className='ml-auto size-4 shrink-0 text-muted-foreground transition-transform hover:scale-125'
                    onClick={(e) => {
                      e.stopPropagation()
                      onValueChange(null)
                    }}
                  />
                ) : (
                  <ChevronDownIcon className='ml-auto size-4 shrink-0 text-muted-foreground' />
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
        <Command {...commandProps}>
          <CommandInput placeholder='Search' {...commandInputProps} />
          <CommandList {...commandListProps}>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const commandItemChildren = commandItemProps?.children ? (
                  commandItemProps.children(option)
                ) : (
                  <span>{option.label}</span>
                )

                if (!commandItemChildren) {
                  return null
                }

                return (
                  <div
                    className={cn('flex items-center gap-1', {
                      'pl-1': Boolean(commandItemPrefix)
                    })}
                    key={option.value}
                  >
                    {commandItemPrefix?.(option)}

                    <CommandItem
                      className='grow'
                      onSelect={() => {
                        onValueChange(option.value)
                        setIsOpenPopover(false)
                      }}
                      value={option.label}
                      {...commandItemProps}
                    >
                      {commandItemChildren}
                      <CheckIcon
                        className={cn('ml-auto size-4', option.value === value ? 'opacity-100' : 'opacity-0')}
                      />
                    </CommandItem>
                  </div>
                )
              })}

              {commandGroupSlot && commandGroupSlot}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
