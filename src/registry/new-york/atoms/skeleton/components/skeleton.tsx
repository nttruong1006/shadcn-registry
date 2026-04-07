import { cn } from '@/utils/ui'

export function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} data-slot='skeleton' {...props} />
}
