import type { ComponentProps } from 'react'
import { cn } from '@/utils/ui'

// Skeleton
export const Skeleton = ({ className, ...props }: ComponentProps<'div'>) => {
  // Template
  return <div className={cn('animate-pulse rounded-md bg-accent', className)} data-slot='skeleton' {...props} />
}
