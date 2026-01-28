import { Indicator, Item, Root } from '@radix-ui/react-radio-group'
import { CircleIcon } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '@/utils/ui'

// Radio group
export const RadioGroup = ({ className, ...props }: ComponentProps<typeof Root>) => {
  // Template
  return <Root className={cn('grid gap-3', className)} data-slot='radio-group' {...props} />
}

// Radio group item
export const RadioGroupItem = ({ className, ...props }: ComponentProps<typeof Item>) => {
  // Template
  return (
    <Item
      className={cn(
        'aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40',
        className
      )}
      data-slot='radio-group-item'
      {...props}
    >
      <Indicator className='relative flex items-center justify-center' data-slot='radio-group-indicator'>
        <CircleIcon className='absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-primary' />
      </Indicator>
    </Item>
  )
}
