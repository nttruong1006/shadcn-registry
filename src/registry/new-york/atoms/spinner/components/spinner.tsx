import { Loader2Icon } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '@/utils/ui'

export function Spinner({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <Loader2Icon
      aria-label='Loading'
      className={cn('size-4 animate-spin', className)}
      data-slot='spinner'
      role='status'
      {...props}
    />
  )
}
