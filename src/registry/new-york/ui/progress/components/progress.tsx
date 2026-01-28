import { Indicator, Root } from '@radix-ui/react-progress'
import type { ComponentProps } from 'react'
import { cn } from '@/utils/ui'

// Progress
export const Progress = ({ className, value, ...props }: ComponentProps<typeof Root>) => {
  // Template
  return (
    <Root
      className={cn('relative h-2 w-full overflow-hidden rounded-full bg-primary/20', className)}
      data-slot='progress'
      {...props}
    >
      <Indicator
        className='h-full w-full flex-1 bg-primary transition-all'
        data-slot='progress-indicator'
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </Root>
  )
}
